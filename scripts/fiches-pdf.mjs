// Fiches PDF imprimables (A4) des mémos : les tableaux de référence de la page, en français
// et en anglais, à télécharger sans inscription (« tableau … pdf », « … chart pdf » sont des
// requêtes courantes). Le contenu vient de la page construite (dist/), donc d'une seule
// source : une valeur corrigée dans l'article l'est aussi dans la fiche au prochain rendu.
//
// Usage (après `npm run build`, puis rebuild pour copier les PDF dans dist/) :
//   node scripts/fiches-pdf.mjs              toutes les fiches de FICHES
//   node scripts/fiches-pdf.mjs <slug> [...]  seulement celles-ci
// Sorties : public/telechargements/<fr>.pdf et public/telechargements/en/<en>.pdf
// Ajouter une fiche : une entrée dans FICHES, puis le lien de téléchargement dans la page
// (bloc « fiche-pdf », voir couple-serrage-vis-tableau) avec data-href-en vers le PDF anglais.
import { readFileSync, mkdirSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import * as cheerio from 'cheerio';
import { chromium } from 'playwright';

const ROOT = resolve(import.meta.dirname, '..');
const SITE = 'https://www.baouch.fr';

// slug de l'article → noms des fichiers (descriptifs : le nom du PDF compte pour la recherche)
// titre : celui de la fiche quand le h1 de l'article annonce ce que la fiche ne contient pas
// (calculateur, méthode de lecture) ; h2 : intertitres à renommer pour le papier.
export const FICHES = {
  'couple-serrage-vis-tableau': {
    fr: 'tableau-couple-de-serrage-vis', en: 'bolt-torque-chart-metric',
    titre: { fr: 'Couple de serrage des vis : tableau 8.8, 10.9, 12.9 (M3 à M36)', en: 'Metric bolt torque chart: 8.8, 10.9, 12.9 (M3 to M36)' },
  },
  'tableau-filetage-metrique-percage-taraudage': { fr: 'tableau-filetage-metrique-percage-taraudage', en: 'metric-thread-tap-drill-chart' },
  'tolerances-generales-iso-2768': { fr: 'tableau-tolerances-generales-iso-2768', en: 'iso-2768-general-tolerances-chart' },
  'tolerances-geometriques-symboles-iso-1101': { fr: 'symboles-tolerances-geometriques-iso-1101', en: 'gdt-symbols-iso-1101-chart' },
  'symboles-soudure-iso-2553': {
    fr: 'symboles-soudure-iso-2553', en: 'iso-2553-weld-symbols-chart',
    titre: { fr: 'Symboles de soudure ISO 2553 : symboles et numéros de procédés', en: 'ISO 2553 weld symbols chart: symbols and process numbers' },
  },
  'rugosite-ra-tableau-classes-procedes': {
    fr: 'tableau-rugosite-ra-classes-n', en: 'surface-roughness-ra-chart',
    h2: { 'Convertisseur Ra : µm, µin et classes N': 'Classes de rugosité N et valeurs de Ra', 'Ra converter: µm, µin and N grades': 'Roughness grades N and Ra values' },
  },
  'ajustements-iso-286-tableau-h7-g6': {
    fr: 'tableau-ajustements-iso-286', en: 'iso-286-fits-chart',
    titre: { fr: 'Ajustements ISO 286 : tableau H7/g6, H7/h6, H7/p6 et écarts', en: 'ISO 286 fits chart: H7/g6, H7/h6, H7/p6 and deviations' },
  },
};

// phrases qui renvoient à la page web (calculateur, autre article) : sans objet sur papier
const HORS_PAPIER = /calculat|ci-dessus|ci-dessous|SOLIDWORKS|convertisseur|converter|this page/i;
function nettoyer($, el) {
  const $el = $(el).clone();
  $el.find('input, select, textarea, button, label').remove();
  const texte = $el.text().replace(/\s+/g, ' ').trim();
  if (!texte) return null;
  if (!HORS_PAPIER.test(texte)) return $.html($el);
  const gardees = texte.split(/(?<=[.!?])\s+/).filter((ph) => !HORS_PAPIER.test(ph));
  return gardees.length ? `<${el.tagName}>${gardees.join(' ')}</${el.tagName}>` : null;
}

const TXT = {
  fr: {
    kicker: 'Fiche mémo imprimable',
    version: (d) => `Version du ${d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}`,
    note: (url) => `Valeurs de référence reprises de l'article ${url}, qui détaille les hypothèses, les formules et les cas limites. Pour un usage critique, vérifiez dans la norme en vigueur ou la documentation du fabricant. Libre d'impression et de diffusion avec mention de la source.`,
    page: 'Page',
  },
  en: {
    kicker: 'Printable reference chart',
    version: (d) => `Version of ${d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}`,
    note: (url) => `Reference values taken from the article ${url}, which explains the assumptions, formulas and edge cases. For critical use, check the current standard or the manufacturer's documentation. Free to print and share with credit to the source.`,
    page: 'Page',
  },
};

// tableaux de l'article + les paragraphes qui les encadrent (hypothèses, unités, source)
function extraire(html, renommer = {}) {
  const $ = cheerio.load(html);
  const titre = $('h1').first().text().replace(/\s+/g, ' ').trim();
  const sections = [];
  $('[data-article-root] section').each((_, sec) => {
    const $sec = $(sec);
    if ($sec.attr('id') === 'faq' || !$sec.find('table').length) return;
    const blocs = [];
    const enfants = $sec.children().toArray();
    const estTable = (el) => el && ($(el).is('table') || $(el).find('table').length > 0);
    enfants.forEach((el, i) => {
      const $el = $(el);
      if ($el.is('h2')) return;
      if (estTable(el)) blocs.push(`<table>${$el.is('table') ? $el.html() : $el.find('table').first().html()}</table>`);
      else if ($el.is('p, h3') && (estTable(enfants[i + 1]) || ($el.is('p') && estTable(enfants[i - 1])))) {
        const b = nettoyer($, el);
        if (b) blocs.push(b);
      }
    });
    const h2 = $sec.children('h2').first().text().replace(/\s+/g, ' ').trim();
    sections.push({ h2: renommer[h2] ?? h2, blocs });
  });
  return { titre, sections };
}

const font = `file://${resolve(ROOT, 'public/fonts/instrument-sans-var.woff2')}`;
const gabarit = ({ titre, sections, url, lang, date }) => `<!DOCTYPE html><html lang="${lang}"><head><meta charset="utf-8"><title>${titre}</title><style>
@font-face { font-family: 'IS'; src: url('${font}') format('woff2-variations'); font-weight: 100 900; }
@page { size: A4; margin: 14mm 13mm 16mm; }
* { box-sizing: border-box; }
body { font-family: 'IS', 'DejaVu Sans', sans-serif; color: #15161a; font-size: 9.6pt; line-height: 1.4; margin: 0; }
header { border-bottom: 2px solid #15161a; padding-bottom: 8px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; }
.kicker { font-size: 8pt; letter-spacing: .12em; text-transform: uppercase; color: #b4501d; font-weight: 700; }
h1 { font-size: 17pt; line-height: 1.15; margin: 3px 0 0; font-weight: 650; }
.brand { text-align: right; font-size: 8.5pt; color: #555; white-space: nowrap; }
.brand b { display: block; font-size: 11pt; color: #15161a; letter-spacing: .04em; }
h2 { font-size: 11.5pt; margin: 14px 0 6px; break-after: avoid; }
h3 { font-size: 10pt; margin: 10px 0 4px; break-after: avoid; }
p { margin: 4px 0 6px; color: #333; }
table { width: 100%; border-collapse: collapse; margin: 4px 0 8px; font-size: 8.8pt; }
thead { display: table-header-group; }
tr { break-inside: avoid; }
th { background: #15161a; color: #fff; text-align: left; font-weight: 600; padding: 4px 6px; }
td { border-bottom: 0.6pt solid #cfd0d4; padding: 3.5px 6px; vertical-align: top; }
tbody tr:nth-child(even) td { background: #f3f3f5; }
svg { color: #15161a; }
.gdt-sym { font-family: 'DejaVu Sans', sans-serif !important; font-size: 1.7em !important; line-height: 1; }
.note { margin-top: 14px; padding-top: 8px; border-top: 0.6pt solid #cfd0d4; font-size: 8pt; color: #555; }
a { color: inherit; text-decoration: none; }
</style></head><body>
<header><div><div class="kicker">${TXT[lang].kicker}</div><h1>${titre}</h1></div><div class="brand"><b>BAOUCH.FR</b>${TXT[lang].version(date)}</div></header>
${sections.map((s) => `<section>${s.h2 ? `<h2>${s.h2}</h2>` : ''}${s.blocs.join('\n')}</section>`).join('\n')}
<p class="note">${TXT[lang].note(url)}</p>
</body></html>`;

const slugs = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(FICHES);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const date = new Date();
mkdirSync(resolve(ROOT, 'public/telechargements/en'), { recursive: true });
for (const slug of slugs) {
  const noms = FICHES[slug];
  if (!noms) throw new Error(`fiches-pdf : ${slug} absent de FICHES`);
  for (const lang of ['fr', 'en']) {
    const chemin = lang === 'fr' ? `/blog/${slug}/` : `/en/blog/${slug}/`;
    const html = readFileSync(resolve(ROOT, 'dist', '.' + chemin, 'index.html'), 'utf8');
    const { titre: h1, sections } = extraire(html, noms.h2);
    const titre = noms.titre?.[lang] ?? h1;
    if (!sections.length) throw new Error(`fiches-pdf : aucun tableau dans ${chemin}`);
    const page = await browser.newPage({ viewport: { width: 794, height: 1123 } });
    await page.setContent(gabarit({ titre, sections, url: SITE + chemin, lang, date }), { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    const sortie = resolve(ROOT, 'public/telechargements', lang === 'fr' ? `${noms.fr}.pdf` : `en/${noms.en}.pdf`);
    await page.pdf({
      path: sortie, format: 'A4', printBackground: true, preferCSSPageSize: true,
      displayHeaderFooter: true, headerTemplate: '<span></span>',
      footerTemplate: `<div style="font-family:sans-serif;font-size:7pt;color:#777;width:100%;padding:0 13mm;display:flex;justify-content:space-between"><span>${SITE + chemin}</span><span>${TXT[lang].page} <span class="pageNumber"></span>/<span class="totalPages"></span></span></div>`,
    });
    // aperçu PNG pour contrôle visuel (non publié)
    if (process.env.FICHES_APERCU) await page.screenshot({ path: resolve(process.env.FICHES_APERCU, `${slug}-${lang}.png`), fullPage: true });
    await page.close();
    console.log(`${lang} ${slug} → ${sortie.replace(ROOT + '/', '')} (${Math.round(statSync(sortie).size / 1024)} Ko, ${sections.length} section(s))`);
  }
}
await browser.close();
