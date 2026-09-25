// Rend le film du hero en séquence d'images WebP (desktop 1440×810 et mobile 720×1280).
// Usage : node video/hero/render-hero.mjs [--variant desk|mob] [--frames 240] [--stills 0,0.5,1] [--workers 3]
// Le dépôt doit être servi à la racine : npx http-server -p 8090 -s -c-1 .
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const base = arg('--base', 'http://localhost:8090');
const variant = arg('--variant', 'desk');
const frames = +arg('--frames', variant === 'mob' ? 120 : 240);
const workers = +arg('--workers', 3);
const stills = arg('--stills', null);
const here = new URL('.', import.meta.url).pathname;
// séquence complète (film de présentation) ; le site n'en garde que quelques affiches
const outDir = arg('--out', join(here, 'frames', variant));

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH ?? '/opt/pw-browsers/chromium',
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});
async function open() {
  const page = await browser.newPage({ viewport: { width: 800, height: 600 } });
  page.on('pageerror', (e) => console.error('pageerror', e.message));
  await page.goto(base + '/video/hero/hero-film.html');
  await page.waitForFunction(() => window.__ready === true, null, { timeout: 120000 });
  return page;
}
const save = (path, url) => writeFileSync(path, Buffer.from(url.split(',')[1], 'base64'));

if (process.argv.includes('--anchors-only')) {
  // recalcule seulement les points de cote, sans refaire les images
  const page = await open();
  const anchors = await page.evaluate((v) => window.__anchors(v), variant);
  const metaPath = join(outDir, 'meta.json');
  const meta = JSON.parse((await import('node:fs')).readFileSync(metaPath, 'utf8'));
  writeFileSync(metaPath, JSON.stringify({ ...meta, anchors }, null, 1));
  await browser.close();
  console.log('ancres →', metaPath);
  process.exit(0);
}

if (stills) {
  const dir = join(here, '.stills'); mkdirSync(dir, { recursive: true });
  const page = await open();
  for (const u of stills.split(',').map(Number)) {
    const t = Date.now();
    save(join(dir, `${variant}-${u.toFixed(3)}.webp`), await page.evaluate(([u, v]) => window.__frame(u, v), [u, variant]));
    console.log(u, `${Date.now() - t} ms`);
  }
  await browser.close();
  process.exit(0);
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });
let done = 0;
await Promise.all(Array.from({ length: workers }, async (_, w) => {
  const page = await open();
  for (let f = w; f < frames; f += workers) {
    const u = f / (frames - 1);
    save(join(outDir, `${String(f).padStart(3, '0')}.webp`), await page.evaluate(([u, v]) => window.__frame(u, v, 0.72), [u, variant]));
    if (++done % 20 === 0) console.log(`${variant} ${done}/${frames}`);
  }
  await page.close();
}));
const page = await open();
const anchors = await page.evaluate((v) => window.__anchors(v), variant);
writeFileSync(join(outDir, 'meta.json'), JSON.stringify({ frames, anchors }, null, 1));
await browser.close();
console.log('→', outDir);
