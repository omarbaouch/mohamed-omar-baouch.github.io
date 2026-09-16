// Génère le flux RSS du blog à partir des articles sources (titre, description,
// canonical et date de publication lus dans les métadonnées de chaque page).
// Le flux est écrit dans public/, donc servi tel quel à /blog/rss.xml.
// Usage : node scripts/rss.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import fg from 'fast-glob';
import * as cheerio from 'cheerio';

const ROOT = resolve(import.meta.dirname, '..');
const SITE = 'https://baouch.fr';
const FEED_URL = `${SITE}/blog/rss.xml`;
const OUT = resolve(ROOT, 'public/blog/rss.xml');

const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const items = fg
  .sync('blog/*/index.html', { cwd: resolve(ROOT, 'src') })
  .map((file) => {
    const $ = cheerio.load(readFileSync(resolve(ROOT, 'src', file), 'utf8'));
    const meta = (sel) => $(sel).attr('content')?.trim() || null;
    const link = $('link[rel="canonical"]').attr('href');
    const published = meta('meta[property="article:published_time"]');
    if (!link || !published) throw new Error(`${file} : canonical ou date de publication manquante`);
    return {
      link,
      title: meta('meta[property="og:title"]') || $('title').text().trim(),
      description: meta('meta[name="description"]'),
      image: meta('meta[property="og:image"]'),
      date: new Date(published),
    };
  })
  // le plus récent d'abord ; à date égale, ordre alphabétique stable
  .sort((a, b) => b.date - a.date || a.link.localeCompare(b.link));

const rfc822 = (d) => d.toUTCString();
const now = new Date();

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog — Guides PDM/PLM &amp; SOLIDWORKS | Mohamed Omar Baouch</title>
    <link>${SITE}/blog/</link>
    <description>Articles de fond et retours d'expérience terrain sur le PDM, le PLM, SOLIDWORKS et la gestion des données produit.</description>
    <language>fr-FR</language>
    <lastBuildDate>${rfc822(items[0]?.date ?? now)}</lastBuildDate>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml"/>
${items
  .map(
    (it) => `    <item>
      <title>${esc(it.title)}</title>
      <link>${esc(it.link)}</link>
      <guid isPermaLink="true">${esc(it.link)}</guid>
      <pubDate>${rfc822(it.date)}</pubDate>
      <description>${esc(it.description)}</description>${
        it.image ? `\n      <enclosure url="${esc(it.image)}" type="image/jpeg"/>` : ''
      }
    </item>`
  )
  .join('\n')}
  </channel>
</rss>
`;

mkdirSync(resolve(ROOT, 'public/blog'), { recursive: true });
writeFileSync(OUT, xml);
console.log(`Flux RSS de ${items.length} articles → public/blog/rss.xml`);
