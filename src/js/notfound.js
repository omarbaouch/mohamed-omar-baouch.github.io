// Entrée de la page 404 : chrome complet (thème, i18n, nav) sans loader,
// sans chatbot et sans motion — la page doit être instantanée.
import '../styles/main.css';
import { initI18n } from './core/i18n.js';
import { initTheme } from './core/theme.js';
import { initNav } from './core/nav.js';

initTheme();
initI18n();
initNav();

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
