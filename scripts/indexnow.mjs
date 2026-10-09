// Prévient Bing et Yandex qu'une page a été publiée ou mise à jour, au lieu
// d'attendre leur prochain passage. Les URLs sont lues dans le sitemap, donc
// il n'y a rien à tenir à jour ici : un article publié est un article signalé.
//
// À lancer APRÈS le déploiement — les moteurs vérifient que les pages
// répondent et que le fichier de clé est en ligne.
//
// Usage :
//   node scripts/indexnow.mjs              tout le sitemap (à réserver aux refontes)
//   node scripts/indexnow.mjs <url> [...]  seulement ces adresses
//   node scripts/indexnow.mjs --since <ref> les pages modifiées depuis ce commit
//                                          (et leur version /en/) : le cas courant
//   node scripts/indexnow.mjs --dry-run    montre ce qui serait envoyé
//
// Renvoyer chaque jour tout le sitemap, pages inchangées comprises, n'apporte
// rien et peut être vu comme un abus par les moteurs : ne signaler que le neuf.
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = resolve(import.meta.dirname, '..');
const HOST = 'www.baouch.fr';
const ENDPOINT = 'https://api.indexnow.org/indexnow';

// La clé est le nom du fichier texte déposé à la racine du site.
const fichierCle = readdirSync(resolve(ROOT, 'public')).find((f) => /^[a-f0-9]{16,}\.txt$/.test(f));
if (!fichierCle) {
  throw new Error("Aucun fichier de clé IndexNow trouvé dans public/ (attendu : <clé>.txt)");
}
const key = fichierCle.replace(/\.txt$/, '');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const explicites = args.filter((a) => a.startsWith('http'));

const sitemap = [...readFileSync(resolve(ROOT, 'public/sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (m) => m[1]
);

// --since <ref> : src/<chemin>/index.html modifié → https://www.baouch.fr/<chemin>/ (+ /en/ si
// la page existe en anglais) ; une entrée de pages-en.json modifiée → sa page /en/.
function depuis(ref) {
  const git = (...a) => execFileSync('git', a, { cwd: ROOT, encoding: 'utf8' });
  const fichiers = git('diff', '--name-only', `${ref}..HEAD`).split('\n').filter(Boolean);
  const chemins = new Set();
  for (const f of fichiers) {
    const m = f.match(/^src\/(?:(.+)\/)?index\.html$/);
    if (m) chemins.add(m[1] ? `/${m[1]}/` : '/');
  }
  const en = JSON.parse(readFileSync(resolve(ROOT, 'src/i18n/pages-en.json'), 'utf8'));
  let avant = {};
  try { avant = JSON.parse(git('show', `${ref}:src/i18n/pages-en.json`)); } catch { /* fichier absent à ce commit */ }
  const urls = new Set();
  for (const c of chemins) {
    urls.add(`https://${HOST}${c}`);
    if (Object.hasOwn(en, c)) urls.add(`https://${HOST}/en${c}`);
  }
  for (const [c, v] of Object.entries(en)) {
    if (JSON.stringify(avant[c]) !== JSON.stringify(v)) urls.add(`https://${HOST}/en${c}`);
  }
  return [...urls].filter((u) => sitemap.includes(u));
}

const iSince = args.indexOf('--since');
const urlList = explicites.length
  ? explicites
  : iSince !== -1
    ? depuis(args[iSince + 1] || (() => { throw new Error('--since attend un commit'); })())
    : sitemap;

if (!urlList.length) throw new Error('Aucune URL à signaler.');

const payload = {
  host: HOST,
  key,
  keyLocation: `https://${HOST}/${fichierCle}`,
  urlList,
};

console.log(`IndexNow — ${urlList.length} URL, clé ${key.slice(0, 8)}…`);
if (dryRun) {
  urlList.forEach((u) => console.log('  ' + u));
  console.log('\n--dry-run : rien n’a été envoyé.');
  process.exit(0);
}

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(payload),
});

// 200 et 202 valent acceptation ; 422 signale des URLs hors du domaine
// déclaré, 403 une clé que les moteurs n'ont pas pu lire à sa place.
const corps = await res.text().catch(() => '');
console.log(`Réponse : HTTP ${res.status}${corps ? ' — ' + corps.slice(0, 200) : ''}`);
if (res.status === 200 || res.status === 202) {
  console.log('Les moteurs ont pris les adresses en compte.');
} else {
  console.log(`Échec : vérifiez que https://${HOST}/${fichierCle} est bien en ligne.`);
  process.exitCode = 1;
}
