// Version anglaise indexable : /en/… généré à la fin du build depuis les pages
// françaises déjà construites (dist/). Jusqu'ici l'anglais n'existait que par
// bascule côté client sur les URL françaises : invisible pour les moteurs, donc
// sans aucune chance sur le marché anglophone, bien plus large.
//
// Une page a sa version anglaise si elle figure dans src/i18n/pages-en.json (titre
// et description anglais, rédigés pour les requêtes anglaises) ; son texte anglais
// est déjà dans la page (spans data-lang="en", clés data-translate-key de en.json).
// Pour chacune :
//   · dist/en/<chemin>/index.html : <html lang="en">, textes français retirés, clés
//     traduites, métadonnées et JSON-LD anglais, canonical vers /en/…, liens
//     internes vers les pages anglaises quand elles existent ;
//   · sur les deux versions : hreflang fr / en / x-default (le français).
// Les pages sans version anglaise ne changent pas (bascule côté client, comme avant).
// Appelé par le plugin « english-pages » de vite.config.js, après l'écriture de dist/.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import * as cheerio from 'cheerio';

const ROOT = resolve(import.meta.dirname, '..');
export const SITE = 'https://www.baouch.fr';
export const PAGES_EN = JSON.parse(readFileSync(resolve(ROOT, 'src/i18n/pages-en.json'), 'utf8'));
const DICT_EN = JSON.parse(readFileSync(resolve(ROOT, 'src/i18n/en.json'), 'utf8'));
// étiquettes, options de calculateur, textes alternatifs : sans span bilingue dans les pages
const STRINGS_EN = JSON.parse(readFileSync(resolve(ROOT, 'src/i18n/strings-en.json'), 'utf8'));

export const enPath = (path) => '/en' + path;
const hasEn = (path) => Object.hasOwn(PAGES_EN, path);
const file = (dist, path) => resolve(dist, '.' + path, 'index.html');

// textes français récurrents des données structurées
const JSONLD_FR_EN = {
  Accueil: 'Home',
  'Ingénieur & Consultant PDM/PLM': 'PDM/PLM Engineer & Consultant',
  'Gestion du cycle de vie produit': 'Product lifecycle management',
  'Conception Mécanique': 'Mechanical design',
};

export function alternates(path) {
  return [
    `<link rel="alternate" hreflang="fr" href="${SITE}${path}">`,
    `<link rel="alternate" hreflang="en" href="${SITE}${enPath(path)}">`,
    `<link rel="alternate" hreflang="x-default" href="${SITE}${path}">`,
  ].join('\n    ');
}

