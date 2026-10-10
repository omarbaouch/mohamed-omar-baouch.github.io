// Recherche de mots-clés sur données réelles, pour choisir les sujets des passages SEO.
//
// Trois sources, chacune nommée dans le rapport (aucun chiffre n'est estimé) :
//   1. Suggestions de recherche Google (sans clé) : les requêtes réellement tapées, par
//      ordre de popularité, à partir des graines de seo/graines.json et de modificateurs
//      (pdf, excel, tableau, calcul, télécharger…). Pas de volume : un rang et un nombre
//      d'apparitions.
//   2. Volumes Google Ads (Keyword Planner) via l'API DataForSEO, si DATAFORSEO_LOGIN et
//      DATAFORSEO_PASSWORD sont définis : recherches mensuelles moyennes, France (fr) et
//      États-Unis (en). Service payant : les volumes sont gardés 30 jours en cache.
//   3. Impressions Bing via l'API Bing Webmaster Tools, si BING_WEBMASTER_API_KEY est
//      défini (gratuit, site vérifié dans Bing Webmaster Tools) : impressions réelles sur
//      Bing, utiles pour comparer les sujets entre eux.
// Le rapport Search Console (branche seo-data) dit en plus où le site apparaît déjà.
//
// Usage :
//   node scripts/mots-cles.mjs                 graines de seo/graines.json, fr et en
//   node scripts/mots-cles.mjs --lang en       une seule langue
//   node scripts/mots-cles.mjs "joint torique" --lang fr   graines ponctuelles
//   node scripts/mots-cles.mjs --sans-suggestions          volumes seuls (mots-clés du cache)
//   node scripts/mots-cles.mjs --rapport                   rapport seul, depuis le cache (sans réseau)
// Sorties : seo/mots-cles.md (rapport lu par l'agent) et seo/mots-cles.json (cache).
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = resolve(import.meta.dirname, '..');
const DIR = resolve(ROOT, 'seo');
const CACHE = resolve(DIR, 'mots-cles.json');
const RAPPORT = resolve(DIR, 'mots-cles.md');
const GRAINES = JSON.parse(readFileSync(resolve(DIR, 'graines.json'), 'utf8'));
const TODAY = new Date().toISOString().slice(0, 10);
const VALIDITE_JOURS = 30;

const LANGS = {
  fr: { hl: 'fr', gl: 'fr', dfsLocation: 2250, dfsLanguage: 'fr', bingCountry: 'fr', bingLanguage: 'fr-FR', libelle: 'France, français' },
  en: { hl: 'en', gl: 'us', dfsLocation: 2840, dfsLanguage: 'en', bingCountry: 'us', bingLanguage: 'en-US', libelle: 'États-Unis, anglais' },
};
const TELECHARGEMENT = /\b(pdf|excel|xls|xlsx|t[ée]l[ée]charger|download|dwg|step|stp|template|mod[eè]le|gratuit|free|printable|imprimable)\b/i;

const args = process.argv.slice(2);
const opt = (name) => { const i = args.indexOf(name); return i === -1 ? null : args[i + 1]; };
const langs = opt('--lang') ? [opt('--lang')] : Object.keys(LANGS);
const sansSuggestions = args.includes('--sans-suggestions');
const ponctuelles = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--lang');

const cache = existsSync(CACHE) ? JSON.parse(readFileSync(CACHE, 'utf8')) : { keywords: {} };
const cle = (lang, kw) => `${lang}|${kw}`;
const entree = (lang, kw) => (cache.keywords[cle(lang, kw)] ??= { lang, kw });
const pause = (ms) => new Promise((r) => setTimeout(r, ms));
const frais = (date) => date && (Date.parse(TODAY) - Date.parse(date)) / 864e5 < VALIDITE_JOURS;
const norm = (s) => s.toLowerCase().normalize('NFC').replace(/\s+/g, ' ').trim();

