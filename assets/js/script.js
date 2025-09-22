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
        "hero_title": `<span class="highlight glitch" data-text="Ingénieur Mécanique">Ingénieur Mécanique</span> & <br>Consultant <span class="glitch" data-text="PDM/PLM">PDM/PLM</span>`,
        "hero_subtitle": "Expertise en conception, implémentation de solutions PDM et gestion du cycle de vie produit",
        "hero_cta1": "Me contacter",
        "hero_cta2": "Découvrir mon parcours",
        "scroll_text": "Défiler",
        "about_title": "À propos",
        "about_p1": "Ingénieur mécanique expérimenté et consultant PDM/PLM, je suis passionné par l'optimisation des processus de développement produit et la mise en œuvre de solutions techniques adaptées aux besoins spécifiques des entreprises.",
        "about_p2": "Fort de mon expertise en conception mécanique et en gestion du cycle de vie des produits, j'accompagne les organisations dans leur transformation numérique et l'amélioration de leurs flux de travail.",
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
        "exp1_title": "Consultant PDM/PLM",
        "exp1_subtitle1": "Mise en œuvre technique:",
        "exp1_desc1_1": "Migration de serveurs et implémentation de solutions SOLIDWORKS PDM",
        "exp1_desc1_2": "Paramétrage et configuration personnalisée des systèmes",
        "exp1_desc1_3": "Intégration de systèmes PDM avec ERP via PDM Gateway",
        "exp1_subtitle2": "Gestion de projets:",
        "exp1_desc2_1": "Pilotage complet de projets d'implémentation PDM",
        "exp1_desc2_2": "Coordination d'équipes techniques pour des migrations",
        "exp1_desc2_3": "Élaboration de workflows optimisant les processus",
        "exp2_date": "Septembre 2021 - Juin 2023",
        "exp2_title": "Ingénieur Mécanique",
        "exp2_subtitle1": "Projet IDEMIA - Développement de radars:",
        "exp2_desc1_1": "Conception et développement des nouveaux radars",
        "exp2_desc1_2": "Conception de pièces usinées et intégration de composants",
        "exp2_desc1_3": "Structuration de l'architecture dossier sur le PLM",
        "exp2_subtitle2": "Projet FLOWBIRD - Transport:",
        "exp2_desc2_1": "Retrofit d'un distributeur de ticket pour la RATP",
        "exp2_desc2_2": "Animation des revues de conception",
        "exp2_desc2_3": "Calcul de structure avec Creo Simulate",
        "exp3_date": "Avril 2020 - Octobre 2020",
        "exp3_title": "Ingénieur Bureau d'Études",
        "exp3_desc1": "Analyse des cahiers des charges et des exigences clients",
        "exp3_desc2": "Chiffrage de projets et réalisation de nomenclatures",
        "exp3_desc3": "Élaboration de plans d'exécution et dossiers techniques",
        "exp3_desc4": "Recherche et consultation de fournisseurs",
        "skills_title": "Compétences",
        "skill1_title": "Solutions PDM/PLM",
        "tooltip_skill1_1": "Expert en configuration, migration et personnalisation de SOLIDWORKS PDM pour optimiser les workflows d'entreprise",
        "tooltip_skill1_2": "Plateforme collaborative pour la gestion du cycle de vie des produits et l'innovation",
        "tooltip_skill1_3": "Système PLM pour la gestion des données produits, processus et qualité",
        "tooltip_skill1_4": "Suite d'outils complémentaires pour l'optimisation des processus PDM",
        "tooltip_skill1_5": "Solution de gestion documentaire et technique",
        "skill2_title": "Conception & Simulation",
        "tooltip_skill2_1": "Maîtrise avancée des logiciels de CAO pour la conception mécanique",
        "tooltip_skill2_2": "Expertise en simulation numérique pour l'analyse de structures",
        "skill2_3": "Conception mécanique",
        "tooltip_skill2_3": "Conception de pièces complexes, assemblages et systèmes mécaniques",
        "skill3_title": "Méthodologies",
        "skill3_1": "Gestion de projets techniques",
        "tooltip_skill3_1": "Pilotage de projets d'implémentation PDM de l'analyse initiale au déploiement final",
        "skill3_2": "Migration et organisation de données produit",
        "tooltip_skill3_2": "Expertise en structuration et migration de données complexes",
        "skill3_3": "Formation et accompagnement aux changements",
        "tooltip_skill3_3": "Animation de sessions de formation adaptées aux différents niveaux d'utilisateurs",
        "skill3_4": "Analyse des processus industriels",
        "tooltip_skill3_4": "Optimisation des processus métier et des workflows techniques",
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
        "form_name": "Nom",
        "form_subject": "Sujet",
        "form_send": "Envoyer",
        "form_success": "Votre message a été envoyé avec succès ! Je vous répondrai dans les plus brefs délais.",
        "form_error": "Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer ou me contacter directement par email.",
        "footer_copyright": "&copy; 2025 Mohamed Omar Baouch. Tous droits réservés.",
        "ai_title": "Assistant Virtuel",
        "ai_welcome": "Bonjour ! Je suis l'assistant virtuel de Mohamed. Comment puis-je vous aider à découvrir son profil ? Voici quelques suggestions :",
        "ai_sugg_1": "Résume son expérience",
        "ai_sugg_2": "Quelles sont ses compétences en PDM ?",
        "ai_sugg_3": "Où a-t-il étudié ?"
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
        "hero_title": `<span class="highlight glitch" data-text="Mechanical Engineer">Mechanical Engineer</span> & <br>PDM/PLM <span class="glitch" data-text="Consultant">Consultant</span>`,
        "hero_subtitle": "Expertise in design, PDM solution implementation, and product lifecycle management",
        "hero_cta1": "Contact Me",
        "hero_cta2": "Explore My Journey",
        "scroll_text": "Scroll",
        "about_title": "About Me",
        "about_p1": "As an experienced mechanical engineer and PDM/PLM consultant, I am passionate about optimizing product development processes and implementing technical solutions tailored to companies' specific needs.",
        "about_p2": "With strong expertise in mechanical design and product lifecycle management, I guide organizations through their digital transformation and the improvement of their workflows.",
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
        "exp1_title": "PDM/PLM Consultant",
        "exp1_subtitle1": "Technical Implementation:",
        "exp1_desc1_1": "Server migration and implementation of SOLIDWORKS PDM solutions",
        "exp1_desc1_2": "Custom system parameterization and configuration",
        "exp1_desc1_3": "Integration of PDM systems with ERP via PDM Gateway",
        "exp1_subtitle2": "Project Management:",
        "exp1_desc2_1": "End-to-end management of PDM implementation projects",
        "exp1_desc2_2": "Coordination of technical teams for migrations",
        "exp1_desc2_3": "Development of process-optimizing workflows",
        "exp2_date": "September 2021 - June 2023",
        "exp2_title": "Mechanical Engineer",
        "exp2_subtitle1": "IDEMIA Project - Radar Development:",
        "exp2_desc1_1": "Design and development of new radars",
        "exp2_desc1_2": "Design of machined parts and component integration",
        "exp2_desc1_3": "Structuring of the file architecture on the PLM",
        "exp2_subtitle2": "FLOWBIRD Project - Transport:",
        "exp2_desc2_1": "Retrofitting a ticket distributor for RATP",
        "exp2_desc2_2": "Leading design review meetings",
        "exp2_desc2_3": "Structural calculation with Creo Simulate",
        "exp3_date": "April 2020 - October 2020",
        "exp3_title": "Design Engineer",
        "exp3_desc1": "Analysis of specifications and client requirements",
        "exp3_desc2": "Project costing and creation of bills of materials",
        "exp3_desc3": "Development of execution plans and technical files",
        "exp3_desc4": "Supplier research and consultation",
        "skills_title": "Skills",
        "skill1_title": "PDM/PLM Solutions",
        "tooltip_skill1_1": "Expert in configuring, migrating, and customizing SOLIDWORKS PDM to optimize company workflows",
        "tooltip_skill1_2": "Collaborative platform for product lifecycle management and innovation",
        "tooltip_skill1_3": "PLM system for managing product data, processes, and quality",
        "tooltip_skill1_4": "Complementary tool suite for optimizing PDM processes",
        "tooltip_skill1_5": "Document and technical data management solution",
        "skill2_title": "Design & Simulation",
        "tooltip_skill2_1": "Advanced proficiency in CAD software for mechanical design",
        "tooltip_skill2_2": "Expertise in numerical simulation for structural analysis",
        "skill2_3": "Mechanical Design",
        "tooltip_skill2_3": "Design of complex parts, assemblies, and mechanical systems",
        "skill3_title": "Methodologies",
        "skill3_1": "Technical Project Management",
        "tooltip_skill3_1": "Managing PDM implementation projects from initial analysis to final deployment",
        "skill3_2": "Product Data Migration & Organization",
        "tooltip_skill3_2": "Expertise in structuring and migrating complex data",
        "skill3_3": "Training and Change Management",
        "tooltip_skill3_3": "Conducting training sessions adapted to different user levels",
        "skill3_4": "Industrial Process Analysis",
        "tooltip_skill3_4": "Optimization of business processes and technical workflows",
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
        "form_name": "Name",
        "form_subject": "Subject",
        "form_send": "Send",
        "form_success": "Your message has been sent successfully! I will get back to you as soon as possible.",
        "form_error": "An error occurred while sending the message. Please try again or contact me directly by email.",
        "footer_copyright": "&copy; 2025 Mohamed Omar Baouch. All rights reserved.",
        "ai_title": "Virtual Assistant",
        "ai_welcome": "Hello! I am Mohamed's virtual assistant. How can I help you explore his profile? Here are a few suggestions:",
        "ai_sugg_1": "Summarize his experience",
        "ai_sugg_2": "What are his PDM skills?",
        "ai_sugg_3": "Where did he study?"
    }
};
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
    if (!['fr', 'en'].includes(lang)) {
        console.warn(`Language '${lang}' not supported. Defaulting to 'fr'.`);
        lang = 'fr';
    }
    const langData = translations[lang];
    document.querySelectorAll('[data-translate-key]').forEach(el => {
        const key = el.dataset.translateKey;
        if (langData[key]) {
            el.innerHTML = langData[key];
        }
    });
    const downloadCvLink = document.querySelector('a[href$=".pdf"]');
    if (downloadCvLink && langData['cv_file']) {
        downloadCvLink.setAttribute('href', langData['cv_file']);
    }
    document.querySelector('html').lang = lang;
    document.title = langData['meta_title'];
    document.querySelector('meta[name="description"]').setAttribute('content', langData['meta_description']);
    document.getElementById('lang-fr').classList.toggle('active', lang === 'fr');
    document.getElementById('lang-en').classList.toggle('active', lang === 'en');
    const glitchElements = document.querySelectorAll('.glitch');
    if (lang === 'en') {
        glitchElements[0].dataset.text = "Mechanical Engineer";
        glitchElements[1].dataset.text = "Consultant";
    } else {
        glitchElements[0].dataset.text = "Ingénieur Mécanique";
        glitchElements[1].dataset.text = "PDM/PLM";
    }
    setCookie('preferred_language', lang, 365);
}
async function initializeLanguage() {
    const cookieLang = getCookie('preferred_language');
    if (cookieLang) {
        setLanguage(cookieLang);
        return;
    }
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'fr' || browserLang === 'en') {
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
document.getElementById('lang-fr').addEventListener('click', () => setLanguage('fr'));
document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));
//--------- LANGUAGE SWITCHER SCRIPT END ---------//

