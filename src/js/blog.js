// Entrée des pages blog : design system + typographie long-format,
// thème, i18n (nav + spans bilingues via <html lang>), navigation,
// et une couche éditoriale légère : barre de progression de lecture,
// révélations douces au scroll (IntersectionObserver, sans GSAP).
import '../styles/main.css';
import '../styles/blog-longform.css';
import { initI18n } from './core/i18n.js';
import { initTheme } from './core/theme.js';
import { initNav } from './core/nav.js';
import { initCmdk } from './core/cmdk.js';

initTheme();
initI18n();
initNav();
initCmdk();

import('./modules/chatbot.js').then(({ initChatbot }) => initChatbot());

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---- barre de progression de lecture (articles longs)
function initReadingProgress() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress-bar';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  let ticking = false;
  const update = () => {
    ticking = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? (window.scrollY / max).toFixed(4) : 0})`;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
  update();
}

// ---- révélations douces : sections d'article et cartes du listing.
// Progressif : la classe cachée n'est posée que par JS, donc sans JS tout est visible.
function initReveals() {
  const targets = document.querySelectorAll(
    '.article-section, .article-summary, .article-figure, .article-related, .article-card, .article-featured'
  );
  if (!targets.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-inview');
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px' }
  );
  targets.forEach((el, i) => {
    el.classList.add('io-reveal');
    // cascade sur les cartes du listing
    if (el.classList.contains('article-card')) el.style.transitionDelay = `${(i % 4) * 70}ms`;
    io.observe(el);
  });
}

if (!reduce) {
  initReadingProgress();
  initReveals();
}
