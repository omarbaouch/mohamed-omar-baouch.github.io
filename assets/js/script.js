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
        "hero_subtitle": "Plus de <strong>80 clients industriels</strong> accompagnés — sécurisation, migration et optimisation de données techniques critiques.",
        "hero_cta1": "Me contacter",
        "hero_cta2": "Voir mon parcours",
        "scroll_text": "Défiler",
        "about_title": "À propos",
        "about_p1": "Ingénieur Plasturgie INSA de formation, j'ai évolué de la conception mécanique pure vers l'architecture des systèmes d'information techniques. Mon approche est pragmatique : la technique doit servir le métier, et non le contraindre.",
        "about_p2": "Aujourd'hui, je gère des projets critiques : migration de données sensibles, refonte d'architectures serveurs et optimisation de performance pour des bureaux d'études de 5 à 100 utilisateurs.",
        "tooltip_location": "Basé dans la région Grand Est",
        "tooltip_phone": "Téléphone professionnel",
        "driving_license": "Permis B, Véhiculé",
        "tooltip_mobility": "Mobilité France et international",
        "tooltip_email": "Email professionnel",
        "tooltip_linkedin": "Profil LinkedIn",
        "download_cv": "Télécharger mon CV",
        "cv_file": "/BAOUCH_CV_FR.pdf",
        "experience_title": "Expérience",
        "exp1_date": "Juin 2023 - Présent",
        "exp1_title": "Consultant PDM/PLM Confirmé",
        "exp1_company": "VISIATIV",
        "exp1_subtitle1": "Projets & Réalisations (80 Clients):",
        "exp1_li1": "Pilotage d'implémentations PDM/PLM de l'analyse des besoins à la mise en production.",
        "exp1_li2": "Architecture et paramétrage de systèmes PDM/PLM (SolidWorks) avec flux de travail personnalisés.",
        "exp1_li3": "Gestion de projets de migration de données et montées de version des environnements PDM/PLM.",
        "exp1_subtitle2": "Expertise Technique:",
        "exp1_li4": "Conception et déploiement d'intégrations ERP-PDM/PLM pour la continuité numérique.",
        "exp1_li5": "Formation des utilisateurs et administrateurs aux nouvelles méthodologies et outils PDM/PLM.",
        "exp1_li6": "Mise en œuvre de réplications multisites et plans de maintenance SQL.",
        "exp2_date": "Septembre 2021 - Juin 2023",
        "exp2_title": "Ingénieur Concepteur Mécanique",
        "exp2_subtitle1": "IDEMIA — DÉFENSE & SÉCURITÉ :",
        "exp2_li1": "Développement de systèmes radar et composants usinés de précision.",
        "exp2_li2": "Gestion du cycle de vie des données produit en environnement PLM, amélioration de la traçabilité.",
        "exp2_subtitle2": "FLOWBIRD — TRANSPORT & MOBILITÉ :",
        "exp2_li3": "Modernisation des distributeurs de tickets RATP, coordination d'équipe d'ingénieurs.",
        "exp2_li4": "Analyse structurelle avancée (Creo Simulate) pour optimisation du poids des conceptions.",
        "exp2_location": "ABMI GROUP",
        "exp3_date": "Avril 2020 - Octobre 2020",
        "exp3_title": "Spécialiste en Ingénierie de Conception",
        "exp3_company": "EVOLUM CONTAINER SOLUTIONS",
        "exp3_li1": "Analyse des besoins clients et chiffrage de solutions de conteneurs sur mesure.",
        "exp3_li2": "Génération de nomenclatures détaillées et documentation technique via CAO et ERP.",
        "exp3_li3": "Gestion des relations fournisseurs et des processus d'approvisionnement.",
        "skills_title": "Compétence Technique",
        "skill1_title": "Infrastructure PDM",
        "skill1_li1": "Admin SQL Server",
        "skill1_tp1": "Installation, Maintenance Plans, Sauvegardes, Tuning Performance",
        "skill1_li2": "Réplication Multi-sites",
        "skill1_tp2": "Architecture multisites, synchronisation et gestion de l'archivage froid",
        "skill1_li3": "Workflows & Dispatch",
        "skill1_tp3": "Tâches automatiques, transitions conditionnelles, notifications XML",
        "skill1_li4": "Déploiement & Installation",
        "skill1_tp4": "Mise en place complète d'architectures PDM sur serveurs dédiés",
        "skill2_title": "Migrations & Données",
        "skill2_li1": "Migrations & Montées de Version",
        "skill2_tp1": "Migrations de serveur, upgrades PDM Standard vers Professional, reprise d'historique",
        "skill2_li2": "Admin Recovery",
        "skill2_tp2": "Récupération d'accès administrateur, remise en état de coffres PDM",
        "skill2_li3": "Templates SOLIDWORKS",
        "skill2_tp3": "Création de .prtdot, .asmdot, .drwdot, Property Tab Builder",
        "skill2_li4": "MyCADTools",
        "skill2_tp4": "Usage expert de la suite pour les audits et le batch processing",
        "skill3_title": "Documentation & Méthodologie",
        "skill3_li1": "DTE (Dossiers Techniques)",
        "skill3_tp1": "Rédaction de documentations d'installation et d'exploitation complètes",
        "skill3_li2": "Plans & PV de Recette",
        "skill3_tp2": "Cahiers de tests, PV de recette pour validation client",
        "skill3_li3": "Formation Admin/User",
        "skill3_tp3": "Transfert de compétences administrateur et utilisateur PDM",
        "skill3_li4": "Missions en régie",
        "skill3_tp4": "Prise en main de projets complexes, interventions en régie",
        "skill_level_expert": "Expert",
        "skill_level_advanced": "Avancé",
        "skill1_li5": "Cold Storage",
        "skill2_li5": "Reprise ETL",
        "skill3_li5": "Passation de Projet",
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
        "essentials_heading": "Mon expertise <span class=\"highlight\">PDM/PLM en chiffres</span>",
        "essentials_lead": "Optimisation de flux de données produit, structuration de standards d'équipe et rédaction de guides opérationnels — le tout acquis sur plus de 80 missions industrielles.",
        "stat_clients": "80 clients",
        "stat_clients_desc": "Industrie, robotique, équipements...",
        "stat_migrations": "65 migrations",
        "stat_migrations_desc": "Serveurs, mises à jour, réplications...",
        "stat_diagnostic": "95 projets",
        "stat_diagnostic_desc": "Livrés depuis 2020",
        "stat_deployments": "13 déploiements",
        "stat_deployments_desc": "+ 1 Set & Run complet",
        "card_conseil_kicker": "💡 Expertise",
        "card_conseil_title": "Architecture & Audit PDM/PLM",
        "card_conseil_desc": "Cartographie d'environnements, droits utilisateurs, modèles de données et nomenclatures — maîtrise de <strong>SOLIDWORKS PDM</strong>, <strong>3DEXPERIENCE</strong> et <strong>Windchill</strong>.",
        "card_conseil_li1": "✓ Audits et diagnostics d'infrastructure",
        "card_conseil_li2": "✓ Plans de remédiation et roadmaps",
        "card_conseil_li3": "✓ Documentation technique complète",
        "card_badge": "POPULAIRE",
        "card_delivery_kicker": "🚀 Delivery",
        "card_delivery_title": "Mise en production & Recettes",
        "card_delivery_desc": "Déploiements en production avec procédures de tests rigoureuses, checklists d'intégration et transfert de compétences aux équipes internes.",
        "card_delivery_li1": "✓ Scénarios de validation éprouvés",
        "card_delivery_li2": "✓ Revues avec les équipes métier",
        "card_delivery_li3": "✓ Capitalisation des connaissances",
        "card_veille_kicker": "📝 Blog",
        "card_veille_title": "Articles de fond PDM/PLM",
        "card_veille_desc": "Analyses approfondies sur la nomenclature, le PDM, le PLM et l'ERP — issus de 80 missions terrain, pas de contenu générique.",
        "card_veille_li1": "✓ BOM, eBOM, mBOM et intégration ERP",
        "card_veille_li2": "✓ Configuration matérielle SOLIDWORKS",
        "card_veille_link": "→ Accéder au blog",
        "clients_title": "80 clients accompagnés par secteur",
        "sector_machines_title": "Machines & Équipements",
        "sector_machines_desc": "Fabricants de machines & lignes de production",
        "sector_industry_title": "Industrie & Énergie",
        "sector_industry_desc": "Grands groupes & ETI industrielles",
        "sector_robotics_title": "Automatisme & Robotique",
        "sector_robotics_desc": "Startups, PME & ETI innovantes",
        "sector_metal_title": "Métallurgie & Traitement",
        "sector_metal_desc": "Industriels de la transformation",
        "sector_btp_title": "BTP, Agro & Divers",
        "sector_btp_desc": "Construction, agroalimentaire, médical, mobilier...",
        "sector_international_title": "International",
        "sector_international_desc": "Projets multi-sites & déploiements internationaux",
        "project_types_title": "95 projets par type d'intervention",
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
        "hero_subtitle": "Over <strong>80 industrial clients</strong> supported — securing, migrating and optimizing critical technical data.",
        "hero_cta1": "Contact Me",
        "hero_cta2": "View My Background",
        "scroll_text": "Scroll",
        "about_title": "About Me",
        "about_p1": "As an INSA Plastics Engineer, I evolved from pure mechanical design to technical information system architecture. My approach is pragmatic: technology must serve the business, not constrain it.",
        "about_p2": "Today, I manage critical projects: sensitive data migration, server architecture redesign, and performance optimization for design offices ranging from 5 to 100 users.",
        "tooltip_location": "Based in the Grand Est region",
        "tooltip_phone": "Professional phone",
        "driving_license": "Driver's License",
        "tooltip_mobility": "Mobility across France and internationally",
        "tooltip_email": "Professional email",
        "tooltip_linkedin": "LinkedIn profile",
        "download_cv": "Download RESUME",
        "cv_file": "/BAOUCH_CV_EN.pdf",
        "experience_title": "Experience",
        "exp1_date": "June 2023 - Present",
        "exp1_title": "Confirmed PDM/PLM Consultant",
        "exp1_company": "VISIATIV",
        "exp1_subtitle1": "Projects & Achievements (80 Clients):",
        "exp1_li1": "End-to-end PDM/PLM implementation management, from needs analysis to production rollout.",
        "exp1_li2": "PDM/PLM system architecture and configuration (SolidWorks) with custom workflows.",
        "exp1_li3": "Data migration projects and PDM/PLM environment version upgrades management.",
        "exp1_subtitle2": "Technical Expertise:",
        "exp1_li4": "ERP-PDM/PLM integration design and deployment for digital continuity.",
        "exp1_li5": "User and administrator training on new PDM/PLM methodologies and tools.",
        "exp1_li6": "Implementation of multisite replication and SQL maintenance plans.",
        "exp2_date": "September 2021 - June 2023",
        "exp2_title": "Mechanical Design Engineer",
        "exp2_subtitle1": "IDEMIA — DEFENSE & SECURITY:",
        "exp2_li1": "Radar systems development and precision machined components.",
        "exp2_li2": "Product data lifecycle management in PLM environment, traceability improvement.",
        "exp2_subtitle2": "FLOWBIRD — TRANSPORT & MOBILITY:",
        "exp2_li3": "RATP ticket distributor modernization, engineering team coordination.",
        "exp2_li4": "Advanced structural analysis (Creo Simulate) for design weight optimization.",
        "exp2_location": "ABMI GROUP",
        "exp3_date": "April 2020 - October 2020",
        "exp3_title": "Design Engineering Specialist",
        "exp3_company": "EVOLUM CONTAINER SOLUTIONS",
        "exp3_li1": "Client needs analysis and custom container solution costing.",
        "exp3_li2": "Detailed BOM generation and technical documentation via CAD and ERP.",
        "exp3_li3": "Supplier relationship management and procurement processes.",
        "skills_title": "Technical Skills",
        "skill1_title": "PDM Infrastructure",
        "skill1_li1": "SQL Server Admin",
        "skill1_tp1": "Installation, Maintenance Plans, Backups, Performance Tuning",
        "skill1_li2": "Multisite Replication",
        "skill1_tp2": "Multisite architecture, synchronization and cold archiving management",
        "skill1_li3": "Workflows & Dispatch",
        "skill1_tp3": "Automatic Tasks, Conditional Transitions, XML Notifications",
        "skill1_li4": "Deployment & Installation",
        "skill1_tp4": "Full PDM architecture setup on dedicated servers",
        "skill2_title": "Migrations & Data",
        "skill2_li1": "Migrations & Version Upgrades",
        "skill2_tp1": "Server migrations, PDM Standard to Professional upgrades, history recovery",
        "skill2_li2": "Admin Recovery",
        "skill2_tp2": "Admin access recovery, PDM vault restoration",
        "skill2_li3": "SOLIDWORKS Templates",
        "skill2_tp3": "Creation of .prtdot, .asmdot, .drwdot, Property Tab Builder",
        "skill2_li4": "MyCADTools",
        "skill2_tp4": "Expert usage of the suite for audits and batch processing",
        "skill3_title": "Documentation & Methodology",
        "skill3_li1": "Technical Files (DTE)",
        "skill3_tp1": "Drafting of complete installation and operating documentation",
        "skill3_li2": "Acceptance Plans & Reports",
        "skill3_tp2": "Test books and acceptance minutes for client sign-off",
        "skill3_li3": "Admin/User Training",
        "skill3_tp3": "Knowledge transfer for PDM administrators and end users",
        "skill3_li4": "On-site Missions",
        "skill3_tp4": "Takeover of complex projects, on-site assignments",
        "skill_level_expert": "Expert",
        "skill_level_advanced": "Advanced",
        "skill1_li5": "Cold Storage",
        "skill2_li5": "ETL Recovery",
        "skill3_li5": "Project Handover",
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
        "essentials_heading": "My <span class=\"highlight\">PDM/PLM expertise in numbers</span>",
        "essentials_lead": "Product data flow optimization, team standards structuring and operational guide writing — built over 80+ industrial missions.",
        "stat_clients": "80 clients",
        "stat_clients_desc": "Industry, robotics, equipment...",
        "stat_migrations": "65 migrations",
        "stat_migrations_desc": "Servers, upgrades, replications...",
        "stat_diagnostic": "95 projects",
        "stat_diagnostic_desc": "Delivered since 2020",
        "stat_deployments": "13 deployments",
        "stat_deployments_desc": "+ 1 complete Set & Run",
        "card_conseil_kicker": "💡 Expertise",
        "card_conseil_title": "Architecture & PDM/PLM Audit",
        "card_conseil_desc": "Environment mapping, user rights, data models and BOMs — proficiency in <strong>SOLIDWORKS PDM</strong>, <strong>3DEXPERIENCE</strong> and <strong>Windchill</strong>.",
        "card_conseil_li1": "✓ Infrastructure audits and diagnostics",
        "card_conseil_li2": "✓ Remediation plans and roadmaps",
        "card_conseil_li3": "✓ Comprehensive technical documentation",
        "card_badge": "POPULAR",
        "card_delivery_kicker": "🚀 Delivery",
        "card_delivery_title": "Production Rollout & Acceptance",
        "card_delivery_desc": "Production deployments with rigorous test procedures, integration checklists and knowledge transfer to internal teams.",
        "card_delivery_li1": "✓ Proven validation scenarios",
        "card_delivery_li2": "✓ Reviews with business teams",
        "card_delivery_li3": "✓ Knowledge capitalization",
        "card_veille_kicker": "📝 Blog",
        "card_veille_title": "In-depth PDM/PLM Articles",
        "card_veille_desc": "Deep-dive analyses on BOM, PDM, PLM and ERP — drawn from 80+ real-world missions, not generic content.",
        "card_veille_li1": "✓ BOM, eBOM, mBOM and ERP integration",
        "card_veille_li2": "✓ SOLIDWORKS hardware configuration",
        "card_veille_link": "→ Access the blog",
        "clients_title": "80 clients supported by sector",
        "sector_machines_title": "Machines & Equipment",
        "sector_machines_desc": "Machine & production line manufacturers",
        "sector_industry_title": "Industry & Energy",
        "sector_industry_desc": "Large groups & industrial mid-caps",
        "sector_robotics_title": "Automation & Robotics",
        "sector_robotics_desc": "Startups, SMEs & innovative mid-caps",
        "sector_metal_title": "Metallurgy & Processing",
        "sector_metal_desc": "Processing industries",
        "sector_btp_title": "Construction, Food & Other",
        "sector_btp_desc": "Construction, food industry, medical, furniture...",
        "sector_international_title": "International",
        "sector_international_desc": "Multi-site projects & international deployments",
        "project_types_title": "95 projects by type of intervention",
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
            blog_cta_discuss_project: "Me contacter",
            blog_cta_all_articles: "Tous les articles",
            blog_cta_linkedin: "Me contacter",
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
                blog_config_cta_title: "Vous avez trouvé cet article utile ?",
                blog_config_cta_text: "Je partage régulièrement des retours d'expérience terrain sur SOLIDWORKS et la gestion des données techniques.",
                blog_config_cta_button: "Me contacter"
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
                blog_plm_cta_title: "Vous avez trouvé cet article utile ?",
                blog_plm_cta_text: "Je partage régulièrement des retours d'expérience terrain sur les problématiques PLM rencontrées en industrie.",
                blog_plm_cta_button: "Me contacter"
            },
            "nomenclature-bom-pdm-plm-erp": {
                blog_bom_badge_type: "PDM · PLM · ERP",
                blog_bom_hero_eyebrow: "Données produit &amp; systèmes d'information",
                blog_bom_hero_title: "Nomenclature, BOM, eBOM, mBOM : la colonne vertébrale de vos données produit — et le rôle de PDM, PLM et ERP",
                blog_bom_hero_subtitle: `Publié le <span data-date-iso="2026-03-16T00:00:00.000Z" data-date-format="long">16 mars 2026</span> — un retour terrain sur la façon dont BOM, PDM, PLM et ERP s'articulent (ou se déchirent) dans les bureaux d'études industriels.`,
                blog_bom_stat_publication: "Date de publication",
                blog_bom_stat_systems: "Systèmes analysés",
                blog_bom_stat_clients: "Clients accompagnés",
                blog_bom_hero_figcaption: "BOM, PDM, PLM, ERP : quatre notions fondamentales que tout ingénieur produit doit maîtriser pour piloter ses données sans friction.",
                blog_bom_summary_label1: "C'est quoi une nomenclature (BOM) ?",
                blog_bom_summary_meta1: "Définition, structure, niveaux, types",
                blog_bom_summary_label2: "eBOM vs mBOM : deux lectures d'un même produit",
                blog_bom_summary_meta2: "Bureau d'études vs fabrication",
                blog_bom_summary_label3: "Le PDM : gardien des données CAO et de la eBOM",
                blog_bom_summary_meta3: "Ce qu'il fait, ce qu'il ne fait pas",
                blog_bom_summary_label4: "Le PLM : orchestrateur du cycle de vie",
                blog_bom_summary_meta4: "Gouvernance, ECO/ECR, config. management",
                blog_bom_summary_label5: "L'ERP : la mBOM en production et en achat",
                blog_bom_summary_meta5: "SAP, Sage, Cegid et la réalité terrain",
                blog_bom_summary_label6: "Les liens entre les trois systèmes",
                blog_bom_summary_meta6: "Flux, interfaces, points de friction",
                blog_bom_summary_label7: "Ce qui se passe quand rien n'est aligné",
                blog_bom_summary_meta7: "Erreurs terrain, coûts cachés, plan d'action",
                blog_bom_s1_title: "1. C'est quoi une nomenclature (BOM) ?",
                blog_bom_s1_p1: "La <strong>BOM</strong> (Bill of Materials — nomenclature en français) est la liste structurée de tous les composants, sous-assemblages et matières nécessaires pour fabriquer un produit. C'est le document pivot entre la conception, la production et les achats.",
                blog_bom_s1_p2: "Elle n'est pas un simple inventaire. Elle encode les relations hiérarchiques entre pièces : un vérin hydraulique est un sous-assemblage qui contient un corps, un piston, des joints, des vis. Supprimer une ligne ou se tromper de quantité peut déclencher un arrêt de ligne ou un rappel produit.",
                blog_bom_s1_quote: "Chez un fabricant d'équipements industriels que j'accompagnais, une seule ligne BOM incorrecte dans Excel avait conduit à commander 12 fois trop de galets de renvoi. Le stock dormait depuis 8 mois. La BOM n'avait jamais été synchronisée entre le BE et la production.",
                blog_bom_s1_card1_title: "Attributs de base",
                blog_bom_s1_card1_item1: "Numéro de pièce (référence interne)",
                blog_bom_s1_card1_item2: "Désignation / description",
                blog_bom_s1_card1_item3: "Quantité et unité",
                blog_bom_s1_card1_item4: "Niveau hiérarchique (niveau 0 = produit fini, niveau 1 = sous-assemblages…)",
                blog_bom_s1_card1_item5: "Statut (en développement, validé, obsolète)",
                blog_bom_s1_card2_title: "Attributs étendus",
                blog_bom_s1_card2_item1: "Fournisseur et référence fournisseur",
                blog_bom_s1_card2_item2: "Coût standard / coût réel",
                blog_bom_s1_card2_item3: "Indice de révision",
                blog_bom_s1_card2_item4: "Documents associés (plan, spec, DFM)",
                blog_bom_s1_card2_item5: "Liens vers CAO (fichier SLDPRT, SLDASM…)",
                blog_bom_s1_types_intro: "Il existe plusieurs <strong>types de BOM</strong> selon le stade du produit et l'utilisateur :",
                blog_bom_s1_table_h_type: "Type",
                blog_bom_s1_table_h_name: "Nom complet",
                blog_bom_s1_table_h_owner: "Propriétaire",
                blog_bom_s1_table_h_system: "Système",
                blog_bom_s1_table_h_usage: "Usage principal",
                blog_bom_s1_row1_name: "Engineering BOM",
                blog_bom_s1_row1_owner: "Bureau d'études",
                blog_bom_s1_row1_usage: "Conception, révisions, plans",
                blog_bom_s1_row2_name: "Manufacturing BOM",
                blog_bom_s1_row2_owner: "Méthodes / Production",
                blog_bom_s1_row2_usage: "OF, achats, coûts de revient",
                blog_bom_s1_row3_name: "Service BOM",
                blog_bom_s1_row3_owner: "SAV / Maintenance",
                blog_bom_s1_row3_usage: "Pièces détachées, interventions",
                blog_bom_s1_row4_name: "Configurator BOM",
                blog_bom_s1_row4_owner: "Commercial / CPQ",
                blog_bom_s1_row4_usage: "Options, variantes, devis",
                blog_bom_s1_callout_soft: "Ce sont les deux premières — <strong>eBOM et mBOM</strong> — qui concentrent 80 % des problèmes dans les PME industrielles. La transformation de l'une vers l'autre est souvent le chantier le plus sous-estimé d'un projet PDM/ERP.",
                blog_bom_s2_title: "2. eBOM vs mBOM : deux lectures d'un même produit",
                blog_bom_s2_p1: "La eBOM et la mBOM décrivent le même produit mais sous des angles radicalement différents. Confondre les deux, ou ne pas prévoir la transformation de l'une vers l'autre, est l'une des sources de friction les plus courantes entre bureaux d'études et ateliers.",
                blog_bom_s2_card1_title: "eBOM — Engineering BOM",
                blog_bom_s2_card1_item1: "Produite par le <strong>bureau d'études</strong>",
                blog_bom_s2_card1_item2: "Reflète la <strong>structure fonctionnelle</strong> du produit tel que conçu",
                blog_bom_s2_card1_item3: "Organisée autour des fonctions (module hydraulique, module électrique…)",
                blog_bom_s2_card1_item4: "Liée aux fichiers CAO (SOLIDWORKS, Creo, Catia…)",
                blog_bom_s2_card1_item5: "Gérée dans le <strong>PDM ou PLM</strong>",
                blog_bom_s2_card1_item6: "Versionnée avec les indices de révision",
                blog_bom_s2_card2_title: "mBOM — Manufacturing BOM",
                blog_bom_s2_card2_item1: "Produite par les <strong>méthodes / fabrication</strong>",
                blog_bom_s2_card2_item2: "Reflète la <strong>séquence d'assemblage</strong> réelle",
                blog_bom_s2_card2_item3: "Peut éclater ou regrouper des niveaux de la eBOM selon les postes",
                blog_bom_s2_card2_item4: "Contient des composants fantômes, des kits, des opérations",
                blog_bom_s2_card2_item5: "Gérée dans l'<strong>ERP</strong> (SAP, Sage, Cegid, IFS…)",
                blog_bom_s2_card2_item6: "Pilote les ordres de fabrication et les achats",
                blog_bom_s2_p2: "La transformation eBOM → mBOM est rarement automatique. Elle nécessite une étape de <strong>transformation structurelle</strong> : des pièces disparaissent (brutes → usinées), des opérations s'ajoutent, des niveaux hiérarchiques sont réorganisés selon les gammes de fabrication.",
                blog_bom_s2_callout: "Un même produit peut avoir une eBOM à 4 niveaux et une mBOM à 7 niveaux — ou l'inverse. Ce n'est pas un bug, c'est la réalité de deux métiers qui ont des besoins différents.",
                blog_bom_s3_title: "3. Le PDM : gardien des données CAO et de la eBOM",
                blog_bom_s3_p1: "Le <strong>PDM</strong> (Product Data Management) est un système de gestion des données techniques issues de la CAO. Son rôle principal est de stocker, versionner et sécuriser les fichiers SOLIDWORKS, les plans, les propriétés personnalisées, et d'en extraire automatiquement la nomenclature (eBOM).",
                blog_bom_s3_card1_title: "Ce que fait un PDM",
                blog_bom_s3_card1_item1: "Coffre de données CAO avec gestion des droits",
                blog_bom_s3_card1_item2: "Versioning et indices de révision (A, B, C…)",
                blog_bom_s3_card1_item3: "Extraction automatique de la eBOM depuis les assemblages CAO",
                blog_bom_s3_card1_item4: "Gestion des états (En cours / Validé / Obsolète)",
                blog_bom_s3_card1_item5: "Workflows d'approbation (validation plan, visa BE)",
                blog_bom_s3_card1_item6: "Réplication multi-sites pour les entreprises distribuées",
                blog_bom_s3_card1_item7: "Archivage froid (Cold Storage) des données historiques",
                blog_bom_s3_card2_title: "Ce que ne fait pas un PDM",
                blog_bom_s3_card2_item1: "Gérer les modifications produit (ECO/ECR) de façon formelle",
                blog_bom_s3_card2_item2: "Piloter les projets ou les jalons",
                blog_bom_s3_card2_item3: "Gérer les coûts ou les approvisionnements",
                blog_bom_s3_card2_item4: "Tracer la configuration produit sur plusieurs variantes",
                blog_bom_s3_card2_item5: "Orchestrer les échanges entre BE, méthodes et production",
                blog_bom_s3_solutions_intro: "Les solutions PDM les plus répandues dans les PME industrielles françaises que j'accompagne :",
                blog_bom_s3_pdm1: "<strong>SOLIDWORKS PDM Standard / Professional</strong> — la solution la plus courante dans les BE sous SOLIDWORKS (80 % de mes clients)",
                blog_bom_s3_pdm2: "<strong>PTC Windchill PDMLink</strong> — couplé à Creo, orienté grands comptes",
                blog_bom_s3_pdm3: "<strong>3DEXPERIENCE Platform</strong> (Dassault Systèmes) — PDM intégré dans un environnement PLM complet",
                blog_bom_s3_pdm4: "<strong>Autodesk Vault</strong> — pour les BE sous Inventor",
                blog_bom_s3_callout: "<strong>Principe fondamental :</strong> un PDM bien configuré produit une eBOM propre et versionnée. C'est la matière première que le PLM va gouverner et que l'ERP va consommer. Sans PDM, la eBOM existe dans des fichiers Excel, et tout le reste est fragilisé.",
                blog_bom_s4_title: "4. Le PLM : orchestrateur du cycle de vie",
                blog_bom_s4_p1: "Le <strong>PLM</strong> (Product Lifecycle Management) est une stratégie — autant qu'un système — qui couvre l'ensemble du cycle de vie d'un produit : de l'idéation à la mise hors service. Il englobe le PDM, mais va bien au-delà.",
                blog_bom_s4_p2: "Là où le PDM se concentre sur les <em>données</em> (fichiers, eBOM, états), le PLM se concentre sur les <em>processus</em> qui font évoluer ces données.",
                blog_bom_s4_card1_title: "Ce que fait un PLM",
                blog_bom_s4_card1_item1: "Gestion des modifications formelles (ECR / ECO)",
                blog_bom_s4_card1_item2: "Configuration management (tracer quelle version est chez quel client)",
                blog_bom_s4_card1_item3: "Gestion de projet produit (jalons, livrables, ressources)",
                blog_bom_s4_card1_item4: "Intégration multi-disciplines (mécanique, électrique, logiciel)",
                blog_bom_s4_card1_item5: "Qualification et validation (DFMEA, DVP, plans de validation)",
                blog_bom_s4_card1_item6: "Gestion des exigences (traçabilité exigences → conception)",
                blog_bom_s4_card1_item7: "Portail fournisseurs (partage de données CAO avec sous-traitants)",
                blog_bom_s4_card2_title: "Solutions PLM du marché",
                blog_bom_s4_card2_item1: "<strong>3DEXPERIENCE</strong> (Dassault Systèmes) — PDM + PLM + collaboration",
                blog_bom_s4_card2_item2: "<strong>PTC Windchill</strong> — référence industrie aéronautique / défense",
                blog_bom_s4_card2_item3: "<strong>Siemens Teamcenter</strong> — automobile et aérospace",
                blog_bom_s4_card2_item4: "<strong>Arena PLM / Propel</strong> — orienté électronique et PME tech",
                blog_bom_s4_card2_item5: "<strong>OpenBOM, Aligni</strong> — PLM léger pour startups hardtech",
                blog_bom_s4_p3: "En pratique, la frontière entre PDM et PLM est souvent floue. Beaucoup de PME n'ont qu'un PDM (SOLIDWORKS PDM) et appellent ça \"leur PLM\". Ce n'est pas faux dans l'usage, mais il faut savoir ce qui manque : la gestion formelle des modifications, la traçabilité de configuration, le lien avec les projets.",
                blog_bom_s4_quote: "Le PDM vous dit <em>ce que</em> vous avez conçu et <em>quand</em>. Le PLM vous dit <em>pourquoi</em> c'est différent de la version précédente, <em>qui</em> a approuvé le changement, et <em>quelles</em> machines en service sont impactées.",
                blog_bom_s5_title: "5. L'ERP : la mBOM en production et en achat",
                blog_bom_s5_p1: "L'<strong>ERP</strong> (Enterprise Resource Planning) est le système de gestion de l'entreprise au sens large : finances, ressources humaines, achats, stocks, production, logistique. Dans notre contexte, ce qui nous intéresse c'est le module <strong>GPAO</strong> (Gestion de Production Assistée par Ordinateur) et la gestion des nomenclatures de fabrication.",
                blog_bom_s5_p2: "L'ERP consomme la <strong>mBOM</strong> pour :",
                blog_bom_s5_li1: "Générer les <strong>ordres de fabrication</strong> (OF) avec les composants nécessaires",
                blog_bom_s5_li2: "Déclencher les <strong>ordres d'achat</strong> selon les besoins nets (calcul MRP)",
                blog_bom_s5_li3: "Calculer les <strong>coûts de revient</strong> (coût standard × quantités BOM)",
                blog_bom_s5_li4: "Piloter le <strong>stock</strong> en consommant les composants à l'émission de chaque OF",
                blog_bom_s5_li5: "Tracer la <strong>traçabilité de production</strong> (numéro de lot, N/S)",
                blog_bom_s5_card1_title: "ERPs courants en industrie française",
                blog_bom_s5_card1_item1: "<strong>SAP S/4HANA / SAP Business One</strong> — grands comptes et ETI",
                blog_bom_s5_card1_item2: "<strong>Sage X3 / Sage 100</strong> — PME industrielles, très répandu",
                blog_bom_s5_card1_item3: "<strong>Cegid XRP Flex</strong> — PME, souvent couplé à SOLIDWORKS PDM via Gateway",
                blog_bom_s5_card1_item4: "<strong>IFS Applications</strong> — industrie manufacturière, aéronautique",
                blog_bom_s5_card1_item5: "<strong>Odoo</strong> — PME / startups industrielles (open source)",
                blog_bom_s5_card1_item6: "<strong>Sylob</strong> — ERP dédié industrie manufacture",
                blog_bom_s5_card2_title: "Ce que l'ERP ne fait pas côté produit",
                blog_bom_s5_card2_item1: "Gérer les fichiers CAO ou les plans",
                blog_bom_s5_card2_item2: "Versionner les pièces par indice de révision technique",
                blog_bom_s5_card2_item3: "Piloter les workflows de validation BE",
                blog_bom_s5_card2_item4: "Comprendre la structure fonctionnelle (eBOM)",
                blog_bom_s5_card2_item5: "Gérer les ECO/ECR formels",
                blog_bom_s5_callout: "L'ERP est impitoyable sur la qualité de la mBOM. Une erreur de quantité dans la BOM ERP, c'est un stock erroné, un coût de revient faux, et potentiellement une ligne de production arrêtée. C'est pour ça que la synchronisation PDM → ERP (via un connecteur ou la PDM Gateway) est l'un des projets les plus critiques qu'on me demande de traiter.",
                blog_bom_s6_title: "6. Les liens entre PDM, PLM et ERP",
                blog_bom_s6_p1: "Les trois systèmes ne sont pas des silos indépendants. Ils échangent des données dans les deux sens, et c'est précisément là que les entreprises rencontrent le plus de difficultés.",
                blog_bom_s6_flux1_title: "Le flux principal : PDM → ERP (eBOM → mBOM)",
                blog_bom_s6_flux1_p: "C'est le flux le plus courant. À chaque validation d'une nomenclature dans le PDM, les données doivent être transmises à l'ERP pour créer ou mettre à jour la BOM de fabrication. Ce transfert est rarement automatique dans les PME : il se fait encore souvent manuellement, via des exports Excel.",
                blog_bom_s6_flux1_mecas_intro: "Les mécanismes d'intégration existants :",
                blog_bom_s6_flux1_meca1: "<strong>PDM Gateway</strong> (SOLIDWORKS PDM Pro) — connecteur natif vers SAP, Sage, Cegid et d'autres ERP via XML/CSV",
                blog_bom_s6_flux1_meca2: "<strong>API REST / Web Services</strong> — pour les intégrations sur mesure",
                blog_bom_s6_flux1_meca3: "<strong>Middleware EAI</strong> (Boomi, MuleSoft, Talend) — pour les architectures complexes multi-sites",
                blog_bom_s6_flux1_meca4: "<strong>Export/import CSV manuel</strong> — la réalité de 60 % des PME de moins de 100 personnes",
                blog_bom_s6_flux2_title: "Le flux PLM → ERP : les modifications produit",
                blog_bom_s6_flux2_p: "Quand une modification produit (ECO) est validée dans le PLM, elle doit déclencher une mise à jour coordonnée : nouvelle révision dans le PDM <em>et</em> mise à jour de la mBOM dans l'ERP. C'est là que les BOM divergent si les processus ne sont pas formalisés.",
                blog_bom_s6_flux3_title: "Le flux ERP → PLM : remontée terrain",
                blog_bom_s6_flux3_p: "Moins connu, mais crucial : les retours de production (rebuts, substitutions de composants, non-conformités) doivent remonter vers le PLM pour déclencher des modifications formelles. Sans cette boucle, le design reste figé sur une réalité de terrain qui a évolué.",
                blog_bom_s6_archi1_title: "Architecture idéale (PME &gt; 50 pers.)",
                blog_bom_s6_archi1_item1: "PDM = source de vérité des données CAO + eBOM",
                blog_bom_s6_archi1_item2: "PLM = gouvernance des modifications et de la configuration",
                blog_bom_s6_archi1_item3: "ERP = exécution production, achats, coûts via mBOM",
                blog_bom_s6_archi1_item4: "Connecteur PDM → ERP automatisé sur validation",
                blog_bom_s6_archi1_item5: "Processus ECO formalisé entre PLM et ERP",
                blog_bom_s6_archi2_title: "Architecture fréquente (PME &lt; 50 pers.)",
                blog_bom_s6_archi2_item1: "PDM = SOLIDWORKS PDM Standard (coffre + eBOM basique)",
                blog_bom_s6_archi2_item2: "Pas de PLM dédié — ECO par email ou réunion",
                blog_bom_s6_archi2_item3: "ERP = Sage ou Cegid, BOM saisie manuellement",
                blog_bom_s6_archi2_item4: "Synchronisation PDM/ERP = export CSV hebdomadaire",
                blog_bom_s6_archi2_item5: "Divergences BOM régulières, détectées en production",
                blog_bom_s7_title: "7. Ce qui se passe quand rien n'est aligné",
                blog_bom_s7_p1: "Après 80 clients et 95 projets PDM, voici les symptômes récurrents que j'observe quand PDM, PLM et ERP ne parlent pas le même langage :",
                blog_bom_s7_card1_title: "Dans le bureau d'études",
                blog_bom_s7_card1_item1: "Plusieurs versions d'une même pièce en circulation sans contrôle d'indice",
                blog_bom_s7_card1_item2: "Nomenclatures CAO qui diffèrent des nomenclatures ERP sans raison connue",
                blog_bom_s7_card1_item3: "Ingénieurs qui \"sauvegardent\" les plans sur des dossiers réseau partagés en parallèle du PDM",
                blog_bom_s7_card1_item4: "Temps de recherche d'un fichier &gt; 15 minutes par occurrence",
                blog_bom_s7_card2_title: "En production et achats",
                blog_bom_s7_card2_item1: "Ordres d'achat sur des références obsolètes",
                blog_bom_s7_card2_item2: "Stock de composants jamais utilisés (BOM ERP pas mise à jour)",
                blog_bom_s7_card2_item3: "Arrêts de ligne pour pièces manquantes non prévues dans la BOM",
                blog_bom_s7_card2_item4: "Coût de revient calculé sur une BOM qui ne correspond plus au produit réel",
                blog_bom_s7_p2: "Ces dysfonctionnements ont un coût direct. Une étude Aberdeen Group régulièrement citée dans le secteur évalue à <strong>2 à 4 % du chiffre d'affaires</strong> le coût des erreurs BOM dans les entreprises manufacturières sans intégration PDM/ERP correcte.",
                blog_bom_s7_quote: "La bonne nouvelle : dans la majorité des cas, les données ne sont pas perdues. Elles existent dans le PDM, dans l'ERP, parfois dans Excel. Le travail consiste à identifier l'écart, définir la source de vérité, et mettre en place la synchronisation. C'est un chantier de 2 à 6 mois, pas une révolution.",
                blog_bom_s7_plan_title: "Par où commencer ?",
                blog_bom_s7_plan_item1: "<strong>Auditer l'état de votre PDM</strong> — est-ce que la eBOM générée est propre, à jour, avec des propriétés standardisées ?",
                blog_bom_s7_plan_item2: "<strong>Comparer eBOM PDM et mBOM ERP</strong> sur un produit représentatif — mesurer l'écart",
                blog_bom_s7_plan_item3: "<strong>Formaliser un processus de modification</strong> — même simple, même sans outil PLM dédié",
                blog_bom_s7_plan_item4: "<strong>Automatiser le flux PDM → ERP</strong> si le volume le justifie (PDM Gateway ou script d'export structuré)",
                blog_bom_s7_plan_item5: "<strong>Former les acteurs</strong> — BE, méthodes et supply chain doivent parler le même langage BOM",
                blog_bom_s7_callout_soft: "<strong>Indicateur clé :</strong> comptez le nombre de BOM actives dans votre ERP dont l'indice de révision ne correspond pas à la dernière révision validée dans le PDM. Ce chiffre, seul, suffit à justifier ou non un chantier de synchronisation.",
                blog_bom_cta_title: "Vous avez trouvé cet article utile ?",
                blog_bom_cta_text: "Je partage régulièrement des retours d'expérience terrain sur la gestion des données techniques industrielles.",
                blog_bom_cta_button: "Me contacter"
            }
        }
    },
    en: {
        common: {
            blog_back_to_blog: "← Back to the blog",
            blog_back_to_portfolio: "Back to the portfolio",
            blog_badge_editorial: "Feature article",
            blog_cta_summary: "View the outline",
            blog_cta_discuss_project: "Contact Me",
            blog_cta_all_articles: "All articles",
            blog_cta_linkedin: "Contact Me",
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
                blog_config_cta_title: "Found this article useful?",
                blog_config_cta_text: "I regularly share field experience on SOLIDWORKS and technical data management.",
                blog_config_cta_button: "Contact Me"
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
                blog_plm_cta_title: "Found this article useful?",
                blog_plm_cta_text: "I regularly share field experience on PLM challenges encountered in industry.",
                blog_plm_cta_button: "Contact Me"
            },
            "nomenclature-bom-pdm-plm-erp": {
                blog_bom_badge_type: "PDM · PLM · ERP",
                blog_bom_hero_eyebrow: "Product data &amp; information systems",
                blog_bom_hero_title: "BOM, eBOM, mBOM: the backbone of your product data — and the role of PDM, PLM and ERP",
                blog_bom_hero_subtitle: `Published on <span data-date-iso="2026-03-16T00:00:00.000Z" data-date-format="long">March 16, 2026</span> — a field perspective on how BOM, PDM, PLM and ERP fit together (or fall apart) in industrial design offices.`,
                blog_bom_stat_publication: "Publication date",
                blog_bom_stat_systems: "Systems analysed",
                blog_bom_stat_clients: "Clients supported",
                blog_bom_hero_figcaption: "BOM, PDM, PLM, ERP: four fundamental concepts every product engineer must master to manage data without friction.",
                blog_bom_summary_label1: "What is a BOM (Bill of Materials)?",
                blog_bom_summary_meta1: "Definition, structure, levels, types",
                blog_bom_summary_label2: "eBOM vs mBOM: two views of the same product",
                blog_bom_summary_meta2: "Design office vs manufacturing",
                blog_bom_summary_label3: "PDM: guardian of CAD data and the eBOM",
                blog_bom_summary_meta3: "What it does, what it doesn't",
                blog_bom_summary_label4: "PLM: lifecycle orchestrator",
                blog_bom_summary_meta4: "Governance, ECO/ECR, configuration management",
                blog_bom_summary_label5: "ERP: mBOM in production and purchasing",
                blog_bom_summary_meta5: "SAP, Sage, Cegid and the field reality",
                blog_bom_summary_label6: "The links between the three systems",
                blog_bom_summary_meta6: "Data flows, interfaces, friction points",
                blog_bom_summary_label7: "What happens when nothing is aligned",
                blog_bom_summary_meta7: "Field errors, hidden costs, action plan",
                blog_bom_s1_title: "1. What is a BOM (Bill of Materials)?",
                blog_bom_s1_p1: "A <strong>BOM</strong> (Bill of Materials) is the structured list of all components, sub-assemblies and materials required to manufacture a product. It is the pivot document between design, production and purchasing.",
                blog_bom_s1_p2: "It is not a simple inventory. It encodes hierarchical relationships between parts: a hydraulic cylinder is a sub-assembly containing a body, a piston, seals and bolts. Removing a line or entering the wrong quantity can trigger a production line stoppage or a product recall.",
                blog_bom_s1_quote: "At an industrial equipment manufacturer I was working with, a single incorrect BOM line in Excel led to ordering 12 times too many return rollers. The stock had been sitting idle for 8 months. The BOM had never been synchronised between the design office and production.",
                blog_bom_s1_card1_title: "Basic attributes",
                blog_bom_s1_card1_item1: "Part number (internal reference)",
                blog_bom_s1_card1_item2: "Name / description",
                blog_bom_s1_card1_item3: "Quantity and unit",
                blog_bom_s1_card1_item4: "Hierarchical level (level 0 = finished product, level 1 = sub-assemblies…)",
                blog_bom_s1_card1_item5: "Status (in development, approved, obsolete)",
                blog_bom_s1_card2_title: "Extended attributes",
                blog_bom_s1_card2_item1: "Supplier and supplier reference",
                blog_bom_s1_card2_item2: "Standard cost / actual cost",
                blog_bom_s1_card2_item3: "Revision index",
                blog_bom_s1_card2_item4: "Associated documents (drawing, spec, DFM)",
                blog_bom_s1_card2_item5: "CAD file links (SLDPRT, SLDASM…)",
                blog_bom_s1_types_intro: "There are several <strong>BOM types</strong> depending on the product stage and the user:",
                blog_bom_s1_table_h_type: "Type",
                blog_bom_s1_table_h_name: "Full name",
                blog_bom_s1_table_h_owner: "Owner",
                blog_bom_s1_table_h_system: "System",
                blog_bom_s1_table_h_usage: "Main use",
                blog_bom_s1_row1_name: "Engineering BOM",
                blog_bom_s1_row1_owner: "Design office",
                blog_bom_s1_row1_usage: "Design, revisions, drawings",
                blog_bom_s1_row2_name: "Manufacturing BOM",
                blog_bom_s1_row2_owner: "Methods / Production",
                blog_bom_s1_row2_usage: "Work orders, purchasing, cost roll-up",
                blog_bom_s1_row3_name: "Service BOM",
                blog_bom_s1_row3_owner: "After-sales / Maintenance",
                blog_bom_s1_row3_usage: "Spare parts, field interventions",
                blog_bom_s1_row4_name: "Configurator BOM",
                blog_bom_s1_row4_owner: "Sales / CPQ",
                blog_bom_s1_row4_usage: "Options, variants, quotes",
                blog_bom_s1_callout_soft: "The first two — <strong>eBOM and mBOM</strong> — account for 80% of problems in industrial SMEs. The transformation from one to the other is often the most underestimated workstream in a PDM/ERP project.",
                blog_bom_s2_title: "2. eBOM vs mBOM: two views of the same product",
                blog_bom_s2_p1: "The eBOM and mBOM describe the same product from radically different angles. Confusing the two, or failing to plan the transformation from one to the other, is one of the most common sources of friction between design offices and shop floors.",
                blog_bom_s2_card1_title: "eBOM — Engineering BOM",
                blog_bom_s2_card1_item1: "Created by the <strong>design office</strong>",
                blog_bom_s2_card1_item2: "Reflects the <strong>functional structure</strong> of the product as designed",
                blog_bom_s2_card1_item3: "Organised around functions (hydraulic module, electrical module…)",
                blog_bom_s2_card1_item4: "Linked to CAD files (SOLIDWORKS, Creo, Catia…)",
                blog_bom_s2_card1_item5: "Managed in <strong>PDM or PLM</strong>",
                blog_bom_s2_card1_item6: "Versioned with revision indices",
                blog_bom_s2_card2_title: "mBOM — Manufacturing BOM",
                blog_bom_s2_card2_item1: "Created by <strong>methods / manufacturing</strong>",
                blog_bom_s2_card2_item2: "Reflects the actual <strong>assembly sequence</strong>",
                blog_bom_s2_card2_item3: "May split or merge eBOM levels based on work centres",
                blog_bom_s2_card2_item4: "Includes phantom items, kits and operations",
                blog_bom_s2_card2_item5: "Managed in the <strong>ERP</strong> (SAP, Sage, Cegid, IFS…)",
                blog_bom_s2_card2_item6: "Drives work orders and purchasing",
                blog_bom_s2_p2: "The eBOM → mBOM transformation is rarely automatic. It requires a <strong>structural transformation</strong> step: parts disappear (raw → machined), operations are added, and hierarchical levels are reorganised according to manufacturing routings.",
                blog_bom_s2_callout: "The same product can have a 4-level eBOM and a 7-level mBOM — or vice versa. That's not a bug; it's the reality of two disciplines with different needs.",
                blog_bom_s3_title: "3. PDM: guardian of CAD data and the eBOM",
                blog_bom_s3_p1: "A <strong>PDM</strong> (Product Data Management) system manages the technical data produced by CAD. Its primary role is to store, version and secure SOLIDWORKS files, drawings and custom properties, and to automatically extract the bill of materials (eBOM).",
                blog_bom_s3_card1_title: "What a PDM does",
                blog_bom_s3_card1_item1: "CAD data vault with access rights management",
                blog_bom_s3_card1_item2: "Versioning and revision indices (A, B, C…)",
                blog_bom_s3_card1_item3: "Automatic eBOM extraction from CAD assemblies",
                blog_bom_s3_card1_item4: "State management (In Progress / Approved / Obsolete)",
                blog_bom_s3_card1_item5: "Approval workflows (drawing sign-off, design review)",
                blog_bom_s3_card1_item6: "Multi-site replication for distributed companies",
                blog_bom_s3_card1_item7: "Cold storage archiving for historical data",
                blog_bom_s3_card2_title: "What a PDM does NOT do",
                blog_bom_s3_card2_item1: "Formally manage product changes (ECO/ECR)",
                blog_bom_s3_card2_item2: "Manage projects or milestones",
                blog_bom_s3_card2_item3: "Handle costs or procurement",
                blog_bom_s3_card2_item4: "Track product configuration across variants",
                blog_bom_s3_card2_item5: "Orchestrate exchanges between design, methods and production",
                blog_bom_s3_solutions_intro: "The most common PDM solutions in French industrial SMEs I work with:",
                blog_bom_s3_pdm1: "<strong>SOLIDWORKS PDM Standard / Professional</strong> — the most common solution in SOLIDWORKS design offices (80% of my clients)",
                blog_bom_s3_pdm2: "<strong>PTC Windchill PDMLink</strong> — paired with Creo, enterprise-focused",
                blog_bom_s3_pdm3: "<strong>3DEXPERIENCE Platform</strong> (Dassault Systèmes) — PDM integrated in a full PLM environment",
                blog_bom_s3_pdm4: "<strong>Autodesk Vault</strong> — for design offices using Inventor",
                blog_bom_s3_callout: "<strong>Core principle:</strong> a well-configured PDM produces a clean, versioned eBOM. That is the raw material that PLM will govern and ERP will consume. Without PDM, the eBOM lives in Excel files, and everything else is weakened.",
                blog_bom_s4_title: "4. PLM: lifecycle orchestrator",
                blog_bom_s4_p1: "A <strong>PLM</strong> (Product Lifecycle Management) system is a strategy — as much as a tool — covering the entire product lifecycle: from ideation to end-of-life. It includes PDM, but goes far beyond it.",
                blog_bom_s4_p2: "Where PDM focuses on <em>data</em> (files, eBOM, states), PLM focuses on the <em>processes</em> that evolve that data.",
                blog_bom_s4_card1_title: "What a PLM does",
                blog_bom_s4_card1_item1: "Formal change management (ECR / ECO)",
                blog_bom_s4_card1_item2: "Configuration management (track which version is with which customer)",
                blog_bom_s4_card1_item3: "Product project management (milestones, deliverables, resources)",
                blog_bom_s4_card1_item4: "Multi-discipline integration (mechanical, electrical, software)",
                blog_bom_s4_card1_item5: "Qualification and validation (DFMEA, DVP, validation plans)",
                blog_bom_s4_card1_item6: "Requirements management (requirements → design traceability)",
                blog_bom_s4_card1_item7: "Supplier portal (sharing CAD data with subcontractors)",
                blog_bom_s4_card2_title: "PLM solutions on the market",
                blog_bom_s4_card2_item1: "<strong>3DEXPERIENCE</strong> (Dassault Systèmes) — PDM + PLM + collaboration",
                blog_bom_s4_card2_item2: "<strong>PTC Windchill</strong> — reference for aerospace and defence",
                blog_bom_s4_card2_item3: "<strong>Siemens Teamcenter</strong> — automotive and aerospace",
                blog_bom_s4_card2_item4: "<strong>Arena PLM / Propel</strong> — electronics and tech SMEs",
                blog_bom_s4_card2_item5: "<strong>OpenBOM, Aligni</strong> — lightweight PLM for hardtech startups",
                blog_bom_s4_p3: "In practice, the boundary between PDM and PLM is often blurry. Many SMEs only have a PDM (SOLIDWORKS PDM) and call it \"their PLM\". That's not wrong in usage, but it's worth knowing what's missing: formal change management, configuration traceability, project linkage.",
                blog_bom_s4_quote: "PDM tells you <em>what</em> you designed and <em>when</em>. PLM tells you <em>why</em> it differs from the previous version, <em>who</em> approved the change, and <em>which</em> machines in the field are affected.",
                blog_bom_s5_title: "5. ERP: mBOM in production and purchasing",
                blog_bom_s5_p1: "An <strong>ERP</strong> (Enterprise Resource Planning) system manages the business broadly: finance, HR, purchasing, inventory, production, logistics. In our context, what matters is the <strong>MRP/production module</strong> and manufacturing BOM management.",
                blog_bom_s5_p2: "The ERP consumes the <strong>mBOM</strong> to:",
                blog_bom_s5_li1: "Generate <strong>work orders</strong> (WO) with the required components",
                blog_bom_s5_li2: "Trigger <strong>purchase orders</strong> based on net requirements (MRP calculation)",
                blog_bom_s5_li3: "Calculate <strong>cost roll-ups</strong> (standard cost × BOM quantities)",
                blog_bom_s5_li4: "Drive <strong>inventory</strong> by consuming components when each WO is issued",
                blog_bom_s5_li5: "Trace <strong>production traceability</strong> (batch number, serial number)",
                blog_bom_s5_card1_title: "Common ERPs in French industry",
                blog_bom_s5_card1_item1: "<strong>SAP S/4HANA / SAP Business One</strong> — large accounts and mid-market",
                blog_bom_s5_card1_item2: "<strong>Sage X3 / Sage 100</strong> — industrial SMEs, widely used",
                blog_bom_s5_card1_item3: "<strong>Cegid XRP Flex</strong> — SMEs, often coupled to SOLIDWORKS PDM via Gateway",
                blog_bom_s5_card1_item4: "<strong>IFS Applications</strong> — manufacturing, aerospace",
                blog_bom_s5_card1_item5: "<strong>Odoo</strong> — industrial SMEs / startups (open source)",
                blog_bom_s5_card1_item6: "<strong>Sylob</strong> — ERP dedicated to manufacturing SMEs",
                blog_bom_s5_card2_title: "What ERP does NOT do on the product side",
                blog_bom_s5_card2_item1: "Manage CAD files or drawings",
                blog_bom_s5_card2_item2: "Version parts by technical revision index",
                blog_bom_s5_card2_item3: "Drive design approval workflows",
                blog_bom_s5_card2_item4: "Understand the functional structure (eBOM)",
                blog_bom_s5_card2_item5: "Manage formal ECO/ECR processes",
                blog_bom_s5_callout: "ERP is unforgiving about mBOM quality. A quantity error in the ERP BOM means incorrect stock, a wrong cost roll-up, and potentially a stopped production line. That's why PDM → ERP synchronisation (via a connector or PDM Gateway) is one of the most critical projects I am asked to handle.",
                blog_bom_s6_title: "6. The links between PDM, PLM and ERP",
                blog_bom_s6_p1: "The three systems are not independent silos. They exchange data in both directions, and that is precisely where companies encounter the most difficulties.",
                blog_bom_s6_flux1_title: "The main flow: PDM → ERP (eBOM → mBOM)",
                blog_bom_s6_flux1_p: "This is the most common flow. Every time a BOM is approved in PDM, the data must be transferred to ERP to create or update the manufacturing BOM. This transfer is rarely automatic in SMEs: it is still often done manually via Excel exports.",
                blog_bom_s6_flux1_mecas_intro: "Available integration mechanisms:",
                blog_bom_s6_flux1_meca1: "<strong>PDM Gateway</strong> (SOLIDWORKS PDM Pro) — native connector to SAP, Sage, Cegid and other ERPs via XML/CSV",
                blog_bom_s6_flux1_meca2: "<strong>REST API / Web Services</strong> — for custom integrations",
                blog_bom_s6_flux1_meca3: "<strong>EAI Middleware</strong> (Boomi, MuleSoft, Talend) — for complex multi-site architectures",
                blog_bom_s6_flux1_meca4: "<strong>Manual CSV export/import</strong> — the reality for 60% of SMEs with fewer than 100 employees",
                blog_bom_s6_flux2_title: "The PLM → ERP flow: product changes",
                blog_bom_s6_flux2_p: "When a product change (ECO) is approved in PLM, it must trigger a coordinated update: a new revision in PDM <em>and</em> an update to the mBOM in ERP. This is where BOMs diverge when processes are not formalised.",
                blog_bom_s6_flux3_title: "The ERP → PLM flow: field feedback",
                blog_bom_s6_flux3_p: "Less known but critical: production feedback (scrap, component substitutions, non-conformances) must flow back to PLM to trigger formal changes. Without this loop, the design remains frozen on a field reality that has moved on.",
                blog_bom_s6_archi1_title: "Ideal architecture (SME &gt; 50 people)",
                blog_bom_s6_archi1_item1: "PDM = single source of truth for CAD data + eBOM",
                blog_bom_s6_archi1_item2: "PLM = governance of changes and configuration",
                blog_bom_s6_archi1_item3: "ERP = production execution, purchasing, costs via mBOM",
                blog_bom_s6_archi1_item4: "Automated PDM → ERP connector triggered on approval",
                blog_bom_s6_archi1_item5: "Formalised ECO process between PLM and ERP",
                blog_bom_s6_archi2_title: "Common architecture (SME &lt; 50 people)",
                blog_bom_s6_archi2_item1: "PDM = SOLIDWORKS PDM Standard (vault + basic eBOM)",
                blog_bom_s6_archi2_item2: "No dedicated PLM — ECO handled by email or meetings",
                blog_bom_s6_archi2_item3: "ERP = Sage or Cegid, BOM entered manually",
                blog_bom_s6_archi2_item4: "PDM/ERP sync = weekly CSV export",
                blog_bom_s6_archi2_item5: "Regular BOM divergences, spotted in production",
                blog_bom_s7_title: "7. What happens when nothing is aligned",
                blog_bom_s7_p1: "After 80 clients and 95 PDM projects, here are the recurring symptoms I observe when PDM, PLM and ERP don't speak the same language:",
                blog_bom_s7_card1_title: "In the design office",
                blog_bom_s7_card1_item1: "Multiple versions of the same part circulating without revision control",
                blog_bom_s7_card1_item2: "CAD BOMs that differ from ERP BOMs for no known reason",
                blog_bom_s7_card1_item3: "Engineers \"saving\" drawings to shared network folders alongside the PDM",
                blog_bom_s7_card1_item4: "File search time &gt; 15 minutes per occurrence",
                blog_bom_s7_card2_title: "In production and purchasing",
                blog_bom_s7_card2_item1: "Purchase orders against obsolete references",
                blog_bom_s7_card2_item2: "Component stock that is never consumed (ERP BOM not updated)",
                blog_bom_s7_card2_item3: "Line stoppages for parts missing from the BOM",
                blog_bom_s7_card2_item4: "Cost roll-up calculated on a BOM that no longer matches the actual product",
                blog_bom_s7_p2: "These failures have a direct cost. An Aberdeen Group study widely cited in the sector estimates BOM errors at <strong>2 to 4% of revenue</strong> for manufacturers without proper PDM/ERP integration.",
                blog_bom_s7_quote: "The good news: in most cases, the data is not lost. It exists in PDM, in ERP, sometimes in Excel. The work is to identify the gap, define the source of truth, and put synchronisation in place. It's a 2 to 6-month project, not a revolution.",
                blog_bom_s7_plan_title: "Where to start?",
                blog_bom_s7_plan_item1: "<strong>Audit your PDM state</strong> — is the generated eBOM clean, up to date, with standardised properties?",
                blog_bom_s7_plan_item2: "<strong>Compare PDM eBOM and ERP mBOM</strong> on a representative product — measure the gap",
                blog_bom_s7_plan_item3: "<strong>Formalise a change process</strong> — even a simple one, even without a dedicated PLM tool",
                blog_bom_s7_plan_item4: "<strong>Automate the PDM → ERP flow</strong> if volume justifies it (PDM Gateway or structured export script)",
                blog_bom_s7_plan_item5: "<strong>Train the stakeholders</strong> — design, methods and supply chain must speak the same BOM language",
                blog_bom_s7_callout_soft: "<strong>Key indicator:</strong> count the number of active BOMs in your ERP whose revision index does not match the latest approved revision in PDM. That number alone is enough to justify — or not — a synchronisation project.",
                blog_bom_cta_title: "Found this article useful?",
                blog_bom_cta_text: "I regularly share field experience on industrial technical data management.",
                blog_bom_cta_button: "Contact Me"
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

function createHeroGrid() {
    const heroGrid = document.getElementById('heroGrid');
    if (!heroGrid) return;
    const width = heroGrid.clientWidth;
    const height = heroGrid.clientHeight;

    let cellSize = 50;
    if (width < 350) cellSize = Math.floor(width / 7);
    heroGrid.style.setProperty('--cell-size', `${cellSize}px`);

    const columns = Math.floor(width / cellSize);
    const rows = Math.ceil(height / cellSize);
    heroGrid.innerHTML = '';

    for (let i = 0; i < rows * columns; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        heroGrid.appendChild(cell);
    }

    document.addEventListener('mousemove', (e) => {
        const cells = heroGrid.querySelectorAll('.grid-cell');
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        cells.forEach((cell) => {
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
        // Remove the critical theme style injected at page load (has !important that blocks CSS)
        const criticalStyle = document.getElementById('critical-theme-style');
        if (criticalStyle) criticalStyle.remove();
        if (!isDark) {
            root.style.setProperty('--bg-color', 'var(--light-bg-color)');
            root.style.setProperty('--text-color', 'var(--light-text-color)');
            root.style.setProperty('--hover-color', 'var(--light-hover-color)');
            root.style.setProperty('--secondary-color', 'var(--light-secondary-color)');
            if (themeIcon) themeIcon.innerHTML = '🌙';
            root.classList.add('light-theme');
            root.classList.remove('dark-theme', 'dark');
        } else {
            root.style.setProperty('--bg-color', 'var(--bg-primary)');
            root.style.setProperty('--text-color', 'var(--text-primary)');
            root.style.setProperty('--hover-color', 'var(--bg-tertiary)');
            root.style.setProperty('--secondary-color', 'var(--bg-secondary)');
            if (themeIcon) themeIcon.innerHTML = '☀️';
            root.classList.add('dark-theme', 'dark');
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
