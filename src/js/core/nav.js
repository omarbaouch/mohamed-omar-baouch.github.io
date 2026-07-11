// Comportement de la navigation : état scrolled + menu mobile.
export function initNav() {
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
  menu?.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      menu.classList.remove('is-open');
      toggle?.setAttribute('aria-expanded', 'false');
    }
  });
}
