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

async function safeFetchArticle(link) {
  try {
    const art = await extract(link, { timeout: 15000 });
    const txt = (art?.content || art?.text || '').trim();
    return txt.length > 6000 ? txt.slice(0,6000) : txt;
  } catch {
    return '';
  }
}

async function summarize(text) {
    // Cette fonction n'est plus utilisée mais conservée au cas où.
    if (!text || text.length < 400) return '';
    const summarizer = await pipeline('summarization', 'Xenova/distilbart-cnn-6-6');
    const chunk = text.slice(0,2500);
    const out = await summarizer(chunk, { max_length: 90, min_length: 45, do_sample: false });
    return (Array.isArray(out) ? out[0]?.summary_text : out?.summary_text || '').trim();
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
    const raw = await safeFetchArticle(item.link);
    // MODIFICATION : L'appel à summarize a été remplacé par une chaîne vide.
    const sum = ''; 
    const keys = keywords((raw || item.title || '').slice(0,4000));
    const cats = categories(raw || item.title || '');
    enriched.push({ ...item, summary: sum, keywords: keys, categories: cats });
    await new Promise(r => setTimeout(r, 500));
  }
  const metaPath = path.join(META_DIR, `${dateStr}.json`);
  await fs.writeJson(metaPath, { date: dateStr, items: enriched }, { spaces: 2 });
  console.log(`✅ Enrich meta written: ${metaPath}`);
}

main().catch(err => { console.error(err); process.exit(1); });
