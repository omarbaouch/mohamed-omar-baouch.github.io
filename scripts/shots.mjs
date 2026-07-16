// Screenshots multi-viewport × thème × langue pour l'auto-critique visuelle.
// Usage : node scripts/shots.mjs <baseURL> <dirSortie> [--quick]
//   --quick : 1440 dark FR uniquement (itérations rapides)
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const baseURL = process.argv[2];
const outDir = process.argv[3];
const quick = process.argv.includes('--quick');
if (!baseURL || !outDir) {
  console.error('Usage: shots.mjs <baseURL> <dirSortie> [--quick]');
  process.exit(2);
}
mkdirSync(outDir, { recursive: true });

const VIEWPORTS = quick
  ? [{ name: '1440', width: 1440, height: 900 }]
  : [
      { name: '390', width: 390, height: 844 },
      { name: '768', width: 768, height: 1024 },
      { name: '1440', width: 1440, height: 900 },
      { name: '1920', width: 1920, height: 1080 },
    ];
const THEMES = quick ? ['light'] : ['light', 'dark'];
const PAGES = [
  { name: 'home', path: '/' },
  { name: 'blog-index', path: '/blog/' },
  { name: 'article', path: '/blog/pdm-ou-plm-quand-basculer/' },
];

const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
const browser = await chromium.launch({
  // Chromium pré-installé de l'environnement (indépendant de la révision épinglée par playwright)
  executablePath: process.env.CHROME_PATH ?? '/opt/pw-browsers/chromium',
  // le trafic sortant doit passer par le proxy de l'environnement (CDN fonts/scripts)
  proxy: proxy ? { server: proxy, bypass: 'localhost,127.0.0.1' } : undefined,
});
for (const vp of VIEWPORTS) {
  for (const theme of THEMES) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
      locale: 'fr-FR',
      // le proxy de l'environnement fait de l'interception TLS avec son propre CA
      ignoreHTTPSErrors: true,
    });
    await context.addInitScript((t) => localStorage.setItem('theme', t), theme);
    const page = await context.newPage();
    for (const p of PAGES) {
      try {
        await page.goto(baseURL + p.path, { waitUntil: 'networkidle', timeout: 30000 });
      } catch {
        await page.goto(baseURL + p.path, { waitUntil: 'load', timeout: 30000 }).catch(() => null);
      }
      // laisse le loader/les reveals initiaux se terminer
      await page.waitForTimeout(2500);
      // scrolle toute la page écran par écran pour déclencher chaque reveal ScrollTrigger,
      // sinon la capture pleine page montre des sections à opacité 0
      await page.evaluate(async () => {
        const step = window.innerHeight * 0.8;
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 250));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(800);
      const file = join(outDir, `${p.name}-${vp.name}-${theme}.png`);
      await page.screenshot({ path: file, fullPage: true });
      console.log(file);
    }
    await context.close();
  }
}
await browser.close();
console.log('Screenshots terminés.');
