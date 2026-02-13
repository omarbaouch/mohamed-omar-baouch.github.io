//--------- LANGUAGE SWITCHER SCRIPT START ---------//
const translations = {
    fr: {
        "meta_title": "Mohamed Omar Baouch | Ingénieur & Consultant PDM/PLM",
        "meta_description": "Portfolio de Mohamed Omar Baouch - Ingénieur mécanique et consultant PDM/PLM spécialisé dans l'optimisation des processus de développement produit",
        "loading_portfolio": "CHARGEMENT DU PORTFOLIO",
        "nav_about": "À propos",
        "nav_experience": "Expérience",
        "nav_skills": "Compétences",
        "nav_education": "Formation",
        "nav_contact": "Contact",
        "nav_blog": "Blog",
        "hero_title": `<span class="highlight glitch" data-text="Ingénieur Plasturgie">Ingénieur Plasturgie</span> & <br>Consultant <span class="glitch" data-text="PDM/PLM">PDM/PLM</span>`,
        "hero_subtitle": "Accompagnement de 69 industriels dans l'optimisation de leurs processus de développement produit.",
        "hero_cta1": "Me contacter",
        "hero_cta2": "Découvrir mon parcours",
        "scroll_text": "Défiler",
        "about_title": "À propos",
        "about_p1": "Ingénieur Plasturgie INSA de formation, j'ai évolué de la conception mécanique pure vers l'architecture des systèmes d'information techniques. Mon approche est pragmatique : la technique doit servir le métier, et non le contraindre.",
        "about_p2": "Aujourd'hui, j'interviens sur des missions critiques : migration de données sensibles, refonte d'architectures serveurs et optimisation de performance pour des bureaux d'études de 5 à 100 utilisateurs.",
        "tooltip_location": "Situé dans la région Grand Est, disponible pour des projets dans toute la France",
        "tooltip_phone": "Disponible par téléphone du lundi au vendredi, 9h-18h",
        "driving_license": "Permis B, Véhiculé",
        "tooltip_mobility": "Mobile pour des déplacements professionnels",
        "tooltip_email": "N'hésitez pas à me contacter par email pour toute demande",
        "tooltip_linkedin": "Connectons-nous sur LinkedIn pour échanger professionnellement",
        "download_cv": "Télécharger mon CV",
        "cv_file": "/BAOUCH_CV_FR.pdf",
        "experience_title": "Expérience",
        "exp1_date": "Juin 2023 - Présent",
        "exp1_title": "Consultant Expert PDM/PLM",
        "exp1_subtitle1": "Projets & Réalisations (69 Clients):",
        "exp1_li1": "<strong>57 Migrations</strong> réussies de PDM Standard vers PDM Professional (ETL, Reprise d'historique).",
        "exp1_li2": "<strong>11 Déploiements Complets</strong> d'architecture serveur (SQL, Archive, Indexation sur serveurs dédiés).",
        "exp1_li3": "<strong>Set & Run</strong> : Prise en main experte de projets complexes et en difficulté.",
        "exp1_subtitle2": "Expertise Technique:",
        "exp1_li4": "Audit & Diagnostic d'infrastructure en <strong>72h</strong>.",
        "exp1_li5": "Rédaction de DTE (Dossiers Techniques d'Exploitation) et Plans de Recette.",
        "exp1_li6": "Mise en œuvre de réplications multisites et plans de maintenance SQL.",
        "exp2_date": "Septembre 2021 - Juin 2023",
        "exp2_title": "Ingénieur Plasturgie & PLM Lead",
        "exp2_subtitle1": "ACTEUR DÉFENSE & SÉCURITÉ :",
        "exp2_li1": "Conception de radars de nouvelle génération.",
        "exp2_li2": "Structuration de l'architecture PLM pour la gestion de configuration complexe.",
        "exp2_subtitle2": "ACTEUR DU TRANSPORT & MOBILITÉ :",
        "exp2_li3": "Retrofit RATP : Gestion du cycle de vie des modifications (ECR/ECO).",
        "exp2_li4": "Calculs de structure avancés sous Creo Simulate.",
        "exp2_location": "ABMI / SECTEURS VARIES",
        "exp3_date": "Avril 2020 - Octobre 2020",
        "exp3_title": "Ingénieur Bureau d'Études",
        "exp3_li1": "Gestion complète de l'affaire : du chiffrage à la livraison.",
        "exp3_li2": "Optimisation des nomenclatures pour la production série.",
        "skills_title": "Compétence Technique",
        "skill1_title": "Architecture PDM/SQL",
        "skill1_li1": "Admin SQL Server",
        "skill1_tp1": "Installation, Maintenance Plans, Sauvegardes, Tuning Performance",
        "skill1_li2": "Réplication & Cold Storage",
        "skill1_tp2": "Architecture multisites, gestion de l'archivage froid",
        "skill1_li3": "Workflows Avancés",
        "skill1_tp3": "Dispatch, Tâches Automatiques, Transitions conditionnelles, Notifications XML",
        "skill1_li4": "PDM Gateway (ERP)",
        "skill1_tp4": "Export/Import de données XML/CSV vers ERP (Sage, Cegid, SAP)",
        "skill2_title": "Data & Migration",
        "skill2_li1": "ETL & Reprise de Données",
        "skill2_tp1": "Extraction, Transformation, Loading de données legacy vers PDM",
        "skill2_li2": "Nettoyage de Données",
        "skill2_tp2": "Standardisation des propriétés, nommage, suppression des doublons",
        "skill2_li3": "Templates SOLIDWORKS",
        "skill2_tp3": "Création de .prtdot, .asmdot, .drwdot, Property Tab Builder",
        "skill2_li4": "MyCADTools",
        "skill2_tp4": "Usage expert de la suite pour l'audits et le batch processing",
        "skill3_title": "Documentaire",
        "skill3_li1": "Dossiers Techniques (DTE)",
        "skill3_tp1": "Rédaction de documentations d'installation et d'exploitation complètes",
        "skill3_li2": "Plans de Recette",
        "skill3_tp2": "Création de cahiers de tests et PV de recette pour validation client",
        "skill3_li3": "Méthodologie de Reprise",
        "skill3_tp3": "Documents de stratégie de migration de l'existant",
        "skill3_li4": "Supports de Formation",
        "skill3_tp4": "Formation Administrateur et Utilisateur PDM",
        "skill_level_expert": "Expert",
        "skill_level_advanced": "Avancé",
        "skill1_li5": "Cold Storage",
        "skill2_li5": "Property Tab",
        "skill3_li5": "PV Recette",
        "education_title": "Formation",
        "edu1_title": "CLASSES PRÉPARATOIRES",
        "edu1_desc": "Formation scientifique et technique approfondie",
        "edu2_title": "BACHELOR EN PLASTURGIE",
        "edu2_desc": "Formation en techniques de transformation et conception de pièces plastiques",
        "edu3_title": "MASTER EN GÉNIE MÉCANIQUE",
        "edu3_desc": "Spécialisation en conception et simulation numérique",
        "contact_title": "Contact",
        "contact_phone": "Téléphone",
        "contact_address": "Adresse",
        "contact_languages": "Langues",
        "contact_languages_list": "Arabe (Natale), Français (Bilingue), Anglais (Courant), Allemand (Débutant)",
        "contact_email": "Email",
        "form_name": "Nom",
        "form_email": "Email",
        "form_subject": "Sujet",
        "form_message": "Message",
        "form_send": "Envoyer",
        "form_success": "Votre message a été envoyé avec succès ! Je vous répondrai dans les plus brefs délais.",
        "form_error": "Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer ou me contacter directement par email.",
        "footer_copyright": "&copy; 2025 Mohamed Omar Baouch. Tous droits réservés.",
        "ai_title": "Assistant Virtuel",
        "ai_welcome": "Bonjour ! Je suis l'assistant virtuel de Mohamed. Comment puis-je vous aider à découvrir son profil ? Voici quelques suggestions :",
        "ai_sugg_1": "Résume son expérience",
        "ai_sugg_2": "Quelles sont ses compétences en PDM ?",
        "ai_sugg_3": "Où a-t-il étudié ?",
        "essentials_eyebrow": "Expérience terrain",
        "essentials_heading": "Un accompagnement PDM/PLM <span class=\"highlight\">concret et orienté résultats</span>",
        "essentials_lead": "J'optimise vos flux de données produit, structure vos standards d'équipe et documente les meilleures pratiques dans des guides opérationnels exploitables dès le premier jour.",
        "stat_clients": "69 clients",
        "stat_clients_desc": "Industrie, robotique, équipements...",
        "stat_migrations": "57 migrations",
        "stat_migrations_desc": "Serveurs, mises à jour, réplications...",
        "stat_diagnostic": "72h",
        "stat_diagnostic_desc": "Diagnostic express avec plan d'action",
        "stat_deployments": "11 déploiements",
        "stat_deployments_desc": "+ 1 Set & Run complet",
        "card_conseil_kicker": "💡 Conseil",
        "card_conseil_title": "Architecture PDM/PLM claire",
        "card_conseil_desc": "Cartographie rapide de votre environnement, définition des droits utilisateurs, modèles de données et nomenclatures optimisées pour <strong>SOLIDWORKS PDM</strong>, <strong>3DEXPERIENCE</strong> ou <strong>Windchill</strong>.",
        "card_conseil_li1": "✓ Ateliers de cadrage et audit express",
        "card_conseil_li2": "✓ Plan de remédiation priorisé",
        "card_conseil_li3": "✓ Documentation maintenable",
        "card_badge": "POPULAIRE",
        "card_delivery_kicker": "🚀 Delivery",
        "card_delivery_title": "Recettes et industrialisation",
        "card_delivery_desc": "Mise en production accompagnée avec procédures de tests rigoureuses, checklists d'intégration détaillées et coaching personnalisé des référents internes.",
        "card_delivery_li1": "✓ Scénarios de validation prêts à l'emploi",
        "card_delivery_li2": "✓ Revues avec les métiers clés",
        "card_delivery_li3": "✓ Capitalisation et transfert de compétences",
        "card_veille_kicker": "📡 Veille",
        "card_veille_title": "Radar quotidien & blog",
        "card_veille_desc": "Un format épuré combinant signaux du marché PDM/PLM, résumés techniques et réponses aux questions fréquentes des équipes BE/IT.",
        "card_veille_li1": "✓ Radars quotidiens PDM/PLM",
        "card_veille_li2": "✓ Guides de fond réutilisables",
        "card_veille_link": "→ Accéder au blog",
        "clients_title": "69 Clients accompagnés par secteur",
        "sector_robotics_title": "Automatisme & Robotique",
        "sector_robotics_desc": "Startups, PME & ETI innovantes",
        "sector_industry_title": "Industrie & Énergie",
        "sector_industry_desc": "Grands Groupes & ETI",
        "sector_machines_title": "Machines & Équipements",
        "sector_machines_desc": "Fabricants de Machines & Lignes de Production",
        "sector_transport_title": "Transport & Mobilité",
        "sector_transport_desc": "Acteurs majeurs du secteur",
        "sector_metal_title": "Métallurgie & Traitement",
        "sector_metal_desc": "Industriels de la transformation",
        "sector_international_title": "International",
        "sector_international_desc": "VISIATIV AFRICA - Projets Multi-sites",
        "featured_projects_title": "Projets phares",
        "project_type_robotics": "Robotique",
        "project_1_title": "ROBOTIQUE HUMANOÏDE",
        "project_1_subtitle": "Robot ORBITA",
        "project_1_desc": "Assemblages mécaniques complexes avec 28+ composants SOLIDWORKS, workflow PDM personnalisé, sauvegarde volumineuse",
        "project_type_deployment": "Déploiement",
        "project_2_title": "SYSTÈMES D'ASPIRATION",
        "project_2_subtitle": "Installation complète",
        "project_2_desc": "DTE détaillé, 6 templates personnalisés (.prtdot, .asmdot, .drwdot), méthodologie de reprise de données Excel",
        "project_type_migration": "Migration",
        "project_3_title": "MÉCANIQUE INDUSTRIELLE",
        "project_3_subtitle": "Migration & Upgrade",
        "project_3_desc": "Migration complète avec upgrade serveur, reconfiguration workflows, formation utilisateurs",
        "project_type_international": "International",
        "project_4_title": "CÂBLAGE MONDIAL",
        "project_4_subtitle": "Visiativ Africa",
        "project_4_desc": "Migration PDM pour le géant mondial des câbles, coordination multi-sites, déploiement international",
        "project_type_transport": "Transport",
        "project_5_title": "SOLUTIONS DE MOBILITÉ",
        "project_5_subtitle": "RATP - Retrofit distributeurs",
        "project_5_desc": "Conception mécanique, revues de design, calculs de structure Creo Simulate, intégration PLM",
        "project_type_defense": "Défense",
        "project_6_title": "SÉCURITÉ & DÉFENSE",
        "project_6_subtitle": "Développement radars",
        "project_6_desc": "Conception de nouveaux radars, pièces usinées, structuration architecture dossier PLM"
    },
    en: {
        "meta_title": "Mohamed Omar Baouch | Mechanical Engineer & PDM/PLM Consultant",
        "meta_description": "Portfolio of Mohamed Omar Baouch - Mechanical engineer and PDM/PLM consultant specializing in optimizing product development processes",
        "loading_portfolio": "LOADING PORTFOLIO",
        "nav_about": "About",
        "nav_experience": "Experience",
        "nav_skills": "Skills",
        "nav_education": "Education",
        "nav_contact": "Contact",
        "nav_blog": "Blog",
        "hero_title": `<span class="highlight glitch" data-text="Plastics Engineer">Plastics Engineer</span> & <br>PDM/PLM <span class="glitch" data-text="Consultant">Consultant</span>`,
        "hero_subtitle": "Supporting 69 industrial companies in optimizing their product development processes.",
        "hero_cta1": "Contact Me",
        "hero_cta2": "Explore My Journey",
        "scroll_text": "Scroll",
        "about_title": "About Me",
        "about_p1": "As an INSA Plastics Engineer, I evolved from pure mechanical design to technical information system architecture. My approach is pragmatic: technology must serve the business, not constrain it.",
        "about_p2": "Today, I work on critical missions: sensitive data migration, server architecture redesign, and performance optimization for design offices ranging from 5 to 100 users.",
        "tooltip_location": "Based in the Grand Est region, available for projects throughout France",
        "tooltip_phone": "Available by phone Monday to Friday, 9am-6pm",
        "driving_license": "Driver's License",
        "tooltip_mobility": "Available for business travel",
        "tooltip_email": "Feel free to contact me by email for any inquiries",
        "tooltip_linkedin": "Let's connect on LinkedIn for professional exchanges",
        "download_cv": "Download RESUME",
        "cv_file": "/BAOUCH_CV_EN.pdf",
        "experience_title": "Experience",
        "exp1_date": "June 2023 - Present",
        "exp1_title": "Expert PDM/PLM Consultant",
        "exp1_subtitle1": "Projects & Achievements (69 Clients):",
        "exp1_li1": "<strong>57 Server Migrations & Updates</strong> (ETL, History Recovery).",
        "exp1_li2": "<strong>11 Full Deployments</strong> of server architecture (SQL, Archive, Indexing on dedicated servers).",
        "exp1_li3": "<strong>Set & Run</strong>: Expert takeover of complex and distressed projects.",
        "exp1_subtitle2": "Technical Expertise:",
        "exp1_li4": "Infrastructure Audit & Diagnostic in <strong>72h</strong>.",
        "exp1_li5": "Drafting of Technical Operating Files (DTE) and Acceptance Plans.",
        "exp1_li6": "Implementation of multisite replication and SQL maintenance plans.",
        "exp2_date": "September 2021 - June 2023",
        "exp2_title": "Plastics Engineer & PLM Lead",
        "exp2_subtitle1": "DEFENSE & SECURITY ACTOR:",
        "exp2_li1": "Design of next-generation radars.",
        "exp2_li2": "Structuring of PLM architecture for complex configuration management.",
        "exp2_subtitle2": "TRANSPORT & MOBILITY ACTOR:",
        "exp2_li3": "Retrofit for RATP: Lifecycle management of modifications (ECR/ECO).",
        "exp2_li4": "Advanced structural calculations using Creo Simulate.",
        "exp2_location": "ABMI / VARIOUS SECTORS",
        "exp3_date": "April 2020 - October 2020",
        "exp3_title": "Design Engineer",
        "exp3_li1": "Complete project management: from costing to delivery.",
        "exp3_li2": "BOM optimization for series production.",
        "skills_title": "Technical Skills",
        "skill1_title": "PDM/SQL Architecture",
        "skill1_li1": "SQL Server Admin",
        "skill1_tp1": "Installation, Maintenance Plans, Backups, Performance Tuning",
        "skill1_li2": "Replication & Cold Storage",
        "skill1_tp2": "Multisite architecture, cold archiving management",
        "skill1_li3": "Advanced Workflows",
        "skill1_tp3": "Dispatch, Automatic Tasks, Conditional Transitions, XML Notifications",
        "skill1_li4": "PDM Gateway (ERP)",
        "skill1_tp4": "XML/CSV Data Export/Import to ERP (Sage, Cegid, SAP)",
        "skill2_title": "Data & Migration",
        "skill2_li1": "ETL & Data Recovery",
        "skill2_tp1": "Extraction, Transformation, Loading of legacy data to PDM",
        "skill2_li2": "Data Cleaning",
        "skill2_tp2": "Property standardization, naming, deduplication",
        "skill2_li3": "SOLIDWORKS Templates",
        "skill2_tp3": "Creation of .prtdot, .asmdot, .drwdot, Property Tab Builder",
        "skill2_li4": "MyCADTools",
        "skill2_tp4": "Expert usage of the suite for audits and batch processing",
        "skill3_title": "Documentation",
        "skill3_li1": "Technical Files (DTE)",
        "skill3_tp1": "Drafting of complete installation and operating documentation",
        "skill3_li2": "Acceptance Plans",
        "skill3_tp2": "Creation of test books and acceptance minutes for client validation",
        "skill3_li3": "Recovery Methodology",
        "skill3_tp3": "Strategy documents for legacy migration",
        "skill3_li4": "Training Materials",
        "skill3_tp4": "PDM Administrator and User Training",
        "skill_level_expert": "Expert",
        "skill_level_advanced": "Advanced",
        "skill1_li5": "Cold Storage",
        "skill2_li5": "Property Tab",
        "skill3_li5": "Acceptance Report",
        "education_title": "Education",
        "edu1_title": "PREPARATORY CLASSES",
        "edu1_desc": "In-depth scientific and technical training",
        "edu2_title": "BACHELOR IN PLASTICS ENGINEERING",
        "edu2_desc": "Training in processing techniques and plastic parts design",
        "edu3_title": "MASTER IN MECHANICAL ENGINEERING",
        "edu3_desc": "Specialization in design and numerical simulation",
        "contact_title": "Contact",
        "contact_phone": "Phone",
        "contact_address": "Address",
        "contact_languages": "Languages",
        "contact_languages_list": "Arabic (Native), French (Bilingual), English (Fluent), German (Beginner)",
        "contact_email": "Email",
        "form_name": "Name",
        "form_email": "Email",
        "form_subject": "Subject",
        "form_message": "Message",
        "form_send": "Send",
        "form_success": "Your message has been sent successfully! I will get back to you as soon as possible.",
        "form_error": "An error occurred while sending the message. Please try again or contact me directly by email.",
        "footer_copyright": "&copy; 2025 Mohamed Omar Baouch. All rights reserved.",
        "ai_title": "Virtual Assistant",
        "ai_welcome": "Hello! I am Mohamed's virtual assistant. How can I help you explore his profile? Here are a few suggestions:",
        "ai_sugg_1": "Summarize his experience",
        "ai_sugg_2": "What are his PDM skills?",
        "ai_sugg_3": "Where did he study?",
        "essentials_eyebrow": "Field Experience",
        "essentials_heading": "Concrete, results-oriented <span class=\"highlight\">PDM/PLM support</span>",
        "essentials_lead": "I optimize your product data flows, structure your team standards, and document best practices in operational guides usable from day one.",
        "stat_clients": "69 clients",
        "stat_clients_desc": "Industry, robotics, equipment...",
        "stat_migrations": "57 migrations",
        "stat_migrations_desc": "Servers, upgrades, replications...",
        "stat_diagnostic": "72h",
        "stat_diagnostic_desc": "Express diagnostic with action plan",
        "stat_deployments": "11 deployments",
        "stat_deployments_desc": "+ 1 complete Set & Run",
        "card_conseil_kicker": "💡 Consulting",
        "card_conseil_title": "Clear PDM/PLM Architecture",
        "card_conseil_desc": "Quick mapping of your environment, user rights definition, data models and optimized BOMs for <strong>SOLIDWORKS PDM</strong>, <strong>3DEXPERIENCE</strong> or <strong>Windchill</strong>.",
        "card_conseil_li1": "✓ Scoping workshops and express audit",
        "card_conseil_li2": "✓ Prioritized remediation plan",
        "card_conseil_li3": "✓ Maintainable documentation",
        "card_badge": "POPULAR",
        "card_delivery_kicker": "🚀 Delivery",
        "card_delivery_title": "Acceptance & Industrialization",
        "card_delivery_desc": "Guided production deployment with rigorous test procedures, detailed integration checklists, and personalized coaching of internal leaders.",
        "card_delivery_li1": "✓ Ready-to-use validation scenarios",
        "card_delivery_li2": "✓ Reviews with key stakeholders",
        "card_delivery_li3": "✓ Knowledge transfer and capitalization",
        "card_veille_kicker": "📡 Watch",
        "card_veille_title": "Daily Radar & blog",
        "card_veille_desc": "A clean format combining PDM/PLM market signals, technical summaries, and answers to frequently asked questions from BE/IT teams.",
        "card_veille_li1": "✓ Daily PDM/PLM radars",
        "card_veille_li2": "✓ Reusable in-depth guides",
        "card_veille_link": "→ Access the blog",
        "clients_title": "69 Clients supported by sector",
        "sector_robotics_title": "Automation & Robotics",
        "sector_robotics_desc": "Startups, SMEs & Innovative ETIs",
        "sector_industry_title": "Industry & Energy",
        "sector_industry_desc": "Large Groups & ETIs",
        "sector_machines_title": "Machines & Equipment",
        "sector_machines_desc": "Machine & Production Line Manufacturers",
        "sector_transport_title": "Transport & Mobility",
        "sector_transport_desc": "Major Sector Players",
        "sector_metal_title": "Metallurgy & Processing",
        "sector_metal_desc": "Processing Industries",
        "sector_international_title": "International",
        "sector_international_desc": "VISIATIV AFRICA - Multi-site Projects",
        "featured_projects_title": "Featured Projects",
        "project_type_robotics": "Robotics",
        "project_1_title": "HUMANOID ROBOTICS",
        "project_1_subtitle": "ORBITA Robot",
        "project_1_desc": "Complex mechanical assemblies with 28+ SOLIDWORKS components, custom PDM workflow, voluminous backup",
        "project_type_deployment": "Deployment",
        "project_2_title": "SUCTION SYSTEMS",
        "project_2_subtitle": "Complete Installation",
        "project_2_desc": "Detailed DTE, 6 custom templates (.prtdot, .asmdot, .drwdot), Excel data recovery methodology",
        "project_type_migration": "Migration",
        "project_3_title": "INDUSTRIAL MECHANICS",
        "project_3_subtitle": "Migration & Upgrade",
        "project_3_desc": "Complete migration with server upgrade, workflow reconfiguration, user training",
        "project_type_international": "International",
        "project_4_title": "GLOBAL CABLING",
        "project_4_subtitle": "Visiativ Africa",
        "project_4_desc": "PDM migration for the global cable giant, multi-site coordination, international deployment",
        "project_type_transport": "Transport",
        "project_5_title": "MOBILITY SOLUTIONS",
        "project_5_subtitle": "RATP - Retrofit distributors",
        "project_5_desc": "Mechanical design, design reviews, Creo Simulate structural calculations, PLM integration",
        "project_type_defense": "Defense",
        "project_6_title": "SECURITY & DEFENSE",
        "project_6_subtitle": "Radar Development",
        "project_6_desc": "Design of new radars, machined parts, PLM folder architecture structuring"
    }
};

