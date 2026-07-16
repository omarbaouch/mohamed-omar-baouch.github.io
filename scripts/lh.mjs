// Lighthouse mobile sur une URL. Usage : node scripts/lh.mjs <url> [fichierSortie.json]
// Échoue (exit 1) si Perf < 90, A11y < 95 ou SEO < 100 quand ASSERT=1.
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import { writeFileSync } from 'node:fs';
import fg from 'fast-glob';

const url = process.argv[2];
const outFile = process.argv[3];
if (!url) {
  console.error('Usage: lh.mjs <url> [sortie.json]');
  process.exit(2);
}

const chromePath =
  process.env.CHROME_PATH ?? fg.sync('/opt/pw-browsers/chromium-*/chrome-linux/chrome')[0];

const chrome = await launch({
  chromePath,
  chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
});

try {
  const result = await lighthouse(url, {
    port: chrome.port,
    output: 'json',
    logLevel: 'error',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  });
  const lhr = result.lhr;
  const scores = Object.fromEntries(
    Object.entries(lhr.categories).map(([k, v]) => [k, Math.round((v.score ?? 0) * 100)])
  );
  const audits = {
    lcp: lhr.audits['largest-contentful-paint']?.displayValue,
    cls: lhr.audits['cumulative-layout-shift']?.displayValue,
    tbt: lhr.audits['total-blocking-time']?.displayValue,
    fcp: lhr.audits['first-contentful-paint']?.displayValue,
    transfer: lhr.audits['total-byte-weight']?.displayValue,
  };
  const summary = { url, scores, audits, fetchTime: lhr.fetchTime };
  console.log(JSON.stringify(summary, null, 2));
  if (outFile) writeFileSync(outFile, JSON.stringify(summary, null, 2) + '\n');
  if (process.env.ASSERT === '1') {
    const fails = [];
    if (scores.performance < 90) fails.push(`performance ${scores.performance} < 90`);
    if (scores.accessibility < 95) fails.push(`accessibility ${scores.accessibility} < 95`);
    if (scores.seo < 100) fails.push(`seo ${scores.seo} < 100`);
    if (fails.length) {
      console.error(`✗ Budget non tenu : ${fails.join(' ; ')}`);
      process.exit(1);
    }
  }
} finally {
  chrome.kill();
}
