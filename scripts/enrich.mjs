// omarbaouch/mohamed-omar-baouch.github.io/scripts/enrich.mjs
import fs from 'fs-extra';
import path from 'path';
import dayjs from 'dayjs';
import { extract } from '@extractus/article-extractor';
import { pipeline } from '@xenova/transformers';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const ROOT = path.resolve(__dirname, '..');
const META_DIR = path.join(ROOT, 'blog_meta');
const CACHE_DIR = path.join(ROOT, '.cache');

const STOP = new Set([
  'the','a','an','and','or','of','to','in','on','for','with','by','from','at','as','is','are','be','this','that','it','its','into','your','you','we','our',
  'le','la','les','un','une','des','et','ou','de','du','dans','sur','pour','par','depuis','au','aux','en','est','etait','sont','ce','cette','ses'
]);

function keywords(text, k = 6) {
  const freq = new Map();
  text.toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu,' ')
      .split(/\s+/)
      .filter(w => w && w.length > 2 && !STOP.has(w))
      .forEach(w => freq.set(w, (freq.get(w)||0) + 1));
  return [...freq.entries()].sort((a,b) => b[1]-a[1]).slice(0,k).map(([w]) => w);
}

function categories(text) {
  const t = text.toLowerCase();
  const cats = new Set();
  if (/(solidworks|swx|dassault)/.test(t)) cats.add('SolidWorks');
  if (/\bpdm\b/.test(t)) cats.add('PDM');
  if (/\bplm\b/.test(t)) cats.add('PLM');
  if (/teamcenter|siemens/.test(t)) cats.add('Teamcenter');
  if (/openbom/.test(t)) cats.add('OpenBOM');
  if (/cimdata/.test(t)) cats.add('CIMdata');
  if (/workflow|approval|ecm|change request|change control/.test(t)) cats.add('Process');
  if (/release|version|roadmap|update|nouveaut/.test(t)) cats.add('Release');
  return [...cats];
}

async function safeFetchAndExtract(link) {
  try {
    const article = await extract(link, { timeout: 15000 });
    return {
      content: (article?.content || article?.text || '').trim(),
      image: article?.image || ''
    };
  } catch {
    return { content: '', image: '' };
  }
}

async function main() {
  await fs.ensureDir(META_DIR);
  const dateStr = dayjs().format('YYYY-MM-DD');
  const busPath = path.join(CACHE_DIR, `${dateStr}-items.json`);
  if (!await fs.pathExists(busPath)) {
    console.log('⚠️  No cached items for today.');
    return;
  }
  const items = await fs.readJson(busPath);
  const enriched = [];
  for (const item of items) {
    const { content, image } = await safeFetchAndExtract(item.link);
    const sum = ''; // Le résumé est désactivé
    const keys = keywords((content || item.title || '').slice(0, 4000));
    const cats = categories(content || item.title || '');
    enriched.push({ ...item, summary: sum, image, keywords: keys, categories: cats });
    await new Promise(r => setTimeout(r, 500));
  }
  const metaPath = path.join(META_DIR, `${dateStr}.json`);
  await fs.writeJson(metaPath, { date: dateStr, items: enriched }, { spaces: 2 });
  console.log(`✅ Enrich meta written: ${metaPath}`);
}

main().catch(err => { console.error(err); process.exit(1); });
