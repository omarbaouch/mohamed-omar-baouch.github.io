// api/_kb.js
// Base de connaissances curée de l'assistant (RAG).
// Le préfixe « _ » évite que Vercel en fasse une route HTTP.
//
// IMPORTANT — provenance : synthèse ORIGINALE de notions générales et des
// articles du site. Aucune information sur un employeur, ses clients, ses
// projets, ses méthodes ou ses tarifs : ce site est personnel et ne propose
// aucune prestation.
//
// Chaque document : { id, title, url, tags[], text }.
// `tags` contient des mots-clés FR ET EN pour que la recherche fonctionne
// dans les deux langues même si le texte est en français.

export const KB_DOCS = [
    // ─────────────────────────── PORTFOLIO / OMAR ───────────────────────────
    {
        id: 'omar-profil',
        title: 'Qui est Omar',
        url: '/#about',
        tags: ['omar', 'baouch', 'ingenieur', 'engineer', 'pdm', 'plm', 'profile', 'about', 'experience', 'career', 'parcours', 'who'],
        text: "Mohamed Omar BAOUCH est ingénieur de formation (Bachelor Plasturgie et Master Génie Mécanique à l'INSA, après une CPGE PTSI) et travaille dans le PDM/PLM depuis 2020. Ce site est personnel : il partage des mémos techniques, des calculateurs et des articles, et ne propose aucune prestation. Langues : arabe (maternelle), français (bilingue), anglais (courant), allemand (notions)."
    },
    {
        id: 'omar-expertise',
        title: 'Sujets traités sur le site',
        url: '/blog/',
        tags: ['expertise', 'skills', 'sujets', 'topics', 'solidworks', 'pdm', 'plm', 'bom', 'memo', 'calculateur', 'mecanique'],
        text: "Le site traite de mécanique (visserie, tolérances, ajustements, matériaux, soudure, tôlerie, conversions, avec des calculateurs) et des données produit : SOLIDWORKS, PDM, PLM, nomenclatures (BOM, eBOM, mBOM), gestion des modifications (ECR/ECO) et intégration ERP, sous l'angle des bonnes pratiques générales."
    },
    {
        id: 'contact',
        title: 'Contact',
        url: '/#contact',
        tags: ['contact', 'email', 'linkedin', 'question', 'reach', 'feedback'],
        text: "Pour une question ou une remarque sur un article, l'adresse e-mail est indiquée dans la page contact du site (/#contact). Ce site est personnel : il ne propose ni prestation, ni audit, ni devis."
    },

    // ─────────────── SOLIDWORKS PDM — PACK DE CONNAISSANCES ───────────────
    {
        id: 'swpdm-cest-quoi',
        title: "C'est quoi un PDM",
        url: '/blog/solidworks-pdm-standard-vs-professional/',
        tags: ['pdm', 'product data management', 'gestion de donnees', 'coffre', 'vault', 'definition', 'what is', 'cao', 'cad', 'reference unique'],
        text: "Un PDM (Product Data Management) est le coffre-fort numérique des données techniques : il centralise fichiers CAO, plans, documents et leurs métadonnées dans une source unique de vérité. Il gère les versions et révisions automatiquement, verrouille les fichiers (check-in/check-out) pour éviter que deux personnes écrasent le travail de l'autre, préserve les liens entre assemblages/pièces/plans, et applique des workflows d'approbation. Sans PDM : fichiers dupliqués sur des partages réseau, « pièce_finale_v3_OK_vraiment.sldprt », et références perdues. Avec PDM : traçabilité, droits d'accès et historique complet."
    },
    {
        id: 'swpdm-pratique',
        title: 'SOLIDWORKS PDM en pratique',
        url: '/blog/solidworks-pdm-standard-vs-professional/',
        tags: ['solidworks pdm', 'architecture', 'archive server', 'database server', 'sql', 'vault view', 'workflow', 'data card', 'cartes de donnees', 'client'],
        text: "SOLIDWORKS PDM repose sur trois briques : un Archive Server (stocke les fichiers physiques chiffrés), un Database Server (SQL Server, stocke métadonnées, versions, workflows) et un client intégré à l'explorateur Windows et à SOLIDWORKS. L'utilisateur travaille dans une « vue du coffre » (vault view) locale synchronisée. Les cartes de données (data cards) capturent les propriétés (référence, désignation, matière, indice). Les workflows pilotent les transitions d'état (En cours → En validation → Approuvé) avec droits et notifications. Les révisions suivent un schéma configurable (A, B, C… ou 01, 02…)."
    },
    {
        id: 'swpdm-standard',
        title: 'SOLIDWORKS PDM Standard',
        url: '/blog/solidworks-pdm-standard-vs-professional/',
        tags: ['pdm standard', 'edition', 'sql server express', 'petite equipe', 'small team', 'workflow', 'ceux qui debutent', 'entry', 'included', 'inclus'],
        text: "SOLIDWORKS PDM Standard est inclus avec SOLIDWORKS Professional et Premium (sans surcoût de licence pour les postes CAO). Il s'appuie sur SQL Server Express (limité, notamment ~10 Go de base et un seul cœur exploité). Il couvre l'essentiel : coffre unique, gestion de versions/révisions, check-in/check-out, un workflow configurable, cartes de données, recherche. Limites : jusqu'à ~20 utilisateurs conseillés, pas de client Web/mobile, pas de réplication multi-sites, workflows et automatisations réduits. Idéal pour une PME mono-site qui veut sortir des partages réseau sans complexité."
    },
    {
        id: 'swpdm-professional',
        title: 'SOLIDWORKS PDM Professional',
        url: '/blog/solidworks-pdm-standard-vs-professional/',
        tags: ['pdm professional', 'pro', 'sql server full', 'replication', 'multi-site', 'web2', 'api', 'toolbox', 'bom', 'nomenclature', 'electrical', 'scale'],
        text: "SOLIDWORKS PDM Professional est une licence dédiée, adossée à SQL Server complet (pas de limite de 10 Go). Il ajoute : workflows multiples et illimités, nomenclatures (BOM) calculées et gérées dans le coffre, client Web (Web2) et accès à distance, réplication multi-sites (serveurs d'archives répliqués), intégrations avancées (SOLIDWORKS Electrical, Inspection), gestion complète de la Toolbox, notifications riches, API/add-ins pour l'automatisation et l'intégration ERP. C'est l'édition pour les équipes qui grandissent, les multi-sites, ou dès qu'on a besoin de BOM, de portail Web ou d'intégration ERP."
    },
    {
        id: 'swpdm-choisir',
        title: 'Standard ou Professional : comment choisir',
        url: '/blog/solidworks-pdm-standard-vs-professional/',
        tags: ['choisir', 'choose', 'comparatif', 'comparison', 'standard vs professional', 'decision', 'quand', 'when', 'upgrade', 'migration'],
        text: "5 questions pour trancher entre Standard et Professional : 1) Combien d'utilisateurs aujourd'hui ET dans 3 ans ? (>20 → Professional). 2) Un ou plusieurs sites géographiques ? (multi-sites → Professional pour la réplication). 3) Avez-vous besoin de nomenclatures (BOM) gérées dans le coffre ? (oui → Professional). 4) Faut-il un accès Web / à distance / à des non-utilisateurs CAO ? (oui → Professional via Web2). 5) Intégration ERP ou automatisations par API ? (oui → Professional). Bonne nouvelle : on peut démarrer en Standard et migrer vers Professional sans repartir de zéro — le coffre évolue."
    },


    // ─────────────────────────── ARTICLES DE BLOG ───────────────────────────
    {
        id: 'blog-pdm-ou-plm',
        title: 'PDM ou PLM : quand basculer',
        url: '/blog/pdm-ou-plm-quand-basculer/',
        tags: ['pdm vs plm', 'plm', 'basculer', 'switch', 'when', 'signaux', 'signals', 'process', 'projet', 'cycle de vie', 'lifecycle'],
        text: "Article « PDM ou PLM : les 5 signaux qui prouvent que vous avez dépassé votre coffre ». Beaucoup de PME appellent « PLM » ce qui n'est qu'un PDM. Le PDM gère les données CAO et documents ; le PLM orchestre TOUT le cycle de vie produit (projets, exigences, qualité, coûts, multi-métiers, ERP). Les 5 signaux qu'il faut passer au PLM : silos entre bureaux d'études/méthodes/achats, processus qui débordent du coffre (Excel partout), besoin de gérer projets et exigences, multi-CAO, et pilotage des coûts/conformité. Message clé : basculer au bon moment, sans surinvestir."
    },
    {
        id: 'blog-pdm-lent',
        title: 'SOLIDWORKS PDM lent : 7 causes',
        url: '/blog/solidworks-pdm-lent-7-causes/',
        tags: ['pdm lent', 'slow pdm', 'performance', 'lenteur', 'sql', 'reseau', 'network', 'archive server', 'cache', 'antivirus', 'optimisation'],
        text: "Article « SOLIDWORKS PDM lent : les 7 vraies causes ». Diagnostic terrain des lenteurs : 1) SQL Server sous-dimensionné ou mal configuré (RAM, index) ; 2) Archive Server saturé ou disque lent ; 3) réseau/latence entre client et serveurs ; 4) antivirus qui scanne le cache du coffre ; 5) cartes de données et workflows trop lourds ; 6) cache local non maîtrisé (Cold/warm) ; 7) trop de références/gros assemblages sans « pack and go » maîtrisé. Chaque correctif peut rendre ~15 min/jour à chaque ingénieur."
    },
    {
        id: 'blog-migration-cloud',
        title: 'PDM dans le cloud / 3DEXPERIENCE',
        url: '/blog/migration-cloud-pdm-3dexperience/',
        tags: ['cloud', '3dexperience', 'saas', 'migration cloud', 'plateforme', 'angles morts', 'blind spots', 'questions', 'passage cloud'],
        text: "Article « Passer votre PDM dans le cloud : ce qu'on ne vous dit jamais ». Les 5 angles morts que les démos passent sous silence lors d'un passage vers le cloud / 3DEXPERIENCE : dépendance à la connexion, gestion des gros fichiers, coûts récurrents, reprise de l'historique, et changement des habitudes. Et les 7 questions à poser avant de signer (réversibilité, hébergement des données, performance, intégration ERP, sécurité…). Objectif : décider en connaissance de cause plutôt que sur la promesse d'une démo."
    },
    {
        id: 'blog-eco-ecr',
        title: 'Gestion des modifications ECO/ECR',
        url: '/blog/eco-ecr-gestion-modifications/',
        tags: ['eco', 'ecr', 'engineering change', 'modification', 'change management', 'revision', 'workflow', 'process', 'controle'],
        text: "Article « La révision fantôme à 40 000 € : maîtriser les ECO/ECR ». Une modification (Engineering Change Order/Request) qui n'aurait jamais dû partir en production, et la méthode en 6 étapes pour la maîtriser : formaliser la demande (ECR), analyser l'impact, décider en comité, exécuter l'ECO dans un workflow tracé, valider, communiquer. Sans processus de modification structuré, une révision non contrôlée coûte cher (rebuts, retards, non-conformités). Le PDM/PLM sert de garde-fou traçable."
    },
    {
        id: 'blog-codification',
        title: 'Codification et propriétés SOLIDWORKS',
        url: '/blog/codification-proprietes-solidworks/',
        tags: ['codification', 'numbering', 'proprietes', 'properties', 'bom', 'erp', 'reference', 'designation', 'data card', 'metadonnees', 'qualite'],
        text: "Article « Codification & propriétés SOLIDWORKS : réparer la chaîne BOM → ERP ». 80 % des erreurs de nomenclature naissent dans la pièce, pas dans l'ERP. Il faut normaliser les propriétés personnalisées (référence, désignation, matière) à la source, via des cartes de données et des modèles, pour que la BOM remonte proprement vers l'ERP. Sujets : schéma de codification (intelligent vs séquentiel), propriétés obligatoires, automatisation, et cohérence PDM → BOM → ERP."
    },
    {
        id: 'blog-nomenclature-bom',
        title: 'Nomenclature BOM entre PDM, PLM et ERP',
        url: '/blog/nomenclature-bom-pdm-plm-erp/',
        tags: ['bom', 'nomenclature', 'ebom', 'mbom', 'pdm', 'plm', 'erp', 'nomenclatures', 'transfer', 'chaine numerique'],
        text: "Article sur la nomenclature (BOM) et son parcours entre PDM, PLM et ERP. Distinction eBOM (vue bureau d'études, telle que conçue) vs mBOM (vue méthodes/production, telle que fabriquée). Le PDM produit la eBOM depuis la CAO ; le PLM/ERP la transforme en mBOM. Enjeux : synchronisation, articles fantômes, quantités, articles achetés vs fabriqués, et cohérence quand la conception évolue. Une BOM fiable est la colonne vertébrale de la chaîne numérique."
    },
    {
        id: 'blog-config-materielle',
        title: 'Configuration matérielle SOLIDWORKS',
        url: '/blog/configuration-materielle-solidworks/',
        tags: ['configuration materielle', 'hardware', 'poste', 'workstation', 'cpu', 'gpu', 'ram', 'ssd', 'performance', 'specs', 'recommandations'],
        text: "Article sur la configuration matérielle recommandée pour SOLIDWORKS et PDM : privilégier un CPU à fréquence élevée (SOLIDWORKS exploite peu de cœurs pour le modelage), de la RAM confortable pour les gros assemblages, un GPU certifié, et surtout du stockage SSD/NVMe pour le cache du coffre. Côté serveurs PDM : SQL et Archive Server sur disques rapides, RAM suffisante. Le bon matériel est souvent le levier de performance le moins cher."
    },
    {
        id: 'blog-ia-pdm',
        title: "IA et SOLIDWORKS PDM : ce qui change en 2026",
        url: '/blog/ia-solidworks-pdm-bureau-etudes/',
        tags: ['ia', 'ai', 'intelligence artificielle', 'copilote', 'recherche semantique', 'semantic', 'rag', 'classification', 'deduplication', 'assistant', '3dexperience', 'donnees', 'data quality'],
        text: "Article d'analyse sur l'IA appliquée à SOLIDWORKS et au PDM en 2026. Les 5 cas d'usage concrets et matures : recherche sémantique (retrouver une pièce sans connaître son nom exact) et similarité géométrique, classification et pré-remplissage automatique des propriétés/cartes de données, déduplication assistée, assistants documentaires RAG (répondre aux questions procédures/normes avec sources citées), contrôle qualité continu des données. Le message clé : le prérequis de toute IA utile est la qualité des données — un coffre PDM structuré avec cartes remplies et workflows respectés. Le chemin vers « prêt pour l'IA » est le même que vers un PDM bien déployé. Feuille de route en 4 trimestres : audit des données, réparation du socle, premier cas d'usage visible (recherche ou assistant), mesure et extension."
    },
    {
        id: 'blog-sw-gratuit',
        title: "SOLIDWORKS gratuit : les 7 solutions légales et le vrai prix",
        url: '/blog/solidworks-gratuit-prix-guide/',
        tags: ['gratuit', 'free', 'etudiant', 'student', 'maker', 'makers', 'startup', 'essai', 'trial', 'edrawings', 'viewer', 'mac', 'macos', 'licence', 'perpetuelle', 'abonnement', 'prix', 'crack'],
        text: "Guide des façons légales d'utiliser SOLIDWORKS gratuitement ou presque : 1) étudiants/enseignants via la licence éducation de l'établissement (gratuite, fichiers marqués éducation, usage non commercial) ; 2) SOLIDWORKS for Makers ≈ 48 $/an pour les particuliers (non commercial, fichiers au format maker non ouvrables en version commerciale, connexion 3DEXPERIENCE requise) ; 3) SOLIDWORKS for Startups (gratuit la 1ʳᵉ année pour les jeunes entreprises éligibles) ; 4) essai cloud gratuit ~30 jours sans installation ; 5) eDrawings Viewer gratuit pour consulter pièces/assemblages/plans ; 6) version d'évaluation via un revendeur. Pas de version native macOS (les apps cloud 3DEXPERIENCE tournent dans un navigateur sur Mac ; virtualisation non supportée officiellement). Licences commerciales : l'abonnement 3DEXPERIENCE SOLIDWORKS a un prix public sur la boutique de Dassault Systèmes (2 820 $/an en Standard, 3 456 $ en Professional, 4 716 $ en Premium, relevé le 16/10/2026) ; le prix de la licence perpétuelle n'est pas publié et se demande à un revendeur agréé. Éviter les versions crackées : malwares, fichiers corrompus, risques juridiques."
    }
];
