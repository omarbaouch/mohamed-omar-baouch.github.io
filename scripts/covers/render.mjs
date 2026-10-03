// Rend les planches de couverture en WebP, en deux langues :
//   public/img/blog/covers/<slug>-1600.webp et -800.webp      (pages françaises)
//   public/img/blog/covers/en/<slug>-1600.webp, -800.webp et -og.jpg   (pages anglaises, voir build-en.mjs)
// Usage : node scripts/covers/render.mjs [slug…]   (sans argument : toutes les planches)
// Les fichiers WebP sont versionnés : ce script ne tourne pas au build.
import { chromium } from 'playwright';
import { mkdirSync, readFileSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { PLATES } from './plates.mjs';
import { W, H } from './kit.mjs';

const ROOT = resolve(import.meta.dirname, '../..');
const OUT = resolve(ROOT, 'public/img/blog/covers');
mkdirSync(resolve(OUT, 'en'), { recursive: true });
const want = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const slugs = want.length ? want : Object.keys(PLATES);
// police du site intégrée en data: (une page about:blank ne charge pas de file://)
const font = 'data:font/woff2;base64,' + readFileSync(resolve(ROOT, 'public/fonts/instrument-sans-var.woff2')).toString('base64');

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: W, height: H } });
for (const slug of slugs) {
  if (!PLATES[slug]) throw new Error(`planche inconnue : ${slug}`);
  for (const lang of ['fr', 'en']) {
    await page.setContent(`<!doctype html><html><head><style>
      @font-face { font-family: 'Instrument Sans'; src: url('${font}') format('woff2'); font-weight: 400 700; }
      html, body { margin: 0; background: #0a1420; } svg { display: block; }
    </style></head><body>${PLATES[slug](lang)}</body></html>`);
    const ok = await page.evaluate(async () => { await document.fonts.ready; return document.fonts.check('600 100px "Instrument Sans"'); });
    if (!ok) throw new Error('police Instrument Sans non chargée');
    const png = resolve(tmpdir(), `cover-${slug}-${lang}.png`);
    await page.screenshot({ path: png });
    const dir = lang === 'fr' ? OUT : resolve(OUT, 'en');
    for (const [w, q] of [[1600, 80], [800, 78]]) {
      execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', png, '-vf', `scale=${w}:-1:flags=lanczos`, '-c:v', 'libwebp', '-quality', String(q), '-compression_level', '6', resolve(dir, `${slug}-${w}.webp`)]);
    }
    // image de partage des pages anglaises (LinkedIn n'accepte pas le WebP) : JPEG 1200 × 675
    if (lang === 'en') execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', png, '-vf', 'scale=1200:-1:flags=lanczos', '-q:v', '4', resolve(dir, `${slug}-og.jpg`)]);
    rmSync(png);
  }
  console.log('couverture', slug);
}
await browser.close();
