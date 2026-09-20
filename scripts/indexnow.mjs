// Prévient Bing et Yandex qu'une page a été publiée ou mise à jour, au lieu
// d'attendre leur prochain passage. Les URLs sont lues dans le sitemap, donc
// il n'y a rien à tenir à jour ici : un article publié est un article signalé.
//
// À lancer APRÈS le déploiement — les moteurs vérifient que les pages
// répondent et que le fichier de clé est en ligne.
//
// Usage :
//   node scripts/indexnow.mjs              tout le sitemap
//   node scripts/indexnow.mjs <url> [...]  seulement ces adresses
//   node scripts/indexnow.mjs --dry-run    montre ce qui serait envoyé
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

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

const urlList = explicites.length
  ? explicites
  : [...readFileSync(resolve(ROOT, 'public/sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (m) => m[1]
    );

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
