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
let blogPosts = [];
let currentFilter = 'all';
let currentQuery = '';

const setHero = (heroData, lang = currentLanguage) => {
    if (!heroData) return;
    const { radarHighlight, editorialHighlight, stats, tagline, title, subtitle } = heroData;
    const primaryHighlight = radarHighlight || editorialHighlight || (blogDataCache?.editorials?.[0]);
    const heroTagline = document.querySelector('[data-hero-tagline]');
    const heroTitle = document.querySelector('[data-hero-title]');
    const heroSubtitle = document.querySelector('[data-hero-subtitle]');
    const heroLink = document.querySelector('[data-hero-link]');
    const heroSecondary = document.querySelector('[data-hero-secondary]');
    const statRadars = document.querySelector('[data-stat-radars]');
    const statEditorials = document.querySelector('[data-stat-editorials]');
    const statUpdated = document.querySelector('[data-stat-updated]');

    if (heroTagline && tagline) {
        heroTagline.textContent = getLocalizedValue(tagline, lang);
    }

    if (heroTitle) {
        heroTitle.textContent = getLocalizedValue(primaryHighlight?.title, lang) || getLocalizedValue(title, lang) || 'Blog PDM/PLM';
    }

    if (heroSubtitle) {
        const subtitleSource = primaryHighlight?.heroSubtitle || primaryHighlight?.excerpt || subtitle;
        heroSubtitle.textContent = getLocalizedValue(subtitleSource, lang);
    }

    if (heroLink && primaryHighlight?.url) {
        heroLink.href = primaryHighlight.url;
        const defaultHeroCta = lang === 'fr' ? "Lire l'article" : 'Read the article';
        heroLink.textContent = getLocalizedValue(primaryHighlight.ctaLabel, lang) || defaultHeroCta;
    }

    if (heroSecondary && editorialHighlight?.url) {
        heroSecondary.href = editorialHighlight.url;
        const defaultCta = lang === 'fr' ? 'Lire le guide' : 'Read the guide';
        heroSecondary.textContent = getLocalizedValue(editorialHighlight.ctaLabel, lang) || defaultCta;
    }

    if (statRadars) {
        statRadars.textContent = stats?.radarCount ?? blogDataCache?.radars?.length ?? '—';
    }
    if (statEditorials) {
        statEditorials.textContent = stats?.editorialCount ?? blogDataCache?.editorials?.length ?? '—';
    }
    if (statUpdated) {
        const lastUpdate = primaryHighlight?.shortDate || primaryHighlight?.displayDate || stats?.lastUpdated || stats?.lastRadar;
        statUpdated.textContent = lastUpdate || '—';
    }
    window.formatBlogDates?.(lang);
};

const buildPostCard = (post, lang = currentLanguage) => {
    const card = document.createElement('article');
    card.className = 'post-card';
    card.dataset.type = post.type || 'radar';
    card.dataset.postSlug = post.slug || '';

    if (post.image) {
        const visual = document.createElement('div');
        visual.className = 'post-card__image';
        visual.style.backgroundImage = `url(${post.image})`;
        const visualLabel = document.createElement('span');
        visualLabel.className = 'post-card__image-label';
        visualLabel.textContent = post.type === 'editorial' ? 'Article illustré' : 'Veille';
        visual.appendChild(visualLabel);
        card.appendChild(visual);
    }

    const meta = document.createElement('div');
    meta.className = 'post-card__meta';
    const badge = document.createElement('span');
    badge.className = `badge badge-${post.type || 'radar'}`;
    badge.textContent = post.type === 'editorial' ? 'Article de fond' : 'Veille';
    meta.appendChild(badge);

    if (post.dateIso) {
        const timeEl = document.createElement('time');
        timeEl.setAttribute('datetime', post.dateIso);
        timeEl.setAttribute('data-date-iso', post.dateIso);
        timeEl.textContent = post.displayDate || post.shortDate || post.dateIso;
        meta.appendChild(timeEl);
    }

    if (post.itemsCount) {
        const count = document.createElement('span');
        count.textContent = `${post.itemsCount} lien${post.itemsCount > 1 ? 's' : ''}`;
        meta.appendChild(count);
    }

    const title = document.createElement('h3');
    title.className = 'post-card__title';
    const link = document.createElement('a');
    link.href = post.url || '#';
    link.textContent = getLocalizedValue(post.title, lang) || 'Article';
    title.appendChild(link);

    const excerpt = document.createElement('p');
    excerpt.className = 'post-card__excerpt';
    excerpt.textContent = getLocalizedValue(post.excerpt, lang) || '';

    const cta = document.createElement('a');
    cta.className = 'post-card__cta';
    cta.href = post.url || '#';
    const defaultCta = post.type === 'editorial' ? "Lire l'article" : 'Consulter le radar';
    cta.textContent = getLocalizedValue(post.ctaLabel, lang) || defaultCta;

    card.append(meta, title, excerpt, cta);
    return card;
};

const renderPostGrid = (lang = currentLanguage) => {
    const container = document.querySelector('[data-post-grid]');
    if (!container) return;
    container.innerHTML = '';
    const normalizedQuery = currentQuery.trim().toLowerCase();

    const filtered = blogPosts.filter((post) => {
        const matchesFilter = currentFilter === 'all' || post.type === currentFilter;
        if (!matchesFilter) return false;
        if (!normalizedQuery) return true;
        const haystack = `${getLocalizedValue(post.title, lang)} ${getLocalizedValue(post.excerpt, lang)}`.toLowerCase();
        return haystack.includes(normalizedQuery);
    });

    if (!filtered.length) {
        const empty = document.createElement('p');
        empty.className = 'muted';
        empty.textContent = 'Aucun article ne correspond à cette recherche pour le moment.';
        container.appendChild(empty);
        return;
    }

    filtered
        .sort((a, b) => new Date(b.dateIso || b.displayDate) - new Date(a.dateIso || a.displayDate))
        .forEach((post) => container.appendChild(buildPostCard(post, lang)));

    window.formatBlogDates?.(lang);
};

