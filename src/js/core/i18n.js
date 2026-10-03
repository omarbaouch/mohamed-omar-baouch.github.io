// i18n runtime : FR dans le HTML (source SEO), EN appliqué côté client.
// Réutilise les clés data-translate-key héritées de l'ancien site.
import fr from '../../i18n/fr.json';
import en from '../../i18n/en.json';

const DICTS = { fr, en };
const SUPPORTED = ['fr', 'en'];

export function currentLang() {
  return document.documentElement.lang === 'en' ? 'en' : 'fr';
}

// Pages qui existent dans les deux langues (data-page-lang, hreflang) : la langue
// est celle de l'URL, et changer de langue, c'est aller à l'autre URL.
const pageLang = () => document.documentElement.dataset.pageLang || null;
// chemin seul : on reste sur le domaine courant (prévisualisations comprises)
const alternate = (lang) => {
  const href = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`)?.href;
  return href ? new URL(href).pathname : null;
};

export function setLanguage(lang, { persist = true } = {}) {
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
  if (persist) {
    try { localStorage.setItem('language', lang); } catch { /* stockage indisponible */ }
  }
  document.querySelectorAll('[data-cv-link]').forEach((a) => {
    a.setAttribute('href', dict.cv_file || '/BAOUCH_CV_FR.pdf');
  });
  const frBtn = document.getElementById('lang-fr');
  const enBtn = document.getElementById('lang-en');
  if (frBtn) frBtn.setAttribute('aria-pressed', String(lang === 'fr'));
  if (enBtn) enBtn.setAttribute('aria-pressed', String(lang === 'en'));
  window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

// choix explicite du visiteur (clic sur FR / EN) : seul ce choix redirige vers
// l'autre version d'une page (voir partials/head-lang.hbs)
function choose(lang) {
  try {
    localStorage.setItem('language', lang);
    localStorage.setItem('language-choice', lang);
  } catch { /* stockage indisponible */ }
  const page = pageLang();
  const href = page && lang !== page ? alternate(lang) : null;
  if (href) location.href = href + location.search + location.hash;
  else setLanguage(lang);
}

export function initI18n() {
  const page = pageLang();
  if (page) {
    setLanguage(page, { persist: false });
    // langue lue dans cette session : les pages sans version anglaise (études de
    // cas…) s'affichent dans la même langue, sans en faire un choix durable
    try { sessionStorage.setItem('language-session', page); } catch { /* stockage indisponible */ }
    document.getElementById('lang-fr')?.addEventListener('click', () => choose('fr'));
    document.getElementById('lang-en')?.addEventListener('click', () => choose('en'));
    return;
  }
  // Français par défaut, anglais seulement sur choix explicite du visiteur.
  // Pas de bascule selon la langue du navigateur : Googlebot rend les pages
  // en en-US et indexait donc des articles en anglais sous des titres et des
  // URL françaises (pages « explorées, non indexées »).
  let stored = null, session = null;
  try { stored = localStorage.getItem('language'); session = sessionStorage.getItem('language-session'); } catch { /* stockage indisponible */ }
  const fromSession = !SUPPORTED.includes(stored) && SUPPORTED.includes(session);
  const lang = SUPPORTED.includes(stored) ? stored : fromSession ? session : 'fr';
  // synchronise aussi l'état des boutons en FR ; la langue de session n'est pas enregistrée
  setLanguage(lang, { persist: !fromSession });
  document.getElementById('lang-fr')?.addEventListener('click', () => choose('fr'));
  document.getElementById('lang-en')?.addEventListener('click', () => choose('en'));
}
