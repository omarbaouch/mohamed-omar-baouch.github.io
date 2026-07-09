// api/ask-gemini.js
// Assistant virtuel via Gemini 2.5 Flash (backend de repli, gratuit).
// Même contrat que ask-claude.js : mémoire conversationnelle, langue, garde-fous.

import {
    buildSystemPrompt,
    buildUserMessage,
    normalizeHistory,
    normalizeLang,
    fetchWithTimeout
} from './_assistant.js';
import { buildKnowledge } from './_rag.js';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

export default async (req, res) => {
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
    const contents = normalizeHistory(history).map(turn => ({
        role: turn.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: turn.content }]
    }));
    // RAG : récupère les faits pertinents de la base curée pour ancrer la réponse.
    const knowledge = buildKnowledge(question, { lang: language, k: 4 });
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
