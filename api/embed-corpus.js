// api/embed-corpus.js
// ROUTE TEMPORAIRE D'INGESTION — à supprimer après le précalcul des embeddings.
// Embarque une plage de chunks du corpus via l'API Gemini (la clé n'existe
// qu'en variable d'environnement Vercel) et renvoie les vecteurs quantifiés.
// Lecture seule sur un corpus figé ; protégée par jeton.

import { ALL_DOCS } from './_alldocs.js';
import { fetchWithTimeout } from './_assistant.js';

const TOKEN = '1369c20c0d64af2eb09fe403b69cd513';
const MODEL = 'gemini-embedding-001';
const DIM = 768;
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:batchEmbedContents`;

export default async (req, res) => {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
    const { token, start = 0, count = 40 } = req.body || {};
    if (token !== TOKEN) return res.status(403).json({ error: 'Forbidden' });
    const key = process.env.GEMINI_API_KEY;
    if (!key) return res.status(503).json({ error: 'No API key' });

    const slice = ALL_DOCS.slice(start, start + Math.min(count, 100));
    if (!slice.length) return res.status(200).json({ done: true, total: ALL_DOCS.length });

    const payload = {
        requests: slice.map(d => ({
            model: `models/${MODEL}`,
            content: { parts: [{ text: `${d.title}\n${d.text}`.slice(0, 7000) }] },
            taskType: 'RETRIEVAL_DOCUMENT',
            outputDimensionality: DIM
        }))
    };
    try {
        const r = await fetchWithTimeout(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
            body: JSON.stringify(payload)
        }, 50000);
        if (!r.ok) {
            const body = await r.text();
            return res.status(502).json({ error: 'embed failed', status: r.status, body: body.slice(0, 500) });
        }
        const data = await r.json();
        // Quantification int8 avec échelle par vecteur (après normalisation L2).
        const out = data.embeddings.map((e, i) => {
            const v = e.values;
            const norm = Math.sqrt(v.reduce((s, x) => s + x * x, 0)) || 1;
            const n = v.map(x => x / norm);
            const maxabs = Math.max(...n.map(Math.abs)) || 1;
            const q = n.map(x => Math.max(-127, Math.min(127, Math.round(x / maxabs * 127))));
            return { id: ALL_DOCS[start + i].id, scale: maxabs / 127, q };
        });
        return res.status(200).json({ model: MODEL, dim: DIM, start, n: out.length, total: ALL_DOCS.length, vectors: out });
    } catch (err) {
        return res.status(502).json({ error: err.message || 'embed error' });
    }
};
