// Codemod one-shot : remplace le "chrome" des articles blog (CSS legacy, nav,
// footer, décor, chatbot, scripts) par le nouveau design system, sans toucher
// au <head> SEO ni au contenu de <article class="blog-article">.
// Usage : node scripts/migrate-articles.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import fg from 'fast-glob';
import * as cheerio from 'cheerio';

const NEW_THEME_SCRIPT = `
    // Anti-flash de thème : clair par défaut, sombre si stocké.
    (function () {
        var t = localStorage.getItem('theme');
        if (t === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    })();
`;

const files = fg.sync('src/blog/*/index.html');
let migrated = 0;

for (const file of files) {
  const html = readFileSync(file, 'utf8');
  if (html.includes('{{> nav }}')) {
    console.log('déjà migré :', file);
    continue;
  }
  const $ = cheerio.load(html);

  // ----- HEAD : retire les CSS legacy, remplace l'anti-flash, ajoute l'entrée module
  $('link[rel="stylesheet"]').each((_, el) => {
    const href = $(el).attr('href') || '';
    if (href.includes('/assets/css/')) $(el).remove();
  });
  $('head script:not([src])').each((_, el) => {
    const code = $(el).html() || '';
    if (code.includes('critical-theme-style')) {
      $(el).replaceWith(`<script>${NEW_THEME_SCRIPT}</script>`);
    }
  });
  $('head').append('    <script type="module" src="../../js/blog.js"></script>\n');

  // ----- BODY : purge le chrome legacy
  const doomed = [
    '#transition-canvas',
    '.perspective-wrapper',
    '#dynamicOverlay',
    '#customCursor',
    '#cursorDot',
    '#particles-js',
    '.theme-switch',
    '#scrollToTop',
    '.scroll-to-top',
    '#scrollProgress',
    '.loading-screen',
    '.nav-container',
    'body > footer',
    '.ai-assistant-fab',
    '#ai-fab-notification',
    '.ai-assistant-container',
  ];
  doomed.forEach((sel) => $(sel).remove());

  // scripts legacy de chrome (script.js) — on garde visitor-intelligence,
  // les loaders de charts inline et blog-charts (assets publics)
  $('script[src]').each((_, el) => {
    const src = $(el).attr('src') || '';
    if (src.endsWith('/assets/js/script.js') || src.endsWith('/assets/js/blog.js') || src.endsWith('/assets/js/blog-reveal.js')) {
      $(el).remove();
    }
  });

  // ----- BODY : injecte le nouveau chrome via les partials Handlebars
  $('body').prepend('\n{{> nav }}\n');
  $('body').append('\n{{> footer }}\n{{> chatbot }}\n');

  writeFileSync(file, $.html().replaceAll('{{&gt;', '{{>'));
  migrated++;
}

console.log(`${migrated}/${files.length} articles migrés.`);