const blogTranslations = {
    fr: {
        common: {
            blog_back_to_blog: "← Retour au blog",
            blog_back_to_portfolio: "Retour au portfolio",
            blog_badge_editorial: "Article de fond",
            blog_cta_summary: "Consulter le sommaire",
            blog_cta_discuss_project: "Discuter de votre projet",
            blog_summary_title: "Sommaire"
        },
        pages: {
            index: {
                blog_index_filter_all: "Tout",
                blog_index_filter_editorial: "Articles de fond",
                blog_index_section_editorial_title: "Articles de fond",
                blog_index_section_editorial_subtitle: "Analyses éditoriales, retours d’expérience et bonnes pratiques terrain."
            }
        },
        articles: {
            "configuration-materielle-solidworks": {
                blog_config_badge_guide: "Guide matériel",
                blog_config_hero_eyebrow: "SOLIDWORKS &amp; PDM",
                blog_config_hero_title: "Configuration matérielle SOLIDWORKS 2025 : le guide terrain pour un bureau d'études réactif",
                blog_config_hero_subtitle: `Publié le <span data-date-iso="2025-09-21T00:00:00.000Z" data-date-format="long">21 septembre 2025</span> après douze missions de diagnostic CAO : comment dimensionner stations, serveur PDM et réseau pour éliminer les goulots d'étranglement avant la saison des pics de charge.`,
                blog_config_stat_publication: "Date de publication",
                blog_config_stat_profiles: "Profils de stations validés",
                blog_config_stat_gain: "Gain moyen sur les temps d'ouverture",
                blog_config_summary_label1: "Pourquoi optimiser le matériel maintenant&nbsp;?",
                blog_config_summary_meta1: "Les signaux terrain et KPI à surveiller",
                blog_config_summary_label2: "Audit express d'un parc CAO",
                blog_config_summary_meta2: "Méthode en trois temps, outils et seuils",
                blog_config_summary_label3: "Trois profils de stations prêts à déployer",
                blog_config_summary_meta3: "Spécifications, coûts et impact utilisateur",
                blog_config_summary_label4: "Serveur PDM, stockage et réseau",
                blog_config_summary_meta4: "Architecture type et points de vigilance",
                blog_config_summary_label5: "Plan d'action 90 jours",
                blog_config_summary_meta5: "Feuille de route et indicateurs de succès",
                blog_config_enjeux_title: "1. Pourquoi optimiser le matériel maintenant&nbsp;?",
                blog_config_enjeux_p1: "Depuis le début de 2025, la plupart des directions de bureaux d'études que j'accompagne cherchent à absorber une hausse des projets sans sacrifier la réactivité. Or les irritants que remontent les concepteurs SOLIDWORKS proviennent rarement de la modélisation elle-même&nbsp;: temps d'ouverture qui dépassent la minute, calculs Simulation qui bloquent un poste toute une après-midi, synchronisations PDM qui saturent les liens inter-sites. Ces signaux faibles finissent par freiner la mise sur le marché.",
                blog_config_enjeux_quote: "Une plateforme matérielle alignée sur les usages, c'est un dossier critique qui sort 30&nbsp;% plus vite, une production mieux alimentée en données et une DSI qui tient ses engagements de service sans surcoût.",
                blog_config_enjeux_quote_author: "Mohamed Omar Baouch",
                blog_config_enjeux_p2: "Les organisations qui franchissent le cap de SOLIDWORKS 2025 avec sérénité partagent le même socle&nbsp;: un environnement matériel contrôlé et instrumenté. Ce guide synthétise les enseignements tirés d'une douzaine d'audits réalisés ces dix-huit derniers mois et propose un cadre opérationnel pour identifier les goulots d'étranglement, prioriser les investissements et sécuriser l'évolutivité.",
                blog_config_audit_title: "2. Audit express d'un parc CAO",
                blog_config_audit_intro: "L'objectif est de dresser une cartographie fiable des performances en moins de quinze jours. La démarche se structure autour de trois axes complémentaires qui se nourrissent l'un l'autre.",
                blog_config_audit_card1_title: "Mesures terrain",
                blog_config_audit_card1_item1: "Journalisation des temps d'ouverture sur dix assemblages représentatifs",
                blog_config_audit_card1_item2: "Suivi CPU/GPU via SOLIDWORKS RX complété par HWinfo",
                blog_config_audit_card1_item3: "Analyse détaillée des temps de check-in/out PDM",
                blog_config_audit_card2_title: "Entretien utilisateurs",
                blog_config_audit_card2_item1: "Cartographie des tâches critiques (assemblage, Simulation, Visualize)",
                blog_config_audit_card2_item2: "Identification des pics de charge hebdomadaires et saisonniers",
                blog_config_audit_card2_item3: "Évaluation de la maturité PDM&nbsp;: workflows, réplications, discipline documentaire",
                blog_config_audit_card3_title: "Inventaire IT",
                blog_config_audit_card3_item1: "Âge, garantie et version de firmware des stations",
                blog_config_audit_card3_item2: "Topologie réseau, saturation des VLAN et qualité du câblage",
                blog_config_audit_card3_item3: "Stratégie de sauvegarde et PRA autour du coffre-fort PDM",
                blog_config_audit_callout: `<strong>Livrable clé :</strong> une matrice qui croise profils utilisateurs et workloads, assortie d'un indicateur de santé (vert / orange / rouge). Elle sert de boussole pour calibrer les investissements ciblés.`,
                blog_config_profils_title: "3. Trois profils de stations prêts à déployer",
                blog_config_profils_intro: "Au lieu de multiplier les stations sur mesure, je préconise trois profils standardisés. Ils couvrent plus de 90&nbsp;% des cas observés, simplifient les achats et réduisent la variabilité lors des maintenances.",
                blog_config_profils_table_header_profile: "Profil",
                blog_config_profils_table_header_cpu: "CPU",
                blog_config_profils_table_header_gpu: "GPU",
                blog_config_profils_table_header_ram: "RAM",
                blog_config_profils_table_header_storage: "Stockage",
                blog_config_profils_table_header_usage: "Usage principal",
                blog_config_profils_row1_label: "Bureau d'études",
                blog_config_profils_row1_usage: "Assemblages &lt; 5&nbsp;000 pièces, mise en plan",
                blog_config_profils_row2_label: "Simulation avancée",
                blog_config_profils_row2_usage: "Simulation statique / thermique / Flow",
                blog_config_profils_row3_label: "Revue immersive",
                blog_config_profils_row3_usage: "VR, Visualize, revues clients",
                blog_config_profils_figcaption: "Trois profils éprouvés sur le terrain&nbsp;: budget maîtrisé, maintenance prévisible et gains visibles dès les premières semaines.",
                blog_config_profils_callout: `<strong>Astuce terrain :</strong> préparez des images Windows différenciées (Design, Simulation, VR) avec politiques d'alimentation adaptées. Vous évitez les BIOS sous-optimisés et sécurisez un comportement homogène sur tout le parc.`,
                blog_config_infra_title: "4. Serveur PDM, stockage et réseau",
                blog_config_infra_intro: "Une station de travail performante ne suffit pas si le coffre-fort PDM ou le réseau devient le nouveau goulot d'étranglement. Les projets les plus fluides reposent sur une architecture complète&nbsp;: serveur applicatif dimensionné, stockage NVMe répliqué et réseau 10&nbsp;GbE qui priorise les flux CAO.",
                blog_config_infra_figcaption: "Backbone PDM prêt pour la montée en charge&nbsp;: NVMe en production, sauvegarde 3-2-1 et qualité de service appliquée aux flux critiques.",
                blog_config_infra_server_title: "Serveur PDM",
                blog_config_infra_server_item1: "CPU Xeon Silver ou AMD EPYC avec 12&nbsp;coeurs minimum",
                blog_config_infra_server_item2: "128&nbsp;Go de RAM ECC pour absorber les pics de réplication",
                blog_config_infra_server_item3: "Volumes NVMe en RAID&nbsp;1 pour le vault et SSD SATA pour les archives",
                blog_config_infra_network_title: "Réseau &amp; QoS",
                blog_config_infra_network_item1: "Backbone 10&nbsp;GbE redondé, VLAN dédié aux flux CAO",
                blog_config_infra_network_item2: "QoS priorisant PDM, Visualize et sauvegardes différées",
                blog_config_infra_network_item3: "VPN avec compression et cache local pour les sites distants",
                blog_config_infra_chart_text: "Répartition indicative d'un budget de modernisation (en&nbsp;%). Ajustez-la à l'issue de votre audit&nbsp;: les gains rapides proviennent souvent du stockage et du réseau.",
                blog_config_infra_callout: `<strong>Point de vigilance :</strong> synchronisez vos maintenances avec les cycles de sauvegarde et institutionnalisez un test mensuel de restauration du coffre-fort. Un PRA documenté évite les arrêts de production lors des mises à jour SOLIDWORKS.`,
                blog_config_plan_title: "5. Plan d'action 90 jours",
                blog_config_plan_intro: "Une fois la cible validée, structurez la mise en œuvre en trois sprints de trente jours. Objectif&nbsp;: livrer des améliorations visibles dès le premier mois tout en sécurisant la trajectoire long terme.",
                blog_config_plan_item1: `<strong>Sprint&nbsp;1&nbsp;:</strong> commandes et quick wins (SSD NVMe, BIOS à jour, tuning Windows). KPI&nbsp;: temps d'ouverture moyen &lt;&nbsp;45&nbsp;secondes.`,
                blog_config_plan_item2: `<strong>Sprint&nbsp;2&nbsp;:</strong> déploiement des nouvelles stations et mise à niveau réseau. KPI&nbsp;: zéro erreur de check-in PDM, latence moyenne &lt;&nbsp;2&nbsp;ms.`,
                blog_config_plan_item3: `<strong>Sprint&nbsp;3&nbsp;:</strong> bascule serveur PDM, sauvegarde 3-2-1, formation utilisateurs. KPI&nbsp;: satisfaction utilisateurs &gt;&nbsp;8/10, PRA testé et validé.`,
                blog_config_plan_outro: "Ce plan permet d'engranger des gains dès le premier mois tout en alignant IT, bureau d'études et direction industrielle sur la même feuille de route.",
                blog_config_cta_title: "Vous voulez fiabiliser votre environnement SOLIDWORKS&nbsp;?",
                blog_config_cta_text: "Je vous aide à cadrer l'audit, hiérarchiser les investissements et orchestrer le déploiement sans interrompre la production. Discutons de vos priorités.",
                blog_config_cta_button: "Planifier un échange"
            },
            "resolutions-problematiques-plm": {
                blog_plm_hero_eyebrow: "Expérience terrain",
                blog_plm_hero_title: "Au-delà de la théorie : résoudre les 5 problématiques PLM que j'ai vécues en tant qu'Ingénieur Mécanique",
                blog_plm_hero_subtitle: `Retour d'expérience publié le <span data-date-iso="2025-09-15T00:00:00.000Z" data-date-format="long">15 septembre 2025</span> : comment passer des discours aux actions concrètes pour sécuriser données, nomenclatures et collaboration.`,
                blog_plm_stat_publication: "Date de publication",
                blog_plm_stat_issues: "Problématiques traitées",
                blog_plm_stat_expertise: "Expertise terrain",
                blog_plm_summary_label1: "Silos de données qui fragmentent le savoir",
                blog_plm_summary_meta1: "De l'enquête manuelle au coffre-fort PDM",
                blog_plm_summary_label2: "Erreurs dans les nomenclatures",
                blog_plm_summary_meta2: "Quand Excel fait dérailler la production",
                blog_plm_summary_label3: "Versions incontrôlées et confusion",
                blog_plm_summary_meta3: "Le risque caché des dossiers « finale_v3 »",
                blog_plm_summary_label4: "Collaboration freinée entre BE et production",
                blog_plm_summary_meta4: "Du mail perdu au workflow tracé",
                blog_plm_summary_label5: "Traçabilité et conformité sous tension",
                blog_plm_summary_meta5: "Répondre à un audit en quelques clics",
                blog_plm_intro_p1: "Quand j'ai débuté comme ingénieur mécanique, la gestion des données produit me semblait un sujet réservé aux grandes entreprises et aux théoriciens des processus. La réalité du terrain m'a vite montré l'inverse. Chez Evolum puis chez ABMI, j'ai vu comment un simple plan mal versionné pouvait immobiliser une ligne de production ou comment une nomenclature erronée pouvait faire exploser les coûts d'un projet.",
                blog_plm_intro_quote: "Un PDM/PLM bien implémenté n'est pas un luxe : c'est un filet de sécurité qui libère les équipes de la chasse aux informations pour qu'elles se concentrent sur l'innovation.",
                blog_plm_intro_author: "Mohamed Omar Baouch",
                blog_plm_intro_p2: "Au fil des projets, j'ai identifié cinq problématiques récurrentes. Elles ne sont pas théoriques : chacune est issue d'un incident concret, d'un retard de production ou d'un audit stressant. Voici la synthèse des symptômes et des réponses mises en place avec les équipes terrain.",
                blog_plm_table_header_issue: "Problématique",
                blog_plm_table_header_impact: "Impact terrain",
                blog_plm_table_header_solution: "Solution PLM appliquée",
                blog_plm_table_row1_issue: "Silos de données",
                blog_plm_table_row1_impact: "Temps perdu à retrouver la bonne version",
                blog_plm_table_row1_solution: "Coffre-fort PDM centralisé et droits maîtrisés",
                blog_plm_table_row2_issue: "Nomenclatures instables",
                blog_plm_table_row2_impact: "Achats erronés, prototypes retardés",
                blog_plm_table_row2_solution: "Génération automatique des BOM depuis la CAO",
                blog_plm_table_row3_issue: "Versions incontrôlées",
                blog_plm_table_row3_impact: "Production lancée sur un plan obsolète",
                blog_plm_table_row3_solution: "Gestion des révisions et workflow de validation",
                blog_plm_table_row4_issue: "Collaboration freinée",
                blog_plm_table_row4_impact: "Feedback perdu entre mail et atelier",
                blog_plm_table_row4_solution: "Workflows intégrés entre BE et production",
                blog_plm_table_row5_issue: "Traçabilité fragile",
                blog_plm_table_row5_impact: "Audits retardés, confiance client fragilisée",
                blog_plm_table_row5_solution: "Historique complet et généalogie des pièces",
                blog_plm_silos_title: "1. Silos de données qui fragmentent le savoir",
                blog_plm_silos_p1: "À mes débuts chez Evolum, chacun travaillait dans son coin. Les fichiers de conception étaient dispersés entre des disques partagés, des clés USB et parfois des ordinateurs personnels. Lorsque je devais reprendre un projet, je passais plus de temps à chercher la bonne version d'un assemblage qu'à concevoir.",
                blog_plm_silos_p2: "Cette fragmentation du savoir faisait perdre un temps précieux et créait des divergences entre les bureaux d'études et l'atelier. La mise en place d'un coffre-fort PDM centralisé a été une révélation : chaque modèle était stocké une seule fois, les droits d'accès étaient clairs et je pouvais retracer l'historique complet d'une pièce sans lever de téléphone.",
                blog_plm_silos_callout: `<strong>Clé du succès :</strong> rendre le PDM incontournable en l'intégrant dans les habitudes quotidiennes (check-in/check-out, commentaires, workflows de revue).`,
                blog_plm_nomenclature_title: "2. Erreurs dans les nomenclatures",
                blog_plm_nomenclature_p1: "Lors d'une mission chez ABMI, j'ai vécu les conséquences d'une nomenclature gérée sous Excel. Une ligne oubliée a entraîné l'achat de pièces supplémentaires et plusieurs jours de retard sur un prototype. C'est à ce moment que j'ai compris l'importance d'un système PLM capable de générer des nomenclatures cohérentes directement depuis la CAO et de les lier aux achats.",
                blog_plm_nomenclature_before_title: "Avant",
                blog_plm_nomenclature_before_item1: "Excel partagé par mail",
                blog_plm_nomenclature_before_item2: "Versions multiples sans historique",
                blog_plm_nomenclature_before_item3: "Décisions prises hors système",
                blog_plm_nomenclature_after_title: "Après",
                blog_plm_nomenclature_after_item1: "BOM générée automatiquement",
                blog_plm_nomenclature_after_item2: "Validation croisée avec les achats",
                blog_plm_nomenclature_after_item3: "Historique des modifications consolidé",
                blog_plm_nomenclature_p2: "Avec SolidWorks PDM, nous avons automatisé l'extraction des BOM et mis en place des règles de validation qui ont supprimé ce type d'erreurs. L'équipe projet gagnait en sérénité et les réunions ne tournaient plus autour de la question « qui possède la bonne version ? ».",
                blog_plm_versions_title: "3. Versions incontrôlées et confusion",
                blog_plm_versions_p1: "Avant d'adopter un PDM, la gestion des révisions se résumait à des suffixes dans les noms de fichiers. Il n'était pas rare de voir des dossiers remplis de \"finale\", \"finale2\" ou \"version_definitive_v3\". Lors de mon passage chez Evolum, cette pratique a provoqué la fabrication d'un lot de pièces basé sur un plan obsolète.",
                blog_plm_versions_p2: "En implémentant un véritable PLM chez Visiativ, j'ai découvert la puissance du contrôle de versions : chaque modification est tracée, commentée et validée. Les transitions de statuts (en conception, en validation, publié) ont apporté une clarté immédiate et réduit drastiquement les allers-retours improductifs.",
                blog_plm_collaboration_title: "4. Collaboration freinée entre bureaux d'études et production",
                blog_plm_collaboration_p1: "La collaboration se limitait souvent à l'échange de fichiers par email. Les retours de l'atelier arrivaient tard et les remarques se perdaient dans les boîtes de réception. En tant que consultant chez Visiativ, j'ai accompagné plusieurs clients dans l'intégration de workflows qui relient directement la conception à la production.",
                blog_plm_collaboration_p2: "Grâce à un PDM bien configuré, l'atelier peut annoter les modèles, proposer des modifications et suivre leur prise en compte. Cette boucle de feedback en continu a transformé la relation entre les équipes et réduit drastiquement les erreurs de fabrication.",
                blog_plm_traceability_title: "5. Traçabilité et conformité",
                blog_plm_traceability_p1: "Dans des secteurs réglementés, prouver la conformité d'un produit est aussi important que le produit lui-même. Avant l'arrivée d'un PLM, la traçabilité reposait sur des dossiers papier et la mémoire des ingénieurs. J'ai vu un audit repoussé parce qu'il était impossible de démontrer la généalogie complète d'un composant.",
                blog_plm_traceability_p2: "Avec un PLM, chaque décision, chaque validation et chaque version est enregistrée. Lors d'un projet piloté par Visiativ, nous avons pu répondre à un audit en quelques clics, fournissant l'historique complet des modifications d'une pièce critique. La confiance du client s'en est trouvée renforcée.",
                blog_plm_outro_p1: "Ces cinq problématiques ne sont pas de simples cas d'école. Elles ont freiné des projets auxquels j'ai participé et m'ont parfois laissé un goût d'inachevé. Aujourd'hui, en tant que consultant PDM/PLM chez Visiativ, je mets cette expérience au service des entreprises qui veulent éviter ces pièges.",
                blog_plm_cta_title: "Envie de résoudre vos problématiques PLM&nbsp;?",
                blog_plm_cta_text: "Construisons ensemble une feuille de route pragmatique, ancrée dans votre réalité terrain. Une simple discussion peut révéler les priorités à adresser en premier.",
                blog_plm_cta_button: "Planifier un échange"
            }
        }
    },
    en: {
        common: {
            blog_back_to_blog: "← Back to the blog",
            blog_back_to_portfolio: "Back to the portfolio",
            blog_badge_editorial: "Feature article",
            blog_cta_summary: "View the outline",
            blog_cta_discuss_project: "Discuss your project",
            blog_summary_title: "Outline"
        },
        pages: {
            index: {
                blog_index_filter_all: "All",
                blog_index_filter_editorial: "Feature articles",
                blog_index_section_editorial_title: "Feature articles",
                blog_index_section_editorial_subtitle: "Editorial analyses, field feedback, and practical best practices."
            }
        },
        articles: {
            "configuration-materielle-solidworks": {
                blog_config_badge_guide: "Hardware guide",
                blog_config_hero_eyebrow: "SOLIDWORKS &amp; PDM",
                blog_config_hero_title: "SOLIDWORKS 2025 hardware configuration: the field guide for an agile design office",
                blog_config_hero_subtitle: `Published on <span data-date-iso="2025-09-21T00:00:00.000Z" data-date-format="long"></span> after twelve CAD diagnostics: how to size workstations, the PDM server, and the network to eliminate bottlenecks before peak season.`,
                blog_config_stat_publication: "Publication date",
                blog_config_stat_profiles: "Validated workstation profiles",
                blog_config_stat_gain: "Average gain on opening times",
                blog_config_summary_label1: "Why optimize hardware now?",
                blog_config_summary_meta1: "Signals from the field and KPIs to monitor",
                blog_config_summary_label2: "Rapid audit of a CAD environment",
                blog_config_summary_meta2: "Three-step method, tools, and thresholds",
                blog_config_summary_label3: "Three ready-to-deploy workstation profiles",
                blog_config_summary_meta3: "Specifications, costs, and user impact",
                blog_config_summary_label4: "PDM server, storage, and network",
                blog_config_summary_meta4: "Reference architecture and watchpoints",
                blog_config_summary_label5: "90-day action plan",
                blog_config_summary_meta5: "Roadmap and success indicators",
                blog_config_enjeux_title: "1. Why optimize hardware now?",
                blog_config_enjeux_p1: "Since the start of 2025, most design office leaders I support are trying to absorb more projects without sacrificing responsiveness. Yet the pain points raised by SOLIDWORKS designers rarely stem from modeling itself: opening times that exceed a minute, Simulation runs that block a workstation for an entire afternoon, PDM synchronizations that saturate inter-site links. These weak signals eventually slow down time-to-market.",
                blog_config_enjeux_quote: "A hardware platform aligned with actual usage means a critical file is released 30% faster, production stays well supplied with data, and IT delivers service levels without overspending.",
                blog_config_enjeux_quote_author: "Mohamed Omar Baouch",
                blog_config_enjeux_p2: "Organizations that approach SOLIDWORKS 2025 with confidence share the same foundation: a controlled, instrumented hardware environment. This guide summarizes a dozen audits carried out over the past eighteen months and offers an operational framework to identify bottlenecks, prioritize investments, and secure scalability.",
                blog_config_audit_title: "2. Rapid audit of a CAD environment",
                blog_config_audit_intro: "The goal is to establish a reliable performance map in under fifteen days. The approach is structured around three complementary axes that feed each other.",
                blog_config_audit_card1_title: "Field measurements",
                blog_config_audit_card1_item1: "Log opening times on ten representative assemblies",
                blog_config_audit_card1_item2: "Track CPU/GPU usage via SOLIDWORKS RX supplemented with HWinfo",
                blog_config_audit_card1_item3: "Detailed analysis of PDM check-in/check-out times",
                blog_config_audit_card2_title: "User interviews",
                blog_config_audit_card2_item1: "Map critical tasks (assemblies, Simulation, Visualize)",
                blog_config_audit_card2_item2: "Identify weekly and seasonal peak loads",
                blog_config_audit_card2_item3: "Assess PDM maturity: workflows, replication, document discipline",
                blog_config_audit_card3_title: "IT inventory",
                blog_config_audit_card3_item1: "Station age, warranty, and firmware version",
                blog_config_audit_card3_item2: "Network topology, VLAN saturation, and cabling quality",
                blog_config_audit_card3_item3: "Backup strategy and disaster recovery around the PDM vault",
                blog_config_audit_callout: `<strong>Key deliverable:</strong> a matrix crossing user profiles and workloads, paired with a health indicator (green / orange / red). It is the compass for calibrating targeted investments.`,
                blog_config_profils_title: "3. Three ready-to-deploy workstation profiles",
                blog_config_profils_intro: "Instead of multiplying custom stations, I recommend three standardized profiles. They cover over 90% of observed cases, simplify purchasing, and reduce variability during maintenance.",
                blog_config_profils_table_header_profile: "Profile",
                blog_config_profils_table_header_cpu: "CPU",
                blog_config_profils_table_header_gpu: "GPU",
                blog_config_profils_table_header_ram: "RAM",
                blog_config_profils_table_header_storage: "Storage",
                blog_config_profils_table_header_usage: "Primary use",
                blog_config_profils_row1_label: "Design office",
                blog_config_profils_row1_usage: "Assemblies &lt; 5&nbsp;000 parts, drafting",
                blog_config_profils_row2_label: "Advanced simulation",
                blog_config_profils_row2_usage: "Structural, thermal, and Flow Simulation",
                blog_config_profils_row3_label: "Immersive review",
                blog_config_profils_row3_usage: "VR, Visualize, client reviews",
                blog_config_profils_figcaption: "Three field-proven profiles: controlled budget, predictable maintenance, and visible gains from the first weeks.",
                blog_config_profils_callout: `<strong>Field tip:</strong> prepare separate Windows images (Design, Simulation, VR) with tailored power policies. You avoid under-tuned BIOS settings and ensure consistent behavior across the fleet.`,
                blog_config_infra_title: "4. PDM server, storage, and network",
                blog_config_infra_intro: "A powerful workstation is not enough if the PDM vault or the network becomes the new bottleneck. The smoothest projects rely on a complete architecture: properly sized application server, replicated NVMe storage, and 10&nbsp;GbE networking that prioritizes CAD traffic.",
                blog_config_infra_figcaption: "PDM backbone ready to scale: NVMe in production, 3-2-1 backup, and quality of service applied to critical flows.",
                blog_config_infra_server_title: "PDM server",
                blog_config_infra_server_item1: "Xeon Silver or AMD EPYC CPU with at least 12 cores",
                blog_config_infra_server_item2: "128&nbsp;GB ECC RAM to absorb replication peaks",
                blog_config_infra_server_item3: "NVMe RAID&nbsp;1 volumes for the vault and SATA SSDs for archives",
                blog_config_infra_network_title: "Network &amp; QoS",
                blog_config_infra_network_item1: "Redundant 10&nbsp;GbE backbone with a VLAN dedicated to CAD traffic",
                blog_config_infra_network_item2: "QoS prioritizing PDM, Visualize, and deferred backups",
                blog_config_infra_network_item3: "VPN with compression and local caching for remote sites",
                blog_config_infra_chart_text: "Indicative breakdown of a modernization budget (%). Adjust it after your audit: quick wins often come from storage and the network.",
                blog_config_infra_callout: `<strong>Watchpoint:</strong> align maintenance windows with backup cycles and institutionalize a monthly vault restoration test. A documented DR plan prevents production stops during SOLIDWORKS upgrades.`,
                blog_config_plan_title: "5. 90-day action plan",
                blog_config_plan_intro: "Once the target is validated, structure execution into three thirty-day sprints. Objective: deliver visible improvements from month one while securing the long-term trajectory.",
                blog_config_plan_item1: `<strong>Sprint&nbsp;1:</strong> orders and quick wins (NVMe SSDs, up-to-date BIOS, Windows tuning). KPI: average opening time &lt;&nbsp;45&nbsp;seconds.`,
                blog_config_plan_item2: `<strong>Sprint&nbsp;2:</strong> deploy new stations and upgrade the network. KPI: zero PDM check-in errors, average latency &lt;&nbsp;2&nbsp;ms.`,
                blog_config_plan_item3: `<strong>Sprint&nbsp;3:</strong> switch the PDM server, implement 3-2-1 backups, train users. KPI: user satisfaction &gt;&nbsp;8/10, DR plan tested and approved.`,
                blog_config_plan_outro: "This plan generates gains from the first month while aligning IT, the design office, and operations on the same roadmap.",
                blog_config_cta_title: "Want to stabilize your SOLIDWORKS environment?",
                blog_config_cta_text: "I help you frame the audit, prioritize investments, and orchestrate deployment without interrupting production. Let's discuss your priorities.",
                blog_config_cta_button: "Schedule a call"
            },
            "resolutions-problematiques-plm": {
                blog_plm_hero_eyebrow: "Field experience",
                blog_plm_hero_title: "Beyond theory: solving the 5 PLM challenges I experienced as a Mechanical Engineer",
                blog_plm_hero_subtitle: `Field feedback published on <span data-date-iso="2025-09-15T00:00:00.000Z" data-date-format="long"></span>: how to move from talk to concrete actions to secure data, BOMs, and collaboration.`,
                blog_plm_stat_publication: "Publication date",
                blog_plm_stat_issues: "Challenges addressed",
                blog_plm_stat_expertise: "Field expertise",
                blog_plm_summary_label1: "Data silos fragmenting knowledge",
                blog_plm_summary_meta1: "From manual searches to a secured PDM vault",
                blog_plm_summary_label2: "Errors in bills of materials",
                blog_plm_summary_meta2: "When Excel derails production",
                blog_plm_summary_label3: "Uncontrolled versions and confusion",
                blog_plm_summary_meta3: "The hidden risk of “final_v3” folders",
                blog_plm_summary_label4: "Collaboration slowed between design and production",
                blog_plm_summary_meta4: "From lost emails to tracked workflows",
                blog_plm_summary_label5: "Traceability and compliance under pressure",
                blog_plm_summary_meta5: "Answering an audit in a few clicks",
                blog_plm_intro_p1: "When I started as a mechanical engineer, product data management seemed reserved for large companies and process theorists. Reality quickly proved otherwise. At Evolum and later ABMI, I saw how a single mis-versioned drawing could stop a production line or how an inconsistent BOM could explode a project’s costs.",
                blog_plm_intro_quote: "A well-implemented PDM/PLM is not a luxury: it is a safety net that frees teams from chasing information so they can focus on innovation.",
                blog_plm_intro_author: "Mohamed Omar Baouch",
                blog_plm_intro_p2: "Across projects I identified five recurring challenges. They are not theoretical: each stems from a concrete incident, a production delay, or a stressful audit. Here is a synthesis of the symptoms and the responses built with field teams.",
                blog_plm_table_header_issue: "Challenge",
                blog_plm_table_header_impact: "Impact on the field",
                blog_plm_table_header_solution: "Applied PLM solution",
                blog_plm_table_row1_issue: "Data silos",
                blog_plm_table_row1_impact: "Time wasted finding the right version",
                blog_plm_table_row1_solution: "Centralized PDM vault with controlled access",
                blog_plm_table_row2_issue: "Unstable BOMs",
                blog_plm_table_row2_impact: "Wrong purchases, delayed prototypes",
                blog_plm_table_row2_solution: "Automatic BOM generation from CAD",
                blog_plm_table_row3_issue: "Uncontrolled versions",
                blog_plm_table_row3_impact: "Production launched on an outdated drawing",
                blog_plm_table_row3_solution: "Revision management and approval workflow",
                blog_plm_table_row4_issue: "Slowed collaboration",
                blog_plm_table_row4_impact: "Feedback lost between email and the shop floor",
                blog_plm_table_row4_solution: "Integrated workflows between design and production",
                blog_plm_table_row5_issue: "Fragile traceability",
                blog_plm_table_row5_impact: "Delayed audits, weakened customer trust",
                blog_plm_table_row5_solution: "Complete history and part genealogy",
                blog_plm_silos_title: "1. Data silos fragmenting knowledge",
                blog_plm_silos_p1: "At my start with Evolum, everyone worked in isolation. Design files were scattered across shared drives, USB sticks, and sometimes personal computers. When I had to take over a project, I spent more time searching for the right assembly version than actually designing.",
                blog_plm_silos_p2: "This fragmented knowledge wasted precious time and created discrepancies between design offices and the workshop. Deploying a centralized PDM vault was a revelation: each model was stored once, access rights were clear, and I could trace a part’s entire history without picking up the phone.",
                blog_plm_silos_callout: `<strong>Success key:</strong> make the PDM indispensable by embedding it into daily habits (check-in/check-out, comments, review workflows).`,
                blog_plm_nomenclature_title: "2. Errors in bills of materials",
                blog_plm_nomenclature_p1: "During a mission at ABMI I experienced the consequences of managing a BOM in Excel. One missing line led to extra parts being ordered and several days of delay on a prototype. That’s when I realized the importance of a PLM capable of generating consistent BOMs directly from CAD and linking them to purchasing.",
                blog_plm_nomenclature_before_title: "Before",
                blog_plm_nomenclature_before_item1: "Excel shared by email",
                blog_plm_nomenclature_before_item2: "Multiple versions with no history",
                blog_plm_nomenclature_before_item3: "Decisions taken outside the system",
                blog_plm_nomenclature_after_title: "After",
                blog_plm_nomenclature_after_item1: "BOM generated automatically",
                blog_plm_nomenclature_after_item2: "Cross-check with purchasing",
                blog_plm_nomenclature_after_item3: "Consolidated change history",
                blog_plm_nomenclature_p2: "With SOLIDWORKS PDM we automated BOM extraction and implemented validation rules that eliminated this kind of error. The project team gained peace of mind and meetings no longer revolved around “who has the right version?”",
                blog_plm_versions_title: "3. Uncontrolled versions and confusion",
                blog_plm_versions_p1: "Before adopting a PDM, revision management boiled down to suffixes in filenames. Folders full of “final”, “final2”, or “version_definitive_v3” were common. During my time at Evolum this practice triggered the production of a batch of parts from an outdated drawing.",
                blog_plm_versions_p2: "By implementing a true PLM at Visiativ, I discovered the power of version control: every change is tracked, commented, and approved. Status transitions (in design, under review, released) brought immediate clarity and drastically reduced unproductive back-and-forth.",
                blog_plm_collaboration_title: "4. Collaboration slowed between design offices and production",
                blog_plm_collaboration_p1: "Collaboration often boiled down to exchanging files by email. Feedback from the shop floor arrived late and comments were lost in inboxes. As a consultant at Visiativ I helped several clients integrate workflows that connect design directly to production.",
                blog_plm_collaboration_p2: "With a well-configured PDM, the workshop can annotate models, propose changes, and track their adoption. This continuous feedback loop transformed relationships between teams and drastically reduced manufacturing errors.",
                blog_plm_traceability_title: "5. Traceability and compliance",
                blog_plm_traceability_p1: "In regulated industries, proving product compliance is as critical as the product itself. Before PLM, traceability relied on paper binders and engineers’ memory. I saw an audit postponed because it was impossible to demonstrate the full genealogy of a component.",
                blog_plm_traceability_p2: "With a PLM, every decision, approval, and version is recorded. On a project led by Visiativ we answered an audit in just a few clicks, providing the complete change history of a critical part. Customer trust was strengthened.",
                blog_plm_outro_p1: "These five challenges are not textbook examples. They slowed projects I worked on and sometimes left me frustrated. Today, as a PDM/PLM consultant at Visiativ, I leverage that experience to help companies avoid these pitfalls.",
                blog_plm_cta_title: "Want to tackle your PLM challenges?",
                blog_plm_cta_text: "Let's build a pragmatic roadmap anchored in your field reality. A short discussion can surface the priorities to address first.",
                blog_plm_cta_button: "Schedule a call"
            }
        }
    }
};

