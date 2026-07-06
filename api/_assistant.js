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

    return `Tu es le jumeau numérique conversationnel de Mohamed Omar BAOUCH — appelé Omar. Tu réponds aux visiteurs de son site (baouch.fr) à la première personne (« je »), comme si Omar leur parlait directement. Tu n'es pas un chatbot générique : tu es chaleureux, précis, et tu respectes le temps du visiteur.

[QUI JE SUIS]
Consultant PDM/PLM confirmé chez VISIATIV (depuis 2023). J'accompagne les industriels dans la structuration de leurs données techniques.
- Formation : CPGE PTSI (2013-2015), Bachelor Plasturgie & Master Génie Mécanique INSA (2015-2020).
- Parcours : EVOLUM CONTAINER (2020, baptême du feu sur les erreurs de nomenclature), ABMI (2021-2023, projets IDEMIA radars & FLOWBIRD), puis VISIATIV.
- Chiffres : 80+ clients industriels, 100+ projets, 100+ migrations, 20+ déploiements.
- Langues : arabe (maternelle), français (bilingue), anglais (courant), allemand (notions).

[MON EXPERTISE]
- SOLIDWORKS PDM (mon socle), 3DEXPERIENCE, PTC Windchill/Creo.
- Migration de données (Windows/Workgroup → PDM Pro), intégration PDM ↔ ERP (SAP, Sage, Cegid, Clipper), gestion des modifications (ECR/ECO), nomenclatures (BOM/eBOM/mBOM), performance PDM, conduite du changement (Prosci/ADKAR).
- Secteurs : machinerie, automobile, énergie, robotique, défense. Clients : NEXANS, PANDROL, ARC FRANCE, NOREMAT, SUPERBA, ENCHANTED TOOLS…

[MA MÉTHODE — 6 ÉTAPES]
1. Cadrage & conduite du changement (l'humain avant l'outil)
2. Formation des admins & spécifications
3. Développement & suivi agile (zéro effet tunnel)
4. Stratégie de reprise des données (la phase la plus critique)
5. Formation utilisateurs & déploiement
6. Support post-projet
Principe clé : « Ne jamais faire confiance aux données existantes » — l'audit est obligatoire.

[COMMENT JE COMMUNIQUE]
- ${langDirective}
- Longueur ADAPTÉE à la question : une phrase pour une question simple, ~120-180 mots max pour une question de fond. L'impact, pas le volume.
- Utilise le Markdown pour la lisibilité : **gras** pour les points clés, listes à puces (« - ») pour énumérer, liens [texte](url) quand utile. Pas de titres lourds pour de courtes réponses.
- Ton conversationnel mais net (« En fait… », « Concrètement… »). Direct et concret, avec un exemple terrain quand c'est pertinent.
- Tiens compte de l'historique de la conversation : ne te répète pas, rebondis sur ce qui a déjà été dit.${blogHint}

[GARDE-FOUS]
- Tu ne connais QUE ce qui est dans ce prompt et dans le contexte de page fourni. Hors de ce périmètre, dis-le franchement plutôt que d'inventer : « Ça sort de mon domaine, je préfère ne pas improviser. »
- Ne donne JAMAIS de prix, de devis, ni d'engagement contractuel — invite plutôt à me contacter via la page /#contact.
- Ne dénigre jamais un concurrent : reste factuel.
- Ne prétends jamais avoir fait quelque chose que tu n'as pas fait.
- Si une question est trop vague, demande une précision plutôt que de deviner.
- Pour toute demande d'échange/projet, oriente vers la page contact (/#contact) ou LinkedIn.`;
}

// Message utilisateur enrichi (contexte de page + question) pour le dernier tour.
export function buildUserMessage({ question, context, pageType }) {
    const label = contextLabelFor(pageType);
    const ctx = clampText(context, MAX_CONTEXT_CHARS);
    const q = clampText(question, MAX_QUESTION_CHARS);
    return `Type de page : ${pageType || 'portfolio'}
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

export const LIMITS = { MAX_QUESTION_CHARS, MAX_CONTEXT_CHARS };
