// Index du blog (/blog/) tenu à jour à partir des articles eux-mêmes :
//  · le compteur « Articles de fond » = le nombre de pages d'article ;
//  · les cartes de la grille sont triées par date de publication (la plus récente d'abord) ;
//  · « À la une » = l'article le plus récent, rendu à partir de sa carte.
// Sa carte reste dans la grille (marquée data-une) : masquée en « Tous » pour ne pas
// doubler le bloc, visible quand on filtre sa catégorie.
// La date vient de article:published_time de chaque page. Une carte se rédige une
// fois, à la publication : le reste suit sans rien tenir à la main.
// Lancé automatiquement avant chaque build — voir le script "prebuild".
// Usage : node scripts/blog-hub.mjs
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import fg from 'fast-glob';

const ROOT = resolve(import.meta.dirname, '..');
const HUB = resolve(ROOT, 'src/blog/index.html');
let html = readFileSync(HUB, 'utf8');

const between = (start, end) => {
  const a = html.indexOf(start), b = html.indexOf(end);
  if (a < 0 || b < a) throw new Error(`blog-hub : marqueurs ${start} / ${end} introuvables dans src/blog/index.html`);
  // du début de la ligne qui suit le marqueur d'ouverture au début de la ligne du marqueur de fin
  return [a + html.slice(a).indexOf('\n') + 1, html.lastIndexOf('\n', b) + 1];
};

const published = (href) => {
  const file = resolve(ROOT, 'src', href.replace(/^\//, ''), 'index.html');
  if (!existsSync(file)) throw new Error(`blog-hub : carte vers ${href}, page absente`);
  const m = readFileSync(file, 'utf8').match(/property="article:published_time" content="([^"]+)"/);
  if (!m) throw new Error(`blog-hub : ${href} sans article:published_time`);
  return new Date(m[1]);
};

// ---- la grille, triée
const [g0, g1] = between('<!-- grille:debut', '<!-- grille:fin');
const cards = [...html.slice(g0, g1).matchAll(/[ \t]*<article class="article-card[\s\S]*?<\/article>\n/g)].map((m, i) => {
  const text = m[0]
    .replace(/<article class="article-card[^"]*"/, '<article class="article-card"')
    .replace(/ data-une=""| data-une/, '');
  const href = text.match(/href="(\/blog\/[^"]+)"/)[1];
  return { text, href, i, date: published(href) };
});
const pages = fg.sync('blog/*/index.html', { cwd: resolve(ROOT, 'src') }).map((f) => `/${f.replace(/index\.html$/, '')}`);
const missing = pages.filter((p) => !cards.some((c) => c.href === p));
if (missing.length) throw new Error(`blog-hub : article(s) sans carte dans /blog/ : ${missing.join(', ')}`);

cards.sort((a, b) => b.date - a.date || a.i - b.i);
const une = cards[0];
une.text = une.text.replace('<article class="article-card"', '<article class="article-card is-hidden" data-une');
html = html.slice(0, g0) + cards.map((c) => c.text).join('') + html.slice(g1);

// ---- « À la une », rendu depuis la carte
const pick = (re) => {
  const m = une.text.match(re);
  if (!m) throw new Error(`blog-hub : carte ${une.href} incomplète (${re})`);
  return m[1];
};
// étiquette simple (« MÉMO ») ou bilingue (<span data-lang="fr">…</span><span data-lang="en">…</span>)
const [, catI18n = '', cat] = une.text.match(/article-card__cat"( data-i18n="")?>((?:<span data-lang="[a-z]+">[^<]*<\/span>)+|[^<]*)<\/span>/) || [];
if (cat == null) throw new Error(`blog-hub : carte ${une.href} sans catégorie lisible`);
// durée de lecture seulement si la vignette l'indique en minutes (« 73 termes » sur le glossaire)
const time = une.text.match(/article-card__time">(\d+) min</)?.[1];
const img = pick(/(<img [^>]*>)/)
  .replace(/src="([^"]*)-800\.webp"/, 'src="$1-1600.webp"')
  .replace(/sizes="[^"]*"/, 'sizes="(min-width: 64rem) 1216px, 100vw"');
const date = pick(/article-card__date" data-i18n="">([\s\S]*?)<\/span>\s*<h3/);
const title = pick(/article-card__title"><a [^>]*>([\s\S]*?)<\/a><\/h3>/);
const excerpt = pick(/article-card__excerpt" data-i18n="">([\s\S]*?)<\/p>/);
const I = '                    ';
const featured = `${I}<div class="article-featured">
${I}    <div class="article-featured__media">
${I}        <span class="article-featured__flag" data-i18n=""><span data-lang="fr">★ À la une</span><span data-lang="en">★ Featured</span></span>
${I}        ${img}
${I}    </div>
${I}    <div class="article-featured__body">
${I}        <span class="article-featured__eyebrow"${catI18n}>${cat}</span>
${I}        <h2 class="article-featured__title"><a href="${une.href}" data-i18n="">${title}</a></h2>
${I}        <p class="article-featured__excerpt" data-i18n="">${excerpt}</p>
${I}        <div class="article-featured__meta">
${I}            <span data-i18n="">${date}</span>${time ? `
${I}            <span class="dot"></span>
${I}            <span data-i18n=""><span data-lang="fr">${time} min de lecture</span><span data-lang="en">${time} min read</span></span>` : ''}
${I}        </div>
${I}        <a class="article-featured__cta" href="${une.href}" data-i18n=""><span data-lang="fr">Lire l'article</span><span data-lang="en">Read the article</span> <span class="arrow" aria-hidden="true">→</span></a>
${I}    </div>
${I}</div>
`;
const [u0, u1] = between('<!-- une:debut', '<!-- une:fin');
html = html.slice(0, u0) + featured + html.slice(u1);

// ---- compteur
const count = /(<span class="hero-stat-value" data-compte="articles">)\d+(<\/span>)/;
if (!count.test(html)) throw new Error('blog-hub : compteur data-compte="articles" introuvable');
html = html.replace(count, `$1${pages.length}$2`);

writeFileSync(HUB, html);
console.log(`Blog : ${pages.length} articles, à la une : ${une.href}`);