const motionPreference = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
let reduceMotionEnabled = motionPreference ? motionPreference.matches : false;

function applyMotionPreferences(shouldReduce) {
    document.documentElement.classList.toggle('reduce-motion', shouldReduce);
    const customCursor = document.getElementById('customCursor');
    const cursorDot = document.getElementById('cursorDot');
    const overlay = document.getElementById('dynamicOverlay');
    if (shouldReduce) {
        document.querySelectorAll('.cursor-trail').forEach(trail => trail.remove());
        if (customCursor) customCursor.style.display = 'none';
        if (cursorDot) cursorDot.style.display = 'none';
        if (overlay) overlay.style.display = 'none';
        const particlesCanvas = document.querySelector('#particles-js canvas');
        if (particlesCanvas) {
            particlesCanvas.remove();
        }
    } else {
        if (customCursor) customCursor.style.display = '';
        if (cursorDot) cursorDot.style.display = '';
        if (overlay) overlay.style.display = '';
    }
}

if (motionPreference) {
    applyMotionPreferences(reduceMotionEnabled);
    const motionListener = event => {
        reduceMotionEnabled = event.matches;
        applyMotionPreferences(reduceMotionEnabled);
    };
    if (typeof motionPreference.addEventListener === 'function') {
        motionPreference.addEventListener('change', motionListener);
    } else if (typeof motionPreference.addListener === 'function') {
        motionPreference.addListener(motionListener);
    }
} else {
    applyMotionPreferences(false);
}

