// À propos : entrée du portrait en situation quand il arrive à l'écran —
// contenu qui monte, cote qui se trace, chiffres qui défilent jusqu'à leur
// valeur. Sans JS ou en mouvement réduit, tout est affiché d'emblée : la
// classe .is-armed (qui cache avant l'entrée) n'est posée que si on anime.
function countUp(el) {
  const target = Number(el.dataset.count);
  const plus = el.querySelector('.ah-plus');
  const start = performance.now();
  const duration = 1400;
  const tick = (now) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    el.firstChild.nodeValue = String(Math.round(target * eased));
    if (t < 1) requestAnimationFrame(tick);
  };
  if (el.firstChild?.nodeType === Node.TEXT_NODE && plus) requestAnimationFrame(tick);
}

export function initAboutScene() {
  const scene = document.querySelector('[data-about-scene]');
  if (!scene || !('IntersectionObserver' in window)) return;
  if (!matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
  scene.classList.add('is-armed');
  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      scene.classList.add('is-in');
      setTimeout(() => scene.querySelectorAll('[data-count]').forEach(countUp), 500);
      io.disconnect();
    },
    { threshold: 0.3 }
  );
  io.observe(scene);
}