const setFeatured = (heroData, lang = currentLanguage) => {
    const radarCard = document.querySelector('[data-featured-radar]');
    const editorialCard = document.querySelector('[data-featured-editorial]');
    const radar = heroData?.radarHighlight || blogDataCache?.radars?.[0];
    const editorial = heroData?.editorialHighlight || blogDataCache?.editorials?.[0];

    if (radarCard) {
        radarCard.style.display = radar ? '' : 'none';
    }

    if (radar && radarCard) {
        const title = radarCard.querySelector('[data-featured-radar-title]');
        const excerpt = radarCard.querySelector('[data-featured-radar-excerpt]');
        const link = radarCard.querySelector('[data-featured-radar-link]');
        const date = radarCard.querySelector('[data-featured-radar-date]');
        if (title) title.textContent = getLocalizedValue(radar.title, lang);
        if (excerpt) excerpt.textContent = getLocalizedValue(radar.heroSubtitle, lang) || getLocalizedValue(radar.excerpt, lang);
        if (link) link.href = radar.url || '#';
        if (date && radar.dateIso) {
            date.setAttribute('datetime', radar.dateIso);
            date.setAttribute('data-date-iso', radar.dateIso);
            date.textContent = radar.displayDate || radar.shortDate || radar.dateIso;
        }
    }

    if (editorial && editorialCard) {
        const title = editorialCard.querySelector('[data-featured-editorial-title]');
        const excerpt = editorialCard.querySelector('[data-featured-editorial-excerpt]');
        const link = editorialCard.querySelector('[data-featured-editorial-link]');
        const date = editorialCard.querySelector('[data-featured-editorial-date]');
        if (title) title.textContent = getLocalizedValue(editorial.title, lang);
        if (excerpt) excerpt.textContent = getLocalizedValue(editorial.heroSubtitle, lang) || getLocalizedValue(editorial.excerpt, lang);
        if (link) link.href = editorial.url || '#';
        if (date && editorial.dateIso) {
            date.setAttribute('datetime', editorial.dateIso);
            date.setAttribute('data-date-iso', editorial.dateIso);
            date.textContent = editorial.displayDate || editorial.shortDate || editorial.dateIso;
        }
    }
    window.formatBlogDates?.(lang);
};

const renderTimeline = (entries, lang = currentLanguage) => {
    const timeline = document.querySelector('[data-timeline]');
    if (!timeline) return;
    timeline.innerHTML = '';
    const source = entries?.length ? entries : blogDataCache?.editorials || [];
    const recent = [...source].sort((a, b) => new Date(b.dateIso) - new Date(a.dateIso)).slice(0, 8);
    recent.forEach((entry) => {
        const item = document.createElement('li');
        item.className = 'timeline-item';
        const dot = document.createElement('span');
        dot.className = 'timeline-dot';
        const content = document.createElement('div');
        content.className = 'timeline-content';
        const timeEl = document.createElement('time');
        timeEl.setAttribute('datetime', entry.dateIso);
        timeEl.setAttribute('data-date-iso', entry.dateIso);
        timeEl.textContent = entry.displayDate || entry.shortDate || entry.dateIso;
        const link = document.createElement('a');
        link.href = entry.url || '#';
        link.textContent = getLocalizedValue(entry.title, lang);
        content.append(timeEl, link);
        if (entry.itemsCount) {
            const meta = document.createElement('span');
            meta.className = 'timeline-meta';
            meta.textContent = `${entry.itemsCount} lien${entry.itemsCount > 1 ? 's' : ''}`;
            content.appendChild(meta);
        }
        item.append(dot, content);
        timeline.appendChild(item);
    });
    window.formatBlogDates?.(lang);
};

const updateBlogTexts = (lang = currentLanguage) => {
    currentLanguage = lang;
    if (!blogDataCache) return;
    setHero(blogDataCache.hero, lang);
    setFeatured(blogDataCache.hero, lang);
    renderPostGrid(lang);
    renderTimeline(blogPosts, lang);
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

const applyFilter = (target, buttons) => {
    buttons.forEach((button) => {
        const isActive = button.dataset.filter === target;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
    });
};

const initFilters = () => {
    const filterGroup = document.querySelector('[data-filter-group]');
    if (!filterGroup) return;

    const buttons = Array.from(filterGroup.querySelectorAll('[data-filter]'));
    if (!buttons.length) return;

    const setFilter = (target) => {
        currentFilter = target;
        applyFilter(target, buttons);
        renderPostGrid(currentLanguage);
    };

    filterGroup.addEventListener('click', (event) => {
        const button = event.target.closest('[data-filter]');
        if (!button) return;
        const target = button.dataset.filter || 'all';
        if (target === currentFilter) return;
        setFilter(target);
    });

    setFilter('all');
};

const initSearch = () => {
    const searchInput = document.getElementById('blogSearch');
    if (!searchInput) return;

    searchInput.addEventListener('input', (event) => {
        currentQuery = event.target.value || '';
        renderPostGrid(currentLanguage);
    });
};

const initBlogPage = () => {
    blogDataCache = parseBlogData();
    if (blogDataCache) {
        blogPosts = [...(blogDataCache.radars || []), ...(blogDataCache.editorials || [])];
        setHero(blogDataCache.hero, currentLanguage);
        setFeatured(blogDataCache.hero, currentLanguage);
        renderTimeline(blogPosts, currentLanguage);
        renderPostGrid(currentLanguage);
        initFilters();
        initSearch();
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
