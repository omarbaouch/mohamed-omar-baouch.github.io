// omarbaouch/mohamed-omar-baouch.github.io/scripts/generate-blog.mjs
import Parser from 'rss-parser';
import fs from 'fs-extra';
import path from 'path';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
dayjs.extend(utc);

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const ROOT = path.resolve(__dirname, '..');
const BLOG_DIR = path.join(ROOT, 'blog');
const SOURCES_FILE = path.join(ROOT, 'sources.json');
// MODIFIÉ : Utilise le nouveau modèle de blog
const BLOG_TEMPLATE_PATH = path.join(ROOT, 'blog-template.html'); 
const HISTORY_FILE = path.join(ROOT, 'history.json');
const CACHE_DIR = path.join(ROOT, '.cache');
const META_DIR = path.join(ROOT, 'blog_meta');

const LOOKBACK_DAYS = 1;
const FALLBACK_DAYS = 3;
const MAX_ITEMS_PER_POST = 10;

const args = process.argv.slice(2);
const ITEMS_ONLY = args.includes('--items-only');

const FRENCH_LONG_DATE = new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
});

const FRENCH_SHORT_DATE = new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
});

const FRENCH_MONTH_YEAR = new Intl.DateTimeFormat('fr-FR', {
    month: 'long',
    year: 'numeric'
});

const pluralize = (value, singular, plural = `${singular}s`) => value > 1 ? plural : singular;

const formatDisplayDate = (isoString) => {
    if (!isoString) return '';
    const parsed = new Date(isoString);
    if (Number.isNaN(parsed.getTime())) return '';
    return FRENCH_LONG_DATE.format(parsed);
};

const formatShortDisplayDate = (isoString) => {
    if (!isoString) return '';
    const parsed = new Date(isoString);
    if (Number.isNaN(parsed.getTime())) return '';
    return FRENCH_SHORT_DATE.format(parsed);
};

const formatMonthYear = (isoString) => {
    if (!isoString) return '';
    const parsed = new Date(isoString);
    if (Number.isNaN(parsed.getTime())) return '';
    return FRENCH_MONTH_YEAR.format(parsed);
};

const slugToISODate = (slug) => {
    const match = slug.match(/radar-(\d{4}-\d{2}-\d{2})/);
    if (!match) return null;
    const [year, month, day] = match[1].split('-').map(Number);
    if (!year || !month || !day) return null;
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.toISOString();
};

const serializeJSON = (data) => {
    return JSON.stringify(data, null, 2)
        .replace(/</g, '\\u003C')
        .replace(/>/g, '\\u003E')
        .replace(/&/g, '\\u0026');
};

const cleanupText = (value = '') => value.replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

// --- FONCTION TEMPLATE MISE À JOUR ---
// Utilise blog-template.html
async function getBlogTemplate(options = {}) {
    const { title, description } = options;
    // S'assurer que le fichier modèle existe
    if (!await fs.pathExists(BLOG_TEMPLATE_PATH)) {
        throw new Error(`Le fichier modèle de blog est introuvable à l'emplacement : ${BLOG_TEMPLATE_PATH}`);
    }
    let template = await fs.readFile(BLOG_TEMPLATE_PATH, 'utf-8');

    // Mettre à jour le titre et la description pour la page du blog
    if (title) {
        template = template.replace(/<title>.*?<\/title>/, `<title>${escapeHTML(title)}</title>`);
    }
    if (description) {
        template = template.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${escapeHTML(description)}">`);
    }

    return template;
}

const toISODate = (dateStr) => {
    if (!dateStr) return null;
    const parsed = new Date(dateStr);
    return isNaN(parsed) ? null : parsed.toISOString();
};

// --- FONCTION DE GÉNÉRATION DE PAGE MISE À JOUR ---
async function generateHTMLPage({
    title,
    description,
    navigation = '',
    hero = '',
    summary = '',
    body = '',
    sidebar = '',
    footer = ''
}) {
    let template = await getBlogTemplate({ title, description });
    const replacements = {
        '{{BLOG_NAVIGATION}}': navigation,
        '{{BLOG_HERO}}': hero,
        '{{BLOG_SUMMARY}}': summary,
        '{{BLOG_CONTENT}}': body,
        '{{BLOG_SIDEBAR}}': sidebar,
        '{{BLOG_FOOTER}}': footer
    };

    for (const [token, value] of Object.entries(replacements)) {
        template = template.replace(token, value || '');
    }

    return template;
}