function createHeroGrid() {
    const heroGrid = document.getElementById('heroGrid');
    const width = window.innerWidth;
    const height = window.innerHeight;
    const cellSize = 50;
    const columns = Math.ceil(width / cellSize);
    const rows = Math.ceil(height / cellSize);
    heroGrid.innerHTML = '';
    for (let i = 0; i < rows * columns; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        heroGrid.appendChild(cell);
    }
    document.addEventListener('mousemove', (e) => {
        const cells = document.querySelectorAll('.grid-cell');
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
                cell.style.backgroundColor = `rgba(217, 122, 122, ${opacity})`;
                cell.style.transform = `translateZ(${20 - distance/10}px)`;
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
    const navContainer = document.getElementById('navContainer');
    const menuToggle = document.getElementById('menuToggle');
    const menu = document.getElementById('menu');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navContainer.classList.add('scrolled');
        } else {
            navContainer.classList.remove('scrolled');
        }
    });
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
    let current = 0;
    let target = 0;
    let ease = 0.075;
    if (!sceneWrapper) return;
    function smoothScroll() {
        current = parseFloat((current + (target - current) * ease).toFixed(2));
        const translateY = current * -0.5;
        const rotateX = current * 0.02;
        sceneWrapper.style.transform = `translateY(${translateY}px) rotateX(${rotateX}deg)`;
        requestAnimationFrame(smoothScroll);
    }
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        target = scrollTop * 0.1;
    });
    smoothScroll();
}
function initMagneticText() {
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
    let currentScroll = 0;
    let targetScroll = 0;
    window.addEventListener('scroll', () => {
        targetScroll = window.scrollY;
    });
    function distortionAnimation() {
        currentScroll = lerp(currentScroll, targetScroll, 0.1);
        const skewAmount = map(Math.abs(targetScroll - currentScroll), 0, 100, 0, 15);
        content.style.transform = `skewY(${skewAmount * 0.02}deg)`;
        requestAnimationFrame(distortionAnimation);
    }
    function lerp(start, end, factor) {
        return start + (end - start) * factor;
    }
    function map(value, in_min, in_max, out_min, out_max) {
        return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }
    distortionAnimation();
}
function initDynamicOverlay() {
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
    const scrollProgressBar = document.getElementById('scrollProgress');
    if (!scrollToTopButton || !scrollProgressBar) return;
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopButton.classList.add('visible');
        } else {
            scrollToTopButton.classList.remove('visible');
        }
        const scrollPosition = window.pageYOffset;
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollPosition / totalHeight) * 100;
        scrollProgressBar.style.width = scrollPercentage + '%';
    });
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
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
        } else {
            root.style.setProperty('--bg-color', 'var(--bg-primary)');
            root.style.setProperty('--text-color', 'var(--text-primary)');
            root.style.setProperty('--hover-color', 'var(--bg-tertiary)');
            root.style.setProperty('--secondary-color', 'var(--bg-secondary)');
            if (themeIcon) themeIcon.innerHTML = '☀️';
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
        }
    }
}
function initParallax() {
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
                initScrollToTop, initLazyLoading, enhanceAccessibility, initParticles,
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