const SUPPORTED_LANGUAGES = ['fr', 'en'];

function isBlogPage() {
    return document.body?.classList.contains('blog-page');
}

function getBlogPageKey() {
    return document.body?.dataset.blogPage || null;
}

function getBlogPostSlug() {
    return document.body?.dataset.blogPost || null;
}

function buildBlogLanguageData(lang) {
    const config = blogTranslations[lang];
    if (!config) {
        return {};
    }
    const result = { ...(config.common || {}) };
    const pageKey = getBlogPageKey();
    if (pageKey && config.pages?.[pageKey]) {
        Object.assign(result, config.pages[pageKey]);
    }
    const slug = getBlogPostSlug();
    if (slug && config.articles?.[slug]) {
        Object.assign(result, config.articles[slug]);
    }
    return result;
}

function formatBlogDates(lang) {
    const targets = document.querySelectorAll('[data-date-iso]');
    if (!targets.length) {
        return;
    }
    const locale = lang === 'fr' ? 'fr-FR' : 'en-GB';
    const longFormatter = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    const shortFormatter = new Intl.DateTimeFormat(locale, { day: '2-digit', month: '2-digit', year: 'numeric' });
    targets.forEach((element) => {
        const iso = element.getAttribute('data-date-iso');
        if (!iso) {
            return;
        }
        const date = new Date(iso);
        if (Number.isNaN(date.getTime())) {
            return;
        }
        const format = element.getAttribute('data-date-format') || 'long';
        const formatter = format === 'short' ? shortFormatter : longFormatter;
        element.textContent = formatter.format(date);
    });
}

