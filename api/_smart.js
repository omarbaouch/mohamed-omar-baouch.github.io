// api/_smart.js
// Étages « intelligents » du RAG, tous optionnels et non bloquants :
//  - rewriteQuestion : transforme une question de suivi en question autonome
//    (mémoire conversationnelle appliquée à la recherche, pas juste au prompt)
//  - embedQuery      : vecteur sémantique de la question (recherche dense)
//  - rerank          : re-classement LLM des candidats retrouvés
// Chaque étage échoue en silence : le pipeline retombe sur le BM25 seul.
// Le préfixe « _ » évite que Vercel en fasse une route HTTP.

import { fetchWithTimeout } from './_assistant.js';

const LITE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent';
const EMBED_MODEL = 'gemini-embedding-001';
const EMBED_URL = `https://generativelanguage.googleapis.com/v1beta/models/${EMBED_MODEL}:embedContent`;
export const EMBED_DIM = 768;

async function liteCall(prompt, key, { maxTokens = 96, timeoutMs = 3500 } = {}) {
    const r = await fetchWithTimeout(LITE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
        body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0, maxOutputTokens: maxTokens, thinkingConfig: { thinkingBudget: 0 } }
        })
    }, timeoutMs);
    if (!r.ok) throw new Error(`lite ${r.status}`);
    const data = await r.json();
    const text = data.candidates?.[0]?.content?.parts?.map(p => p.text).filter(Boolean).join('').trim();
    if (!text) throw new Error('lite empty');
    return text;
}

/**
 * Reformule une question de suivi en question autonome pour la recherche.
 * Renvoie null si inutile ou en cas d'échec (l'appelant garde la question brute).
 */
export async function rewriteQuestion(question, history, key) {
    if (!Array.isArray(history) || !history.length) return null;
    const convo = history.slice(-6)
        .map(t => `${t.role === 'assistant' ? 'Assistant' : 'Visiteur'}: ${String(t.content).slice(0, 350)}`)
        .join('\n');
    const prompt = `Voici une conversation et une nouvelle question du visiteur. Réécris la nouvelle question en UNE question autonome et complète (en français), compréhensible sans la conversation, en résolvant les pronoms et références implicites. Réponds UNIQUEMENT par la question réécrite, rien d'autre.

Conversation:
${convo}

Nouvelle question: ${question}`;
    try {
        const out = await liteCall(prompt, key, { maxTokens: 120, timeoutMs: 3500 });
        const line = out.split('\n')[0].trim();
        return line.length > 3 && line.length < 400 ? line : null;
    } catch {
        return null;
    }
}

/**
 * Vecteur d'embedding de la question (float32 normalisé), ou null en cas d'échec.
 */
export async function embedQuery(text, key) {
    try {
        const r = await fetchWithTimeout(EMBED_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
            body: JSON.stringify({
                model: `models/${EMBED_MODEL}`,
                content: { parts: [{ text: String(text).slice(0, 2000) }] },
                taskType: 'RETRIEVAL_QUERY',
                outputDimensionality: EMBED_DIM
            })
        }, 3000);
        if (!r.ok) return null;
        const data = await r.json();
        const v = data.embedding?.values;
        if (!Array.isArray(v) || v.length !== EMBED_DIM) return null;
        const norm = Math.sqrt(v.reduce((s, x) => s + x * x, 0)) || 1;
        return v.map(x => x / norm);
    } catch {
        return null;
    }
}

/**
 * Re-classe les candidats par pertinence via un LLM léger.
 * @param {string} question
 * @param {Array<{doc}>} results  candidats (ordre BM25/hybride)
 * @param {string} key
 * @param {number} keep  nombre d'extraits à garder
 * @returns {Array|null}  résultats réordonnés, ou null en cas d'échec.
 */
export async function rerank(question, results, key, keep = 6) {
    if (!results || results.length <= keep) return null;
    const listing = results
        .map((r, i) => `${i + 1}. [${r.doc.guide || 'Portfolio'}] ${r.doc.title} — ${r.doc.text.slice(0, 180).replace(/\s+/g, ' ')}`)
        .join('\n');
    const prompt = `Question du visiteur : "${question}"

Voici ${results.length} extraits de documentation numérotés. Choisis les ${keep} extraits les PLUS utiles pour répondre précisément à la question. Réponds UNIQUEMENT par les numéros choisis, du plus utile au moins utile, séparés par des virgules (exemple : 3,1,7,2,9,4).

${listing}`;
    try {
        const out = await liteCall(prompt, key, { maxTokens: 48, timeoutMs: 4000 });
        const picks = [...new Set((out.match(/\d+/g) || []).map(Number))]
            .filter(n => n >= 1 && n <= results.length)
            .slice(0, keep);
        if (picks.length < 2) return null;
        return picks.map(n => results[n - 1]);
    } catch {
        return null;
    }
}
