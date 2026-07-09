// api/_kb.js
// Base de connaissances curée de l'assistant (RAG).
// Le préfixe « _ » évite que Vercel en fasse une route HTTP.
//
// IMPORTANT — provenance : ce corpus est une synthèse ORIGINALE rédigée par
// Omar à partir de son expérience terrain, de la documentation publique
// SOLIDWORKS PDM et des pages publiques Visiativ. Ce n'est pas une copie de
// documentation propriétaire : ce sont des faits généraux et des repères
// méthodologiques, réécrits, destinés à cadrer les réponses de l'assistant.
//
// Chaque document : { id, title, url, tags[], text }.
// `tags` contient des mots-clés FR ET EN pour que la recherche fonctionne
// dans les deux langues même si le texte est en français.

export const KB_DOCS = [
    // ─────────────────────────── PORTFOLIO / OMAR ───────────────────────────
    {
        id: 'omar-profil',
        title: 'Qui est Omar — consultant PDM/PLM',
        url: '/#about',
        tags: ['omar', 'baouch', 'consultant', 'visiativ', 'pdm', 'plm', 'profile', 'about', 'experience', 'career', 'parcours', 'who'],
        text: "Mohamed Omar BAOUCH est consultant PDM/PLM confirmé chez VISIATIV depuis 2023. Il accompagne les industriels dans la structuration de leurs données techniques. Formation : CPGE PTSI, Bachelor Plasturgie puis Master Génie Mécanique à l'INSA. Parcours : EVOLUM CONTAINER (2020), ABMI (2021-2023, projets IDEMIA et FLOWBIRD), puis VISIATIV. Chiffres clés : 80+ clients industriels, 100+ projets, 100+ migrations, 20+ déploiements. Langues : arabe (maternelle), français (bilingue), anglais (courant), allemand (notions). Secteurs : machinerie, automobile, énergie, robotique, défense."
    },
    {
        id: 'omar-expertise',
        title: 'Expertise et périmètre technique',
        url: '/#skills',
        tags: ['expertise', 'skills', 'competences', 'solidworks', 'pdm', '3dexperience', 'windchill', 'creo', 'erp', 'sap', 'integration', 'stack'],
        text: "Socle technique d'Omar : SOLIDWORKS PDM (expertise principale), 3DEXPERIENCE, PTC Windchill/Creo. Domaines : migration de données (Windows/Workgroup → PDM Professional), intégration PDM ↔ ERP (SAP, Sage, Cegid, Clipper), gestion des modifications (ECR/ECO), nomenclatures (BOM/eBOM/mBOM), performance PDM, conduite du changement (Prosci/ADKAR). Quelques clients accompagnés : NEXANS, PANDROL, ARC FRANCE, NOREMAT, SUPERBA, ENCHANTED TOOLS."
    },
    {
        id: 'omar-methode',
        title: 'Méthode projet en 6 étapes',
        url: '/#services',
        tags: ['methode', 'method', 'projet', 'project', 'deployment', 'deploiement', 'change management', 'conduite du changement', 'reprise', 'audit', 'process'],
        text: "Méthode projet d'Omar en 6 étapes : 1) Cadrage & conduite du changement (l'humain avant l'outil) ; 2) Formation des admins & spécifications ; 3) Développement & suivi agile (zéro effet tunnel) ; 4) Stratégie de reprise des données (la phase la plus critique) ; 5) Formation utilisateurs & déploiement ; 6) Support post-projet. Principe clé : « Ne jamais faire confiance aux données existantes » — l'audit des données est obligatoire avant toute migration."
    },
    {
        id: 'contact',
        title: 'Contact et prise de rendez-vous',
        url: '/#contact',
        tags: ['contact', 'rendez-vous', 'devis', 'quote', 'email', 'linkedin', 'projet', 'audit', 'reach', 'hire'],
        text: "Pour échanger sur un projet, un audit PDM/PLM ou une migration, le mieux est de passer par la page contact du site (/#contact) ou par LinkedIn. Omar ne communique pas de prix ni de devis via l'assistant : chaque contexte industriel est différent et mérite un échange dédié."
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

    // ─────────────────────────── VISIATIV ───────────────────────────
    {
        id: 'visiativ',
        title: 'Visiativ — intégrateur et éditeur',
        url: '/#experience',
        tags: ['visiativ', 'integrateur', 'reseller', 'var', 'partenaire dassault', 'solidworks reseller', 'transformation numerique', 'services', 'company'],
        text: "VISIATIV est un acteur de la transformation numérique des entreprises industrielles, partenaire et revendeur (VAR) de solutions Dassault Systèmes — dont SOLIDWORKS et SOLIDWORKS PDM. Au-delà de la vente de licences, Visiativ accompagne : conseil, déploiement PDM/PLM, migration de données, intégration avec l'ERP, formation et support. C'est dans ce cadre qu'Omar mène ses projets : structuration des données techniques, choix d'édition PDM, reprise de l'existant et conduite du changement chez les industriels."
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
        id: 'blog-migration-donnees',
        title: 'Migration de données vers SOLIDWORKS PDM',
        url: '/blog/migration-donnees-solidworks-pdm/',
        tags: ['migration', 'migrate', 'reprise de donnees', 'data migration', 'workgroup', 'partage reseau', 'guide', 'phases', 'audit', 'reference'],
        text: "Article « Migration de données vers SOLIDWORKS PDM : le guide terrain ». Méthodologie en 6 phases pour migrer depuis des partages réseau ou Workgroup PDM vers PDM Professional sans perdre un fichier : audit et nettoyage de l'existant, définition de la structure cible (cartes, workflows, références), stratégie de reprise (par lots, par projet), résolution des références cassées, validation, bascule. Pièges courants : doublons, chemins absolus, références externes, historique de révisions à préserver. Règle d'or : ne jamais faire confiance aux données existantes."
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
        id: 'blog-resolutions-plm',
        title: 'Résolutions de problématiques PLM',
        url: '/blog/resolutions-problematiques-plm/',
        tags: ['plm', 'problematiques', 'problems', 'solutions', 'retours terrain', 'cas', 'deploiement', 'adoption', 'gouvernance'],
        text: "Article de retours terrain sur les problématiques PLM courantes et leurs solutions : adoption utilisateur faible, gouvernance des données absente, processus trop rigides ou trop lâches, intégrations fragiles, périmètre mal cadré. Approche : commencer petit, prouver la valeur, industrialiser. La technologie n'est jamais le vrai blocage — c'est l'organisation et la conduite du changement."
    },
    {
        id: 'blog-config-materielle',
        title: 'Configuration matérielle SOLIDWORKS',
        url: '/blog/configuration-materielle-solidworks/',
        tags: ['configuration materielle', 'hardware', 'poste', 'workstation', 'cpu', 'gpu', 'ram', 'ssd', 'performance', 'specs', 'recommandations'],
        text: "Article sur la configuration matérielle recommandée pour SOLIDWORKS et PDM : privilégier un CPU à fréquence élevée (SOLIDWORKS exploite peu de cœurs pour le modelage), de la RAM confortable pour les gros assemblages, un GPU certifié, et surtout du stockage SSD/NVMe pour le cache du coffre. Côté serveurs PDM : SQL et Archive Server sur disques rapides, RAM suffisante. Le bon matériel est souvent le levier de performance le moins cher."
    }
];