function escapeHTML(str) {
  return str ? str.replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','\'':'&#39;','"':'&quot;'}[c])) : '';
}

async function fetchItems(processedLinks) {
    const sources = await fs.readJson(SOURCES_FILE);
    let allItems = [];
    const parser = new Parser({
        timeout: 15000,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
        }
    });
    for (const source of sources) {
        try {
            const feed = await parser.parseURL(source.url);
            feed.items.forEach(item => {
                const isoDate = item.isoDate || toISODate(item.pubDate) || toISODate(item.date) || new Date().toISOString();
                if (!processedLinks.has(item.link)) {
                    allItems.push({
                        source: source.name,
                        title: item.title,
                        link: item.link,
                        isoDate
                    });
                }
            });
        } catch (error) {
            console.warn(`Failed to fetch feed: ${source.name} - ${error.message}`);
        }
    }
    const now = dayjs.utc();
    let cutoff = now.subtract(LOOKBACK_DAYS, 'day');
    let recentItems = allItems.filter(item => dayjs(item.isoDate).isAfter(cutoff));
    if (recentItems.length === 0) {
        cutoff = now.subtract(FALLBACK_DAYS, 'day');
        recentItems = allItems.filter(item => dayjs(item.isoDate).isAfter(cutoff));
    }
    let noNews = false;
    if (recentItems.length === 0) {
        noNews = true;
    } else {
        recentItems.sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate));
    }
    const itemsForPost = recentItems.slice(0, MAX_ITEMS_PER_POST);
    return { itemsForPost, noNews };
}

const highlightFromEntry = (entry) => {
    if (!entry) return null;
    return {
        title: entry.title,
        url: entry.url,
        dateIso: entry.dateIso,
        displayDate: entry.displayDate,
        shortDate: entry.shortDate ?? null,
        excerpt: entry.excerpt ?? '',
        heroSubtitle: entry.heroSubtitle ?? entry.excerpt ?? '',
        itemsCount: entry.itemsCount ?? null,
        type: entry.type
    };
};

async function readRadarMetadata(slug) {
    const indexPath = path.join(BLOG_DIR, slug, 'index.html');
    if (!await fs.pathExists(indexPath)) return null;
    const html = await fs.readFile(indexPath, 'utf-8');
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    const heroSubtitleMatch = html.match(/<p class="hero-subtitle">([^<]+)<\/p>/i) || html.match(/<p class="meta">([^<]+)<\/p>/i);
    const newLayoutCount = (html.match(/data-entry-type="radar-item"/g) || []).length;
    const legacyCount = (html.match(/class="post-item"/g) || []).length;
    const itemsCount = newLayoutCount || legacyCount || null;
    const dateIso = slugToISODate(slug);
    const displayDate = formatDisplayDate(dateIso);
    const shortDate = formatShortDisplayDate(dateIso);
    const title = cleanupText(titleMatch ? titleMatch[1] : `Radar PDM/PLM – ${slug.replace('radar-', '')}`);
    let excerpt = displayDate ? `Veille du ${displayDate}.` : 'Veille quotidienne PDM/PLM.';
    if (itemsCount) {
        excerpt += ` ${itemsCount} ${pluralize(itemsCount, 'signal')} sélectionné${itemsCount > 1 ? 's' : ''}.`;
    }
    const heroSubtitle = cleanupText(heroSubtitleMatch ? heroSubtitleMatch[1] : excerpt) || excerpt;
    return {
        slug,
        url: `/blog/${slug}/`,
        title,
        dateIso,
        displayDate,
        shortDate,
        excerpt: cleanupText(excerpt),
        heroSubtitle,
        itemsCount,
        type: 'radar'
    };
}