// ---------- 1. suggestions Google
async function suggestions(q, L) {
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&ie=utf-8&oe=utf-8&hl=${L.hl}&gl=${L.gl}&q=${encodeURIComponent(q)}`;
  for (let essai = 0; essai < 3; essai++) {
    try {
      const res = await fetch(url, { headers: { 'Accept-Language': L.hl } });
      if (res.ok) return (await res.json())[1] ?? [];
      if (res.status === 429) { await pause(5000 * (essai + 1)); continue; }
      return [];
    } catch { await pause(2000); }
  }
  return [];
}

async function collecter(lang) {
  const L = LANGS[lang];
  const g = GRAINES[lang];
  const graines = ponctuelles.length ? ponctuelles : g.graines;
  const exclure = (g.exclure || []).map((m) => new RegExp(`\\b${m}\\b`, 'i'));
  // relevé complet : les suggestions d'un relevé précédent sont remplacées, pas cumulées
  if (!ponctuelles.length) for (const e of Object.values(cache.keywords)) if (e.lang === lang) delete e.suggestion;
  let n = 0;
  for (const graine of graines) {
    for (const mod of ['', ...g.modificateurs]) {
      const q = norm(mod ? `${graine} ${mod}` : graine);
      const liste = await suggestions(q, L);
      liste.forEach((s, rang) => {
        const kw = norm(s);
        if (exclure.some((re) => re.test(kw)) || !pertinente(kw, [graine])) return;
        const e = entree(lang, kw);
        e.suggestion ??= { meilleurRang: 99, apparitions: 0, graines: [] };
        e.suggestion.date = TODAY;
        e.suggestion.meilleurRang = Math.min(e.suggestion.meilleurRang, rang + 1);
        if (!e.suggestion.graines.includes(graine)) { e.suggestion.graines.push(graine); }
        e.suggestion.apparitions++;
      });
      n++;
      await pause(400);
    }
  }
  console.log(`${lang} : ${n} requêtes de suggestions`);
}

// ---------- 2. volumes Google Ads (DataForSEO)
async function volumesGoogle(lang, motsCles) {
  const { DATAFORSEO_LOGIN: login, DATAFORSEO_PASSWORD: mdp } = process.env;
  if (!login || !mdp) return false;
  const L = LANGS[lang];
  // Google Ads refuse certains caractères ; au plus 80 caractères et 10 mots par mot-clé
  const valides = motsCles.filter((k) => k.length <= 80 && k.split(' ').length <= 10 && /^[\p{L}\p{N} .'\-+&]+$/u.test(k));
  const aFaire = valides.filter((k) => !frais(cache.keywords[cle(lang, k)]?.google?.date));
  for (let i = 0; i < aFaire.length; i += 1000) {
    const lot = aFaire.slice(i, i + 1000);
    const res = await fetch('https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live', {
      method: 'POST',
      headers: { Authorization: 'Basic ' + Buffer.from(`${login}:${mdp}`).toString('base64'), 'Content-Type': 'application/json' },
      body: JSON.stringify([{ keywords: lot, location_code: L.dfsLocation, language_code: L.dfsLanguage }]),
    });
    const data = await res.json().catch(() => ({}));
    const tache = data.tasks?.[0];
    if (!res.ok || tache?.status_code !== 20000) {
      console.log(`DataForSEO (${lang}) : échec — HTTP ${res.status}, ${tache?.status_message || data.status_message || 'réponse illisible'}`);
      return true;
    }
    for (const r of tache.result || []) {
      entree(lang, norm(r.keyword)).google = { volume: r.search_volume ?? 0, concurrence: r.competition ?? null, date: TODAY };
    }
    console.log(`DataForSEO (${lang}) : ${lot.length} volumes`);
  }
  return true;
}

// ---------- 3. impressions Bing (Bing Webmaster Tools)
async function impressionsBing(lang, motsCles) {
  const key = process.env.BING_WEBMASTER_API_KEY;
  if (!key) return false;
  const L = LANGS[lang];
  const fin = TODAY, debut = new Date(Date.parse(TODAY) - 90 * 864e5).toISOString().slice(0, 10);
  const api = async (methode, q) => {
    const url = `https://ssl.bing.com/webmaster/api.svc/json/${methode}?apikey=${encodeURIComponent(key)}&q=${encodeURIComponent(q)}&country=${L.bingCountry}&language=${L.bingLanguage}&startDate=${debut}&endDate=${fin}`;
    for (let essai = 0; essai < 3; essai++) {
      try {
        const data = await (await fetch(url)).json();
        if (data.ErrorCode) throw Object.assign(new Error(data.Message), { api: true });
        return data.d;
      } catch (e) { if (e.api || essai === 2) throw e; await pause(2000); }
    }
  };
  // découverte : requêtes associées aux graines, avec leurs impressions Bing (requêtes réelles)
  {
    const g = GRAINES[lang];
    const exclure = (g.exclure || []).map((m) => new RegExp(`\\b${m}\\b`, 'i'));
    let k = 0;
    cache.bingAssocies ??= {};
    for (const graine of (ponctuelles.length ? ponctuelles : g.graines)) {
      if (frais(cache.bingAssocies[cle(lang, graine)])) continue; // déjà relevée ce mois-ci : quota épargné
      let liste;
      try { liste = await api('GetRelatedKeywords', graine); } catch (e) { console.log(`Bing (${lang}) : échec — ${e.message}`); return true; }
      for (const r of liste || []) {
        const kw = norm(r.Query);
        if (exclure.some((re) => re.test(kw)) || !tresPertinente(kw, graine)) continue;
        const e = entree(lang, kw);
        e.bing = { impressions: r.Impressions ?? 0, large: r.BroadImpressions ?? 0, periode: `${debut} → ${fin}`, date: TODAY };
        e.bingAssocie ??= graine;
        k++;
      }
      cache.bingAssocies[cle(lang, graine)] = TODAY;
      await pause(250);
    }
    console.log(`Bing (${lang}) : ${k} requêtes associées aux graines`);
  }
  let n = 0;
  for (const kw of motsCles) {
    if (frais(cache.keywords[cle(lang, kw)]?.bing?.date)) continue;
    let d;
    try { d = await api('GetKeyword', kw); } catch (e) { console.log(`Bing (${lang}) : échec après ${n} mots-clés — ${e.message}`); return true; }
    entree(lang, kw).bing = { impressions: d?.Impressions ?? 0, large: d?.BroadImpressions ?? 0, periode: `${debut} → ${fin}`, date: TODAY };
    n++;
    await pause(250);
  }
  console.log(`Bing (${lang}) : ${n} mots-clés`);
  return true;
}

