// Génère les images Open Graph (1200×630) façon cartouche PDM pour toutes
// les pages, puis branche og:image/twitter:image sur les fichiers sources.
// Usage : node scripts/og-images.mjs
import { chromium } from 'playwright';
import fs from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const OUT = resolve(ROOT, 'public/img/og');
fs.mkdirSync(OUT, { recursive: true });

const PAGES = [
  { file: 'src/index.html', slug: 'home', ref: 'ASM-BAOUCH · RÉV.2026', type: 'PORTFOLIO', title: 'Consultant Expert SOLIDWORKS — PDM / PLM' },
  { file: 'src/blog/index.html', slug: 'blog', ref: 'ASM-04 · 13 DOCS', type: 'BLOG', title: 'Guides & analyses PDM/PLM et SOLIDWORKS' },
  { file: 'src/blog/pdm-ou-plm-quand-basculer/index.html', slug: 'pdm-ou-plm', ref: 'DOC-01', type: 'ARTICLE', title: 'PDM ou PLM : les 5 signaux qui prouvent que vous avez dépassé votre coffre' },
  { file: 'src/blog/solidworks-pdm-standard-vs-professional/index.html', slug: 'std-vs-pro', ref: 'DOC-02', type: 'ARTICLE', title: 'SOLIDWORKS PDM : Standard ou Professional, le guide complet' },
  { file: 'src/blog/solidworks-pdm-lent-7-causes/index.html', slug: 'pdm-lent', ref: 'DOC-03', type: 'ARTICLE', title: 'SOLIDWORKS PDM lent : les 7 vraies causes' },
  { file: 'src/blog/eco-ecr-gestion-modifications/index.html', slug: 'eco-ecr', ref: 'DOC-04', type: 'ARTICLE', title: 'La révision fantôme à 40 000 € : maîtriser les ECO/ECR' },
  { file: 'src/blog/nomenclature-bom-pdm-plm-erp/index.html', slug: 'bom-erp', ref: 'DOC-05', type: 'ARTICLE', title: 'BOM, eBOM, mBOM : la colonne vertébrale de vos données produit' },
  { file: 'src/blog/migration-donnees-solidworks-pdm/index.html', slug: 'migration-pdm', ref: 'DOC-06', type: 'ARTICLE', title: 'Migration de données vers SOLIDWORKS PDM : le guide terrain' },
  { file: 'src/blog/migration-cloud-pdm-3dexperience/index.html', slug: 'pdm-cloud', ref: 'DOC-07', type: 'ARTICLE', title: 'PDM dans le cloud : ce qu’on ne vous dit jamais avant de signer' },
  { file: 'src/blog/ia-solidworks-pdm-bureau-etudes/index.html', slug: 'ia-pdm', ref: 'DOC-08', type: 'ARTICLE', title: 'IA et SOLIDWORKS PDM : ce qui change vraiment en 2026' },
  { file: 'src/blog/prix-cout-projet-solidworks-pdm/index.html', slug: 'prix-pdm', ref: 'DOC-09', type: 'ARTICLE', title: 'Combien coûte vraiment un projet SOLIDWORKS PDM ?' },
  { file: 'src/blog/solidworks-gratuit-prix-guide/index.html', slug: 'sw-gratuit', ref: 'DOC-10', type: 'ARTICLE', title: 'SOLIDWORKS gratuit : les 7 solutions légales (et le vrai prix)' },
  { file: 'src/blog/codification-proprietes-solidworks/index.html', slug: 'codification', ref: 'DOC-11', type: 'ARTICLE', title: 'Codification & propriétés SOLIDWORKS : réparer la chaîne BOM → ERP' },
  { file: 'src/blog/configuration-materielle-solidworks/index.html', slug: 'config-materielle', ref: 'DOC-12', type: 'ARTICLE', title: 'Configuration matérielle SOLIDWORKS : le guide terrain' },
  { file: 'src/blog/resolutions-problematiques-plm/index.html', slug: 'resolutions-plm', ref: 'DOC-13', type: 'ARTICLE', title: 'Résolutions de problématiques PLM : retours de terrain' },
  { file: 'src/projets/robot-orbita/index.html', slug: 'orbita', ref: 'PRT-ORBITA · RÉV.B', type: 'ÉTUDE DE CAS', title: 'Structurer le PDM d’un robot humanoïde' },
  { file: 'src/projets/migration-pdm-internationale/index.html', slug: 'mig-intl', ref: 'MIG-INTL · RÉV.C', type: 'ÉTUDE DE CAS', title: 'Migration PDM multi-sites pour un géant mondial du câblage' },
];