async function readEditorialMetadata(slug) {
    const indexPath = path.join(BLOG_DIR, slug, 'index.html');
    if (!await fs.pathExists(indexPath)) return null;
    const html = await fs.readFile(indexPath, 'utf-8');
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    const descriptionMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);
    const dateMatch = html.match(/(\d{2}\/\d{2}\/\d{4})/);
    let dateIso = null;
    if (dateMatch) {
        const [day, month, year] = dateMatch[1].split('/').map(Number);
        if (year && month && day) {
            dateIso = new Date(Date.UTC(year, month - 1, day)).toISOString();
        }
    }
    const displayDate = formatDisplayDate(dateIso);
    const shortDate = formatShortDisplayDate(dateIso);
    const title = cleanupText(titleMatch ? titleMatch[1] : slug.replace(/-/g, ' '));
    const excerpt = cleanupText(descriptionMatch ? descriptionMatch[1] : 'Analyse éditoriale PDM/PLM.');
    const heroSubtitle = displayDate ? cleanupText(`Publié le ${displayDate}. ${excerpt}`) : excerpt;
    return {
        slug,
        url: `/blog/${slug}/`,
        title,
        dateIso,
        displayDate,
        shortDate,
        excerpt,
        heroSubtitle,
        type: 'editorial'
    };
}

function renderArticleNavigation(links = []) {
    if (!links?.length) return '';
    const items = links
        .filter(link => link?.href && link?.label)
        .map((link) => {
            const classes = ['back-link'];
            if (link.variant === 'ghost') classes.push('back-link--ghost');
            const attrs = [`href="${escapeHTML(link.href)}"`];
            if (link.external) {
                attrs.push('target="_blank"', 'rel="noopener noreferrer"');
            }
            return `<a class="${classes.join(' ')}" ${attrs.join(' ')}>${escapeHTML(link.label)}</a>`;
        });
    if (!items.length) return '';
    return `
<nav class="article-breadcrumbs" aria-label="Navigation secondaire">
  ${items.join('\n  ')}
</nav>
`.trim();
}

function renderHeroBadges(badges = []) {
    if (!badges?.length) return '';
    const markup = badges
        .filter(badge => badge?.label)
        .map((badge) => {
            const classes = ['badge'];
            if (badge.variant) {
                classes.push(`badge-${badge.variant}`);
            }
            return `<span class="${classes.join(' ')}">${escapeHTML(badge.label)}</span>`;
        });
    if (!markup.length) return '';
    return `<div class="hero-badges">${markup.join('\n      ')}</div>`;
}

function renderHeroButton(button, defaultVariant = 'primary') {
    if (!button?.href || !button?.label) return '';
    const classes = ['hero-btn'];
    const variant = button.variant || defaultVariant;
    if (variant === 'ghost') {
        classes.push('hero-btn--ghost');
    }
    const attrs = [`href="${escapeHTML(button.href)}"`];
    if (button.external) {
        attrs.push('target="_blank"', 'rel="noopener noreferrer"');
    }
    const icon = button.icon ? `<span aria-hidden="true">${escapeHTML(button.icon)}</span>` : '';
    return `<a class="${classes.join(' ')}" ${attrs.join(' ')}>${icon}${escapeHTML(button.label)}</a>`;
}

function renderHeroActions(primary, secondary) {
    const buttons = [];
    const primaryMarkup = renderHeroButton(primary, 'primary');
    if (primaryMarkup) {
        buttons.push(primaryMarkup);
    }
    const secondaryMarkup = renderHeroButton(secondary, 'ghost');
    if (secondaryMarkup) {
        buttons.push(secondaryMarkup);
    }
    if (!buttons.length) return '';
    return `<div class="hero-actions">${buttons.join('\n      ')}</div>`;
}

function renderHeroStats(stats = []) {
    if (!stats?.length) return '';
    const items = stats
        .filter(stat => stat?.value !== undefined && stat?.label)
        .map((stat) => `
    <div class="hero-stat">
      <span class="hero-stat-value">${escapeHTML(String(stat.value))}</span>
      <span class="hero-stat-label">${escapeHTML(stat.label)}</span>
    </div>`)
        .join('');
    if (!items) return '';
    return `<div class="hero-stats">${items}\n  </div>`;
}

function renderHeroMedia(media) {
    if (!media?.src) return '';
    const attrs = [`src="${escapeHTML(media.src)}"`];
    attrs.push(`alt="${escapeHTML(media.alt || '')}"`);
    const caption = media.caption ? `<figcaption>${escapeHTML(media.caption)}</figcaption>` : '';
    return `
<figure class="hero-media">
  <img ${attrs.join(' ')}>
  ${caption}
</figure>
`.trim();
}

