// Rend film.html image par image puis encode le MP4 (vidéo + bande-son de soundtrack.py).
// Usage : node video/render.mjs [--stills 1,5.2,12] [--fps 30] [--workers 4]
// Le dépôt doit être servi à la racine (npx http-server -p 8090 -s .) : le film
// charge les polices, images et le modèle 3D directement depuis public/.
import { chromium } from 'playwright';
import { mkdirSync, rmSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const base = arg('--base', 'http://localhost:8090');
const fps = +arg('--fps', 30);
const workers = +arg('--workers', 4);
const stills = arg('--stills', null);
const here = new URL('.', import.meta.url).pathname;
const tmp = arg('--tmp', join(here, '.frames'));
// hors du site : le film n'est plus intégré à la page (à publier ailleurs, réseaux, etc.)
const out = arg('--out', join(here, 'out', 'presentation-baouch.mp4'));
const ffmpeg = process.env.FFMPEG ?? 'ffmpeg';

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH ?? '/opt/pw-browsers/chromium',
  // WebGL logiciel : le rendu 3D ne dépend pas d'un GPU
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--font-render-hinting=none'],
});
async function openFilm() {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  page.on('pageerror', (e) => console.error('pageerror', e.message));
  await page.goto(base + '/video/film.html', { waitUntil: 'load' });
  await page.waitForFunction(() => window.__ready === true, null, { timeout: 120000 });
  return page;
}

if (stills) {
  const dir = join(here, '.stills'); mkdirSync(dir, { recursive: true });
  const page = await openFilm();
  for (const t of stills.split(',').map(Number)) {
    await page.evaluate((t) => window.__seek(t), t);
    await page.screenshot({ path: join(dir, `t${t.toFixed(2)}.jpg`), type: 'jpeg', quality: 85 });
    console.log('still', t);
  }
  await browser.close();
  process.exit(0);
}

rmSync(tmp, { recursive: true, force: true }); mkdirSync(tmp, { recursive: true });
const probe = await openFilm();
const duration = await probe.evaluate(() => window.__duration);
await probe.close();
const total = Math.round(duration * fps);
console.log(`${total} images à ${fps} i/s, ${workers} rendus en parallèle`);
let done = 0;
await Promise.all(Array.from({ length: workers }, async (_, w) => {
  const page = await openFilm();
  for (let f = w; f < total; f += workers) {
    await page.evaluate((t) => window.__seek(t), f / fps);
    await page.screenshot({ path: join(tmp, `f${String(f).padStart(5, '0')}.jpg`), type: 'jpeg', quality: 95 });
    if (++done % 150 === 0) console.log(`${done}/${total}`);
  }
  await page.close();
}));
await browser.close();

const audio = join(here, '.frames', 'soundtrack.wav');
execFileSync('python3', [join(here, 'soundtrack.py'), audio, String(duration)], { stdio: 'inherit' });
mkdirSync(join(out, '..'), { recursive: true });
execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-framerate', String(fps), '-i', join(tmp, 'f%05d.jpg'), '-i', audio,
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
  '-c:a', 'aac', '-b:a', '192k', '-shortest', out], { stdio: 'inherit' });
console.log('→', out);
