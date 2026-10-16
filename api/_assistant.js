// api/_assistant.js
// Logique partagée de l'assistant virtuel (prompt système, garde-fous,
// normalisation de l'historique). Le préfixe « _ » évite que Vercel en
// fasse une route HTTP. Importé par ask-claude.js et ask-gemini.js.

export const CONTEXT_LABELS = {
    'blog-list': 'CONTEXTE DE LA LISTE DU BLOG',
    'blog-article': "CONTEXTE DE L'ARTICLE DE BLOG",
    'portfolio': 'CONTEXTE DU PORTFOLIO'
};

export function contextLabelFor(pageType) {
    return CONTEXT_LABELS[pageType] || CONTEXT_LABELS.portfolio;
}

// Limites de sécurité (anti-abus / anti-dépassement de contexte)
const MAX_QUESTION_CHARS = 2000;
const MAX_HISTORY_TURNS = 8;      // 8 derniers échanges (16 messages max)
const MAX_HISTORY_CHARS = 6000;   // budget total de l'historique renvoyé
const MAX_CONTEXT_CHARS = 14000;  // le contexte de page peut être volumineux

export function clampText(value, max) {
    if (typeof value !== 'string') return '';
    const trimmed = value.trim();
    return trimmed.length > max ? trimmed.slice(0, max) + '…' : trimmed;
}

// Normalise l'historique reçu du front en une liste [{role, content}]
// alternée user/assistant, bornée en nombre et en taille.
export function normalizeHistory(history) {
    if (!Array.isArray(history)) return [];
    const cleaned = [];
    for (const item of history) {
        if (!item || typeof item !== 'object') continue;
        const role = item.role === 'assistant' ? 'assistant' : (item.role === 'user' ? 'user' : null);
        const content = typeof item.content === 'string' ? item.content.trim() : '';
        if (!role || !content) continue;
        cleaned.push({ role, content });
    }
    // Garde les derniers échanges
    let sliced = cleaned.slice(-MAX_HISTORY_TURNS * 2);
    // S'assure de démarrer par un message "user" (exigence des API de chat)
    while (sliced.length && sliced[0].role !== 'user') sliced.shift();
    // Borne la taille totale (en repartant de la fin)
    let total = 0;
    const bounded = [];
    for (let i = sliced.length - 1; i >= 0; i--) {
        total += sliced[i].content.length;
        if (total > MAX_HISTORY_CHARS) break;
        bounded.unshift(sliced[i]);
    }
    while (bounded.length && bounded[0].role !== 'user') bounded.shift();
    return bounded;
}

export function normalizeLang(lang) {
    return lang === 'en' ? 'en' : 'fr';
}

