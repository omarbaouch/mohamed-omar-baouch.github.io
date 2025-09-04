// Fichier : /api/ask-gemini.js
// Version corrigée qui utilise un header pour l'API Key

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { question, context } = req.body;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!question || !context) {
        return res.status(400).json({ error: 'Question and context are required' });
    }
    
    if (!GEMINI_API_KEY) {
         return res.status(500).json({ error: 'API Key not configured on the server' });
    }
    
    // --- MODIFICATION N°1 : L'URL est simplifiée, sans la clé API ---
    // Nous utilisons aussi un modèle plus récent que vous avez trouvé.
    const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

    const prompt = `
        Tu es l'assistant virtuel de Mohamed Omar Baouch, un ingénieur et consultant PDM/PLM.
        Ton rôle est de répondre aux questions des visiteurs de son portfolio de manière professionnelle, concise et amicale.
        Utilise STRICTEMENT et UNIQUEMENT les informations fournies dans le CONTEXTE ci-dessous. N'invente rien.
        Si une question sort de ce cadre, réponds poliment que tu ne peux répondre qu'aux questions concernant le profil de Mohamed et suggère de le contacter via le formulaire.
        Réponds en français. Utilise des listes à puces si cela rend la réponse plus claire.

        --- CONTEXTE DU PORTFOLIO ---
        ${context}
        --- FIN DU CONTEXTE ---

        Question du visiteur : "${question}"

        Ta réponse :
    `;

    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
            temperature: 0.5,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
        }
    };

    try {
        const geminiResponse = await fetch(GEMINI_API_URL, {
            method: 'POST',
            // --- MODIFICATION N°2 : La clé est maintenant dans les "headers" ---
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': GEMINI_API_KEY,
            },
            body: JSON.stringify(payload),
        });

        if (!geminiResponse.ok) {
            // Pour nous aider à déboguer si ça échoue encore
            const errorBody = await geminiResponse.text();
            console.error('Gemini API Error:', errorBody);
            throw new Error(`Gemini API responded with status ${geminiResponse.status}`);
        }

        const data = await geminiResponse.json();

        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
            const rawText = data.candidates[0].content.parts[0].text;
            res.status(200).json({ answer: rawText });
        } else {
             res.status(500).json({ error: 'Invalid response structure from Gemini API' });
        }
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        res.status(500).json({ error: 'Failed to get a response from the AI assistant.' });
    }
};