const norm = (s) => String(s ?? '').replace(/\s+/g, ' ').trim();
// lien interne → sa version anglaise si elle existe (chemin, ancre et requête conservés)
function localize(href) {
  const m = href.match(/^(https?:\/\/(?:www\.)?baouch\.fr)?(\/[^#?]*)?([?#].*)?$/);
  if (!m || href.startsWith('//') || (!m[1] && !m[2])) return null;
  const path = m[2] || '/';
  if (!hasEn(path)) return null;
  return (m[1] ? SITE : '') + enPath(path) + (m[3] || '');
}

// les intertitres h3 bilingues → { titre anglais, texte anglais qui suit } : sert
// à traduire les questions de FAQ et les termes du glossaire du JSON-LD
function headingIndex($) {
  const index = new Map();
  $('main h3[data-i18n]').each((_, h) => {
    const fr = norm($(h).find('[data-lang="fr"]').text());
    const en = norm($(h).find('[data-lang="en"]').text());
    if (!fr || !en) return;
    const parts = [];
    let n = $(h).next();
    while (n.length && !/^h[1-4]$/i.test(n[0].tagName)) {
      const t = norm(n.find('[data-lang="en"]').addBack('[data-lang="en"]').map((_, e) => $(e).text()).get().join(' '));
      if (t) parts.push(t);
      n = n.next();
    }
    index.set(fr, { name: en, text: parts.join(' ') });
  });
  return index;
}

function translateJsonLd(data, ctx) {
  const { path, meta, h1, headings, warn } = ctx;
  const enUrl = SITE + enPath(path);
  const walk = (v) => {
    if (Array.isArray(v)) return v.map(walk).filter((x) => x !== undefined);
    if (v && typeof v === 'object') {
      const t = v['@type'];
      const o = {};
      for (const [k, val] of Object.entries(v)) o[k] = walk(val);
      if (o.inLanguage) o.inLanguage = 'en-US';
      if (t === 'BlogPosting') {
        o.headline = h1 || meta.title;
        o.description = meta.description;
        delete o.keywords;
      }
      if (t === 'CollectionPage') { o.name = meta.title; o.description = meta.description; }
      if (t === 'ListItem') {
        const item = typeof v.item === 'string' ? v.item : null;
        if (item && localize(item)) o.item = localize(item);
        if (item && norm(item) === SITE + path && path !== '/' && path !== '/blog/') o.name = h1 || meta.title;
      }
      if (t === 'BreadcrumbList' && Array.isArray(o.itemListElement) && path.startsWith('/blog/') && path !== '/blog/') {
        const last = o.itemListElement[o.itemListElement.length - 1];
        if (last && !last.item) last.name = h1 || meta.title;
      }
      if (t === 'Question' || t === 'DefinedTerm') {
        const hit = headings.get(norm(v.name));
        if (!hit) { warn(`${t} sans équivalent anglais : ${v.name}`); return undefined; }
        o.name = hit.name;
        if (t === 'Question') o.acceptedAnswer = { ...o.acceptedAnswer, text: hit.text };
        else o.description = hit.text;
      }
      if (t === 'DefinedTermSet') { o.name = meta.title; o.description = meta.description; }
      return o;
    }
    if (typeof v === 'string') {
      // seule l'adresse de la page elle-même change : l'identité (auteur, site) reste celle du site
      if (v === SITE + path) return enUrl;
      return JSONLD_FR_EN[v] ?? v;
    }
    return v;
  };
  return walk(data);
}

export function buildEnglishPages(dist) {
  const warnings = [];
  const done = [];
  for (const [path, meta] of Object.entries(PAGES_EN)) {
    const src = file(dist, path);
    if (!existsSync(src)) throw new Error(`build-en : ${path} est dans pages-en.json mais absente de dist/`);
    const html = readFileSync(src, 'utf8');
    const warn = (m) => warnings.push(`${path} : ${m}`);

    // --- la page française reçoit ses alternatives (insertion textuelle : rien d'autre ne bouge)
    if (!/<meta charset="utf-8">/i.test(html)) throw new Error(`build-en : ${path} sans <meta charset="utf-8">`);
    const withAlt = (h) => h.replace(/<meta charset="utf-8">/i, (m) => `${m}\n    ${alternates(path)}`);
    writeFileSync(src, withAlt(html).replace(/<html lang="fr"/, '<html lang="fr" data-page-lang="fr"'));

    // --- la page anglaise
    const $ = cheerio.load(withAlt(html));
    $('html').attr('lang', 'en').attr('data-page-lang', 'en');
    // avant de retirer le français : il sert de clé pour traduire FAQ et glossaire
    const headings = headingIndex($);
    $('[data-i18n] [data-lang="fr"]').remove();
    $('[data-translate-key]').each((_, el) => {
      const v = DICT_EN[el.attribs['data-translate-key']];
      if (typeof v === 'string') $(el).html(v);
    });
    $('[data-cv-link]').attr('href', DICT_EN.cv_file || '/BAOUCH_CV_EN.pdf');
    $('body *').not('script,style,svg *').contents().each((_, n) => {
      if (n.type !== 'text') return;
      const t = n.data.trim();
      if (Object.hasOwn(STRINGS_EN.text, t)) n.data = n.data.replace(t, STRINGS_EN.text[t]);
      else if (t.includes('RÉV.')) n.data = n.data.replace(/RÉV\./g, 'REV.');
    });
    $('[alt], [aria-label], [title], [placeholder]').each((_, el) => {
      for (const a of ['alt', 'aria-label', 'title', 'placeholder']) {
        const v = el.attribs[a];
        if (v && Object.hasOwn(STRINGS_EN.attr, v)) el.attribs[a] = STRINGS_EN.attr[v];
      }
    });
    // affiches du hero : la version anglaise directement (le script en ligne fait de même côté client)
    $('.fh-poster source, .fh-poster img').each((_, el) => {
      for (const a of ['src', 'srcset']) if (el.attribs[a]) el.attribs[a] = el.attribs[a].replace(/\/film\/hero\/(?!en\/)/g, '/film/hero/en/');
    });
    $('a[href]').each((_, a) => {
      const to = localize(a.attribs.href);
      if (to) a.attribs.href = to;
    });

    const url = SITE + enPath(path);
    $('title').text(meta.title);
    $('meta[name="keywords"]').remove();
    const setMeta = (sel, attr, key, value) => {
      if ($(sel).length) $(sel).attr('content', value);
      else $('title').after($('<meta>').attr(attr, key).attr('content', value));
    };
    setMeta('meta[name="description"]', 'name', 'description', meta.description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', meta.title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', meta.description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);
    setMeta('meta[property="og:locale"]', 'property', 'og:locale', 'en_US');
    if ($('meta[name="twitter:title"]').length) $('meta[name="twitter:title"]').attr('content', meta.title);
    if ($('meta[name="twitter:description"]').length) $('meta[name="twitter:description"]').attr('content', meta.description);
    if ($('link[rel="canonical"]').length) $('link[rel="canonical"]').attr('href', url);
    else $('title').after($('<link>').attr('rel', 'canonical').attr('href', url));

    const h1 = norm($('h1').first().text());
    $('script[type="application/ld+json"]').each((_, el) => {
      const data = JSON.parse($(el).text());
      $(el).text(`\n    ${JSON.stringify(translateJsonLd(data, { path, meta, h1, headings, warn }), null, 4).replace(/\n/g, '\n    ')}\n    `);
    });

    const out = file(dist, enPath(path));
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, $.html());
    done.push(path);
  }
  return { pages: done, warnings };
}
