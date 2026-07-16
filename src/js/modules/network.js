// Signature du site : réseau de points de données connectés en fond de hero —
// la métaphore visuelle du PDM/PLM (des données techniques reliées entre elles).
// Canvas 2D léger : ~100 nœuds, répulsion au curseur, pause hors viewport,
// dessin statique unique si prefers-reduced-motion.
export function initNetwork() {
  const canvas = document.getElementById('heroNet');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const hero = canvas.parentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const LINK = 140;
  const CURSOR = 160;
  let w = 0;
  let h = 0;
  let nodes = [];
  let accent = { r: 111, g: 168, b: 214 };
  const pointer = { x: -9999, y: -9999 };

  // couleur dérivée du token --accent du thème courant (clair ou sombre)
  function readAccent() {
    const hex = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    const m = /^#?([0-9a-f]{6})$/i.exec(hex);
    if (m) {
      accent = {
        r: parseInt(m[1].slice(0, 2), 16),
        g: parseInt(m[1].slice(2, 4), 16),
        b: parseInt(m[1].slice(4, 6), 16),
      };
    }
  }
  readAccent();
  document.getElementById('themeSwitch')?.addEventListener('click', () => {
    // le thème vient de basculer : recalcule la couleur puis redessine
    requestAnimationFrame(() => {
      readAccent();
      if (reduce) draw();
    });
  });

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = hero.clientWidth;
    h = hero.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.max(40, Math.min(110, Math.round((w * h) / 14000)));
    nodes = Array.from({ length: count }, () => {
      const vx = (Math.random() - 0.5) * 0.26;
      const vy = (Math.random() - 0.5) * 0.26;
      return { x: Math.random() * w, y: Math.random() * h, vx, vy, dx: vx, dy: vy };
    });
    if (reduce) draw();
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const { r, g, b } = accent;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const c = nodes[j];
        const d = Math.hypot(a.x - c.x, a.y - c.y);
        if (d < LINK) {
          ctx.strokeStyle = `rgba(${r},${g},${b},${((1 - d / LINK) * 0.3).toFixed(3)})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(c.x, c.y);
          ctx.stroke();
        }
      }
    }
    ctx.fillStyle = `rgba(${r},${g},${b},0.75)`;
    for (const n of nodes) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, 1.4, 0, 6.283);
      ctx.fill();
    }
  }

  function update() {
    for (const n of nodes) {
      const dx = n.x - pointer.x;
      const dy = n.y - pointer.y;
      const d = Math.hypot(dx, dy);
      if (d > 0 && d < CURSOR) {
        const f = (1 - d / CURSOR) * 0.2;
        n.vx += (dx / d) * f;
        n.vy += (dy / d) * f;
      }
      // retour progressif vers la dérive naturelle
      n.vx += (n.dx - n.vx) * 0.015;
      n.vy += (n.dy - n.vy) * 0.015;
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < -12 || n.x > w + 12) {
        n.dx *= -1;
        n.vx *= -1;
      }
      if (n.y < -12 || n.y > h + 12) {
        n.dy *= -1;
        n.vy *= -1;
      }
    }
  }

  window.addEventListener('resize', resize);
  window.addEventListener(
    'pointermove',
    (e) => {
      const b = hero.getBoundingClientRect();
      pointer.x = e.clientX - b.left;
      pointer.y = e.clientY - b.top;
    },
    { passive: true }
  );

  resize();

  if (reduce) return; // rendu statique uniquement

  let visible = true;
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
  }).observe(hero);

  // 30 i/s suffisent pour une dérive lente — divise par deux le coût CPU
  let last = 0;
  function frame(now) {
    requestAnimationFrame(frame);
    if (!visible || document.hidden) return;
    if (now - last < 32) return;
    last = now;
    update();
    draw();
  }
  requestAnimationFrame(frame);
}
