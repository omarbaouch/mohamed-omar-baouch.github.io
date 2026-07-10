// Snapshot et diff des données SEO critiques (title, meta, canonical, OG, JSON-LD, h1)
// pour toutes les pages indexables. Usage :
//   node scripts/check-seo.mjs snapshot <dirRacine> <fichierSortie.json>
//   node scripts/check-seo.mjs compare  <dirRacine> <baseline.json>
// `compare` sort avec un code d'erreur si une différence est détectée.
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, relative, sep } from 'node:path';
import fg from 'fast-glob';
import * as cheerio from 'cheerio';

const [, , mode, rootArg, fileArg] = process.argv;
if (!mode || !rootArg || !fileArg) {
  console.error('Usage: check-seo.mjs <snapshot|compare> <dirRacine> <fichier.json>');
  process.exit(2);
}
const root = resolve(rootArg);

const pages = fg.sync(['index.html', 'blog/index.html', 'blog/*/index.html'], {
  cwd: root,
  ignore: ['OLD/**', 'node_modules/**'],
}).sort();

function extract(file) {
  const html = readFileSync(resolve(root, file), 'utf8');
  const $ = cheerio.load(html);
  const meta = (sel) => $(sel).attr('content') ?? null;
  const jsonld = $('script[type="application/ld+json"]')
    .map((_, el) => {
      try {
        const data = JSON.parse($(el).text());
        return Array.isArray(data) ? data.map((d) => d['@type']).join(',') : data['@type'] ?? null;
      } catch {
        return 'PARSE_ERROR';
      }
    })
    .get();
  return {
    title: $('title').first().text().trim() || null,
    description: meta('meta[name="description"]'),
    canonical: $('link[rel="canonical"]').attr('href') ?? null,
    robots: meta('meta[name="robots"]'),
    ogTitle: meta('meta[property="og:title"]'),
    ogDescription: meta('meta[property="og:description"]'),
    ogUrl: meta('meta[property="og:url"]'),
    ogImage: meta('meta[property="og:image"]'),
    ogType: meta('meta[property="og:type"]'),
    twitterTitle: meta('meta[name="twitter:title"]'),
    twitterDescription: meta('meta[name="twitter:description"]'),
    jsonldTypes: jsonld,
    h1: $('h1').first().text().replace(/\s+/g, ' ').trim() || null,
    lang: $('html').attr('lang') ?? null,
  };
}

const snapshot = {};
for (const file of pages) {
  const url = '/' + relative(root, resolve(root, file)).split(sep).join('/').replace(/index\.html$/, '');
  snapshot[url] = extract(file);
}

if (mode === 'snapshot') {
  writeFileSync(fileArg, JSON.stringify(snapshot, null, 2) + '\n');
  console.log(`Snapshot SEO de ${pages.length} pages → ${fileArg}`);
  process.exit(0);
}

if (mode === 'compare') {
  const baseline = JSON.parse(readFileSync(fileArg, 'utf8'));
  const problems = [];
  for (const [url, base] of Object.entries(baseline)) {
    const now = snapshot[url];
    if (!now) {
      problems.push(`PAGE MANQUANTE : ${url}`);
      continue;
    }
    for (const key of Object.keys(base)) {
      const a = JSON.stringify(base[key]);
      const b = JSON.stringify(now[key]);
      if (a !== b) problems.push(`${url} → ${key}\n  avant : ${a}\n  après : ${b}`);
    }
  }
  for (const url of Object.keys(snapshot)) {
    if (!baseline[url]) problems.push(`PAGE NOUVELLE (non présente dans la baseline) : ${url}`);
  }
  if (problems.length) {
    console.error(`✗ ${problems.length} divergence(s) SEO :\n\n${problems.join('\n\n')}`);
    process.exit(1);
  }
  console.log(`✓ SEO identique à la baseline sur ${pages.length} pages.`);
  process.exit(0);
}

console.error(`Mode inconnu : ${mode}`);
process.exit(2);
