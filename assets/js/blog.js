const parseBlogData = () => {
    const dataElement = document.getElementById('blog-data');
    if (!dataElement) return null;
    try {
        return JSON.parse(dataElement.textContent.trim());
    } catch (error) {
        console.warn('[blog] Impossible de lire les données JSON :', error);
        return null;
    }
};

const updateHero = (heroData, filter) => {
    if (!heroData) return;
    const heroTitle = document.querySelector('[data-hero-title]');
    const heroSubtitle = document.querySelector('[data-hero-subtitle]');
    const heroLink = document.querySelector('[data-hero-link]');
    const heroSecondary = document.querySelector('[data-hero-secondary]');

    const preferredType = filter === 'editorial' ? 'editorial' : 'radar';
    const highlight = preferredType === 'editorial'
        ? heroData.editorialHighlight || heroData.radarHighlight
        : heroData.radarHighlight || heroData.editorialHighlight;

    if (!highlight) return;

    if (heroTitle) {
        heroTitle.textContent = highlight.title;
    }
    if (heroSubtitle) {
        heroSubtitle.textContent = highlight.heroSubtitle || highlight.excerpt || '';
    }
    if (heroLink) {
        heroLink.href = highlight.url;
        heroLink.textContent = highlight.type === 'editorial'
            ? "Lire l'article"
            : (highlight.displayDate ? `Consulter le radar du ${highlight.displayDate}` : 'Consulter le radar');
    }

    if (heroSecondary) {
        const alternate = highlight.type === 'editorial'
            ? heroData.radarHighlight
            : heroData.editorialHighlight;
        if (alternate) {
            heroSecondary.href = alternate.url;
            heroSecondary.textContent = alternate.type === 'editorial'
                ? "Lire l'article de fond"
                : 'Voir le radar du jour';
            heroSecondary.classList.remove('is-hidden');
        } else {
            heroSecondary.classList.add('is-hidden');
        }
    }
};

const applyFilter = (target, sections, buttons) => {
    buttons.forEach((button) => {
        const isActive = button.dataset.filter === target;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
    });

    sections.forEach((section) => {
        const sectionType = section.dataset.section;
        const shouldShow = target === 'all' || sectionType === target;
        section.classList.toggle('is-hidden', !shouldShow);
    });
};

const initFilters = (blogData) => {
    const filterGroup = document.querySelector('[data-filter-group]');
    if (!filterGroup) return;

    const buttons = Array.from(filterGroup.querySelectorAll('[data-filter]'));
    const sections = Array.from(document.querySelectorAll('[data-section]'));
    if (!buttons.length || !sections.length) return;

    let currentFilter = 'all';

    const setFilter = (target) => {
        currentFilter = target;
        applyFilter(target, sections, buttons);
        const heroFilter = target === 'editorial' ? 'editorial' : 'radar';
        updateHero(blogData?.hero, heroFilter);
    };

    filterGroup.addEventListener('click', (event) => {
        const button = event.target.closest('[data-filter]');
        if (!button) return;
        const target = button.dataset.filter || 'all';
        if (target === currentFilter) return;
        setFilter(target);
    });

    // Initialise avec le filtre par défaut
    setFilter('all');
};

const initTimeline = () => {
    const items = document.querySelectorAll('.timeline-item');
    if (!items.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px'
    });

    items.forEach((item) => observer.observe(item));
};

const initBlogPage = () => {
    const blogData = parseBlogData();
    initFilters(blogData);
    updateHero(blogData?.hero, blogData?.hero?.radarHighlight ? 'radar' : 'editorial');
    initTimeline();
};

if (document.readyState !== 'loading') {
    initBlogPage();
} else {
    document.addEventListener('DOMContentLoaded', initBlogPage);
}
