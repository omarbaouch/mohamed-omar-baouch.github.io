// Index du carnet technique dans le pied de page : chaque article et chaque
// étude de cas reçoit un lien depuis toutes les pages du site — le signal le
// plus simple pour que les moteurs découvrent et réexplorent chaque page.
// Présenté comme une nomenclature : groupes thématiques (ASM), repères (PRT),
// repliables sur mobile. Régénéré entre les marqueurs de src/partials/footer.hbs :
// un article publié est un article lié, sans rien tenir à la main.
// Titres et thèmes : ceux des cartes de /blog/ (courts), sinon og:title.
// Lancé automatiquement avant chaque build — voir le script "prebuild".
// Usage : node scripts/footer-index.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import fg from 'fast-glob';
import * as cheerio from 'cheerio';

const ROOT = resolve(import.meta.dirname, '..');
const PARTIAL = resolve(ROOT, 'src/partials/footer.hbs');
const DEBUT = '<!-- index:debut -->';
const FIN = '<!-- index:fin -->';

// groupes, dans l'ordre d'affichage ; « data-cat » des cartes du blog → groupe.
// Sur grand écran les groupes coulent en 4 colonnes équilibrées : les deux plus
// courts (études de cas, performance) se partagent la première.
const GROUPES = [
  { id: 'cas', fr: 'Études de cas', en: 'Case studies' },
  { id: 'perf', fr: 'Performance & migration', en: 'Performance & migration' },
  { id: 'plm', fr: 'PDM · PLM', en: 'PDM · PLM' },
  { id: 'data', fr: 'Nomenclatures & données', en: 'BOMs & data' },
  { id: 'cao', fr: 'CAO & SOLIDWORKS', en: 'CAD & SOLIDWORKS' },
];
const CAT_VERS_GROUPE = { plm: 'plm', data: 'data', cao: 'cao', perf: 'perf', migration: 'perf' };
// articles absents de la grille du blog (article vedette, anciens formats)
const SECOURS = {
  '/blog/ia-solidworks-pdm-bureau-etudes/': 'plm',
  '/blog/configuration-materielle-solidworks/': 'perf',
  '/blog/migration-cloud-pdm-3dexperience/': 'perf',
};

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

// titres courts et thèmes des cartes de l'index du blog
const $blog = cheerio.load(readFileSync(resolve(ROOT, 'src/blog/index.html'), 'utf8'));
const cartes = new Map();
$blog('.article-card').each((_, el) => {
  const a = $blog(el).find('.article-card__title a');
  cartes.set(a.attr('href'), {
    fr: a.find('[data-lang="fr"]').first().text().trim() || a.text().trim(),
    en: a.find('[data-lang="en"]').first().text().trim(),
    cat: $blog(el).attr('data-cat'),
  });
});
$blog('.article-featured__title a').each((_, a) => {
  cartes.set($blog(a).attr('href'), {
    fr: $blog(a).find('[data-lang="fr"]').first().text().trim(),
    en: $blog(a).find('[data-lang="en"]').first().text().trim(),
  });
});

const pages = fg
  .sync(['blog/*/index.html', 'projets/*/index.html'], { cwd: resolve(ROOT, 'src') })
  .map((file) => {
    const $ = cheerio.load(readFileSync(resolve(ROOT, 'src', file), 'utf8'));
    const href = '/' + file.replace(/index\.html$/, '');
    const carte = cartes.get(href) || {};
    const og = $('meta[property="og:title"]').attr('content') || $('title').text();
    const fr = (carte.fr || og).replace(/^Étude de cas — /, '').trim();
    const groupe = file.startsWith('projets/') ? 'cas' : CAT_VERS_GROUPE[carte.cat] || SECOURS[href] || 'plm';
    const date = $('meta[property="article:published_time"]').attr('content') || '';
    return { href, fr, en: carte.en || '', groupe, date };
  });

let total = 0;
const blocs = GROUPES.map((g, gi) => {
  const items = pages
    .filter((p) => p.groupe === g.id)
    .sort((a, b) => b.date.localeCompare(a.date) || a.href.localeCompare(b.href));
  if (!items.length) return '';
  total += items.length;
  const asm = String(gi + 1).padStart(2, '0');
  const lignes = items
    .map((p, i) => {
      const titre = p.en
        ? `<span data-i18n=""><span data-lang="fr">${esc(p.fr)}</span><span data-lang="en">${esc(p.en)}</span></span>`
        : esc(p.fr);
      return `              <li><a href="${p.href}"><span class="fi-ref" aria-hidden="true">${asm}.${String(i + 1).padStart(2, '0')}</span><span class="fi-title">${titre}</span></a></li>`;
    })
    .join('\n');
  return `          <details class="fi-group" open>
            <summary><span class="fi-asm" aria-hidden="true">ASM-${asm}</span><span class="fi-name" data-i18n=""><span data-lang="fr">${esc(g.fr)}</span><span data-lang="en">${esc(g.en)}</span></span><span class="fi-count" aria-hidden="true">× ${items.length}</span></summary>
            <ul>
${lignes}
            </ul>
          </details>`;
})
  .filter(Boolean)
  .join('\n');

const partial = readFileSync(PARTIAL, 'utf8');
const i = partial.indexOf(DEBUT);
const j = partial.indexOf(FIN);
if (i < 0 || j < 0) throw new Error('Marqueurs index:debut / index:fin absents de src/partials/footer.hbs');
let suivant = `${partial.slice(0, i + DEBUT.length)}\n${blocs}\n          ${partial.slice(j)}`;
suivant = suivant.replace(/<span class="fi-total">[^<]*<\/span>/, `<span class="fi-total">${total} documents</span>`);
if (suivant !== partial) writeFileSync(PARTIAL, suivant);
console.log(`Index du pied de page : ${total} pages liées`);
