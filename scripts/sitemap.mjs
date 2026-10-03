// Génère public/sitemap.xml à partir des pages sources : plus aucune URL à
// tenir à la main, une page publiée est une page listée. La date de dernière
// modification vient du dateModified du JSON-LD, sinon de article:published_time,
// sinon du dernier commit de la page (accueil, pages projet), sinon du fichier.
// Lancé automatiquement avant chaque build — voir le script "prebuild".
// Usage : node scripts/sitemap.mjs
import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import fg from 'fast-glob';
import * as cheerio from 'cheerio';
import { PAGES_EN, enPath } from './build-en.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const SITE = 'https://www.baouch.fr';
const OUT = resolve(ROOT, 'public/sitemap.xml');

// Les pages que l'on ne veut pas voir dans l'index des moteurs.
const EXCLUES = ['404.html', 'styleguide/**', 'partials/**'];

const pages = fg
  .sync('**/index.html', { cwd: resolve(ROOT, 'src'), ignore: EXCLUES })
  .sort();

const urls = pages.map((file) => {
  const abs = resolve(ROOT, 'src', file);
  const $ = cheerio.load(readFileSync(abs, 'utf8'));

  // Le canonical fait foi : il porte déjà le bon domaine et la bonne casse.
  const canonical = $('link[rel="canonical"]').attr('href');
  const chemin = '/' + file.replace(/index\.html$/, '');
  const loc = canonical || SITE + (chemin === '/' ? '/' : chemin);

  // dateModified du JSON-LD d'abord : une page mise à jour doit le signaler
  // aux moteurs, sinon ils n'ont aucune raison de repasser plus tôt
  let modifie;
  $('script[type="application/ld+json"]').each((_, el) => {
    const m = $(el).html().match(/"dateModified"\s*:\s*"(\d{4}-\d{2}-\d{2})/);
    if (m && (!modifie || m[1] > modifie)) modifie = m[1];
  });
  const publie = $('meta[property="article:published_time"]').attr('content');
  // sinon la date du dernier commit qui a touché la page : stable d'un clone à
  // l'autre, contrairement à la date du fichier sur le disque
  let commit = '';
  try {
    commit = execFileSync('git', ['log', '-1', '--format=%cs', '--', abs], { cwd: ROOT, encoding: 'utf8' }).trim();
  } catch {
    // pas de dépôt git : on retombe sur la date du fichier
  }
  const lastmod =
    modifie || (publie ? publie.slice(0, 10) : commit || statSync(abs).mtime.toISOString().slice(0, 10));

  return { loc, lastmod, chemin };
});

// version anglaise (/en/…, générée au build) : même date que la page française ;
// chaque version déclare l'autre (hreflang), comme dans les pages elles-mêmes
for (const u of [...urls]) {
  if (!Object.hasOwn(PAGES_EN, u.chemin)) continue;
  const fr = SITE + u.chemin, en = SITE + enPath(u.chemin);
  u.alternates = { fr, en, 'x-default': fr };
  urls.push({ loc: en, lastmod: u.lastmod, chemin: enPath(u.chemin), alternates: u.alternates });
}

// Racine d'abord, puis ordre alphabétique : un fichier lisible et stable d'un
// build à l'autre, donc un diff qui ne bouge que sur un vrai changement.
urls.sort((a, b) => {
  if (a.loc === `${SITE}/`) return -1;
  if (b.loc === `${SITE}/`) return 1;
  return a.loc.localeCompare(b.loc);
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map((u) => {
    const alt = Object.entries(u.alternates || {})
      .map(([l, href]) => `<xhtml:link rel="alternate" hreflang="${l}" href="${href}"/>`)
      .join('');
    return `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod>${alt}</url>`;
  })
  .join('\n')}
</urlset>
`;

writeFileSync(OUT, xml);
console.log(`Sitemap de ${urls.length} pages → public/sitemap.xml`);
