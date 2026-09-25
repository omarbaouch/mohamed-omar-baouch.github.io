// Index du carnet technique dans le pied de page : chaque article et chaque
// étude de cas reçoit un lien depuis toutes les pages du site — le signal le
// plus simple pour que les moteurs découvrent et réexplorent chaque page.
// La liste est régénérée entre les marqueurs de src/partials/footer.hbs :
// un article publié est un article lié, sans rien tenir à la main.
// Titres : ceux des cartes de /blog/ (courts), sinon og:title.
// Lancé automatiquement avant chaque build — voir le script "prebuild".
// Usage : node scripts/footer-index.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import fg from 'fast-glob';
import * as cheerio from 'cheerio';

const ROOT = resolve(import.meta.dirname, '..');
const PARTIAL = resolve(ROOT, 'src/partials/footer.hbs');
const DEBUT = '<!-- index:debut -->';
const FIN = '<!-- index:fin -->';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

// titres courts des cartes de l'index du blog
const $blog = cheerio.load(readFileSync(resolve(ROOT, 'src/blog/index.html'), 'utf8'));
const courts = new Map();
$blog('.article-card__title a, .article-featured__title a').each((_, a) => {
  const fr = $blog(a).find('[data-lang="fr"]').first().text().trim() || $blog(a).text().trim();
  courts.set($blog(a).attr('href'), fr);
});

const pages = fg
  .sync(['blog/*/index.html', 'projets/*/index.html'], { cwd: resolve(ROOT, 'src') })
  .map((file) => {
    const $ = cheerio.load(readFileSync(resolve(ROOT, 'src', file), 'utf8'));
    const href = '/' + file.replace(/index\.html$/, '');
    const titre = courts.get(href) || $('meta[property="og:title"]').attr('content') || $('title').text();
    const date = $('meta[property="article:published_time"]').attr('content') || '';
    return { href, titre: titre.trim(), date, projet: file.startsWith('projets/') };
  })
  // études de cas d'abord, puis articles du plus récent au plus ancien
  .sort((a, b) => b.projet - a.projet || b.date.localeCompare(a.date) || a.href.localeCompare(b.href));

const liste = pages
  .map((p) => `          <li><a href="${p.href}">${esc(p.titre)}</a></li>`)
  .join('\n');

const partial = readFileSync(PARTIAL, 'utf8');
const i = partial.indexOf(DEBUT);
const j = partial.indexOf(FIN);
if (i < 0 || j < 0) throw new Error('Marqueurs index:debut / index:fin absents de src/partials/footer.hbs');
const suivant = `${partial.slice(0, i + DEBUT.length)}\n${liste}\n          ${partial.slice(j)}`;
if (suivant !== partial) writeFileSync(PARTIAL, suivant);
console.log(`Index du pied de page : ${pages.length} pages liées`);
