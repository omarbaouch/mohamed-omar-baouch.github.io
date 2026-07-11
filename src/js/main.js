// Entrée homepage : styles + comportements de base (i18n, thème, nav).
// Le motion (Lenis/GSAP) et le WebGL arrivent dans des modules dédiés chargés ensuite.
import '../styles/main.css';
import { initI18n } from './core/i18n.js';
import { initTheme } from './core/theme.js';

function initNav() {
  const nav = document.getElementById('siteNav');
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('siteMenu');

  const onScroll = () => nav?.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  toggle?.addEventListener('click', () => {
    const open = menu?.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(Boolean(open)));
  });
  // referme le menu mobile après clic sur un lien
  menu?.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      menu.classList.remove('is-open');
      toggle?.setAttribute('aria-expanded', 'false');
    }
  });
}

initTheme();
initI18n();
initNav();

// motion chargé dynamiquement (chunk séparé), jamais si l'utilisateur préfère
// un mouvement réduit — la page reste alors entièrement statique et complète
if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  import('./modules/motion.js').then(({ initMotion }) => initMotion());
}