if (typeof window !== 'undefined') {
    window.formatBlogDates = formatBlogDates;
}

function applyPortfolioLanguage(langData, lang) {
    if (!langData) {
        return;
    }
    const downloadCvLink = document.querySelector('[data-cv-link]');
    if (downloadCvLink && langData['cv_file']) {
        downloadCvLink.setAttribute('href', langData['cv_file']);
    }
    if (langData['meta_title']) {
        document.title = langData['meta_title'];
    }
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && langData['meta_description']) {
        metaDescription.setAttribute('content', langData['meta_description']);
    }
    const glitchElements = document.querySelectorAll('.glitch');
    if (glitchElements.length >= 2) {
        if (lang === 'en') {
            glitchElements[0].dataset.text = 'Plastics Engineer';
            glitchElements[1].dataset.text = 'Consultant';
        } else {
            glitchElements[0].dataset.text = 'Ingénieur Plasturgie';
            glitchElements[1].dataset.text = 'PDM/PLM';
        }
    }
}
const frenchCountries = [
    'BJ', 'BF', 'CG', 'CD', 'CI', 'GA', 'GN', 'ML', 'NE', 'SN', 'TG', 'TD', // Afrique Ouest/Centrale
    'FR', 'MC', 'LU', 'BE', 'CH', // Europe
    'GP', 'MQ', 'GF', 'RE', 'PM', 'YT', 'WF', 'PF', 'NC', // Territoires FR
    'CA', // Géré spécifiquement, mais FR par défaut si pas de province
    'HT', // Amérique
    'DZ', 'MA', 'TN', 'LB', 'DJ', // Maghreb & Moyen-Orient
    'MG', 'KM', 'MU' // Océan Indien
];
const englishCountries = [
    'RW', 'KH', 'LA', 'VU', 'SC' // Groupe 2
];
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
}
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function setLanguage(lang) {
    if (!SUPPORTED_LANGUAGES.includes(lang)) {
        console.warn(`Language '${lang}' not supported. Defaulting to 'fr'.`);
        lang = 'fr';
    }
    const htmlElement = document.documentElement;
    if (htmlElement) {
        htmlElement.lang = lang;
    }
    const portfolioLangData = translations[lang] || {};
    const blogPageActive = isBlogPage();
    const blogLangData = blogPageActive ? buildBlogLanguageData(lang) : {};
    document.querySelectorAll('[data-translate-key]').forEach((element) => {
        const key = element.dataset.translateKey;
        const value = (blogPageActive ? blogLangData[key] : undefined) ?? portfolioLangData[key];
        if (value !== undefined) {
            element.innerHTML = value;
        }
    });
    const langFrBtn = document.getElementById('lang-fr');
    if (langFrBtn) {
        langFrBtn.classList.toggle('active', lang === 'fr');
    }
    const langEnBtn = document.getElementById('lang-en');
    if (langEnBtn) {
        langEnBtn.classList.toggle('active', lang === 'en');
    }
    if (blogPageActive) {
        document.dispatchEvent(new CustomEvent('blog:languagechange', { detail: { lang } }));
        formatBlogDates(lang);
    } else {
        applyPortfolioLanguage(portfolioLangData, lang);
    }
    setCookie('preferred_language', lang, 365);
}
async function initializeLanguage() {
    const cookieLang = getCookie('preferred_language');
    if (cookieLang && SUPPORTED_LANGUAGES.includes(cookieLang)) {
        setLanguage(cookieLang);
        return;
    }
    const browserLang = navigator.language.split('-')[0];
    if (SUPPORTED_LANGUAGES.includes(browserLang)) {
        setLanguage(browserLang);
        return;
    }
    try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
            throw new Error('IP API request failed');
        }
        const data = await response.json();
        const countryCode = data.country_code;
        if (frenchCountries.includes(countryCode)) {
            setLanguage('fr');
        } else if (englishCountries.includes(countryCode)) {
            setLanguage('en');
        } else {
            setLanguage('en');
        }
    } catch (error) {
        console.error("Could not determine language from IP, defaulting to French.", error);
        setLanguage('fr');
    }
}
const langFrButton = document.getElementById('lang-fr');
if (langFrButton) {
    langFrButton.addEventListener('click', () => setLanguage('fr'));
}
const langEnButton = document.getElementById('lang-en');
if (langEnButton) {
    langEnButton.addEventListener('click', () => setLanguage('en'));
}
//--------- LANGUAGE SWITCHER SCRIPT END ---------//

