// Entrée des pages blog : design system + typographie long-format,
// thème, i18n (nav + spans bilingues via <html lang>), navigation.
// Volontairement léger : pas de smooth scroll ni de WebGL sur les articles.
import '../styles/main.css';
import '../styles/blog-longform.css';
import { initI18n } from './core/i18n.js';
import { initTheme } from './core/theme.js';
import { initNav } from './core/nav.js';

initTheme();
initI18n();
initNav();

import('./modules/chatbot.js').then(({ initChatbot }) => initChatbot());