// ---------- Search Console et pages existantes
function requetesGsc() {
  const q = new Map();
  try {
    const md = execFileSync('git', ['show', 'origin/seo-data:gsc-report.md'], { cwd: ROOT, encoding: 'utf8' });
    for (const m of md.matchAll(/^\s+(\d+) clics\s+(\d+) impr\.\s+CTR\s+[\d.]+ %\s+pos\.\s+([\d.]+)\s+(?!https?:)(.+)$/gm)) {
      const k = norm(m[4]);
      if (!q.has(k)) q.set(k, { clics: +m[1], impressions: +m[2], position: +m[3] });
    }
  } catch { /* branche seo-data absente : pas de croisement */ }
  return q;
}

const VIDES = new Set('de du des la le les un une et en pour sur a au aux d l the of for and to in on with vs ou or'.split(' '));
const racine = (w) => { const r = w.normalize('NFD').replace(/\p{M}/gu, ''); return r.length > 3 ? r.replace(/(s|x)$/, '') : r; };
const mots = (s) => new Set(norm(s).replace(/[^\p{L}\p{N} ]/gu, ' ').split(' ').filter((w) => w.length > 1).map(racine).filter((w) => !VIDES.has(w)));
// une suggestion n'est gardée que si elle partage un mot avec sa graine (hors modificateurs) :
// Google corrige parfois la saisie (« lamage » → « langage »)
const pertinente = (kw, graines) => graines.some((g) => { const k = mots(kw); return [...mots(g)].some((w) => k.has(w)); });
// requêtes « associées » de Bing : beaucoup plus larges (« conversion pouce mm » → « conversion
// dollar euro ») ; il faut au moins deux mots communs avec la graine (ou son mot unique)
const tresPertinente = (kw, graine) => { const k = mots(kw), g = [...mots(graine)]; return g.filter((w) => k.has(w)).length >= Math.min(2, g.length); };
function pagesExistantes() {
  const pages = [];
  for (const slug of readdirSync(resolve(ROOT, 'src/blog'))) {
    const f = resolve(ROOT, 'src/blog', slug, 'index.html');
    if (!existsSync(f)) continue;
    const html = readFileSync(f, 'utf8');
    const t = html.match(/<title>(.*?)<\/title>/)?.[1] ?? '';
    const h1 = html.match(/<h1[^>]*>[\s\S]*?<span data-lang="fr">([\s\S]*?)<\/span>/)?.[1] ?? '';
    pages.push({ lang: 'fr', url: `/blog/${slug}/`, mots: mots(`${t} ${h1} ${slug.replace(/-/g, ' ')}`) });
  }
  const en = JSON.parse(readFileSync(resolve(ROOT, 'src/i18n/pages-en.json'), 'utf8'));
  for (const [p, m] of Object.entries(en)) pages.push({ lang: 'en', url: `/en${p}`, mots: mots(m.title) });
  return pages;
}
function couverture(lang, kw, pages) {
  const k = mots(kw);
  if (!k.size) return null;
  let best = null;
  for (const p of pages.filter((p) => p.lang === lang)) {
    const commun = [...k].filter((w) => p.mots.has(w)).length / k.size;
    if (commun >= 0.5 && (!best || commun > best.s)) best = { s: commun, url: p.url };
  }
  return best?.url ?? null;
}