function renderPostHero({ eyebrow, title, subtitle, badges = [], primaryCta, secondaryCta, stats = [], media }) {
    const badgesMarkup = renderHeroBadges(badges);
    const actionsMarkup = renderHeroActions(primaryCta, secondaryCta);
    const statsMarkup = renderHeroStats(stats);
    const mediaMarkup = renderHeroMedia(media);
    return `
<header class="blog-hero post-hero" data-component="hero">
  <div class="hero-intro">
    ${badgesMarkup}
    ${eyebrow ? `<span class="hero-eyebrow">${escapeHTML(eyebrow)}</span>` : ''}
    <h1 class="hero-title">${escapeHTML(title)}</h1>
    ${subtitle ? `<p class="hero-subtitle">${escapeHTML(subtitle)}</p>` : ''}
    ${actionsMarkup}
  </div>
  ${statsMarkup}
  ${mediaMarkup}
</header>
`.trim();
}

function renderSummaryNavigation({ title, items = [], id }) {
    if (!items?.length) return '';
    const list = items
        .filter(item => item?.href && item?.label)
        .map((item, index) => {
            const meta = item.meta ? `<span class="summary-meta">${escapeHTML(item.meta)}</span>` : '';
            return `
    <li>
      <a href="${escapeHTML(item.href)}">
        <span class="summary-index">${String(index + 1).padStart(2, '0')}</span>
        <span class="summary-label">${escapeHTML(item.label)}</span>
        ${meta}
      </a>
    </li>`;
        })
        .join('');
    if (!list) return '';
    const navId = id ? ` id="${escapeHTML(id)}"` : '';
    return `
<nav class="blog-section article-summary"${navId} aria-label="${escapeHTML(title || 'Sommaire')}">
  <h2 class="summary-title">${escapeHTML(title || 'Sommaire')}</h2>
  <ol class="summary-list">${list}\n  </ol>
</nav>
`.trim();
}

function renderRadarItemsSection({ title, subtitle, items = [], renderItem }) {
    if (!items?.length || typeof renderItem !== 'function') return '';
    const cards = items
        .map((item, index) => renderItem(item, index))
        .filter(Boolean)
        .join('\n');
    return `
<section class="blog-section" data-component="radar-list">
  <div class="section-header">
    <div>
      <h2>${escapeHTML(title)}</h2>
      ${subtitle ? `<p class="section-subtitle">${escapeHTML(subtitle)}</p>` : ''}
    </div>
    <span class="badge badge-radar">Radar</span>
  </div>
  <div class="card-grid radar-grid">${cards}</div>
</section>
`.trim();
}

function renderRadarEmptyState({ message }) {
    return `
<section class="blog-section" data-component="radar-empty">
  <div class="empty-state">
    <p>${escapeHTML(message)}</p>
  </div>
</section>
`.trim();
}

function renderArticleFooterCta() {
    return `
<section class="blog-section article-cta" data-component="cta">
  <div class="cta-card">
    <h2>Aller plus loin avec votre veille PLM</h2>
    <p>Envie d'automatiser votre radar ou de structurer votre démarche de veille ? Parlons-en.</p>
    <a class="hero-btn" href="/#contact">Planifier un échange</a>
  </div>
</section>
`.trim();
}

function renderHeroSection(hero) {
    if (!hero) return '';
    const primaryTarget = hero.radarHighlight?.url || '/blog/';
    const primaryLabel = hero.radarHighlight?.displayDate ? `Consulter le radar du ${hero.radarHighlight.displayDate}` : 'Explorer les radars';
    const secondaryHiddenClass = hero.editorialHighlight ? '' : ' is-hidden';
    const secondaryTarget = hero.editorialHighlight?.url || '#';
    const secondaryLabel = hero.editorialHighlight ? "Lire l'article de fond" : 'Articles de fond';
    const lastUpdate = hero.stats?.lastRadar ? hero.stats.lastRadar : null;
    return `
<section class="blog-hero" data-hero>
  <div class="hero-intro">
    <span class="hero-eyebrow">${escapeHTML(hero.tagline || 'Veille & analyses PDM/PLM')}</span>
    <h1 class="hero-title" data-hero-title>${escapeHTML(hero.title)}</h1>
    <p class="hero-subtitle" data-hero-subtitle>${escapeHTML(hero.subtitle)}</p>
    <div class="hero-actions">
      <a class="hero-btn" data-hero-link href="${escapeHTML(primaryTarget)}">${escapeHTML(primaryLabel)}</a>
      <a class="hero-btn hero-btn--ghost${secondaryHiddenClass}" data-hero-secondary href="${escapeHTML(secondaryTarget)}">${escapeHTML(secondaryLabel)}</a>
    </div>
  </div>
  <div class="hero-stats">
    <div class="hero-stat">
      <span class="hero-stat-value">${hero.stats?.radarCount ?? 0}</span>
      <span class="hero-stat-label">Radars en ligne</span>
    </div>
    <div class="hero-stat">
      <span class="hero-stat-value">${hero.stats?.editorialCount ?? 0}</span>
      <span class="hero-stat-label">Articles de fond</span>
    </div>
    ${lastUpdate ? `
    <div class="hero-stat">
      <span class="hero-stat-value">${escapeHTML(lastUpdate)}</span>
      <span class="hero-stat-label">Dernière mise à jour</span>
    </div>` : ''}
  </div>
</section>
`.trim();
}

