// Capture le vrai site (build dist/ servi en local) : ces images servent de matière
// première au film de présentation. Usage : node video/capture.mjs <baseURL>
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const base = process.argv[2] ?? 'http://localhost:4174';
const out = new URL('./shots/', import.meta.url).pathname;
mkdirSync(out, { recursive: true });

const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH ?? '/opt/pw-browsers/chromium',
  proxy: proxy ? { server: proxy, bypass: 'localhost,127.0.0.1' } : undefined,
});

async function open(theme, path, vp = { width: 1440, height: 900 }) {
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1.5, locale: 'fr-FR', ignoreHTTPSErrors: true });
  await ctx.addInitScript((t) => localStorage.setItem('theme', t), theme);
  const page = await ctx.newPage();
  await page.goto(base + path, { waitUntil: 'load', timeout: 45000 }).catch(() => null);
  await page.waitForTimeout(3500);
  // déclenche tous les reveals au scroll, puis revient en haut
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1500);
  // masque ce qui gênerait à l'image (chatbot, bandeaux)
  await page.addStyleTag({ content: '.ai-fab,.ai-panel,[class*="cookie"]{display:none!important}' });
  return { ctx, page };
}

for (const theme of ['light', 'dark']) {
  const { ctx, page } = await open(theme, '/');
  await page.screenshot({ path: `${out}home-${theme}-hero.png` });
  await page.screenshot({ path: `${out}home-${theme}-full.png`, fullPage: true });
  const ids = await page.evaluate(() => [...document.querySelectorAll('section[id]')].map((s) => s.id));
  console.log(theme, 'sections', ids.join(','));
  // la barre de nav collante masquerait le haut de chaque section
  await page.addStyleTag({ content: '.site-nav{display:none!important}' });
  for (const id of ids) {
    const el = page.locator(`section#${id}`).first();
    await el.scrollIntoViewIfNeeded().catch(() => null);
    await page.waitForTimeout(600);
    await el.screenshot({ path: `${out}sec-${theme}-${id}.png` }).catch((e) => console.log('skip', id, e.message.slice(0, 60)));
  }
  await ctx.close();
}

for (const [name, path] of [
  ['blog', '/blog/'],
  ['article', '/blog/pdm-ou-plm-quand-basculer/'],
  ['orbita', '/projets/robot-orbita/'],
  ['migration', '/projets/migration-pdm-internationale/'],
]) {
  const { ctx, page } = await open('light', path);
  await page.screenshot({ path: `${out}${name}.png` });
  await page.screenshot({ path: `${out}${name}-full.png`, fullPage: true });
  await ctx.close();
}

// mobile
{
  const { ctx, page } = await open('light', '/', { width: 390, height: 844 });
  await page.screenshot({ path: `${out}mobile-light.png` });
  await ctx.close();
}
{
  const { ctx, page } = await open('dark', '/', { width: 390, height: 844 });
  await page.screenshot({ path: `${out}mobile-dark.png` });
  await ctx.close();
}
await browser.close();
