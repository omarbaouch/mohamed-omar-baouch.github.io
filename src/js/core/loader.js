// Preloader signature : compteur 0→100 puis rideau qui se lève sur le hero.
// N'apparaît qu'une fois par session, et jamais en reduced-motion.
export function runLoader(onDone) {
  const loader = document.getElementById('siteLoader');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const seen = sessionStorage.getItem('loaderSeen');

  if (!loader || reduce || seen) {
    loader?.remove();
    document.documentElement.classList.remove('is-loading');
    onDone?.();
    return;
  }

  sessionStorage.setItem('loaderSeen', '1');
  document.documentElement.classList.add('is-loading');
  const count = document.getElementById('loaderCount');
  const start = performance.now();
  const total = 700;

  function tick(now) {
    const p = Math.min(1, (now - start) / total);
    const eased = 1 - Math.pow(1 - p, 3);
    if (count) count.textContent = String(Math.round(eased * 100));
    if (p < 1) {
      requestAnimationFrame(tick);
    } else {
      loader.style.transition = 'transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)';
      loader.style.transform = 'translateY(-100%)';
      document.documentElement.classList.remove('is-loading');
      onDone?.();
      setTimeout(() => loader.remove(), 1000);
    }
  }
  requestAnimationFrame(tick);
}
