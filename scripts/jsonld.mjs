// Génère et injecte les données structurées schema.org des pages blog.
// Chaque article reçoit un BlogPosting + un BreadcrumbList, et une FAQPage
// lorsqu'il contient une section FAQ (les questions sont lues dans le HTML,
// jamais inventées). Le listing reçoit un CollectionPage + BreadcrumbList.
// Usage : node scripts/jsonld.mjs [--force]
//   sans --force, une page qui possède déjà un bloc ld+json est laissée telle quelle.
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import fg from 'fast-glob';
import * as cheerio from 'cheerio';

const ROOT = resolve(import.meta.dirname, '..');
const SITE = 'https://baouch.fr';
const AUTHOR = {
  '@type': 'Person',
  name: 'Mohamed Omar Baouch',
  url: SITE,
  jobTitle: 'Ingénieur & Consultant PDM/PLM',
};
const force = process.argv.includes('--force');
const ANCHOR = '    {{> head-fonts }}';

// Le texte français d'un élément bilingue : <span data-lang="fr"> quand il existe,
// sinon le texte tel quel (les articles les plus anciens ne sont pas balisés).
function frText($, el) {
  const node = $(el);
  const fr = node.find('[data-lang="fr"]');
  const text = (fr.length ? fr : node).text();
  return text.replace(/\s+/g, ' ').trim();
}

function buildGraph(file, $) {
  const meta = (sel) => $(sel).attr('content')?.trim() || null;
  const canonical = $('link[rel="canonical"]').attr('href');
  if (!canonical) throw new Error(`${file} : pas de canonical`);

  const isListing = basename(dirname(file)) === 'blog';
  const headline = meta('meta[property="og:title"]') || frText($, $('h1').first());
  const description = meta('meta[name="description"]');
  const image = meta('meta[property="og:image"]');
  const published = meta('meta[property="article:published_time"]');

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog/` },
    ],
  };

  if (isListing) {
    return [
      {
        '@type': 'CollectionPage',
        name: headline,
        description,
        url: canonical,
        inLanguage: 'fr-FR',
        isPartOf: { '@type': 'WebSite', name: 'Mohamed Omar Baouch', url: `${SITE}/` },
        author: AUTHOR,
      },
      breadcrumb,
    ];
  }

  breadcrumb.itemListElement.push({
    '@type': 'ListItem',
    position: 3,
    name: headline,
    item: canonical,
  });

  const date = published ? published.slice(0, 10) : null;
  const keywords = $('.article-tag')
    .map((_, el) => frText($, el))
    .get()
    .filter(Boolean);

  const posting = {
    '@type': 'BlogPosting',
    headline,
    description,
    ...(image ? { image } : {}),
    ...(date ? { datePublished: date, dateModified: date } : {}),
    inLanguage: 'fr-FR',
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    author: AUTHOR,
    publisher: { '@type': 'Person', name: AUTHOR.name, url: SITE },
    ...(keywords.length ? { keywords } : {}),
  };

  const graph = [posting, breadcrumb];

  // DefinedTermSet : les pages de glossaire, dont les sections portent
  // data-glossary et alignent un <h3> terme suivi de sa définition.
  const glossaire = $('[data-glossary]');
  if (glossaire.length) {
    const terms = [];
    glossaire.find('h3').each((_, h3) => {
      const name = frText($, h3);
      const def = $(h3).nextAll('p').first();
      if (!name || !def.length) return;
      const description = frText($, def);
      if (description) terms.push({ '@type': 'DefinedTerm', name, description, inDefinedTermSet: canonical });
    });
    if (terms.length) {
      graph.push({
        '@type': 'DefinedTermSet',
        '@id': canonical,
        name: headline,
        description,
        inLanguage: 'fr-FR',
        hasDefinedTerm: terms,
      });
    }
  }

  // FAQPage : uniquement si l'article contient réellement une section FAQ.
  const faq = $('#faq');
  if (faq.length) {
    const questions = [];
    faq.find('h3').each((_, h3) => {
      const name = frText($, h3);
      const answer = $(h3).nextAll('p').first();
      if (!name || !answer.length) return;
      const text = frText($, answer);
      if (text) questions.push({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } });
    });
    if (questions.length) graph.push({ '@type': 'FAQPage', mainEntity: questions });
  }

  return graph;
}

const files = fg
  .sync(['blog/index.html', 'blog/*/index.html'], { cwd: resolve(ROOT, 'src') })
  .map((f) => resolve(ROOT, 'src', f))
  .sort();

let injected = 0;
let skipped = 0;
for (const file of files) {
  let html = readFileSync(file, 'utf8');
  const already = /<script type="application\/ld\+json">/.test(html);
  if (already && !force) {
    skipped += 1;
    continue;
  }
  const $ = cheerio.load(html);
  const graph = buildGraph(file, $);
  const block =
    '    <script type="application/ld+json">\n    ' +
    JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 4).replace(/\n/g, '\n    ') +
    '\n    </script>\n';

  if (already) {
    html = html.replace(/[ \t]*<script type="application\/ld\+json">[\s\S]*?<\/script>\n/, block);
  } else {
    if (!html.includes(ANCHOR)) throw new Error(`${file} : ancre {{> head-fonts }} introuvable`);
    html = html.replace(ANCHOR, block + ANCHOR);
  }
  writeFileSync(file, html);
  injected += 1;
  console.log('ld+json:', file.replace(ROOT + '/', ''), graph.map((g) => g['@type']).join(' + '));
}
console.log(`\n${injected} page(s) écrite(s), ${skipped} déjà pourvue(s).`);
