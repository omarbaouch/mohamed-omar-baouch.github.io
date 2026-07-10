// api/_rag.js
// Récupération d'information (RAG) au-dessus de la base curée (_kb.js) ET du
// corpus documentaire (api/_data/ : doc SOLIDWORKS PDM 2026 FR + help.visiativ.com).
// Ranking BM25 + normalisation accents + stemming FR léger + expansion bilingue.
// Le préfixe « _ » évite que Vercel en fasse une route HTTP.

import { KB_DOCS } from './_kb.js';
import { DOCS as CORPUS_SW } from './_data/corpus_sw.js';
import { DOCS as CORPUS_VISIATIV } from './_data/corpus_visiativ.js';

// La base curée reste prioritaire : elle porte le positionnement d'Omar.
// Le corpus documentaire ancre les réponses techniques détaillées.
const KB_BOOST = 1.5;

// Mots vides FR + EN — retirés avant le scoring.
const STOPWORDS = new Set([
    'le', 'la', 'les', 'un', 'une', 'des', 'de', 'du', 'au', 'aux', 'et', 'ou', 'a', 'à',
    'en', 'dans', 'sur', 'pour', 'par', 'avec', 'sans', 'que', 'qui', 'quoi', 'quel',
    'quelle', 'quels', 'quelles', 'est', 'sont', 'ce', 'cette', 'ces', 'mon', 'ma', 'mes',
    'ton', 'ta', 'votre', 'vos', 'son', 'sa', 'ses', 'nous', 'vous', 'ils', 'elles', 'il',
    'elle', 'je', 'tu', 'on', 'se', 'ne', 'pas', 'plus', 'moins', 'comme', 'si', 'mais',
    'donc', 'car', 'y', 'd', 'l', 'j', 'c', 's', 'n', 'the', 'a', 'an', 'of', 'to', 'in',
    'on', 'for', 'and', 'or', 'is', 'are', 'be', 'with', 'without', 'what', 'which', 'how',
    'when', 'who', 'do', 'does', 'can', 'my', 'your', 'it', 'this', 'that', 'these', 'i',
    'about', 'between', 'vs', 'me', 'peux', 'peut', 'faut', 'entre', 'quand', 'comment'
]);

// Expansion de requête : chaque terme déclenche des synonymes/traductions.
// Permet à une question EN de matcher un corpus FR (et inversement).
const SYNONYMS = {
    pdm: ['coffre', 'vault', 'product', 'data', 'management'],
    plm: ['lifecycle', 'cycle', 'vie', 'produit'],
    coffre: ['pdm', 'vault'],
    vault: ['coffre', 'pdm'],
    solidworks: ['sw', 'swpdm', 'cao', 'cad'],
    standard: ['express'],
    professional: ['pro'],
    pro: ['professional'],
    bom: ['nomenclature', 'nomenclatures', 'ebom', 'mbom'],
    nomenclature: ['bom', 'ebom', 'mbom'],
    migration: ['migrer', 'reprise', 'migrate', 'migrating'],
    migrer: ['migration', 'reprise'],
    lent: ['lenteur', 'slow', 'performance', 'lentes'],
    lenteur: ['lent', 'slow', 'performance'],
    performance: ['lent', 'lenteur', 'slow', 'optimisation'],
    eco: ['ecr', 'modification', 'change', 'revision'],
    ecr: ['eco', 'modification', 'change'],
    modification: ['eco', 'ecr', 'change'],
    cloud: ['3dexperience', 'saas', 'ligne'],
    erp: ['sap', 'sage', 'cegid', 'clipper', 'integration'],
    integration: ['erp', 'sap', 'integrer'],
    prix: ['cout', 'tarif', 'devis', 'price', 'cost'],
    cout: ['prix', 'tarif', 'price', 'cost'],
    materiel: ['hardware', 'configuration', 'poste', 'workstation'],
    hardware: ['materiel', 'configuration', 'poste'],
    choisir: ['choix', 'choose', 'comparatif', 'difference', 'comparison'],
    difference: ['comparatif', 'choisir', 'versus', 'compare'],
    visiativ: ['integrateur', 'reseller', 'var', 'partenaire'],
    omar: ['baouch', 'consultant', 'profil', 'experience'],
    contact: ['devis', 'rendez-vous', 'projet', 'mail', 'email'],
    utilisateurs: ['users', 'postes', 'equipe', 'team'],
    replication: ['multi-site', 'multisite', 'sites'],
    web: ['web2', 'distant', 'remote', 'navigateur'],
    archiver: ['archivage', 'checkin'],
    archivage: ['archiver', 'checkin'],
    checkin: ['archivage', 'archiver'],
    extraire: ['extraction', 'checkout'],
    extraction: ['extraire', 'checkout'],
    checkout: ['extraction', 'extraire'],
    workflow: ['flux', 'travail', 'transition'],
    flux: ['workflow'],
    carte: ['card', 'donnees'],
    card: ['carte', 'donnees'],
    revision: ['indice', 'version'],
    indice: ['revision', 'version'],
    tache: ['task', 'conversion'],
    task: ['tache'],
    notification: ['notifier', 'alerte'],
    smartproperties: ['proprietes', 'variables'],
    smartbom: ['nomenclature', 'bom'],
    batchconverter: ['conversion', 'lot'],
    mycadtools: ['visiativ', 'utilitaires'],
    mypdmtools: ['visiativ', 'pdm']
};

