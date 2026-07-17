// Entrée homepage : styles + comportements de base (i18n, thème, nav).
// Le motion (Lenis/GSAP) et le WebGL arrivent dans des modules dédiés chargés ensuite.
import '../styles/main.css';
import { initI18n } from './core/i18n.js';
import { initTheme } from './core/theme.js';
import { initNav } from './core/nav.js';
import { initCmdk } from './core/cmdk.js';
import { initTools } from './core/tools.js';
import { runLoader } from './core/loader.js';

// le rideau est armé le plus tôt possible pour éviter tout flash de contenu
if (
  document.getElementById('siteLoader') &&
  !sessionStorage.getItem('loaderSeen') &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches
) {
  document.documentElement.classList.add('is-loading');
}

initTheme();
initI18n();
initNav();
initCmdk();
initTools();
runLoader();

// heure locale de Strasbourg (hero + footer) — détail vivant, mis à jour à la minute
function tickClock() {
  const t = new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Paris',
  }).format(new Date());
  document.querySelectorAll('.js-time').forEach((el) => {
    el.textContent = t;
  });
}
tickClock();
setInterval(tickClock, 30000);

import('./modules/chatbot.js').then(({ initChatbot }) => initChatbot());
import('./modules/contact-form.js').then(({ initContactForm }) => initContactForm());

// signature du hero : l'arbre d'assemblage PDM vivant — chargé après le
// premier idle (il gère lui-même le rendu statique en reduced-motion)
const loadTree = () => import('./modules/bom-tree.js').then(({ initBomTree }) => initBomTree());
if ('requestIdleCallback' in window) {
  requestIdleCallback(loadTree, { timeout: 2500 });
} else {
  setTimeout(loadTree, 900);
}

// motion chargé dynamiquement (chunk séparé), jamais si l'utilisateur préfère
// un mouvement réduit — la page reste alors entièrement statique et complète
if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  import('./modules/motion.js').then(({ initMotion }) => initMotion());
}

// cartouche console — pour les curieux qui ouvrent les DevTools
console.log(
  '%c◇ ASM-BAOUCH · RÉV.2026 · ÉTAT : PUBLIÉ\n%cSite fait main — Vite, canvas 2D, GSAP. Zéro template.\nUne question PDM/PLM ? mohamed.omar.baouch@gmail.com  ·  Ctrl+K pour explorer le coffre.',
  'color:#6fa8d6;font-family:monospace;font-size:12px;font-weight:bold',
  'color:#9b9891;font-family:monospace;font-size:11px'
);

// journal de session : la visite est tracée comme un historique PDM —
// chaque section consultée est horodatée dans un petit HUD (décoratif)
const LOG_REFS = {
  structure: 'ASM-BAOUCH',
  expertise: 'ASM-02',
  about: 'DOC-PROFIL',
  experience: 'ASM-01',
  skills: 'ASM-03',
  education: 'DOC-EDU',
  contact: 'ECO-CONTACT',
};
(function initSessionLog() {
  if (window.matchMedia('(max-width: 64rem)').matches) return;
  const hud = document.createElement('aside');
  hud.className = 'session-log';
  hud.setAttribute('aria-hidden', 'true');
  document.body.appendChild(hud);
  const seen = new Set();
  const io = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        const id = en.target.id;
        if (!en.isIntersecting || seen.has(id)) continue;
        seen.add(id);
        const t = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Europe/Paris' }).format(new Date());
        const row = document.createElement('div');
        row.className = 'session-log-row';
        row.innerHTML = `<span>${t}</span> ${LOG_REFS[id]} — <em>${document.documentElement.lang === 'en' ? 'VIEWED' : 'CONSULTÉ'}</em>`;
        hud.prepend(row);
        while (hud.children.length > 4) hud.lastChild.remove();
        // la nav mémorise ce qui a été consulté (LED sur le lien)
        document.querySelector(`.nav-link[href="/#${id}"]`)?.classList.add('is-seen');
      }
    },
    { threshold: 0.35 }
  );
  Object.keys(LOG_REFS).forEach((id) => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });
})();
