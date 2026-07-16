// i18n runtime : FR dans le HTML (source SEO), EN appliqué côté client.
// Réutilise les clés data-translate-key héritées de l'ancien site.
import fr from '../../i18n/fr.json';
import en from '../../i18n/en.json';

const DICTS = { fr, en };
const SUPPORTED = ['fr', 'en'];

export function currentLang() {
  return document.documentElement.lang === 'en' ? 'en' : 'fr';
}

export function setLanguage(lang) {
  if (!SUPPORTED.includes(lang)) return;
  const dict = DICTS[lang];
  document.querySelectorAll('[data-translate-key]').forEach((el) => {
    const key = el.dataset.translateKey;
    const value = dict[key];
    if (typeof value !== 'string') return;
    // certaines valeurs héritées contiennent du HTML (strong, em…)
    el.innerHTML = value;
  });
  document.documentElement.lang = lang;
  localStorage.setItem('language', lang);
  document.querySelectorAll('[data-cv-link]').forEach((a) => {
    a.setAttribute('href', dict.cv_file || '/BAOUCH_CV_FR.pdf');
  });
  const frBtn = document.getElementById('lang-fr');
  const enBtn = document.getElementById('lang-en');
  if (frBtn) frBtn.setAttribute('aria-pressed', String(lang === 'fr'));
  if (enBtn) enBtn.setAttribute('aria-pressed', String(lang === 'en'));
  window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

export function initI18n() {
  const stored = localStorage.getItem('language');
  const browser = (navigator.language || 'fr').split('-')[0];
  const lang = SUPPORTED.includes(stored) ? stored : SUPPORTED.includes(browser) ? browser : 'fr';
  if (lang !== 'fr') setLanguage(lang);
  else setLanguage('fr'); // synchronise l'état des boutons même en FR
  document.getElementById('lang-fr')?.addEventListener('click', () => setLanguage('fr'));
  document.getElementById('lang-en')?.addEventListener('click', () => setLanguage('en'));
}