const TicTacToe = {
    active: false,
    board: Array(9).fill(null),
    human: 'X',
    pc: 'O',
    currentPlayer: 'X',
    winningLines: [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ],
    cells: [],

    initSVG: function () {
        // SVG strings for symbols
        this.svgX = '<svg viewBox="0 0 100 100" class="symbol-svg x"><path d="M20,20 L80,80 M80,20 L20,80" stroke="currentColor" stroke-width="10" stroke-linecap="round"/></svg>';
        this.svgO = '<svg viewBox="0 0 100 100" class="symbol-svg o"><circle cx="50" cy="50" r="30" stroke="currentColor" stroke-width="10" fill="none"/></svg>';
    },

    startGame: function () {
        if (this.active) return;
        this.active = true;
        this.board.fill(null);
        this.currentPlayer = 'X';
        document.body.classList.add('game-mode');

        // Swap classes for shared cells using IDs (ROBUST FIX)
        const sharedLeft = document.getElementById('play-replay-shared-cell');
        const sharedRight = document.getElementById('play-close-shared-cell');

        if (sharedLeft) {
            sharedLeft.classList.remove('play-btn-left', 'play-button');
            sharedLeft.classList.add('replay-btn-right');
        }
        if (sharedRight) {
            sharedRight.classList.remove('play-btn-right', 'play-button');
            sharedRight.classList.add('close-btn-left');
        }

        // Show Overlay
        let overlay = document.querySelector('.game-active-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'game-active-overlay';
            document.body.appendChild(overlay);
        }

        // Handle Buttons Visibility
        document.querySelectorAll('.play-button').forEach(el => el.style.opacity = '0');
        document.querySelectorAll('.replay-button, .close-button').forEach(el => el.classList.add('active-game-btn'));

        // Create UI if missing (Status Text only)
        let ui = document.querySelector('.game-ui-container');
        if (!ui) {
            ui = document.createElement('div');
            ui.className = 'game-ui-container';
            ui.innerHTML = `<div class="game-status" id="gameStatus">TON TOUR</div>`;
            document.body.appendChild(ui);
        }

        // Clear any lingering hover effects on grid cells
        const allCells = document.querySelectorAll('.grid-cell');
        allCells.forEach(cell => {
            cell.style.backgroundColor = 'transparent';
            cell.style.transform = 'translateZ(0)';
            cell.classList.remove('active');
            cell.classList.remove('play-hover-active', 'replay-hover-active', 'close-hover-active');
        });

        this.updateUI();
        this.updateUIPosition(); // Position UI on start
        window.addEventListener('resize', () => {
            if (this.active) this.updateUIPosition();
        });
        this.highlightBoard();
    },

    updateUIPosition: function () {
        const ui = document.querySelector('.game-ui-container');
        if (!ui || !this.cells || this.cells.length < 9) return;

        // Position Status Text in the row BELOW the board (gap between board and buttons)
        // Bottom of board is cell[8]
        const lastCell = this.cells[8];
        const firstCell = this.cells[0];

        if (firstCell && lastCell) {
            const firstRect = firstCell.getBoundingClientRect();
            const lastRect = lastCell.getBoundingClientRect();

            const centerX = (firstRect.left + lastRect.right) / 2;
            const bottomY = lastRect.bottom;

            ui.style.left = `${centerX}px`;
            ui.style.top = `${bottomY + 25}px`; // Centered in the 50px gap row
        }
    },

    highlightBoard: function () {
        this.cells.forEach((cell, index) => {
            cell.classList.add('game-cell');
            cell.classList.remove('x', 'o', 'win');
            // Remove any existing content (pseudo-elements handle text, but just in case)
        });
    },

    handleCellClick: function (index) {
        if (!this.active || this.board[index] || this.currentPlayer !== this.human) return;

        this.makeMove(index, this.human);

        if (this.checkWin(this.human)) {
            this.endGame('VICTOIRE !');
            return;
        }
        if (this.checkDraw()) {
            this.endGame('ÉGALITÉ');
            return;
        }

        this.currentPlayer = this.pc;
        this.updateUI();

        // PC Move with slight delay for realism
        setTimeout(() => {
            const bestMove = this.minimax(this.board, this.pc).index;
            this.makeMove(bestMove, this.pc);

            if (this.checkWin(this.pc)) {
                this.endGame('DÉFAITE...');
            } else if (this.checkDraw()) {
                this.endGame('ÉGALITÉ');
            } else {
                this.currentPlayer = this.human;
                this.updateUI();
            }
        }, 600);
    },

    makeMove: function (index, player) {
        this.board[index] = player;
        const cell = this.cells[index];
        cell.classList.add('taken', player.toLowerCase());

        // Add specific class for CSS animation trigger
        // cell.innerHTML = player === 'X' ? this.svgX : this.svgO; // CSS pseudo-elements used instead for cleaner code
    },

    checkWin: function (player) {
        return this.winningLines.some(combination => {
            if (combination.every(index => this.board[index] === player)) {
                combination.forEach(index => this.cells[index].classList.add('win'));
                return true;
            }
            return false;
        });
    },

    checkDraw: function () {
        return this.board.every(cell => cell !== null);
    },

    endGame: function (message) {
        const status = document.getElementById('gameStatus');
        if (status) status.textContent = message;
        // Keep active true so user can see result, but prevent moves by checking active board in click handler or just leave as is since logic checks if cell taken
    },

    resetGame: function () {
        this.board.fill(null);
        this.cells.forEach(cell => {
            cell.classList.remove('taken', 'x', 'o', 'win');
        });
        this.currentPlayer = 'X';
        this.updateUI();
    },

    closeGame: function () {
        this.active = false;
        document.body.classList.remove('game-mode');

        // Revert classes for shared cells using IDs (ROBUST FIX)
        const sharedLeft = document.getElementById('play-replay-shared-cell');
        const sharedRight = document.getElementById('play-close-shared-cell');

        if (sharedLeft) {
            sharedLeft.classList.remove('replay-btn-right');
            sharedLeft.classList.add('play-btn-left', 'play-button');
        }
        if (sharedRight) {
            sharedRight.classList.remove('close-btn-left');
            sharedRight.classList.add('play-btn-right', 'play-button');
        }

        // Remove Overlay
        const overlay = document.querySelector('.game-active-overlay');
        if (overlay) overlay.remove();
        if (overlay) overlay.remove();

        // Reset UI
        const ui = document.querySelector('.game-ui-container');
        if (ui) ui.remove();

        this.cells.forEach(cell => {
            cell.classList.remove('game-cell', 'taken', 'x', 'o', 'win');
        });
        document.querySelectorAll('.play-button').forEach(el => el.style.opacity = '1');
        document.querySelectorAll('.replay-button, .close-button').forEach(el => el.classList.remove('active-game-btn'));
    },

    updateUI: function () {
        const status = document.getElementById('gameStatus');
        if (status) {
            status.textContent = this.currentPlayer === this.human ? 'À TOI DE JOUER' : 'L\'IA RÉFLÉCHIT...';
        }
    },

    updateUIPosition: function () {
        const ui = document.querySelector('.game-ui-container');
        const heroGrid = document.getElementById('heroGrid');
        if (ui && heroGrid) {
            const rect = heroGrid.getBoundingClientRect();
            // Position above the grid (top - 80px)
            ui.style.top = (rect.top + window.scrollY - 80) + 'px';
            ui.style.left = (rect.left + window.scrollX + rect.width / 2) + 'px';
            ui.style.transform = 'translate(-50%, -50%)';
            ui.style.width = Math.min(rect.width, 300) + 'px'; // Limit width
            ui.style.textAlign = 'center';
        }
    },

    minimax: function (newBoard, player) {
        const availSpots = newBoard.map((v, i) => v === null ? i : null).filter(v => v !== null);

        if (this.checkWinState(newBoard, this.human)) return { score: -10 };
        if (this.checkWinState(newBoard, this.pc)) return { score: 10 };
        if (availSpots.length === 0) return { score: 0 };

        const moves = [];

        for (let i = 0; i < availSpots.length; i++) {
            const move = {};
            move.index = availSpots[i];
            newBoard[availSpots[i]] = player;

            if (player === this.pc) {
                const result = this.minimax(newBoard, this.human);
                move.score = result.score;
            } else {
                const result = this.minimax(newBoard, this.pc);
                move.score = result.score;
            }

            newBoard[availSpots[i]] = null;
            moves.push(move);
        }

        let bestMove;
        if (player === this.pc) {
            let bestScore = -10000;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            let bestScore = 10000;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        return moves[bestMove];
    },

    checkWinState: function (board, player) {
        return this.winningLines.some(combination => {
            return combination.every(index => board[index] === player);
        });
    }
};

function createHeroGrid() {
    const heroGrid = document.getElementById('heroGrid');
    if (!heroGrid) {
        return;
    }
    const width = heroGrid.clientWidth;
    const height = heroGrid.clientHeight;

    // Responsive: Ensure at least 7 columns for the buttons to fit
    // Calculate cell size: Max 50px, but shrink if width < 7 * 50
    let cellSize = 50;
    if (width < 350) { // 7 * 50 = 350
        cellSize = Math.floor(width / 7);
    }
    // Set CSS variable for cell size
    heroGrid.style.setProperty('--cell-size', `${cellSize}px`);

    const columns = Math.floor(width / cellSize);
    const rows = Math.ceil(height / cellSize);
    heroGrid.innerHTML = '';

    // Identify center for 3x3 Grid
    // Identify center for 3x3 Grid
    let centerCol = Math.floor(columns / 2);
    if (width > 992) {
        centerCol = Math.floor(columns * 0.75);
    }
    const centerRow = Math.floor(rows / 2);

    // Define the game cells indices (3x3 grid centered)
    // Row indices: centerRow-1, centerRow, centerRow+1
    // Col indices: centerCol-1, centerCol, centerCol+1
    const gameIndices = [];
    for (let r = centerRow - 1; r <= centerRow + 1; r++) {
        for (let c = centerCol - 1; c <= centerCol + 1; c++) {
            gameIndices.push(r * columns + c);
        }
    }
    TicTacToe.cells = []; // Store DOM elements for game

    // Play Button: 3 cells (Left, Center, Right)
    const btnRow = centerRow + 3;
    const btnIndices = [
        btnRow * columns + centerCol - 1, // Play Left / Replay Right
        btnRow * columns + centerCol,     // Play Center
        btnRow * columns + centerCol + 1  // Play Right / Close Left
    ];

    // Replay: 3 cells (Left, Center, Right) - Ending at Play Left
    const replayIndices = [
        btnRow * columns + centerCol - 3, // Replay Left
        btnRow * columns + centerCol - 2, // Replay Center
        btnRow * columns + centerCol - 1  // Replay Right (Overlaps Play Left)
    ];

    // Close: 3 cells (Left, Center, Right) - Starting at Play Right
    const closeIndices = [
        btnRow * columns + centerCol + 1, // Close Left (Overlaps Play Right)
        btnRow * columns + centerCol + 2, // Close Center
        btnRow * columns + centerCol + 3  // Close Right
    ];

    for (let i = 0; i < rows * columns; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');

        // Setup Game Cells
        const gameCellIndex = gameIndices.indexOf(i);
        if (gameCellIndex !== -1) {
            cell.dataset.gameIndex = gameCellIndex;
            TicTacToe.cells[gameCellIndex] = cell;
            cell.addEventListener('click', () => {
                if (TicTacToe.active) {
                    TicTacToe.handleCellClick(gameCellIndex);
                }
            });
        }

        // Setup Play Button - ONLY ON DESKTOP (> 768px)
        const isMobile = window.innerWidth <= 768;
        if (!isMobile && btnIndices.includes(i)) {
            cell.classList.add('play-button');
            cell.style.opacity = '1';

            if (i === btnIndices[0]) {
                cell.classList.add('play-btn-left');
                cell.id = 'play-replay-shared-cell'; // Unique ID for shared cell
            } else if (i === btnIndices[1]) {
                cell.classList.add('play-btn-center');
                cell.innerText = "PLAY";
            } else if (i === btnIndices[2]) {
                cell.classList.add('play-btn-right');
                cell.id = 'play-close-shared-cell'; // Unique ID for shared cell
            }

            // Click listener for Play - only active if NO game
            cell.addEventListener('click', (e) => {
                if (!TicTacToe.active) {
                    e.stopPropagation();
                    TicTacToe.startGame();
                }
            });
        }

        // Setup Replay Button - ONLY ON DESKTOP
        if (!isMobile && replayIndices.includes(i)) {
            cell.classList.add('replay-button'); // Common class
            // Assign specific parts
            if (i === replayIndices[0]) cell.classList.add('replay-btn-left');
            if (i === replayIndices[1]) {
                cell.classList.add('replay-btn-center');
                cell.innerText = "REJOUER"; // Text in center
            }
            if (i === replayIndices[2]) cell.classList.add('replay-btn-right');

            // Hide initially (Ghost Button Fix)
            if (!btnIndices.includes(i)) {
                cell.style.opacity = '0';
                cell.style.pointerEvents = 'none';
            }

            cell.addEventListener('click', (e) => {
                if (TicTacToe.active) {
                    e.stopPropagation();
                    TicTacToe.resetGame();
                }
            });
        }

        // Setup Close Button
        if (closeIndices.includes(i)) {
            cell.classList.add('close-button'); // Common class
            // Assign specific parts
            if (i === closeIndices[0]) cell.classList.add('close-btn-left');
            if (i === closeIndices[1]) {
                cell.classList.add('close-btn-center');
                cell.innerText = "FERMER"; // Text in center
            }
            if (i === closeIndices[2]) cell.classList.add('close-btn-right');

            // Hide initially (Ghost Button Fix)
            if (!btnIndices.includes(i)) {
                cell.style.opacity = '0';
                cell.style.pointerEvents = 'none';
            }

            cell.addEventListener('click', (e) => {
                if (TicTacToe.active) {
                    e.stopPropagation();
                    TicTacToe.closeGame();
                }
            });
        }

        heroGrid.appendChild(cell);
    }

    // Link hover effects for Button Groups
    const linkHover = (selector, activeClass) => {
        const parts = heroGrid.querySelectorAll(selector);
        parts.forEach(part => {
            part.addEventListener('mouseenter', () => {
                if (activeClass === 'play-hover-active' && TicTacToe.active) return;
                if (activeClass !== 'play-hover-active' && !TicTacToe.active) return;
                parts.forEach(p => p.classList.add(activeClass));
            });
            part.addEventListener('mouseleave', () => {
                parts.forEach(p => p.classList.remove(activeClass));
            });
        });
    };

    linkHover('.play-button', 'play-hover-active');
    linkHover('.replay-button', 'replay-hover-active');
    linkHover('.close-button', 'close-hover-active');

    document.addEventListener('mousemove', (e) => {
        // Disable hover effect if game is active or over game UI
        if (TicTacToe.active) return;

        const cells = document.querySelectorAll('.grid-cell');

        const mouseX = e.clientX;
        const mouseY = e.clientY;
        cells.forEach((cell) => {
            // Skip Play Button parts - they have their own hover effect and should stay visible
            if (cell.classList.contains('play-button')) return;

            const rect = cell.getBoundingClientRect();
            const cellX = rect.left + rect.width / 2;
            const cellY = rect.top + rect.height / 2;
            const distance = Math.sqrt(
                Math.pow(mouseX - cellX, 2) + Math.pow(mouseY - cellY, 2)
            );
            if (distance < 150) {
                const opacity = 0.2 - distance / 750;
                cell.style.backgroundColor = `rgba(47, 110, 155, ${opacity})`;
                cell.style.transform = `translateZ(${20 - distance / 10}px)`;
                cell.classList.add('active');
            } else {
                cell.style.backgroundColor = 'transparent';
                cell.style.transform = 'translateZ(0)';
                cell.classList.remove('active');
            }
        });
    });
}
function simulateLoading() {
    const loadingBar = document.getElementById('loadingBar');
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContainer = document.getElementById('mainContainer');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            mainContainer.classList.add('show');
        }, 500);
    }, 3000);
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                mainContainer.classList.add('show');
                const experienceSection = document.getElementById('experience');
                if (experienceSection) {
                    experienceSection.classList.add('show');
                    const timelineItems = experienceSection.querySelectorAll('.timeline-item');
                    timelineItems.forEach(item => {
                        item.classList.add('show');
                    });
                }
            }, 500);
        } else {
            width += 5;
            loadingBar.style.width = width + '%';
        }
    }, 150);
}
function handleScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                if (entry.target.id === 'experience') {
                    const timelineItems = entry.target.querySelectorAll('.timeline-item');
                    timelineItems.forEach(item => {
                        item.classList.add('show');
                    });
                }
            }
        });
    }, {
        threshold: 0.1
    });
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}
function handleNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const menu = document.getElementById('menu');
    if (!menuToggle || !menu) return;
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        menu.classList.toggle('active');
        if (window.innerWidth <= 768) {
            const langSwitcher = document.querySelector('.language-switcher');
            if (menu.classList.contains('active')) {
                menu.appendChild(langSwitcher);
            } else {
                document.querySelector('.nav-right').insertBefore(langSwitcher, menuToggle);
            }
        }
    });
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            menu.classList.remove('active');
            menuToggle.classList.remove('active');
            if (window.innerWidth <= 768) {
                const langSwitcher = document.querySelector('.language-switcher');
                document.querySelector('.nav-right').insertBefore(langSwitcher, menuToggle);
            }
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}
function initScrollEffects() {
    const navContainer = document.getElementById('navContainer');
    const scrollToTopButton = document.getElementById('scrollToTop');
    const scrollProgressBar = document.getElementById('scrollProgress');
    if (!navContainer && !scrollToTopButton && !scrollProgressBar) return;
    let lastKnownScrollY = 0;
    let ticking = false;
    const scheduleFrame = window.requestAnimationFrame || function (callback) {
        return setTimeout(callback, 16);
    };
    const update = () => {
        const currentScroll = lastKnownScrollY;
        if (navContainer) {
            navContainer.classList.toggle('scrolled', currentScroll > 50);
        }
        if (scrollToTopButton) {
            scrollToTopButton.classList.toggle('visible', currentScroll > 300);
        }
        if (scrollProgressBar) {
            const totalHeight = document.body.scrollHeight - window.innerHeight;
            const progress = totalHeight > 0 ? (currentScroll / totalHeight) * 100 : 0;
            scrollProgressBar.style.width = progress + '%';
        }
        ticking = false;
    };
    const requestTick = () => {
        if (!ticking) {
            scheduleFrame(update);
            ticking = true;
        }
    };
    const onScroll = () => {
        lastKnownScrollY = window.scrollY || window.pageYOffset;
        requestTick();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
}
function handleContactForm() {
    (function () {
        emailjs.init("ZyE4jMNSgESAa42sB");
    })();
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');
    const submitBtn = document.getElementById('submit-btn');
    const buttonText = document.getElementById('button-text');
    const buttonLoading = document.getElementById('button-loading');
    if (!contactForm) return;
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        buttonText.style.display = 'none';
        buttonLoading.style.display = 'inline-block';
        submitBtn.disabled = true;
        formSuccess.classList.remove('show');
        formError.classList.remove('show');
        const templateParams = {
            name: contactForm.name.value,
            email: contactForm.email.value,
            subject: contactForm.subject.value,
            message: contactForm.message.value
        };
        emailjs.send('service_w29506o', 'template_2mkwm8s', templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                formSuccess.classList.add('show');
                contactForm.reset();
                formSuccess.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }, function (error) {
                console.log('FAILED...', error);
                formError.classList.add('show');
                formError.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            })
            .finally(function () {
                buttonText.style.display = 'inline-block';
                buttonLoading.style.display = 'none';
                submitBtn.disabled = false;
            });
    });
}
function init3DScrollEffect() {
    const sceneWrapper = document.getElementById('perspective-content');
    if (!sceneWrapper) return;
    sceneWrapper.style.transform = 'none';
    sceneWrapper.style.transition = 'none';
}
function initMagneticText() {
    if (reduceMotionEnabled) return;
    const magneticElements = document.querySelectorAll('.magnetic-element');
    magneticElements.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const strength = 15;
            const maxMove = 10;
            const xMove = Math.min(Math.max((x / rect.width) * strength, -maxMove), maxMove);
            const yMove = Math.min(Math.max((y / rect.height) * strength, -maxMove), maxMove);
            gsap.to(item, {
                x: xMove,
                y: yMove,
                duration: 0.3
            });
        });
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                duration: 0.5,
                x: 0,
                y: 0,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });
}
function initWebGLTransitions() {
    if (typeof THREE === 'undefined') {
        console.error('Three.js is not loaded');
        return;
    }
}
function enhanceCustomCursor() {
    if (reduceMotionEnabled) return;
    const cursor = document.getElementById('customCursor');
    const cursorDot = document.getElementById('cursorDot');
    if (!cursor || !cursorDot) return;
    for (let i = 0; i < 5; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.position = 'fixed';
        trail.style.width = '5px';
        trail.style.height = '5px';
        trail.style.borderRadius = '50%';
        trail.style.backgroundColor = 'var(--accent-color)';
        trail.style.opacity = '0.7';
        trail.style.zIndex = '9989';
        trail.style.pointerEvents = 'none';
        trail.style.transition = 'transform 0.2s, opacity 0.5s';
        trail.style.transform = 'translate(-50%, -50%) scale(0)';
        document.body.appendChild(trail);
    }
    const trails = document.querySelectorAll('.cursor-trail');
    let trailIndex = 0;
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            left: e.clientX,
            top: e.clientY,
            duration: 0.1
        });
        gsap.to(cursorDot, {
            left: e.clientX,
            top: e.clientY,
            duration: 0.05
        });
        const trail = trails[trailIndex];
        if (trail) {
            gsap.to(trail, {
                left: e.clientX,
                top: e.clientY,
                opacity: 0.7,
                transform: 'translate(-50%, -50%) scale(1)',
                duration: 0.05,
                onComplete: () => {
                    gsap.to(trail, {
                        opacity: 0,
                        transform: 'translate(-50%, -50%) scale(0)',
                        duration: 0.5,
                        delay: 0.1
                    });
                }
            });
        }
        trailIndex = (trailIndex + 1) % trails.length;
    });
    const interactiveElements = document.querySelectorAll('a, button, .skill-card, .timeline-content, .education-card, .contact-item');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                width: '60px',
                height: '60px',
                borderRadius: '20% 60% 30% 70% / 60% 30% 70% 40%',
                backgroundColor: 'rgba(217, 122, 122, 0.2)',
                duration: 0.4
            });
        });
        element.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: 'rgba(217, 122, 122, 0.5)',
                duration: 0.4
            });
        });
    });
    const titles = document.querySelectorAll('.section-title, .timeline-title, .skill-title, .education-degree');
    titles.forEach(title => {
        title.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: 'rgba(217, 122, 122, 0.1)',
                mixBlendMode: 'exclusion',
                duration: 0.3
            });
        });
        title.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: 'rgba(217, 122, 122, 0.5)',
                mixBlendMode: 'difference',
                duration: 0.3
            });
        });
    });
    document.addEventListener('mouseout', (e) => {
        if (e.relatedTarget === null) {
            cursor.style.opacity = '0';
            cursorDot.style.opacity = '0';
            trails.forEach(trail => {
                trail.style.opacity = '0';
            });
        }
    });
    document.addEventListener('mouseover', () => {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
    });
}
function initScrollDistortion() {
    const content = document.getElementById('mainContainer');
    if (!content) return;
    content.style.transform = 'none';
    content.style.transition = 'none';
}
function initDynamicOverlay() {
    if (reduceMotionEnabled) return;
    const overlay = document.getElementById('dynamicOverlay');
    if (!overlay) return;
    overlay.style.display = 'block';
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        overlay.style.setProperty('--x', `${x}%`);
        overlay.style.setProperty('--y', `${y}%`);
    });
}
function initParticles() {
    if (reduceMotionEnabled) return;
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js';
    script.onload = function () {
        if (typeof particlesJS !== 'undefined') {
            particlesJS("particles-js", {
                particles: {
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: "#d97a7a"
                    },
                    shape: {
                        type: "circle",
                        stroke: {
                            width: 0,
                            color: "#000000"
                        },
                        polygon: {
                            nb_sides: 5
                        }
                    },
                    opacity: {
                        value: 0.3,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: false,
                            speed: 40,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#d97a7a",
                        opacity: 0.2,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: "none",
                        random: false,
                        straight: false,
                        out_mode: "out",
                        bounce: false,
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: {
                            enable: true,
                            mode: "grab"
                        },
                        onclick: {
                            enable: true,
                            mode: "push"
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 140,
                            line_linked: {
                                opacity: 0.8
                            }
                        },
                        push: {
                            particles_nb: 4
                        }
                    }
                },
                retina_detect: true
            });
        }
    };
    document.body.appendChild(script);
}
function initGSAPAnimations() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        const heroTl = gsap.timeline();
        heroTl.from('.hero-title', {
            duration: 1.2,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        }).from('.hero-subtitle', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.8').from('.hero-cta', {
            duration: 0.8,
            y: 20,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.6').from('.scroll-indicator', {
            duration: 0.8,
            y: 20,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.4');
        gsap.utils.toArray('section').forEach(section => {
            const title = section.querySelector('.section-title');
            if (title) {
                gsap.from(title, {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                    },
                    duration: 1,
                    y: 50,
                    opacity: 0,
                    ease: 'power3.out'
                });
            }
        });
        gsap.utils.toArray('.timeline-content').forEach(item => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                },
                duration: 1,
                y: 30,
                opacity: 0,
                ease: 'power3.out'
            });
        });
        gsap.utils.toArray('.skill-card').forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                },
                duration: 0.8,
                y: 50,
                opacity: 0,
                ease: 'power3.out',
                delay: index * 0.2
            });
        });
        const contactGrid = document.querySelector('.contact-grid');
        if (contactGrid) {
            gsap.from(contactGrid, {
                scrollTrigger: {
                    trigger: '#contact',
                    start: 'top 80%',
                },
                duration: 1,
                y: 50,
                opacity: 0,
                ease: 'power3.out'
            });
        }
    }
}
function handleResize() {
    window.addEventListener('resize', () => {
        createHeroGrid();
        const langSwitcher = document.querySelector('.language-switcher');
        const menu = document.getElementById('menu');
        const menuToggle = document.getElementById('menuToggle');
        const navRight = document.querySelector('.nav-right');
        if (window.innerWidth <= 768) {
            if (menu.classList.contains('active')) {
                menu.appendChild(langSwitcher);
            } else {
                navRight.insertBefore(langSwitcher, menuToggle);
            }
        } else {
            navRight.insertBefore(langSwitcher, menuToggle);
        }
        if (typeof THREE !== 'undefined') {
            const canvas = document.getElementById('transition-canvas');
            if (canvas) {
                const renderer = new THREE.WebGLRenderer({
                    canvas,
                    alpha: true
                });
                renderer.setSize(window.innerWidth, window.innerHeight);
            }
        }
    });
    window.dispatchEvent(new Event('resize'));
}
function initScrollToTop() {
    const scrollToTopButton = document.getElementById('scrollToTop');
    if (!scrollToTopButton) return;
    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('.lazy-image');
    if (lazyImages.length === 0) return;
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                });
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '200px'
    });
    lazyImages.forEach(image => {
        lazyImageObserver.observe(image);
    });
}
function enhanceAccessibility() {
    document.querySelectorAll('a, button').forEach(element => {
        if (!element.getAttribute('aria-label') && !element.innerText.trim()) {
            const nearestText = element.querySelector('*');
            if (nearestText && nearestText.innerText) {
                element.setAttribute('aria-label', nearestText.innerText);
            }
        }
    });
    const style = document.createElement('style');
    style.textContent = `
                a:focus, button:focus, input:focus, textarea:focus {
                    outline: 2px solid var(--accent-color) !important;
                    outline-offset: 2px !important;
                }
                .skip-to-content {
                    position: absolute;
                    top: -40px;
                    left: 0;
                    background: var(--accent-color);
                    color: var(--bg-color);
                    padding: 8px;
                    z-index: 9999;
                    transition: top 0.3s;
                }
                .skip-to-content:focus {
                    top: 0;
                }
            `;
    document.head.appendChild(style);
    const skipLink = document.createElement('a');
    skipLink.href = '#mainContainer';
    skipLink.className = 'skip-to-content';
    skipLink.textContent = 'Aller au contenu principal';
    document.body.insertBefore(skipLink, document.body.firstChild);
}
function initThemeSwitcher() {
    const themeSwitch = document.getElementById('themeSwitch');
    if (!themeSwitch) return;
    const themeIcon = themeSwitch.querySelector('.theme-icon');
    let isDarkTheme = localStorage.getItem('theme') !== 'light';
    applyTheme(isDarkTheme);
    themeSwitch.addEventListener('click', () => {
        isDarkTheme = !isDarkTheme;
        applyTheme(isDarkTheme);
        localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    });
    function applyTheme(isDark) {
        const root = document.documentElement;
        if (!isDark) {
            root.style.setProperty('--bg-color', 'var(--light-bg-color)');
            root.style.setProperty('--text-color', 'var(--light-text-color)');
            root.style.setProperty('--hover-color', 'var(--light-hover-color)');
            root.style.setProperty('--secondary-color', 'var(--light-secondary-color)');
            if (themeIcon) themeIcon.innerHTML = '🌙';
            root.classList.add('light-theme');
            root.classList.remove('dark-theme');
        } else {
            root.style.setProperty('--bg-color', 'var(--bg-primary)');
            root.style.setProperty('--text-color', 'var(--text-primary)');
            root.style.setProperty('--hover-color', 'var(--bg-tertiary)');
            root.style.setProperty('--secondary-color', 'var(--bg-secondary)');
            if (themeIcon) themeIcon.innerHTML = '☀️';
            root.classList.add('dark-theme');
            root.classList.remove('light-theme');
        }
    }
}
function initParallax() {
    if (reduceMotionEnabled) return;
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    if (parallaxLayers.length === 0) return;
    document.addEventListener('mousemove', (e) => {
        parallaxLayers.forEach((layer, index) => {
            const speed = (index + 1) * 0.03;
            const x = (window.innerWidth - e.pageX * speed) / 100;
            const y = (window.innerHeight - e.pageY * speed) / 100;
            layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    });
}
function initAIAssistant() {
    const AI_API_ENDPOINT = '/api/ask-gemini';
    const aiFab = document.getElementById('ai-fab');
    const aiContainer = document.getElementById('ai-container');
    const aiCloseBtn = document.getElementById('ai-close-btn');
    const aiChatBox = document.getElementById('ai-chat-box');
    const aiInput = document.getElementById('ai-input');
    const aiSendBtn = document.getElementById('ai-send-btn');
    const aiSuggestions = document.getElementById('ai-suggestions');
    if (!aiFab || !aiContainer) return;
    const criticalNodes = { aiCloseBtn, aiChatBox, aiInput, aiSendBtn };
    const missingNodes = Object.entries(criticalNodes)
        .filter(([, node]) => !node)
        .map(([key]) => key);
    if (missingNodes.length > 0) {
        console.warn('[AI Assistant] Markup incomplet, initialisation annulée :', missingNodes.join(', '));
        return;
    }
    function getPortfolioContext() {
        let context = "Informations sur le portfolio de Mohamed Omar Baouch:\n\n";
        context += "## À propos de Mohamed:\n";
        document.querySelectorAll('#about .about-text p, #about .about-info .info-item').forEach(el => {
            context += el.textContent.trim() + "\n";
        });
        context += "\n## Expérience Professionnelle:\n";
        document.querySelectorAll('#experience .timeline-item').forEach(item => {
            const date = item.querySelector('.timeline-date')?.textContent.trim();
            const title = item.querySelector('.timeline-title')?.textContent.trim();
            const company = item.querySelector('.timeline-company')?.textContent.trim();
            context += `- Période: ${date}, Poste: ${title} chez ${company}.\n`;
            item.querySelectorAll('.timeline-description li').forEach(li => {
                context += `  - ${li.textContent.trim()}\n`;
            });
        });
        context += "\n## Compétences:\n";
        document.querySelectorAll('#skills .skill-card').forEach(card => {
            const title = card.querySelector('.skill-title')?.textContent.trim();
            context += `### ${title}:\n`;
            card.querySelectorAll('.skill-list li').forEach(li => {
                context += `- ${li.textContent.split('\n')[0].trim()}\n`;
            });
        });
        context += "\n## Formation:\n";
        document.querySelectorAll('#education .education-card').forEach(card => {
            const year = card.querySelector('.education-year')?.textContent.trim();
            const degree = card.querySelector('.education-degree')?.textContent.trim();
            const school = card.querySelector('.education-school')?.textContent.trim();
            context += `- ${year}: ${degree} à ${school}.\n`;
        });
        return context;
    }
    function getBlogListContext() {
        const sections = [];
        const blogDataElement = document.getElementById('blog-data');
        if (blogDataElement?.textContent) {
            try {
                const data = JSON.parse(blogDataElement.textContent);
                const hero = data?.hero?.editorialHighlight;
                if (hero) {
                    const heroLines = [];
                    if (hero.title) heroLines.push(`Titre : ${hero.title}`);
                    if (hero.displayDate) heroLines.push(`Date : ${hero.displayDate}`);
                    if (hero.excerpt) heroLines.push(`Résumé : ${hero.excerpt}`);
                    if (hero.ctaLabel && hero.url) {
                        heroLines.push(`CTA : ${hero.ctaLabel} (${hero.url})`);
                    }
                    sections.push(`### Mise en avant\n${heroLines.join('\n')}`);
                }
                if (Array.isArray(data?.editorials) && data.editorials.length) {
                    const editorialLines = data.editorials.map(item => {
                        const bits = [];
                        if (item.title) bits.push(item.title);
                        if (item.displayDate) bits.push(item.displayDate);
                        if (item.excerpt) bits.push(item.excerpt);
                        const base = bits.join(' — ');
                        return item.url ? `${base} → ${item.url}` : base;
                    });
                    sections.push(`### Articles catalogués\n${editorialLines.join('\n')}`);
                }
            } catch (error) {
                console.warn('[AI Assistant] Impossible de parser les données du blog :', error);
            }
        }
        const cards = Array.from(document.querySelectorAll('.post-card'));
        if (cards.length) {
            const cardLines = cards.map((card, index) => {
                const title = card.querySelector('.post-card__title')?.textContent.trim();
                const date = card.querySelector('time')?.textContent.trim();
                const excerpt = card.querySelector('.post-card__excerpt')?.textContent.trim();
                const ctaLink = card.querySelector('.post-card__cta');
                const ctaText = ctaLink?.textContent.trim();
                const href = ctaLink?.getAttribute('href');
                const type = card.dataset.type;
                const lines = [`${index + 1}. ${title || 'Article sans titre'}`];
                if (date) lines.push(`   Date : ${date}`);
                if (type) lines.push(`   Type : ${type}`);
                if (excerpt) lines.push(`   Résumé : ${excerpt}`);
                if (ctaText && href) lines.push(`   CTA : ${ctaText} (${href})`);
                return lines.join('\n');
            });
            sections.push(`### Cartes visibles\n${cardLines.join('\n')}`);
        }
        if (!sections.length) return '';
        return `Page liste du blog de Mohamed Omar Baouch.\n\n${sections.join('\n\n')}`;
    }
    function getBlogArticleContext() {
        const articleRoot = document.querySelector('article.blog-article');
        if (!articleRoot) return '';
        const sections = [];
        const hero = articleRoot.querySelector('header.blog-hero');
        if (hero) {
            const heroLines = [];
            const title = hero.querySelector('.hero-title')?.textContent.trim();
            const subtitle = hero.querySelector('.hero-subtitle')?.textContent.trim();
            const eyebrow = hero.querySelector('.hero-eyebrow')?.textContent.trim();
            const badges = Array.from(hero.querySelectorAll('.hero-badges .badge'))
                .map(badge => badge.textContent.trim())
                .filter(Boolean);
            const stats = Array.from(hero.querySelectorAll('.hero-stat'))
                .map(stat => {
                    const value = stat.querySelector('.hero-stat-value')?.textContent.trim();
                    const label = stat.querySelector('.hero-stat-label')?.textContent.trim();
                    return value && label ? `${label} : ${value}` : value || label || '';
                })
                .filter(Boolean);
            if (eyebrow) heroLines.push(`Thématique : ${eyebrow}`);
            if (badges.length) heroLines.push(`Badges : ${badges.join(', ')}`);
            if (title) heroLines.push(`Titre : ${title}`);
            if (subtitle) heroLines.push(`Chapeau : ${subtitle}`);
            if (stats.length) heroLines.push(`Indicateurs : ${stats.join(' | ')}`);
            sections.push(`### En-tête de l'article\n${heroLines.join('\n')}`);
        }
        const summaryItems = Array.from(articleRoot.querySelectorAll('.article-summary .summary-list li'));
        if (summaryItems.length) {
            const summaryLines = summaryItems.map((item, index) => {
                const label = item.querySelector('.summary-label')?.textContent.trim();
                const meta = item.querySelector('.summary-meta')?.textContent.trim();
                const text = label || item.textContent.trim();
                return `${index + 1}. ${text}${meta ? ` — ${meta}` : ''}`;
            });
            sections.push(`### Sommaire\n${summaryLines.join('\n')}`);
        }
        const articleSections = Array.from(articleRoot.querySelectorAll('section.article-section'));
        if (articleSections.length) {
            const sectionLines = articleSections.map(section => {
                const heading = section.querySelector('h2, h3')?.textContent.trim();
                const paragraphs = Array.from(section.querySelectorAll('p'))
                    .map(p => p.textContent.trim())
                    .filter(Boolean)
                    .slice(0, 2);
                const bullets = Array.from(section.querySelectorAll('li'))
                    .map(li => li.textContent.trim())
                    .filter(Boolean)
                    .slice(0, 3);
                const lines = [];
                if (heading) lines.push(`- ${heading}`);
                paragraphs.forEach(text => lines.push(`   • ${text}`));
                bullets.forEach(text => lines.push(`   • ${text}`));
                return lines.join('\n');
            }).filter(Boolean);
            if (sectionLines.length) {
                sections.push(`### Sections clés\n${sectionLines.join('\n')}`);
            }
        }
        if (!sections.length) return '';
        return `Article du blog de Mohamed Omar Baouch.\n\n${sections.join('\n\n')}`;
    }
    function determinePageContext() {
        const body = document.body;
        if (body?.classList.contains('blog-page')) {
            const blogDataElement = document.getElementById('blog-data');
            if (blogDataElement) {
                const blogListContext = getBlogListContext();
                if (blogListContext) {
                    return { pageType: 'blog-list', context: blogListContext };
                }
            }
            const blogArticleContext = getBlogArticleContext();
            if (blogArticleContext) {
                return { pageType: 'blog-article', context: blogArticleContext };
            }
        }
        return { pageType: 'portfolio', context: '' };
    }
    const portfolioContext = getPortfolioContext();
    const detectedContext = determinePageContext();
    const hasSpecificContext = detectedContext.pageType !== 'portfolio' && detectedContext.context && detectedContext.context.trim().length > 0;
    const activeContext = hasSpecificContext ? `${detectedContext.context}\n\n${portfolioContext}` : portfolioContext;
    const activePageType = hasSpecificContext ? detectedContext.pageType : 'portfolio';
    const toggleAssistant = () => {
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
        aiContainer.classList.toggle('show');
    }
    aiFab.addEventListener('click', toggleAssistant);
    aiCloseBtn.addEventListener('click', toggleAssistant);
    const addMessage = (text, sender, isLoading = false) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('ai-message', sender);
        if (isLoading) {
            messageDiv.classList.add('loading');
            messageDiv.innerHTML = `<p><span></span><span></span><span></span></p>`;
        } else {
            let formattedText = text.replace(/\*\s(.*?)(?:\n|<br>|$)/g, '<li>$1</li>');
            if (formattedText.includes('<li>')) {
                formattedText = `<ul>${formattedText.replace(/<\/li><li>/g, '</li><li>')}</ul>`;
            }
            messageDiv.innerHTML = formattedText.replace(/\n/g, '<br>');
        }
        aiChatBox.appendChild(messageDiv);
        aiChatBox.scrollTop = aiChatBox.scrollHeight;
        return messageDiv;
    };
    const handleSend = async () => {
        const userInput = aiInput.value.trim();
        if (!userInput) return;
        addMessage(userInput, 'user');
        aiInput.value = '';
        if (aiSuggestions) aiSuggestions.style.display = 'none';
        const loadingMessage = addMessage('', 'assistant', true);
        try {
            const response = await callAIAssistant(userInput);
            loadingMessage.remove();
            addMessage(response, 'assistant');
        } catch (error) {
            console.error("Error with AI Assistant:", error);
            loadingMessage.remove();
            addMessage("Désolé, une erreur est survenue. Veuillez réessayer plus tard.", 'assistant');
        }
    };
    aiSendBtn.addEventListener('click', handleSend);
    aiInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
    if (aiSuggestions) {
        aiSuggestions.addEventListener('click', (e) => {
            if (e.target.classList.contains('suggestion-btn')) {
                aiInput.value = e.target.textContent;
                handleSend();
            }
        });
    }
    async function callAIAssistant(question) {
        const response = await fetch(AI_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question: question,
                context: activeContext,
                pageType: activePageType
            }),
        });
        if (!response.ok) {
            throw new Error(`Server function failed with status ${response.status}`);
        }
        const data = await response.json();
        return data.answer;
    }
}
function initProactiveAI() {
    const fabNotification = document.getElementById('ai-fab-notification');
    let notificationTimeout;
    const suggestions = {
        'experience': "Des questions sur mon parcours chez VISIATIV ?",
        'skills': "Demandez-moi mes compétences en SOLIDWORKS PDM !",
        'contact': "Besoin de mon email ou LinkedIn ?"
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                if (suggestions[sectionId]) {
                    clearTimeout(notificationTimeout);
                    fabNotification.textContent = suggestions[sectionId];
                    fabNotification.classList.add('show');
                    notificationTimeout = setTimeout(() => {
                        fabNotification.classList.remove('show');
                    }, 5000);
                }
            }
        });
    }, {
        threshold: 0.6
    });
    Object.keys(suggestions).forEach(id => {
        const section = document.getElementById(id);
        if (section) observer.observe(section);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    initializeLanguage();
    window.addEventListener('load', () => {
        try {
            createHeroGrid();
            simulateLoading();
            const initializers = [
                handleScrollAnimations, handleNavigation, handleContactForm, handleResize,
                initScrollEffects, initScrollToTop, initLazyLoading, enhanceAccessibility, initParticles,
                initThemeSwitcher, initParallax, enhanceCustomCursor, init3DScrollEffect,
                initMagneticText, initWebGLTransitions, initScrollDistortion, initDynamicOverlay,
                initAIAssistant, initProactiveAI
            ];
            initializers.forEach(initFunc => {
                try {
                    initFunc();
                } catch (e) {
                    console.error(`Error in ${initFunc.name}:`, e);
                }
            });
            setTimeout(() => {
                try {
                    initGSAPAnimations();
                } catch (e) {
                    console.error('Error in initGSAPAnimations:', e);
                }
            }, 3000);
            const scrollIndicator = document.getElementById('scrollIndicator');
            if (scrollIndicator) {
                scrollIndicator.addEventListener('click', () => {
                    const aboutSection = document.getElementById('about');
                    if (aboutSection) {
                        aboutSection.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                });
            }
        } catch (error) {
            console.error('Error during initialization:', error);
            const loadingScreen = document.getElementById('loadingScreen');
            const mainContainer = document.getElementById('mainContainer');
            if (loadingScreen && mainContainer) {
                loadingScreen.style.display = 'none';
                mainContainer.classList.add('show');
            }
        }
    });
});