// Normalise (minuscule, retire accents/diacritiques).
function normalize(text) {
    return String(text || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

// Stemming FR léger et symétrique (index + requête) : féminins/pluriels et
// suffixes fréquents, suffisant pour rapprocher « révision(s) », « migrations »…
function stem(t) {
    if (t.length > 7 && /(ations|ements|ements)$/.test(t)) return t.slice(0, -1);
    if (t.length > 5 && /(aux|eux)$/.test(t)) return t.slice(0, -3) + 'a';
    if (t.length > 4 && /(es|s|x)$/.test(t)) return t.replace(/(es|s|x)$/, '');
    return t;
}

// Tokenise en gardant les tokens utiles (>=2 caractères, hors mots vides).
function tokenize(text) {
    return normalize(text)
        .split(/[^a-z0-9]+/)
        .filter(t => t.length >= 2 && !STOPWORDS.has(t))
        .map(stem);
}

// Table de synonymes re-clefée sur les formes stemmées, pour rester
// cohérente avec la tokenisation (index et requête passent par stem()).
const STEMMED_SYNONYMS = (() => {
    const map = new Map();
    for (const [key, vals] of Object.entries(SYNONYMS)) {
        map.set(stem(normalize(key)), vals.map(v => stem(normalize(v))));
    }
    return map;
})();

// Applique l'expansion de synonymes à une liste de tokens.
function expand(tokens) {
    const out = new Set(tokens);
    for (const t of tokens) {
        const syns = STEMMED_SYNONYMS.get(t);
        if (syns) for (const s of syns) out.add(s);
    }
    return [...out];
}

// ── Index BM25 construit une seule fois au chargement du module ──
const K1 = 1.5;
const B = 0.75;

const INDEX = (() => {
    const all = [
        ...KB_DOCS.map(doc => ({ doc, boost: KB_BOOST })),
        ...CORPUS_SW.map(doc => ({ doc, boost: 1 })),
        ...CORPUS_VISIATIV.map(doc => ({ doc, boost: 1 }))
    ];
    const docs = all.map(({ doc, boost }) => {
        // Le texte + les tags sont indexés ; le titre est légèrement survalorisé.
        const tokens = tokenize(`${doc.title} ${doc.title} ${(doc.tags || []).join(' ')} ${doc.text}`);
        const tf = new Map();
        for (const t of tokens) tf.set(t, (tf.get(t) || 0) + 1);
        return { doc, boost, tf, len: tokens.length };
    });
    const N = docs.length;
    const avgdl = docs.reduce((s, d) => s + d.len, 0) / (N || 1);
    const df = new Map();
    for (const d of docs) for (const term of d.tf.keys()) df.set(term, (df.get(term) || 0) + 1);
    const idf = new Map();
    for (const [term, freq] of df) {
        idf.set(term, Math.log(1 + (N - freq + 0.5) / (freq + 0.5)));
    }
    return { docs, avgdl, idf, N };
})();

// Score BM25 d'un document pour une liste de termes de requête.
function scoreDoc(entry, queryTerms) {
    let score = 0;
    for (const term of queryTerms) {
        const f = entry.tf.get(term);
        if (!f) continue;
        const idf = INDEX.idf.get(term) || 0;
        const denom = f + K1 * (1 - B + B * (entry.len / INDEX.avgdl));
        score += idf * (f * (K1 + 1)) / denom;
    }
    return score;
}

/**
 * Récupère les documents les plus pertinents pour une requête.
 * @param {string} query   La question du visiteur.
 * @param {object} opts    { k = 4, minScore = 0.1 }
 * @returns {Array<{doc, score}>}
 */
export function retrieve(query, { k = 4, minScore = 0.1 } = {}) {
    const baseTokens = tokenize(query);
    if (!baseTokens.length) return [];
    const queryTerms = expand(baseTokens);

    const ranked = INDEX.docs
        .map(entry => ({ doc: entry.doc, score: scoreDoc(entry, queryTerms) * entry.boost }))
        .filter(r => r.score > minScore)
        .sort((a, b) => b.score - a.score);

    // Diversité : au plus 2 chunks d'une même page pour ne pas saturer le
    // budget avec un seul document long.
    const perUrl = new Map();
    const out = [];
    for (const r of ranked) {
        const key = r.doc.url || r.doc.id;
        const n = perUrl.get(key) || 0;
        if (n >= 2) continue;
        perUrl.set(key, n + 1);
        out.push(r);
        if (out.length >= k) break;
    }
    return out;
}

/**
 * Formate les documents récupérés en un bloc texte injectable dans le prompt.
 * @param {Array<{doc, score}>} results
 * @param {string} lang  'fr' | 'en' (pour l'entête)
 * @param {number} maxChars  budget total du bloc
 * @returns {string}  bloc formaté, ou '' si rien.
 */
export function formatRetrieved(results, lang = 'fr', maxChars = 4200) {
    if (!results || !results.length) return '';
    const header = lang === 'en'
        ? 'KNOWLEDGE BASE (curated facts to ground your answer — cite the article link when relevant, never invent one):'
        : "BASE DE CONNAISSANCES (faits vérifiés pour appuyer ta réponse — cite le lien de l'article quand c'est pertinent, n'en invente jamais) :";

    const parts = [header];
    let total = header.length;
    for (const { doc } of results) {
        const label = doc.guide ? `${doc.guide} — ${doc.title}` : doc.title;
        const block = `\n[${label}] (${doc.url})\n${doc.text}`;
        if (total + block.length > maxChars) break;
        parts.push(block);
        total += block.length;
    }
    return parts.length > 1 ? parts.join('\n') : '';
}

/**
 * Raccourci : récupère et formate en une passe.
 */
export function buildKnowledge(query, { lang = 'fr', k = 4, maxChars = 4200 } = {}) {
    return formatRetrieved(retrieve(query, { k }), lang, maxChars);
}