// ---------- rapport
function rapport(sources) {
  const gsc = requetesGsc();
  const pages = pagesExistantes();
  const out = [
    `# Mots-clés — ${TODAY}`,
    '',
    'Généré par `node scripts/mots-cles.mjs` à partir de `seo/graines.json`. Chaque chiffre vient de la source nommée en tête de colonne ; « — » = donnée absente (jamais une estimation).',
    '',
    `- Suggestions Google : ${sources.suggestions ? 'oui (rang 1 = suggestion la plus populaire ; apparitions = nombre de recherches de graines où elle ressort)' : 'non relevées ce jour (cache)'}`,
    `- Volumes Google Ads / mois (DataForSEO) : ${sources.google ? 'oui' : 'non — définir DATAFORSEO_LOGIN et DATAFORSEO_PASSWORD'}`,
    `- Impressions Bing sur 90 jours (Bing Webmaster Tools, recherche exacte ; marché : France pour le français, États-Unis pour l'anglais) : ${sources.bing ? 'oui, plus les requêtes associées aux graines que Bing renvoie (colonne Suggestion « — »)' : 'non — définir BING_WEBMASTER_API_KEY'}`,
    '- GSC : impressions et position du site sur la requête exacte (rapport seo-data, requêtes les plus vues seulement).',
    '- Page : page du site dont le titre recouvre la requête (rapprochement par mots, à vérifier).',
    '- ⬇ : intention de téléchargement (pdf, excel, modèle, télécharger…).',
    '',
  ];
  for (const lang of langs) {
    const rows = Object.values(cache.keywords).filter((e) => e.lang === lang && (e.suggestion ? pertinente(e.kw, e.suggestion.graines) : e.bingAssocie ? tresPertinente(e.kw, e.bingAssocie) : true));
    const score = (e) => [e.google?.volume ?? -1, e.bing?.impressions ?? -1, (e.suggestion?.apparitions ?? 0) * 10 - (e.suggestion?.meilleurRang ?? 99)];
    rows.sort((a, b) => { const sa = score(a), sb = score(b); for (let i = 0; i < 3; i++) if (sb[i] !== sa[i]) return sb[i] - sa[i]; return 0; });
    const sansPage = rows.filter((e) => !couverture(lang, e.kw, pages));
    out.push(`## ${lang === 'fr' ? 'Français' : 'Anglais'} (${LANGS[lang].libelle}) — ${rows.length} requêtes`, '');
    for (const [titre, liste] of [['Sujets sans page sur le site', sansPage], ['Toutes les requêtes', rows]]) {
      out.push(`### ${titre} (150 premières)`, '', '| Requête | Volume Google/mois | Impr. Bing 90 j | Suggestion (rang · apparitions) | GSC (impr. · pos.) | Page | ⬇ |', '|---|---:|---:|---|---|---|:-:|');
      for (const e of liste.slice(0, 150)) {
        const g = gsc.get(e.kw);
        out.push(`| ${e.kw} | ${e.google ? e.google.volume : '—'} | ${e.bing ? e.bing.impressions : '—'} | ${e.suggestion ? `${e.suggestion.meilleurRang} · ${e.suggestion.apparitions}` : '—'} | ${g ? `${g.impressions} · ${g.position}` : '—'} | ${couverture(lang, e.kw, pages) ?? '—'} | ${TELECHARGEMENT.test(e.kw) ? '⬇' : ''} |`);
      }
      out.push('');
    }
  }
  writeFileSync(RAPPORT, out.join('\n'));
}

mkdirSync(DIR, { recursive: true });
const sources = { suggestions: !sansSuggestions, google: false, bing: false };
if (args.includes('--rapport')) { rapport({ ...sources, suggestions: true, google: Object.values(cache.keywords).some((e) => e.google), bing: Object.values(cache.keywords).some((e) => e.bing) }); console.log('Rapport régénéré depuis le cache'); process.exit(0); }
for (const lang of langs) {
  if (!sansSuggestions) await collecter(lang);
  const liste = Object.values(cache.keywords).filter((e) => e.lang === lang).map((e) => e.kw);
  sources.google = (await volumesGoogle(lang, liste)) || sources.google;
  sources.bing = (await impressionsBing(lang, liste)) || sources.bing;
}
cache.miseAJour = TODAY;
writeFileSync(CACHE, JSON.stringify(cache, null, 1));
rapport(sources);
console.log(`Rapport : seo/mots-cles.md (${Object.keys(cache.keywords).length} requêtes en cache)`);
