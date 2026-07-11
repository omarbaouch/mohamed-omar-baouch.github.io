// Entrée homepage : styles + comportements de base (i18n, thème, nav).
// Le motion (Lenis/GSAP) et le WebGL arrivent dans des modules dédiés chargés ensuite.
import '../styles/main.css';
import { initI18n } from './core/i18n.js';
import { initTheme } from './core/theme.js';
import { initNav } from './core/nav.js';

initTheme();
initI18n();
initNav();

import('./modules/chatbot.js').then(({ initChatbot }) => initChatbot());
import('./modules/contact-form.js').then(({ initContactForm }) => initContactForm());

// motion chargé dynamiquement (chunk séparé), jamais si l'utilisateur préfère
// un mouvement réduit — la page reste alors entièrement statique et complète
if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  import('./modules/motion.js').then(({ initMotion }) => initMotion());

  // WebGL après le premier paint et seulement sur machine capable ;
  // en cas d'échec, le blob dégradé CSS reste en place (fallback silencieux)
  const loadWebGL = () =>
    import('./webgl/scene.js')
      .then(({ initBlobScene }) => initBlobScene())
      .catch(() => null);
  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadWebGL, { timeout: 3000 });
  } else {
    setTimeout(loadWebGL, 1200);
  }
}
