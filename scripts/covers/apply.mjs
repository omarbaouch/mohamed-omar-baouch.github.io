// Pose les couvertures (planches de dessin technique) dans les pages françaises :
//   · la carte de chaque article dans /blog/ (et donc « À la une », rendue depuis la carte) ;
//   · la figure d'ouverture de l'article, quand il en a une (première figure après l'en-tête).
// Textes alternatifs : src/i18n/covers.json. Les pages anglaises reçoivent les versions
// anglaises au build (scripts/build-en.mjs). Idempotent : relançable sans effet de bord.
// Usage : node scripts/covers/apply.mjs
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '../..');
const COVERS = JSON.parse(readFileSync(resolve(ROOT, 'src/i18n/covers.json'), 'utf8'));
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const img = (slug, attrs) => {
  const base = `/img/blog/covers/${slug}`;
  if (!existsSync(resolve(ROOT, `public${base}-800.webp`))) throw new Error(`couverture absente : ${slug} (lancer scripts/covers/render.mjs)`);
  return attrs
    .replace(/ src="[^"]*"/, ` src="${base}-${attrs.includes('-1600.webp"') ? 1600 : 800}.webp"`)
    .replace(/ srcset="[^"]*"/, ` srcset="${base}-800.webp 800w, ${base}-1600.webp 1600w"`)
    .replace(/ alt="[^"]*"/, ` alt="${esc(COVERS[slug][0])}"`);
};

let cards = 0, figures = 0;
// cartes de l'index du blog
const hubPath = resolve(ROOT, 'src/blog/index.html');
const hub = readFileSync(hubPath, 'utf8').replace(/<article class="article-card[\s\S]*?<\/article>/g, (card) => {
  const slug = card.match(/href="\/blog\/([^/"]+)\/"/)?.[1];
  if (!slug || !COVERS[slug]) return card;
  cards++;
  return card.replace(/<img [^>]*>/, (tag) => img(slug, tag));
});
writeFileSync(hubPath, hub);

// figure d'ouverture des articles
for (const slug of Object.keys(COVERS).filter((k) => !k.startsWith('_'))) {
  const p = resolve(ROOT, 'src/blog', slug, 'index.html');
  const html = readFileSync(p, 'utf8');
  const end = html.indexOf('</header>');
  const fig = html.indexOf('<figure class="article-figure">', end);
  const firstSection = html.indexOf('<section', end);
  if (end < 0 || fig < 0 || (firstSection >= 0 && fig > firstSection)) continue;
  const close = html.indexOf('</figure>', fig);
  const block = html.slice(fig, close).replace(/<img [^>]*>/, (tag) => img(slug, tag));
  writeFileSync(p, html.slice(0, fig) + block + html.slice(close));
  figures++;
}
console.log(`Couvertures : ${cards} cartes, ${figures} figures d'ouverture`);
