import Parser from 'rss-parser';
import fs from 'fs-extra';
import path from 'path';
import { load } from 'cheerio';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
dayjs.extend(utc);

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const ROOT = path.resolve(__dirname, '..');
const BLOG_DIR = path.join(ROOT, 'blog');
const SOURCES_FILE = path.join(ROOT, 'sources.json');
const INDEX_HTML_PATH = path.join(ROOT, 'index.html');
const HISTORY_FILE = path.join(ROOT, 'history.json');
const CACHE_DIR = path.join(ROOT, '.cache');
const META_DIR = path.join(ROOT, 'blog_meta');

const LOOKBACK_DAYS = 1;
const FALLBACK_DAYS = 3;
const MAX_ITEMS_PER_POST = 10;

const args = process.argv.slice(2);
const ITEMS_ONLY = args.includes('--items-only');

const generateHTMLPage = (headContent, bodyContent) => `
<!DOCTYPE html>
<html lang="fr">
<head>${headContent}</head>
<body>
    <div class="container blog-container">${bodyContent}</div>
</body>
</html>`;

const escapeHTML = (str) => str?.replace(/[&<>"']/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[tag]));

const toISODate = (dateStr) => {
    if (!dateStr) return null;
    const parsed = new Date(dateStr);
    return isNaN(parsed) ? null : parsed.toISOString();
};

async function getHeadFromIndex(title, description) {
    const indexHtml = await fs.readFile(INDEX_HTML_PATH, 'utf-8');
    const $ = load(indexHtml);

    const head = $('head').clone();

    head.find('script').each((_, el) => {
        const src = $(el).attr('src') || '';
        const content = $(el).html() || '';
        if (src.includes('googletagmanager') || content.includes('googletagmanager')) {
            $(el).remove();
        }
    });

    head.find('title').text(`${title} | Mohamed Omar Baouch`);
    head.find('meta[name="description"]').attr('content', description);

    const extraCss = `
        /* Désactive l'écran de chargement sur les pages du blog */
        .loading-screen { display: none !important; }

        /* Styles additionnels pour le blog */
        .blog-container { max-width: 900px; margin: 120px auto 40px; padding: 20px; }
        .blog-post, .blog-index { background-color: var(--bg-secondary); border-radius: 10px; padding: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
        .blog-post h1, .blog-index h1 { color: var(--accent-primary); margin-top: 0; }
        .blog-post .meta, .blog-index .meta { color: var(--text-secondary); margin-bottom: 2rem; }
        .article-item { border-top: 1px solid var(--bg-tertiary); padding: 1.5rem 0; }
        .article-item:first-child { border-top: none; }
        .article-item h2 { margin: 0 0 0.5rem 0; font-size: 1.25rem; }
        .article-item h2 a { color: var(--text-primary); text-decoration: none; transition: color 0.3s; }
        .article-item h2 a:hover { color: var(--accent-primary); }
        .article-item .source { font-size: 0.9rem; color: var(--text-secondary); }
        .back-link { display: inline-block; margin-top: 2rem; color: var(--accent-secondary); font-weight: 600; }
    `;

    const mainStyle = head.find('style').last();
    if (mainStyle.length) {
        mainStyle.append(`\n${extraCss}\n`);
    } else {
        head.append(`<style>${extraCss}</style>`);
    }

    return head.html();
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

    const postContent = noNews ? `
        <div class="blog-post">
            <h1>${postTitle}</h1>
            <p class="meta">Aucune actualité aujourd'hui.</p>
            <a href="/blog/" class="back-link">← Voir tous les radars</a>
        </div>
    ` : `
        <div class="blog-post">
            <h1>${postTitle}</h1>
            <p class="meta">Une sélection des dernières actualités du ${now.format('DD/MM/YYYY')}.</p>
            ${itemsForPost.map(item => {
                const enriched = meta?.items?.find(m => m.link === item.link);
                const resumo = enriched ? `
                    ${enriched.summary ? `<p class="meta">${escapeHTML(enriched.summary)}</p>` : ''}
                    ${enriched.keywords?.length ? `<p class="meta"><strong>Mots-clés:</strong> ${enriched.keywords.map(escapeHTML).join(', ')}</p>` : ''}
                    ${enriched.categories?.length ? `<p class="meta"><strong>Catégories:</strong> ${enriched.categories.map(escapeHTML).join(' / ')}</p>` : ''}
                ` : '';
                return `
                <div class="article-item">
                    <h2><a href="${escapeHTML(item.link)}" target="_blank" rel="noopener noreferrer">${escapeHTML(item.title)}</a></h2>
                    ${resumo}
                    <p class="source">Source: ${escapeHTML(item.source)}</p>
                </div>`;
            }).join('')}
            <a href="/blog/" class="back-link">← Voir tous les radars</a>
        </div>
    `;

    const metaDescription = noNews ? "Aucune actualité aujourd'hui." : `Veille PDM/PLM du ${dateStr}`;
    const postHead = await getHeadFromIndex(postTitle, metaDescription);
    const postHTML = generateHTMLPage(postHead, postContent);
    await fs.writeFile(path.join(postDir, 'index.html'), postHTML);
    console.log(`✅ Generated post: ${postSlug}`);

    // Générer la page d'index du blog
    const allPosts = (await fs.readdir(BLOG_DIR)).filter(file => fs.statSync(path.join(BLOG_DIR, file)).isDirectory());
    allPosts.sort().reverse();

    const indexContent = `
        <div class="blog-index">
            <h1>Blog - Radar PDM/PLM</h1>
            <p class="meta">Veille technologique quotidienne et automatisée sur les sujets PDM, PLM, et l'écosystème SolidWorks.</p>
            ${allPosts.map(slug => `
                <div class="article-item">
                    <h2><a href="/blog/${slug}/">Radar PDM/PLM – ${slug.replace('radar-', '')}</a></h2>
                </div>
            `).join('')}
             <a href="/" class="back-link">← Retour au portfolio</a>
        </div>
    `;

    const indexHead = await getHeadFromIndex('Blog - Radar PDM/PLM', "Veille technologique sur PDM, PLM et SolidWorks.");
    const indexHTML = generateHTMLPage(indexHead, indexContent);
    await fs.writeFile(path.join(BLOG_DIR, 'index.html'), indexHTML);
    console.log('✅ Generated blog index page.');
}

main().catch(console.error);
