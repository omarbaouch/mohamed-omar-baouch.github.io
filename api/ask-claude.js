// api/ask-claude.js
// Assistant virtuel via Claude (Anthropic) — Claude Haiku 4.5.
// Gère la mémoire conversationnelle, la langue et des garde-fous robustes.

import {
    buildSystemPrompt,
    buildUserMessage,
    normalizeHistory,
    normalizeLang,
    fetchWithTimeout
} from './_assistant.js';

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { question, context, pageType, history, lang } = req.body || {};
    const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

    if (!question || !context) {
        return res.status(400).json({ error: 'Question and context are required' });
    }
    if (!ANTHROPIC_API_KEY) {
        // Permet au front de basculer vers le backend Gemini.
        return res.status(503).json({ error: 'Claude API key not configured', fallback: true });
    }

    const language = normalizeLang(lang);
    const normalizedPageType = typeof pageType === 'string' ? pageType : 'portfolio';
    const systemPrompt = buildSystemPrompt({ lang: language, pageType: normalizedPageType });

    const messages = [
        ...normalizeHistory(history),
        { role: 'user', content: buildUserMessage({ question, context, pageType: normalizedPageType }) }
    ];

    const payload = {
        model: 'claude-haiku-4-5',
        max_tokens: 1024,
        system: systemPrompt,
        messages
    };

    try {
        const claudeResponse = await fetchWithTimeout('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify(payload)
        }, 22000);

        if (!claudeResponse.ok) {
            const errorBody = await claudeResponse.text();
            console.error('Claude API Error:', claudeResponse.status, errorBody);
            // 5xx / surcharge : le front pourra tenter Gemini.
            const fallback = claudeResponse.status >= 500 || claudeResponse.status === 429;
            return res.status(502).json({ error: 'Claude API error', status: claudeResponse.status, fallback });
        }

        const data = await claudeResponse.json();
        const answer = Array.isArray(data.content)
            ? data.content.filter(b => b.type === 'text').map(b => b.text).join('\n').trim()
            : '';

        if (answer) {
            return res.status(200).json({ answer, provider: 'claude' });
        }
        return res.status(502).json({ error: 'Empty response from Claude API', fallback: true });
    } catch (error) {
        const aborted = error && error.name === 'AbortError';
        console.error('Error calling Claude API:', error);
        return res.status(502).json({ error: aborted ? 'Claude API timeout' : (error.message || 'Claude API failure'), fallback: true });
    }
};
