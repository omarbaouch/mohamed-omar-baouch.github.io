// Contrôle de la version anglaise générée (dist/en/) : une page anglaise ne doit
// laisser passer ni texte ni métadonnée français, et les deux versions doivent se
// désigner mutuellement (hreflang, canonical).
// Usage : node scripts/check-en.mjs [dist]   — sort en erreur au premier défaut bloquant.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import * as cheerio from 'cheerio';
import { PAGES_EN, SITE, enPath } from './build-en.mjs';

const dist = resolve(process.argv[2] || 'dist');
// mots outils français : présents dans presque toute phrase française, rares en anglais
// (réglé sur les spans bilingues des articles : ~95 % des phrases françaises
// repérées, ~1 % de faux positifs sur les phrases anglaises)
const FR = /(?<![\p{L}])(le|la|les|des|du|de|un|une|et|est|pour|dans|avec|sur|qui|que|pas|vous|nous|aux|au|cette|ce|ces|leur|sont|être|été|à|où|par|plus|mais|ou|son|sa|ses|il|elle|ne|se|sans|chez|votre|vos)(?![\p{L}])/giu;
const frScore = (t) => {
  const hits = (t.match(FR) || []).length;
  return hits < 2 ? 0 : hits / Math.max(1, t.split(/\s+/).length);
};

let errors = 0, notes = 0;
const err = (p, m) => { errors++; console.log(`✗ ${p} : ${m}`); };
const note = (p, m) => { notes++; console.log(`· ${p} : ${m}`); };

for (const [path, meta] of Object.entries(PAGES_EN)) {
  const en = cheerio.load(readFileSync(resolve(dist, '.' + enPath(path), 'index.html'), 'utf8'));
  const fr = cheerio.load(readFileSync(resolve(dist, '.' + path, 'index.html'), 'utf8'));
  const p = enPath(path);

  if (en('html').attr('lang') !== 'en') err(p, 'html lang ≠ en');
  if (en('[data-lang="fr"]').length) err(p, `${en('[data-lang="fr"]').length} span(s) data-lang="fr" restants`);
  if (en('title').text() !== meta.title) err(p, 'title');
  if (en('link[rel="canonical"]').attr('href') !== SITE + p) err(p, 'canonical');
  if (en('meta[property="og:url"]').attr('content') !== SITE + p) err(p, 'og:url');
  for (const [$, label] of [[en, p], [fr, path]]) {
    const alt = (l) => $(`link[rel="alternate"][hreflang="${l}"]`).attr('href');
    if (alt('fr') !== SITE + path || alt('en') !== SITE + p || alt('x-default') !== SITE + path) err(label, 'hreflang');
  }
  if (fr('link[rel="canonical"]').attr('href') !== SITE + path) err(path, 'canonical de la page française');

  // données structurées : aucune chaîne française
  en('script[type="application/ld+json"]').each((_, el) => {
    const strings = [];
    const walk = (v) => (Array.isArray(v) ? v.forEach(walk) : v && typeof v === 'object' ? Object.values(v).forEach(walk) : typeof v === 'string' && strings.push(v));
    walk(JSON.parse(en(el).text()));
    strings.filter((s) => s.split(/\s+/).length > 3 && frScore(s) >= 0.12).forEach((s) => err(p, `JSON-LD en français : ${s.slice(0, 80)}`));
  });

  // textes alternatifs et libellés : un accent français signale un oubli dans strings-en.json
  en('[alt], [aria-label], [placeholder]').each((_, el) => {
    for (const a of ['alt', 'aria-label', 'placeholder']) {
      const v = el.attribs[a];
      if (v && /[éèêàùç]/i.test(v)) note(p, `${a} français ? « ${v.slice(0, 80)} »`);
    }
  });
  // libellés des schémas SVG : courts, donc repérés à l'accent plutôt qu'aux mots outils
  en('svg text, svg tspan').each((_, el) => {
    const t = en(el).text().trim();
    if (/[éèêàùç]/i.test(t) && !/RÉV\./.test(t)) note(p, `libellé SVG français ? « ${t.slice(0, 80)} »`);
  });
  // texte visible : signale les blocs qui ressemblent à du français
  en('script,style,svg,noscript,template').remove();
  const blocks = new Set();
  en('main p, main li, main h1, main h2, main h3, main td, main th, main figcaption, main a, main span').each((_, el) => {
    if (en(el).children('p,li,div,h2,h3,ul,ol,table').length) return;
    const t = en(el).text().replace(/\s+/g, ' ').trim();
    if (t.split(' ').length >= 5 && frScore(t) >= 0.12) blocks.add(t.slice(0, 100));
  });
  blocks.forEach((t) => note(p, `texte français ? « ${t} »`));
  en('main a[href^="/blog/"], main a[href="/"]').each((_, a) => {
    const href = en(a).attr('href').split('#')[0];
    if (Object.hasOwn(PAGES_EN, href)) err(p, `lien vers la version française : ${href}`);
  });
}
console.log(`\n${Object.keys(PAGES_EN).length} pages anglaises : ${errors} erreur(s), ${notes} texte(s) à vérifier`);
process.exit(errors ? 1 : 0);
