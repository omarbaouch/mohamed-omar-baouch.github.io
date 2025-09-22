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

const updateHero = (heroData) => {
    if (!heroData) return;
    const heroTitle = document.querySelector('[data-hero-title]');
    const heroSubtitle = document.querySelector('[data-hero-subtitle]');
    const heroLink = document.querySelector('[data-hero-link]');
    const heroActions = document.querySelector('.hero-actions');

    const highlight = heroData.editorialHighlight;
    if (!highlight) return;

    if (heroTitle) {
        heroTitle.textContent = highlight.title;
    }
    if (heroSubtitle) {
        heroSubtitle.textContent = highlight.heroSubtitle || highlight.excerpt || '';
    }
    if (heroLink) {
        if (highlight.url) {
            heroLink.href = highlight.url;
        }
        heroLink.textContent = highlight.ctaLabel || "Lire l'article";
        heroLink.classList.remove('is-hidden');
    }
    if (heroActions) {
        heroActions.classList.toggle('is-hidden', !highlight.url);
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
        updateHero(blogData?.hero);
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

const initBlogPage = () => {
    const blogData = parseBlogData();
    initFilters(blogData);
    updateHero(blogData?.hero);
};

if (document.readyState !== 'loading') {
    initBlogPage();
} else {
    document.addEventListener('DOMContentLoaded', initBlogPage);
}
