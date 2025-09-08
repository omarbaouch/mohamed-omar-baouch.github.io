import fs from 'fs-extra';
import path from 'path';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import { extract } from '@extractus/article-extractor';
import { pipeline } from '@xenova/transformers';

dayjs.extend(utc);

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const ROOT = path.resolve(__dirname, '..');
const CACHE_DIR = path.join(ROOT, '.cache');
const META_DIR = path.join(ROOT, 'blog_meta');

function extractKeywords(text) {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(Boolean);
  const stop = new Set(['the','and','for','with','that','this','from','have','has','will','your','about','into','more','than','their','them','when','were','what','which','while','where','your','then','they','just','also']);
  const freq = {};
  for (const w of words) {
    if (w.length > 3 && !stop.has(w)) freq[w] = (freq[w] || 0) + 1;
  }
  return Object.entries(freq)
    .sort((a,b) => b[1]-a[1])
    .slice(0,5)
    .map(([w]) => w);
}

function categorize(text) {
  const cats = [];
  const lower = text.toLowerCase();
  if (lower.includes('pdm')) cats.push('PDM');
  if (lower.includes('plm')) cats.push('PLM');
  if (lower.includes('solidworks')) cats.push('SolidWorks');
  if (lower.includes('cad')) cats.push('CAD');
  if (cats.length === 0) cats.push('General');
  return cats;
}

async function main() {
  const now = dayjs.utc();
  const dateStr = now.format('YYYY-MM-DD');
  const itemsPath = path.join(CACHE_DIR, `${dateStr}-items.json`);
  if (!await fs.pathExists(itemsPath)) {
    console.error(`Items file not found: ${itemsPath}`);
    return;
  }
  const items = await fs.readJson(itemsPath);

  const summarizer = await pipeline('summarization', 'Xenova/distilbart-cnn-6-6');

  const meta = {};
  for (const item of items) {
    try {
      const article = await extract(item.link);
      const text = article?.content || article?.description || '';
      if (!text) continue;
      const result = await summarizer(text, { max_length: 130, min_length: 30, do_sample: false });
      const summary = result[0]?.summary_text || '';
      const keywords = extractKeywords(summary || text);
      const categories = categorize(summary || text);
      meta[item.link] = { summary, keywords, categories };
    } catch (err) {
      console.warn(`Failed to process ${item.link}: ${err.message}`);
    }
  }

  await fs.ensureDir(META_DIR);
  const metaPath = path.join(META_DIR, `${dateStr}.json`);
  await fs.writeJson(metaPath, meta, { spaces: 2 });
  console.log(`Saved metadata to ${metaPath}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
