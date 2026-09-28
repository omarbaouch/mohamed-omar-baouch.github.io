// À propos : entrée du portrait en situation quand il arrive à l'écran —
// contenu qui monte, cote qui se trace, chiffres qui défilent jusqu'à leur
// valeur. Sans JS ou en mouvement réduit, tout est affiché d'emblée : la
// classe .is-armed (qui cache avant l'entrée) n'est posée que si on anime.
//
// Vue éclatée : les trois couches (fond, portrait, poste de travail) arrivent
// écartées et se remontent au défilement ; relief par couche sous le pointeur.
// L'invitation à prendre la tasse vit dans about-mug.js.

function countUp(el) {
  const target = Number(el.dataset.count);
  const start = performance.now();
  const duration = 1400;
  const tick = (now) => {
    const t = Math.min(1, (now - start) / duration);
    el.firstChild.nodeValue = String(Math.round(target * (1 - Math.pow(1 - t, 3))));
    if (t < 1) requestAnimationFrame(tick);
  };
  if (el.firstChild?.nodeType === Node.TEXT_NODE) requestAnimationFrame(tick);
}

// Vue éclatée au défilement et relief léger sous la souris.
function initRelief(scene) {
  const media = scene.querySelector('.ah-media');
  if (!media) return;

  // relief : chaque couche suit le pointeur à sa propre vitesse (voir .ah-layer--*)
  const tilt = (nx, ny) => {
    scene.style.setProperty('--ah-mx', Math.max(-1, Math.min(1, nx * 2)).toFixed(3));
    scene.style.setProperty('--ah-my', Math.max(-1, Math.min(1, ny * 2)).toFixed(3));
  };
  let holding = false;
  scene.addEventListener('mug:grab', () => { holding = true; });
  window.addEventListener('pointerup', () => { holding = false; });
  scene.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse' || holding) return;
    const b = media.getBoundingClientRect();
    tilt((e.clientX - b.left) / b.width - 0.5, (e.clientY - b.top) / b.height - 0.5);
  });
  scene.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') tilt(0, 0); });

  // vue éclatée : écartée à l'arrivée de la section, remontée (coude posé sur
  // la table) dès que son bord haut atteint le milieu de l'écran
  const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
  let explode = -1;
  let raf = 0;
  const onScroll = () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const b = media.getBoundingClientRect();
      const vh = innerHeight;
      if (b.bottom < 0 || b.top > vh) return;
      const ex = 1 - smooth(0.04, 0.5, (vh - b.top) / vh);
      if (Math.abs(ex - explode) < 0.002) return;
      explode = ex;
      scene.style.setProperty('--ah-ex', ex.toFixed(3));
      scene.dispatchEvent(new CustomEvent('scene:move'));
    });
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

export function initAboutScene() {
  const scene = document.querySelector('[data-about-scene]');
  if (!scene || !('IntersectionObserver' in window)) return;
  if (!matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
  scene.classList.add('is-armed');
  // les couches doivent être prêtes avant d'arriver à l'écran (l'éclatement se
  // joue pendant l'entrée) : préchargement dès que la page est au repos
  const preload = () => scene.querySelectorAll('.ah-layer img').forEach((i) => { i.loading = 'eager'; });
  if ('requestIdleCallback' in window) requestIdleCallback(preload, { timeout: 3000 });
  else setTimeout(preload, 1500);
  initRelief(scene);
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