const sansFont = `file://${resolve(ROOT, 'public/fonts/instrument-sans-var.woff2')}`;

const template = ({ title, ref, type }) => `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
@font-face { font-family: 'IS'; src: url('${sansFont}') format('woff2-variations'); font-weight: 100 900; }
* { margin: 0; box-sizing: border-box; }
body {
  width: 1200px; height: 630px; font-family: 'IS', sans-serif;
  background: #0e0f11;
  background-image: radial-gradient(rgba(244,243,240,0.09) 1px, transparent 1px);
  background-size: 44px 44px;
  color: #f4f3f0; position: relative; padding: 88px 96px;
  display: flex; flex-direction: column; justify-content: space-between;
}
.frame { position: absolute; inset: 36px; border: 1px solid rgba(244,243,240,0.14); }
.tick { position: absolute; width: 18px; height: 18px; border: 0 solid #6fa8d6; opacity: 0.85; }
.tl { top: 28px; left: 28px; border-top-width: 2px; border-left-width: 2px; }
.tr { top: 28px; right: 28px; border-top-width: 2px; border-right-width: 2px; }
.bl { bottom: 28px; left: 28px; border-bottom-width: 2px; border-left-width: 2px; }
.br { bottom: 28px; right: 28px; border-bottom-width: 2px; border-right-width: 2px; }
.mono { font-family: 'SF Mono', 'DejaVu Sans Mono', monospace; letter-spacing: 0.18em; font-size: 20px; }
.top { display: flex; justify-content: space-between; color: #6fa8d6; }
.title { font-size: ${title.length > 58 ? 58 : 68}px; font-weight: 640; line-height: 1.08; letter-spacing: -0.02em; max-width: 980px; }
.bottom { display: flex; justify-content: space-between; align-items: center; color: #9b9891; }
.ref { display: flex; align-items: center; gap: 14px; color: #6fa8d6; }
.led { width: 14px; height: 14px; border-radius: 50%; background: #6fa8d6; }
</style></head><body>
<div class="frame"></div>
<span class="tick tl"></span><span class="tick tr"></span><span class="tick bl"></span><span class="tick br"></span>
<div class="top mono"><span>M.BAOUCH — ${type}</span><span>RÉV.2026</span></div>
<div class="title">${title}</div>
<div class="bottom mono"><span class="ref"><span class="led"></span>${ref} · PUBLIÉ</span><span>baouch.fr</span></div>
</body></html>`;

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const p of PAGES) {
  await page.setContent(template(p), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `${OUT}/${p.slug}.jpg`, type: 'jpeg', quality: 88 });
  console.log('og:', p.slug);
}
await browser.close();

// ---- branche les balises sur les sources
for (const p of PAGES) {
  const f = resolve(ROOT, p.file);
  let html = fs.readFileSync(f, 'utf8');
  const url = `https://baouch.fr/img/og/${p.slug}.jpg`;
  const hasOg = /property="og:image"/.test(html);
  const hasTw = /name="twitter:image"/.test(html);
  if (hasOg) html = html.replace(/(property="og:image"\s+content=")[^"]*(")/, `$1${url}$2`);
  if (hasTw) html = html.replace(/(name="twitter:image"\s+content=")[^"]*(")/, `$1${url}$2`);
  if (!hasOg) {
    const tags = `    <meta property="og:image" content="${url}">\n    <meta name="twitter:image" content="${url}">\n`;
    html = html.replace(/(<\/title>\n)/, `$1${tags}`);
  }
  fs.writeFileSync(f, html);
  console.log('meta:', p.file, hasOg ? 'remplacé' : 'ajouté');
}