function renderFilterControls() {
    return `
<section class="blog-controls">
  <div class="filter-group" data-filter-group role="group" aria-label="Filtrer les contenus du blog">
    <button class="filter-btn is-active" type="button" data-filter="all" aria-pressed="true">Tout</button>
    <button class="filter-btn" type="button" data-filter="radar" aria-pressed="false">Radars</button>
    <button class="filter-btn" type="button" data-filter="editorial" aria-pressed="false">Articles de fond</button>
  </div>
</section>
`.trim();
}

function renderCardsSection({ title, description, entries = [], type, emptyMessage }) {
    const hasEntries = entries.length > 0;
    const subtitle = description ? `<p class="section-subtitle">${escapeHTML(description)}</p>` : '';
    const body = hasEntries
        ? `<div class="card-grid">${entries.map(renderCard).join('')}</div>`
        : `<div class="empty-state"><p>${escapeHTML(emptyMessage || 'Contenu à venir.')}</p></div>`;
    return `
<section class="blog-section" data-section="${escapeHTML(type)}">
  <div class="section-header">
    <h2>${escapeHTML(title)}</h2>
    ${subtitle}
  </div>
  ${body}
</section>
`.trim();
}

function renderCard(entry) {
    const badgeClass = entry.type === 'editorial' ? 'badge-editorial' : 'badge-radar';
    const badgeLabel = entry.type === 'editorial' ? 'Article de fond' : 'Radar';
    const ctaLabel = entry.type === 'editorial' ? "Lire l'article" : 'Consulter le radar';
    const dateMarkup = entry.displayDate
        ? `<time${entry.dateIso ? ` datetime="${escapeHTML(entry.dateIso)}"` : ''}>${escapeHTML(entry.displayDate)}</time>`
        : '';
    const secondaryMeta = entry.itemsCount
        ? `<span>${entry.itemsCount} ${pluralize(entry.itemsCount, 'lien')}</span>`
        : '';
    const excerpt = entry.excerpt ? `<p class="post-card__excerpt">${escapeHTML(entry.excerpt)}</p>` : '';
    return `
<article class="post-card" data-type="${escapeHTML(entry.type)}">
  <div class="post-card__meta">
    <span class="badge ${badgeClass}">${badgeLabel}</span>
    ${dateMarkup}
    ${secondaryMeta}
  </div>
  <h3 class="post-card__title"><a href="${escapeHTML(entry.url)}">${escapeHTML(entry.title)}</a></h3>
  ${excerpt}
  <a class="post-card__cta" href="${escapeHTML(entry.url)}">${ctaLabel}</a>
</article>
`.trim();
}

function renderTimelineSection(radars) {
    if (!radars || radars.length === 0) return '';
    const items = radars.slice(0, Math.min(12, radars.length));
    const first = items[items.length - 1];
    const last = items[0];
    const periodLabel = first?.dateIso && last?.dateIso
        ? `${formatDisplayDate(first.dateIso)} → ${formatDisplayDate(last.dateIso)}`
        : null;
    const subtitle = periodLabel
        ? `Évolution des ${items.length} dernières publications (${periodLabel}).`
        : `Évolution des ${items.length} dernières publications.`;
    return `
<section class="blog-section blog-timeline-section">
  <div class="section-header">
    <h2>Timeline du radar</h2>
    <p class="section-subtitle">${escapeHTML(subtitle)}</p>
  </div>
  <ol class="blog-timeline">
    ${items.map(renderTimelineItem).join('')}
  </ol>
</section>
`.trim();
}

