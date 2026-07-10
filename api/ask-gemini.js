// api/ask-gemini.js
// Assistant virtuel via Gemini 2.5 Flash (backend de repli, gratuit).
// Même contrat que ask-claude.js : mémoire conversationnelle, langue, garde-fous.

import {
    buildSystemPrompt,
    buildUserMessage,
    normalizeHistory,
    normalizeLang,
    fetchWithTimeout,
    applyCors
} from './_assistant.js';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

// RAG hybride multi-étages, optionnel et NON bloquant : chaque étage
// (reformulation contextuelle, recherche dense, reranking LLM) échoue en
// silence et le pipeline retombe sur l'étage précédent — au pire le chatbot
// répond via Gemini seul, sans bloc de connaissances.
async function safeKnowledge(question, history, language, apiKey) {
    try {
        const { retrieve, formatRetrieved, hasDense } = await import('./_rag.js');
        const { rewriteQuestion, embedQuery, rerank } = await import('./_smart.js');

        // 1) Question de suivi → question autonome (sinon la recherche rate).
        let searchQ = question;
        const rewritten = await rewriteQuestion(question, history, apiKey);
        if (rewritten) searchQ = rewritten;

        // 2) Recherche hybride : BM25 + dense (si vecteurs disponibles).
        const queryVec = hasDense() ? await embedQuery(searchQ, apiKey) : null;
        let results = retrieve(searchQ, { k: 18, queryVec });

        // 3) Reranking LLM des candidats, puis coupe au budget final.
        const reranked = await rerank(searchQ, results, apiKey, 6);
        results = (reranked || results).slice(0, 6);

        return formatRetrieved(results, language, 6500) || '';
    } catch (err) {
        console.error('RAG indisponible (ignoré):', err && err.message);
        return '';
    }
}

export default async (req, res) => {
    if (applyCors(req, res)) return; // préflight OPTIONS traité
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { question, context, pageType, history, lang } = req.body || {};
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!question || !context) {
        return res.status(400).json({ error: 'Question and context are required' });
    }
    if (!GEMINI_API_KEY) {
        return res.status(503).json({ error: 'Gemini API key not configured' });
    }

    const language = normalizeLang(lang);
    const normalizedPageType = typeof pageType === 'string' ? pageType : 'portfolio';
    const systemPrompt = buildSystemPrompt({ lang: language, pageType: normalizedPageType });

    // Historique → format Gemini (role "model" pour l'assistant).
    const normalizedHistory = normalizeHistory(history);
    const contents = normalizedHistory.map(turn => ({
        role: turn.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: turn.content }]
    }));
    // RAG hybride : reformulation contextuelle + BM25 + dense + reranking.
    const knowledge = await safeKnowledge(question, normalizedHistory, language, GEMINI_API_KEY);
    contents.push({
        role: 'user',
        parts: [{ text: buildUserMessage({ question, context, pageType: normalizedPageType, knowledge }) }]
    });

    const payload = {
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents,
        generationConfig: {
            temperature: 0.6,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024
        }
    };

    try {
        const geminiResponse = await fetchWithTimeout(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': GEMINI_API_KEY
            },
            body: JSON.stringify(payload)
        }, 22000);

        if (!geminiResponse.ok) {
            const errorBody = await geminiResponse.text();
            console.error('Gemini API Error:', geminiResponse.status, errorBody);
            return res.status(502).json({ error: 'Gemini API error', status: geminiResponse.status });
        }

        const data = await geminiResponse.json();
        const answer = data.candidates?.[0]?.content?.parts?.map(p => p.text).filter(Boolean).join('').trim();

        if (answer) {
            return res.status(200).json({ answer, provider: 'gemini' });
        }
        return res.status(502).json({ error: 'Empty or invalid response from Gemini API' });
    } catch (error) {
        const aborted = error && error.name === 'AbortError';
        console.error('Error calling Gemini API:', error);
        return res.status(502).json({ error: aborted ? 'Gemini API timeout' : (error.message || 'Gemini API failure') });
    }
};
