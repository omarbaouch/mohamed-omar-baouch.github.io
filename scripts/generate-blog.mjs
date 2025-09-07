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
const INDEX_HTML_PATH = path.join(ROOT, 'index.html'); // Chemin vers votre index.html

// --- Configuration ---
const LOOKBACK_DAYS = 1;
const FALLBACK_DAYS = 3;
const MAX_ITEMS_PER_POST = 10;

// --- Template HTML avec CSS intégré ---
const generateHTMLPage = (title, content, metaDescription, cssContent) => `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | Mohamed Omar Baouch</title>
    <meta name="description" content="${metaDescription}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;600;700;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
    <style>
        /* CSS intégré depuis index.html */
        ${cssContent}

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
    </style>
</head>
<body>
    <div class="container blog-container">${content}</div>
</body>
</html>`;

const escapeHTML = (str) => str ? str.replace(/[&<>'"]/g, tag => ({'&': '&amp;','<': '&lt;','>': '&gt;','\'': '&#39;','"': '&quot;'}[tag] || tag)) : '';

async function getCssFromIndex() {
    const indexHtml = await fs.readFile(INDEX_HTML_PATH, 'utf-8');
    const styleStart = indexHtml.indexOf('<style>');
    const styleEnd = indexHtml.lastIndexOf('</style>');
    if (styleStart === -1 || styleEnd === -1) {
        throw new Error('Style tags not found in index.html');
    }
    return indexHtml.substring(styleStart + 7, styleEnd);
}

async function main() {
    console.log('Starting blog generation...');
    const cssContent = await getCssFromIndex();
    console.log(`Successfully extracted ${cssContent.length} characters of CSS.`);

    await fs.ensureDir(BLOG_DIR);
    const sources = await fs.readJson(SOURCES_FILE);

    let allItems = [];
    const parser = new Parser({ timeout: 15000 });

    for (const source of sources) {
        try {
            const feed = await parser.parseURL(source.url);
            feed.items.forEach(item => {
                allItems.push({
                    source: source.name,
                    title: item.title,
                    link: item.link,
                    isoDate: item.isoDate || new Date().toISOString()
                });
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

    if (recentItems.length === 0) {
        console.log('No new items found. Exiting.');
        return;
    }

    recentItems.sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate));
    const itemsForPost = recentItems.slice(0, MAX_ITEMS_PER_POST);

    const dateStr = now.format('YYYY-MM-DD');
    const postTitle = `Radar PDM/PLM – ${dateStr}`;
    const postSlug = `radar-${dateStr}`;
    const postDir = path.join(BLOG_DIR, postSlug);
    await fs.ensureDir(postDir);

    const postContent = `
        <div class="blog-post">
            <h1>${postTitle}</h1>
            <p class="meta">Une sélection des dernières actualités du ${now.format('DD/MM/YYYY')}.</p>
            ${itemsForPost.map(item => `
                <div class="article-item">
                    <h2><a href="${escapeHTML(item.link)}" target="_blank" rel="noopener noreferrer">${escapeHTML(item.title)}</a></h2>
                    <p class="source">Source: ${escapeHTML(item.source)}</p>
                </div>
            `).join('')}
            <a href="/blog/" class="back-link">← Voir tous les radars</a>
        </div>
    `;

    const postHTML = generateHTMLPage(postTitle, postContent, `Veille PDM/PLM du ${dateStr}`, cssContent);
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

    const indexHTML = generateHTMLPage('Blog - Radar PDM/PLM', indexContent, "Veille technologique sur PDM, PLM et SolidWorks.", cssContent);
    await fs.writeFile(path.join(BLOG_DIR, 'index.html'), indexHTML);
    console.log('✅ Generated blog index page.');
}

main().catch(console.error);
