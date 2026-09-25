// Rapport Google Search Console : requêtes, pages et opportunités SEO.
// Authentification par compte de service (lecture seule), sans dépendance :
// la clé JSON est lue dans la variable d'environnement GSC_SERVICE_ACCOUNT_JSON.
// La propriété est détectée parmi celles du compte (baouch.fr), ou forcée par GSC_SITE.
// Usage : node scripts/gsc-report.mjs [jours=28]
import { createSign } from 'node:crypto';

const JOURS = Number(process.argv[2]) || 28;
const brut = process.env.GSC_SERVICE_ACCOUNT_JSON;
if (!brut) {
  console.error('GSC_SERVICE_ACCOUNT_JSON absente : rapport Search Console impossible.');
  process.exit(2);
}
const cle = JSON.parse(brut);

const b64 = (o) => Buffer.from(typeof o === 'string' ? o : JSON.stringify(o)).toString('base64url');

async function jeton() {
  const now = Math.floor(Date.now() / 1000);
  const corps = `${b64({ alg: 'RS256', typ: 'JWT' })}.${b64({
    iss: cle.client_email,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  })}`;
  const sig = createSign('RSA-SHA256').update(corps).sign(cle.private_key, 'base64url');
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${corps}.${sig}` }),
  });
  const j = await r.json();
  if (!j.access_token) throw new Error(`Jeton refusé : ${JSON.stringify(j)}`);
  return j.access_token;
}

const token = await jeton();
const api = async (chemin, body) => {
  const r = await fetch(`https://searchconsole.googleapis.com/webmasters/v3/${chemin}`, {
    method: body ? 'POST' : 'GET',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: body && JSON.stringify(body),
  });
  const j = await r.json();
  if (j.error) throw new Error(`${chemin} : ${j.error.message}`);
  return j;
};

const sites = (await api('sites')).siteEntry ?? [];
const site = process.env.GSC_SITE || sites.find((s) => s.siteUrl.includes('baouch.fr'))?.siteUrl;
if (!site) {
  console.error(`Aucune propriété baouch.fr accessible. Propriétés vues : ${sites.map((s) => s.siteUrl).join(', ') || 'aucune'}.`);
  console.error(`Ajoutez ${cle.client_email} comme utilisateur dans Search Console.`);
  process.exit(3);
}

// Les données Search Console ont ~3 jours de retard.
const jour = (d) => new Date(Date.now() - d * 864e5).toISOString().slice(0, 10);
const periode = { startDate: jour(JOURS + 3), endDate: jour(3) };
const requete = (dimensions, rowLimit = 250) =>
  api(`sites/${encodeURIComponent(site)}/searchAnalytics/query`, { ...periode, dimensions, rowLimit }).then((j) => j.rows ?? []);

const [total, parRequete, parPage, parJour, pageRequete] = await Promise.all([
  requete([]),
  requete(['query'], 1000),
  requete(['page'], 250),
  requete(['date'], 400),
  requete(['page', 'query'], 2000),
]);

const pct = (x) => `${(x * 100).toFixed(1)} %`;
const ligne = (r) => `${String(r.clicks).padStart(5)} clics  ${String(r.impressions).padStart(7)} impr.  CTR ${pct(r.ctr).padStart(7)}  pos. ${r.position.toFixed(1).padStart(5)}  ${r.keys?.join(' | ') ?? ''}`;
const titre = (t) => console.log(`\n## ${t}\n`);

console.log(`# Search Console — ${site} — ${periode.startDate} → ${periode.endDate}`);
const t = total[0] ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 };
console.log(`Total : ${t.clicks} clics, ${t.impressions} impressions, CTR ${pct(t.ctr)}, position moyenne ${t.position.toFixed(1)}`);
console.log(`Moyenne : ${(t.clicks / JOURS).toFixed(1)} clics / jour`);

titre('Clics par jour (7 derniers jours de données)');
parJour.slice(-7).forEach((r) => console.log(`${r.keys[0]}  ${r.clicks} clics  ${r.impressions} impr.`));

titre('Top pages');
parPage.sort((a, b) => b.clicks - a.clicks).slice(0, 25).forEach((r) => console.log(ligne(r)));

titre('Top requêtes');
parRequete.sort((a, b) => b.clicks - a.clicks).slice(0, 30).forEach((r) => console.log(ligne(r)));

titre('Opportunités : positions 5 à 20 avec des impressions (pousser vers le top 3)');
parRequete
  .filter((r) => r.position >= 5 && r.position <= 20 && r.impressions >= 20)
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 30)
  .forEach((r) => console.log(ligne(r)));

titre('Titres à réécrire : pages très vues mais peu cliquées (CTR < 2 %)');
parPage
  .filter((r) => r.impressions >= 100 && r.ctr < 0.02)
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 15)
  .forEach((r) => console.log(ligne(r)));

titre('Requêtes qui mènent à chaque page (5 pages les plus affichées)');
parPage
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 5)
  .forEach((p) => {
    console.log(`### ${p.keys[0]}`);
    pageRequete
      .filter((r) => r.keys[0] === p.keys[0])
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 15)
      .forEach((r) => console.log(ligne({ ...r, keys: [r.keys[1]] })));
    console.log('');
  });
