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

const getLocalizedValue = (value, lang) => {
    if (value === null || value === undefined) {
        return '';
    }
    if (typeof value === 'string') {
        return value;
    }
    if (typeof value === 'object' && !Array.isArray(value)) {
        return value[lang] ?? value.fr ?? Object.values(value)[0] ?? '';
    }
    return String(value);
};

let blogDataCache = null;
let currentLanguage = document.documentElement.lang || 'fr';

const updateHero = (heroData, lang = currentLanguage) => {
    if (!heroData) return;
    const heroTitle = document.querySelector('[data-hero-title]');
    const heroSubtitle = document.querySelector('[data-hero-subtitle]');
    const heroLink = document.querySelector('[data-hero-link]');
    const heroActions = document.querySelector('.hero-actions');

    const highlight = heroData.editorialHighlight;
    if (!highlight) return;

    if (heroTitle) {
        heroTitle.textContent = getLocalizedValue(highlight.title, lang);
    }
    if (heroSubtitle) {
        heroSubtitle.innerHTML = getLocalizedValue(highlight.heroSubtitle, lang) || getLocalizedValue(highlight.excerpt, lang) || '';
    }
    if (heroLink) {
        if (highlight.url) {
            heroLink.href = highlight.url;
        }
        const defaultCta = lang === 'fr' ? "Lire l'article" : 'Read the article';
        heroLink.textContent = getLocalizedValue(highlight.ctaLabel, lang) || defaultCta;
        heroLink.classList.remove('is-hidden');
    }
    if (heroActions) {
        heroActions.classList.toggle('is-hidden', !highlight.url);
    }
    window.formatBlogDates?.(lang);
};

const updateCards = (posts, lang = currentLanguage) => {
    if (!Array.isArray(posts)) return;
    const cards = document.querySelectorAll('.post-card');
    cards.forEach((card) => {
        const slug = card.dataset.postSlug;
        if (!slug) return;
        const postData = posts.find((post) => post.slug === slug);
        if (!postData) return;
        const titleLink = card.querySelector('.post-card__title a');
        if (titleLink) {
            titleLink.textContent = getLocalizedValue(postData.title, lang);
            if (postData.url) {
                titleLink.href = postData.url;
            }
        }
        const excerptEl = card.querySelector('.post-card__excerpt');
        if (excerptEl) {
            excerptEl.textContent = getLocalizedValue(postData.excerpt, lang) || '';
        }
        const ctaEl = card.querySelector('.post-card__cta');
        if (ctaEl) {
            const defaultCta = lang === 'fr' ? "Lire l'article" : 'Read the article';
            ctaEl.textContent = getLocalizedValue(postData.ctaLabel, lang) || defaultCta;
            if (postData.url) {
                ctaEl.href = postData.url;
            }
        }
        const timeEl = card.querySelector('time');
        if (timeEl && postData.dateIso) {
            timeEl.setAttribute('datetime', postData.dateIso);
            timeEl.setAttribute('data-date-iso', postData.dateIso);
        }
    });
    window.formatBlogDates?.(lang);
};

const updateBlogTexts = (lang = currentLanguage) => {
    currentLanguage = lang;
    if (!blogDataCache) return;
    updateHero(blogDataCache.hero, lang);
    updateCards(blogDataCache.editorials, lang);
};

const enhanceArticleTables = () => {
    const articleRoot = document.querySelector('[data-article-root]');
    if (!articleRoot) return;

    const tables = Array.from(articleRoot.querySelectorAll('table'));
    if (!tables.length) return;

    const wrappers = new Set();

    tables.forEach((table) => {
        const existingViewport = table.closest('.table-scroll__viewport');
        if (existingViewport) {
            const scroll = existingViewport.parentElement;
            if (scroll) {
                wrappers.add(scroll);
            }
            return;
        }

        const scroll = document.createElement('div');
        scroll.className = 'table-scroll';
        const viewport = document.createElement('div');
        viewport.className = 'table-scroll__viewport';

        table.parentNode?.insertBefore(scroll, table);
        scroll.appendChild(viewport);
        viewport.appendChild(table);

        wrappers.add(scroll);
    });

    const updateState = (wrapper, viewport) => {
        const maxScrollLeft = viewport.scrollWidth - viewport.clientWidth;
        const tolerance = 2;
        const isScrollable = maxScrollLeft > tolerance;
        const atStart = !isScrollable || viewport.scrollLeft <= tolerance;
        const atEnd = !isScrollable || viewport.scrollLeft >= maxScrollLeft - tolerance;

        wrapper.classList.toggle('is-scrollable', isScrollable);
        wrapper.classList.toggle('is-at-start', atStart);
        wrapper.classList.toggle('is-at-end', atEnd);
    };

    wrappers.forEach((wrapper) => {
        const viewport = wrapper.querySelector('.table-scroll__viewport');
        if (!viewport) return;

        const scheduleUpdate = () => {
            requestAnimationFrame(() => updateState(wrapper, viewport));
        };

        scheduleUpdate();

        if (wrapper.dataset.enhanced === 'true') {
            return;
        }

        viewport.addEventListener('scroll', scheduleUpdate, { passive: true });

        if (typeof ResizeObserver !== 'undefined') {
            const observer = new ResizeObserver(scheduleUpdate);
            observer.observe(viewport);
            const table = viewport.querySelector('table');
            if (table) {
                observer.observe(table);
            }
        } else {
            window.addEventListener('resize', scheduleUpdate);
        }

        wrapper.dataset.enhanced = 'true';
    });
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
        updateHero(blogData?.hero, currentLanguage);
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
    blogDataCache = parseBlogData();
    if (blogDataCache) {
        initFilters(blogDataCache);
        updateBlogTexts(currentLanguage);
    }
    enhanceArticleTables();
};

if (document.readyState !== 'loading') {
    initBlogPage();
} else {
    document.addEventListener('DOMContentLoaded', initBlogPage);
}

document.addEventListener('blog:languagechange', (event) => {
    const lang = event.detail?.lang || 'fr';
    updateBlogTexts(lang);
});