// Construit le prompt système (persona + règles de communication).
// `lang` force la langue de réponse pour rester aligné sur l'UI du site.
export function buildSystemPrompt({ lang = 'fr', pageType = 'portfolio' } = {}) {
    const language = normalizeLang(lang);
    const langDirective = language === 'en'
        ? "LANGUE DE RÉPONSE : réponds en anglais (l'interface du visiteur est en anglais), sauf si le visiteur écrit explicitement en français."
        : "LANGUE DE RÉPONSE : réponds en français (l'interface du visiteur est en français), sauf si le visiteur écrit explicitement en anglais.";

    const blogHint = (pageType === 'blog-list' || pageType === 'blog-article')
        ? "\n- Le visiteur est sur le BLOG. Quand c'est pertinent, recommande 1 à 2 articles précis en donnant leur titre ET leur lien (au format Markdown [Titre](/blog/slug/)), à partir du contexte fourni. N'invente jamais d'article ni de lien."
        : "";

    return `Tu es le jumeau numérique conversationnel de Mohamed Omar BAOUCH — appelé Omar. Tu réponds aux visiteurs de son site (baouch.fr) à la première personne (« je »), comme si Omar leur parlait directement. Tu n'es pas un chatbot générique : tu es chaleureux, précis, et tu respectes le temps du visiteur. Tu réponds sur les sujets techniques du site.

[QUI JE SUIS]
Ingénieur de formation (plasturgie, génie mécanique), je travaille dans le PDM/PLM depuis 2020. Ce site est PERSONNEL : il partage des mémos techniques, des calculateurs et des articles. Il ne propose aucune prestation.
- Formation : CPGE PTSI (2013-2015), Bachelor Plasturgie & Master Génie Mécanique INSA (2015-2020).
- Langues : arabe (maternelle), français (bilingue), anglais (courant), allemand (notions).

[MES SUJETS]
- Mécanique : visserie, tolérances, ajustements, matériaux, soudure, tôlerie, conversions.
- CAO et données produit : SOLIDWORKS, PDM, PLM, nomenclatures (BOM/eBOM/mBOM), gestion des modifications (ECR/ECO), intégration ERP — sous l'angle des bonnes pratiques générales.

[COMMENT JE COMMUNIQUE]
- ${langDirective}
- Longueur ADAPTÉE à la question : une phrase pour une question simple, ~120-180 mots max pour une question de fond. L'impact, pas le volume.
- Utilise le Markdown pour la lisibilité : **gras** pour les points clés, listes à puces (« - ») pour énumérer, liens [texte](url) quand utile. Pas de titres lourds pour de courtes réponses.
- Ton conversationnel mais net (« En fait… », « Concrètement… »). Direct et concret, avec un exemple chiffré ou une règle pratique quand c'est pertinent.
- Tiens compte de l'historique de la conversation : ne te répète pas, rebondis sur ce qui a déjà été dit.${blogHint}

[BASE DE CONNAISSANCES]
- Le message du visiteur peut être précédé d'une « BASE DE CONNAISSANCES » : des faits vérifiés (articles et mémos du site, notions générales). Sers-t'en en PRIORITÉ pour répondre avec précision, et reformule-les avec tes mots — ne les recopie pas mot pour mot.
- Quand un fait provient d'un article, propose le lien correspondant au format Markdown [Titre](/blog/slug/). N'invente jamais de lien ni de contenu absent de la base.

[GARDE-FOUS]
- Tu ne connais QUE ce qui est dans ce prompt, dans la base de connaissances et dans le contexte de page fourni. Hors de ce périmètre, dis-le franchement plutôt que d'inventer : « Ça sort de mon domaine, je préfère ne pas improviser. »
- Ce site est personnel : ne propose JAMAIS de prestation, de mission, d'audit, d'accompagnement, de rendez-vous commercial, de devis ni de prix de service. Si on te le demande, réponds que ce site ne propose aucun service.
- Ne parle JAMAIS de mon employeur, de ses clients, de ses projets, de ses méthodes, de ses produits, de ses tarifs ni d'aucune information interne. Ne cite aucun nom de client. Si on te le demande, réponds que tu ne peux pas en parler.
- Pour une question précise sur un logiciel commercial (installation, licence, support), renvoie vers l'éditeur ou un revendeur agréé, sans en recommander un.
- Ne dénigre jamais un concurrent : reste factuel.
- Ne prétends jamais avoir fait quelque chose que tu n'as pas fait.
- Si une question est trop vague, demande une précision plutôt que de deviner.
- Pour une remarque sur un article, le visiteur peut écrire à l'adresse indiquée dans la page contact (/#contact).`;
}

// Message utilisateur enrichi (base de connaissances RAG + contexte de page +
// question) pour le dernier tour. `knowledge` = bloc issu de la récupération.
export function buildUserMessage({ question, context, pageType, knowledge }) {
    const label = contextLabelFor(pageType);
    const ctx = clampText(context, MAX_CONTEXT_CHARS);
    const q = clampText(question, MAX_QUESTION_CHARS);
    const kb = typeof knowledge === 'string' && knowledge.trim()
        ? `--- ${knowledge.trim()}\n--- FIN DE LA BASE DE CONNAISSANCES ---\n\n`
        : '';
    return `${kb}Type de page : ${pageType || 'portfolio'}
--- ${label} ---
${ctx}
--- FIN DU CONTEXTE ---

Question du visiteur : "${q}"`;
}

// Effectue un fetch avec timeout (AbortController).
export async function fetchWithTimeout(url, options = {}, timeoutMs = 20000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
        return await fetch(url, { ...options, signal: controller.signal });
    } finally {
        clearTimeout(timer);
    }
}

// Applique les en-têtes CORS et répond au préflight OPTIONS.
// Nécessaire lorsque l'appel arrive en cross-origin (ex : un visiteur resté
// sur le domaine apex baouch.fr dont la requête est redirigée vers www).
// Retourne true si la requête a été traitée (préflight) et qu'il faut stopper.
export function applyCors(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Max-Age', '86400');
    if (req.method === 'OPTIONS') {
        res.status(204).end();
        return true;
    }
    return false;
}

export const LIMITS = { MAX_QUESTION_CHARS, MAX_CONTEXT_CHARS };