function renderTimelineItem(entry) {
    const metaLine = entry.itemsCount
        ? `<span class="timeline-meta">${entry.itemsCount} ${pluralize(entry.itemsCount, 'lien')}</span>`
        : '';
    const dateMarkup = entry.displayDate
        ? `<time${entry.dateIso ? ` datetime="${escapeHTML(entry.dateIso)}"` : ''}>${escapeHTML(entry.displayDate)}</time>`
        : '';
    return `
<li class="timeline-item">
  <span class="timeline-dot"></span>
  <div class="timeline-content">
    ${dateMarkup}
    <a href="${escapeHTML(entry.url)}">${escapeHTML(entry.title)}</a>
    ${metaLine}
  </div>
</li>
`.trim();
}

async function main() {
    console.log('Starting blog generation...');
    await fs.ensureDir(BLOG_DIR);
    await fs.ensureDir(CACHE_DIR);
    await fs.ensureDir(META_DIR);
    const now = dayjs.utc();
    const dateStr = now.format('YYYY-MM-DD');
    const busPath = path.join(CACHE_DIR, `${dateStr}-items.json`);
    let history = { processedLinks: [] };
    if (await fs.pathExists(HISTORY_FILE)) {
        history = await fs.readJson(HISTORY_FILE);
    }
    const processedLinks = new Set(history.processedLinks);
    let itemsForPost = [];
    let noNews = false;
    if (await fs.pathExists(busPath)) {
        itemsForPost = await fs.readJson(busPath);
        noNews = itemsForPost.length === 0;
        console.log(`Loaded ${itemsForPost.length} cached items.`);
    } else {
        const fetched = await fetchItems(processedLinks);
        itemsForPost = fetched.itemsForPost;
        noNews = fetched.noNews;
        await fs.writeJson(busPath, itemsForPost, { spaces: 2 });
        history.processedLinks = Array.from(new Set([...processedLinks, ...itemsForPost.map(i => i.link)]));
        await fs.writeJson(HISTORY_FILE, history, { spaces: 2 });
    }
    if (ITEMS_ONLY) {
        console.log('Items collected. Exiting due to --items-only.');
        return;
    }
    let meta = null;
    const metaPath = path.join(META_DIR, `${dateStr}.json`);
    if (await fs.pathExists(metaPath)) {
        meta = await fs.readJson(metaPath);
    }
    const postTitle = `Radar PDM/PLM – ${dateStr}`;
    const postSlug = `radar-${dateStr}`;
    const postDir = path.join(BLOG_DIR, postSlug);
    await fs.ensureDir(postDir);
    function renderEnrichedMetaFor(item) {
        if (!meta?.items) return '';
        const enriched = meta.items.find(m => m.link === item.link);
        if (!enriched) return '';
        const mediaCells = [];
        if (enriched.image) {
            mediaCells.push(`<figure class="media-card"><img src="${escapeHTML(enriched.image)}" alt="${escapeHTML(item.title)}"></figure>`);
        }
        if (enriched.summary) {
            mediaCells.push(`<div class="media-card media-card--text"><p class="post-card__excerpt">${escapeHTML(enriched.summary)}</p></div>`);
        }
        const grid = mediaCells.length ? `<div class="media-grid">${mediaCells.join('\n')}</div>` : '';
        const keywords = enriched.keywords?.length
            ? `<div class="tag-list">${enriched.keywords.map(keyword => `<span class="tag">#${escapeHTML(keyword)}</span>`).join('')}</div>`
            : '';
        const categories = enriched.categories?.length
            ? `<div class="tag-list">${enriched.categories.map(category => `<span class="tag">${escapeHTML(category)}</span>`).join('')}</div>`
            : '';
        const blocks = [grid, keywords, categories].filter(Boolean);
        return blocks.length ? `<div class="post-card__enrichment">${blocks.join('\n')}</div>` : '';
    }
    function renderRadarItem(item, index) {
        const anchorId = `signal-${String(index + 1).padStart(2, '0')}`;
        return `
<article class="post-card" data-entry-type="radar-item" id="${anchorId}" data-source="${escapeHTML(item.source)}">
  <div class="post-card__meta">
    <span class="badge badge-radar">Signal #${index + 1}</span>
    <span>${escapeHTML(item.source)}</span>
  </div>
  <h3 class="post-card__title">
    <a href="${escapeHTML(item.link)}" target="_blank" rel="noopener noreferrer">${escapeHTML(item.title)}</a>
  </h3>
  ${renderEnrichedMetaFor(item)}
  <a class="post-card__cta" href="${escapeHTML(item.link)}" target="_blank" rel="noopener noreferrer">Ouvrir la source</a>
</article>
`.trim();
    }

    const publishedISO = now.toISOString();
    const displayDate = formatDisplayDate(publishedISO);
    const shortDisplayDate = formatShortDisplayDate(publishedISO);
    const itemsCount = itemsForPost.length;
    const uniqueSourcesCount = new Set(itemsForPost.map(item => item.source)).size;
    const selectionSubtitle = `Sélection automatisée de ${itemsCount} ${pluralize(itemsCount, 'lien')} issue${itemsCount > 1 ? 's' : ''} de ${uniqueSourcesCount} ${pluralize(uniqueSourcesCount, 'source')}.`;

    const navigationMarkup = renderArticleNavigation([
        { href: '/blog/', label: '← Retour au blog' },
        { href: '/', label: 'Retour au portfolio', variant: 'ghost' }
    ]);

    const heroSubtitle = noNews
        ? `Aucune actualité détectée pour le ${displayDate}.`
        : `Veille du ${displayDate} — ${itemsCount} ${pluralize(itemsCount === 0 ? 2 : itemsCount, 'signal', 'signaux')} sélectionné${itemsCount > 1 ? 's' : ''} auprès de ${uniqueSourcesCount} ${pluralize(uniqueSourcesCount === 0 ? 2 : uniqueSourcesCount, 'source', 'sources')}.`;

    const heroMarkup = renderPostHero({
        eyebrow: 'Radar quotidien',
        title: postTitle,
        subtitle: heroSubtitle,
        badges: [
            { label: shortDisplayDate || displayDate || dateStr, variant: 'neutral' },
            { label: `${itemsCount} ${pluralize(itemsCount === 0 ? 2 : itemsCount, 'signal', 'signaux')}`, variant: 'radar' }
        ],
        primaryCta: noNews
            ? { href: '/blog/', label: '← Tous les radars' }
            : { href: '#sommaire', label: 'Consulter le sommaire' },
        secondaryCta: { href: '/#contact', label: 'Planifier un échange', variant: 'ghost' },
        stats: [
            { value: itemsCount, label: pluralize(itemsCount === 1 ? 1 : 2, 'Signal sélectionné', 'Signaux sélectionnés') },
            { value: uniqueSourcesCount, label: pluralize(uniqueSourcesCount === 1 ? 1 : 2, 'Source distincte', 'Sources distinctes') },
            { value: shortDisplayDate || displayDate || dateStr, label: 'Date de publication' }
        ]
    });

    const summaryMarkup = noNews
        ? ''
        : renderSummaryNavigation({
            id: 'sommaire',
            title: 'Sommaire des signaux',
            items: itemsForPost.map((item, index) => ({
                href: `#signal-${String(index + 1).padStart(2, '0')}`,
                label: item.title,
                meta: item.source
            }))
        });

    const bodyContent = noNews
        ? renderRadarEmptyState({ message: "Aucun signal détecté aujourd'hui. Revenez demain pour une nouvelle veille." })
        : renderRadarItemsSection({
            title: `Les signaux du ${displayDate}`,
            subtitle: selectionSubtitle,
            items: itemsForPost,
            renderItem: renderRadarItem
        });

    const footerMarkup = renderArticleFooterCta();

    const metaDescription = noNews
        ? "Aucune actualité aujourd'hui."
        : `Veille PDM/PLM du ${displayDate} – ${itemsCount} ${pluralize(itemsCount, 'lien')} sélectionné${itemsCount > 1 ? 's' : ''}.`;

    const postHTML = await generateHTMLPage({
        title: `Radar PDM/PLM – ${dateStr}`,
        description: metaDescription,
        navigation: navigationMarkup,
        hero: heroMarkup,
        summary: summaryMarkup,
        body: bodyContent,
        footer: footerMarkup
    });
    await fs.writeFile(path.join(postDir, 'index.html'), postHTML);
    console.log(`✅ Generated post: ${postSlug}`);
    const entries = await fs.readdir(BLOG_DIR);
    const radarDirs = [];
    const editorialDirs = [];
    for (const entry of entries) {
        const fullPath = path.join(BLOG_DIR, entry);
        if (!(await fs.stat(fullPath)).isDirectory()) continue;
        if (entry.startsWith('radar-')) {
            radarDirs.push(entry);
        } else {
            editorialDirs.push(entry);
        }
    }

    const radarEntries = [];
    for (const slug of radarDirs) {
        const data = await readRadarMetadata(slug);
        if (data) {
            radarEntries.push(data);
        }
    }
    radarEntries.sort((a, b) => {
        if (a.dateIso && b.dateIso) {
            return new Date(b.dateIso) - new Date(a.dateIso);
        }
        if (a.dateIso) return -1;
        if (b.dateIso) return 1;
        return b.slug.localeCompare(a.slug);
    });

    const editorialEntries = [];
    for (const slug of editorialDirs) {
        const data = await readEditorialMetadata(slug);
        if (data) {
            editorialEntries.push(data);
        }
    }
    editorialEntries.sort((a, b) => {
        if (a.dateIso && b.dateIso) {
            return new Date(b.dateIso) - new Date(a.dateIso);
        }
        if (a.dateIso) return -1;
        if (b.dateIso) return 1;
        return a.title.localeCompare(b.title, 'fr');
    });

    const latestRadar = radarEntries[0] ?? null;
    const latestEditorial = editorialEntries[0] ?? null;
    const heroTitle = latestRadar?.title || latestEditorial?.title || 'Veille & analyses PDM/PLM';
    const indexHeroSubtitle = latestRadar?.heroSubtitle || latestEditorial?.heroSubtitle || 'Veille technologique quotidienne et retours d’expérience sur le PDM/PLM.';
    const heroData = {
        tagline: 'Radar & analyses PDM/PLM',
        title: heroTitle,
        subtitle: indexHeroSubtitle,
        radarHighlight: latestRadar,
        editorialHighlight: latestEditorial,
        stats: {
            radarCount: radarEntries.length,
            editorialCount: editorialEntries.length,
            lastRadar: latestRadar?.shortDate || latestRadar?.displayDate || null
        }
    };

    const timelineItems = radarEntries.slice(0, 12);
    const blogData = {
        generatedAt: publishedISO,
        hero: {
            tagline: heroData.tagline,
            title: heroData.title,
            subtitle: heroData.subtitle,
            radarHighlight: highlightFromEntry(latestRadar),
            editorialHighlight: highlightFromEntry(latestEditorial),
            stats: heroData.stats
        },
        radars: radarEntries,
        editorials: editorialEntries,
        timeline: timelineItems
    };

    const indexHero = renderHeroSection(heroData);
    const indexFilterControls = renderFilterControls();
    const indexBody = [
        renderCardsSection({
            title: 'Radars quotidiens',
            description: 'Veille automatisée sur le PDM/PLM, actualisée chaque jour ouvré.',
            entries: radarEntries,
            type: 'radar',
            emptyMessage: 'Les premiers radars seront publiés très prochainement.'
        }),
        renderCardsSection({
            title: 'Articles de fond',
            description: 'Analyses éditoriales, retours d’expérience et bonnes pratiques terrain.',
            entries: editorialEntries,
            type: 'editorial',
            emptyMessage: 'Les articles de fond arrivent bientôt.'
        }),
        renderTimelineSection(timelineItems),
        `<script type="application/json" id="blog-data">${serializeJSON(blogData)}</script>`
    ].filter(Boolean).join('\n\n');

    const indexHTML = await generateHTMLPage({
        title: 'Blog — Radar PDM/PLM',
        description: 'Veille PDM/PLM, SolidWorks, Teamcenter…',
        hero: indexHero,
        summary: indexFilterControls,
        body: indexBody
    });
    await fs.writeFile(path.join(BLOG_DIR, 'index.html'), indexHTML);
    console.log('✅ Generated blog index page.');
}

main().catch(console.error);
