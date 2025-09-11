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
const INDEX_HTML_PATH = path.join(ROOT, 'index.html');
const HISTORY_FILE = path.join(ROOT, 'history.json');
const CACHE_DIR = path.join(ROOT, '.cache');
const META_DIR = path.join(ROOT, 'blog_meta');

const LOOKBACK_DAYS = 1;
const FALLBACK_DAYS = 3;
const MAX_ITEMS_PER_POST = 10;

const args = process.argv.slice(2);
const ITEMS_ONLY = args.includes('--items-only');

const toISODate = (dateStr) => {
    if (!dateStr) return null;
    const parsed = new Date(dateStr);
    return isNaN(parsed) ? null : parsed.toISOString();
};

async function getHeadFromIndex({ title, description }) {
  const html = await fs.readFile(INDEX_HTML_PATH, 'utf-8');
  const hs = html.indexOf('<head>');
  const he = html.indexOf('</head>', hs);
  if (hs === -1 || he === -1) throw new Error('Head tags not found in index.html');
  let head = html.substring(hs + '<head>'.length, he);

  head = head.replace(/<script[\s\S]*?gtm\.js[\s\S]*?<\/script>/gi, '');

  if (!/<base\s+href=/i.test(head)) {
    head = `<base href="/">\n` + head;
  }

  head = /<title>[\s\S]*?<\/title>/i.test(head)
    ? head.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`)
    : `<title>${title}</title>\n` + head;

  head = /<meta\s+name=["']description["'][^>]*>/i.test(head)
    ? head.replace(/<meta\s+name=["']description["'][^>]*>/i, `<meta name="description" content="${description}">`)
    : head + `\n<meta name="description" content="${description}">`;

  return head.trim();
}

const SAFE_FIX = `
<style>
  /* Désactive tout overlay/loader résiduel */
  .loading-screen, .preloader, .loader { display: none !important; }
  /* Forcer l\u2019affichage si la home cache le body en attendant un JS */
  html, body { opacity: 1 !important; visibility: visible !important; }
  /* Éviter qu\u2019un pseudo-élément plein écran intercepte des clics */
  .grain::before, body::before, #app::before { pointer-events: none !important; }
</style>
`;

async function generateHTMLPage(title, bodyContent, metaDescription) {
  const head = await getHeadFromIndex({ title, description: metaDescription });
  return `<!doctype html>
<html lang="fr">
<head>
${head}
${SAFE_FIX}
</head>
<body class="blog-page ready">
  <main class="container blog-container">
    ${bodyContent}
  </main>
  <script src="/assets/js/loader.js" defer></script>
</body>
</html>`;
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
        return `
        ${enriched.summary ? `<p>${escapeHTML(enriched.summary)}</p>` : ''}
        ${enriched.keywords?.length ? `<p class="meta"><strong>Mots-clés:</strong> ${enriched.keywords.map(escapeHTML).join(', ')}</p>` : ''}
        ${enriched.categories?.length ? `<p class="meta"><strong>Catégories:</strong> ${enriched.categories.map(escapeHTML).join(' / ')}</p>` : ''}
        `;
    }

    const postContent = noNews ? `
  <section class="section">
    <p class="back"><a href="/blog/">← Voir tous les radars</a></p>
    <h1 class="title">${escapeHTML(postTitle)}</h1>
    <p class="meta">Aucune actualité aujourd'hui.</p>
    <p class="back"><a href="/">← Retour au portfolio</a></p>
  </section>
` : `
  <section class="section">
    <p class="back"><a href="/blog/">← Voir tous les radars</a></p>
    <h1 class="title">${escapeHTML(postTitle)}</h1>
    <p>Veille du ${now.format('DD/MM/YYYY')} — PDM/PLM & écosystème.</p>

    ${itemsForPost.map(item => `
      <article class="post-item">
        <h2 class="subtitle">
          <a href="${escapeHTML(item.link)}" target="_blank" rel="noopener noreferrer">
            ${escapeHTML(item.title)}
          </a>
        </h2>
        ${renderEnrichedMetaFor(item)}
        <p class="meta">Source : ${escapeHTML(item.source)}</p>
      </article>
    `).join('')}

    <p class="back"><a href="/">← Retour au portfolio</a></p>
  </section>
`;

    const metaDescription = noNews ? "Aucune actualité aujourd'hui." : `Veille PDM/PLM du ${now.format('DD/MM/YYYY')}`;
    const postHTML = await generateHTMLPage(
        `Radar PDM/PLM – ${dateStr}`,
        postContent,
        metaDescription
    );
    await fs.writeFile(path.join(postDir, 'index.html'), postHTML);
    console.log(`✅ Generated post: ${postSlug}`);

    // Générer la page d'index du blog
    const allPostDirs = (await fs.readdir(BLOG_DIR)).filter(file => fs.statSync(path.join(BLOG_DIR, file)).isDirectory());
    allPostDirs.sort().reverse();

    const indexContent = `
  <section class="section">
    <h1 class="title">Blog — Radar PDM/PLM</h1>
    <p class="meta">Veille technologique quotidienne et automatisée.</p>
    <ul class="post-list">
      ${allPostDirs.map(slug => `
        <li class="post-list-item">
          <a href="/blog/${slug}/">Radar — ${slug.replace('radar-', '')}</a>
        </li>
      `).join('')}
    </ul>
    <p class="back"><a href="/">← Retour au portfolio</a></p>
  </section>
`;

    const indexHTML = await generateHTMLPage(
        'Blog — Radar PDM/PLM',
        indexContent,
        'Veille PDM/PLM, SolidWorks, Teamcenter…'
    );
    await fs.writeFile(path.join(BLOG_DIR, 'index.html'), indexHTML);
    console.log('✅ Generated blog index page.');
}

main().catch(console.error);
