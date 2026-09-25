// Registre des projets : au survol d'une ligne, son tirage tramé apparaît et
// suit le pointeur (un seul aperçu partagé, qui s'incline selon la vitesse).
export function initProjectRegister(list) {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const rows = [...list.querySelectorAll('.project-card')];
  const preview = document.createElement('div');
  preview.className = 'reg-preview';
  preview.setAttribute('aria-hidden', 'true');
  preview.innerHTML = '<img alt=""><span></span>';
  document.body.append(preview);
  const img = preview.querySelector('img');
  const tag = preview.querySelector('span');
  // précharge les tirages : l'aperçu ne doit jamais apparaître vide
  rows.forEach((r) => { const src = r.querySelector('.card-media img')?.src; if (src) new Image().src = src; });

  let x = 0, y = 0, px = 0, py = 0, raf = 0, on = false;
  const loop = () => {
    const k = reduce.matches ? 1 : 0.16;
    const vx = (x - px) * k;
    px += vx; py += (y - py) * k;
    const h = preview.offsetHeight;
    preview.style.transform = `translate(${px + 28}px, ${py - h / 2}px) rotate(${reduce.matches ? 0 : Math.max(-8, Math.min(8, vx * 0.35))}deg)`;
    raf = on || Math.abs(x - px) > 0.5 ? requestAnimationFrame(loop) : 0;
  };
  list.addEventListener('pointermove', (e) => {
    x = e.clientX; y = e.clientY;
    if (!raf) raf = requestAnimationFrame(loop);
  });
  rows.forEach((row) => {
    row.addEventListener('pointerenter', (e) => {
      const src = row.querySelector('.card-media img')?.src;
      if (!src) return;
      if (!on) { px = e.clientX; py = e.clientY; }
      img.src = src;
      tag.textContent = row.querySelector('.doc-state')?.textContent.trim() ?? '';
      on = true;
      preview.classList.add('is-on');
      if (!raf) raf = requestAnimationFrame(loop);
    });
  });
  list.addEventListener('pointerleave', () => { on = false; preview.classList.remove('is-on'); });
}
