// Audit accessibilité axe-core sur les pages clés. Usage : node scripts/a11y.mjs <baseURL>
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';

const base = process.argv[2] ?? 'http://localhost:4175';
const axeSource = readFileSync('node_modules/axe-core/axe.min.js', 'utf8');
const pages = ['/', '/blog/', '/blog/pdm-ou-plm-quand-basculer/'];

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
let totalViolations = 0;

for (const path of pages) {
  const page = await ctx.newPage();
  await page.goto(base + path, { waitUntil: 'networkidle' }).catch(() => null);
  await page.waitForTimeout(1500);
  await page.evaluate(axeSource);
  const result = await page.evaluate(() =>
    axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] } })
  );
  const serious = result.violations.filter((v) => ['serious', 'critical'].includes(v.impact));
  console.log(`\n=== ${path} — ${result.violations.length} violations (${serious.length} serious/critical)`);
  for (const v of result.violations) {
    console.log(` [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} nœuds)`);
    v.nodes.slice(0, 2).forEach((n) => console.log(`   → ${n.target.join(' ')}`));
  }
  totalViolations += serious.length;
  await page.close();
}
await browser.close();
process.exit(totalViolations > 0 ? 1 : 0);
