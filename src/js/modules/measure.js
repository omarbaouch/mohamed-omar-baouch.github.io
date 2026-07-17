// MODE MESURE — l'outil de cotation du site. Activé par « M » ou la palette :
// le curseur devient un réticule de mise en plan et chaque élément survolé
// reçoit ses cotes (lignes d'attache, flèches, largeur × hauteur) comme sur
// un plan SOLIDWORKS. Échap ou « M » pour sortir. Chargé à la demande.

let root = null;
let svg = null;
let hud = null;
let active = false;
let raf = 0;
let px = -1;
let py = -1;

const NS = 'http://www.w3.org/2000/svg';

function lang() {
  return document.documentElement.lang === 'en' ? 'en' : 'fr';
}

function build() {
  root = document.createElement('div');
  root.className = 'mzr';
  root.setAttribute('aria-hidden', 'true');
  svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('class', 'mzr-svg');
  root.appendChild(svg);
  hud = document.createElement('div');
  hud.className = 'mzr-hud';
  root.appendChild(hud);
  document.body.appendChild(root);

  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('scroll', schedule, { passive: true });
}

function onMove(e) {
  px = e.clientX;
  py = e.clientY;
  schedule();
}

function schedule() {
  if (!active || raf) return;
  raf = requestAnimationFrame(() => {
    raf = 0;
    draw();
  });
}

// l'élément « cotable » : le plus profond sous le curseur qui a une taille
// raisonnable (ni la page entière, ni un span d'un demi-caractère)
function pick() {
  if (px < 0) return null;
  root.style.pointerEvents = 'none';
  let el = document.elementFromPoint(px, py);
  while (el && el !== document.body) {
    const r = el.getBoundingClientRect();
    const tooBig = r.width > innerWidth * 0.96 && r.height > innerHeight * 0.92;
    const tooSmall = r.width < 14 || r.height < 10;
    if (!tooBig && !tooSmall) return el;
    el = el.parentElement;
  }
  return null;
}

function line(x1, y1, x2, y2, cls) {
  const l = document.createElementNS(NS, 'line');
  l.setAttribute('x1', x1);
  l.setAttribute('y1', y1);
  l.setAttribute('x2', x2);
  l.setAttribute('y2', y2);
  if (cls) l.setAttribute('class', cls);
  svg.appendChild(l);
}

function label(x, y, text, anchor = 'middle') {
  const t = document.createElementNS(NS, 'text');
  t.setAttribute('x', x);
  t.setAttribute('y', y);
  t.setAttribute('text-anchor', anchor);
  t.textContent = text;
  svg.appendChild(t);
}

function draw() {
  if (!active) return;
  svg.innerHTML = '';
  const W = innerWidth;
  const H = innerHeight;
  // réticule plein écran
  line(0, py, W, py, 'mzr-cross');
  line(px, 0, px, H, 'mzr-cross');

  const el = pick();
  if (!el) return;
  const r = el.getBoundingClientRect();
  const x = Math.round(r.left);
  const y = Math.round(r.top);
  const w = Math.round(r.width);
  const h = Math.round(r.height);

  // contour de l'entité sélectionnée
  const box = document.createElementNS(NS, 'rect');
  box.setAttribute('x', x);
  box.setAttribute('y', y);
  box.setAttribute('width', w);
  box.setAttribute('height', h);
  box.setAttribute('class', 'mzr-box');
  svg.appendChild(box);

  // cote horizontale (au-dessus) : lignes d'attache + ligne de cote + flèches
  const dy = Math.max(14, y - 16);
  line(x, y, x, dy - 6, 'mzr-ext');
  line(x + w, y, x + w, dy - 6, 'mzr-ext');
  line(x, dy, x + w, dy, 'mzr-dim');
  line(x, dy, x + 7, dy - 3.5, 'mzr-dim');
  line(x, dy, x + 7, dy + 3.5, 'mzr-dim');
  line(x + w, dy, x + w - 7, dy - 3.5, 'mzr-dim');
  line(x + w, dy, x + w - 7, dy + 3.5, 'mzr-dim');
  label(x + w / 2, dy - 5, `${w}`);

  // cote verticale (à droite)
  const dx = Math.min(W - 14, x + w + 16);
  line(x + w, y, dx + 6, y, 'mzr-ext');
  line(x + w, y + h, dx + 6, y + h, 'mzr-ext');
  line(dx, y, dx, y + h, 'mzr-dim');
  line(dx, y, dx - 3.5, y + 7, 'mzr-dim');
  line(dx, y, dx + 3.5, y + 7, 'mzr-dim');
  line(dx, y + h, dx - 3.5, y + h - 7, 'mzr-dim');
  line(dx, y + h, dx + 3.5, y + h - 7, 'mzr-dim');
  const vt = document.createElementNS(NS, 'text');
  vt.setAttribute('x', dx + 5);
  vt.setAttribute('y', y + h / 2);
  vt.setAttribute('class', 'mzr-vlabel');
  vt.textContent = `${h}`;
  svg.appendChild(vt);

  // désignation de l'entité, comme un repère de nomenclature
  const section = el.closest('section[id]');
  const ref = `<${el.tagName}>${section ? ` · #${section.id.toUpperCase()}` : ''}`;
  label(x + 4, y + h + 16, ref, 'start');
}

export function toggleMeasure() {
  if (!root) build();
  active = !active;
  root.classList.toggle('is-on', active);
  document.documentElement.classList.toggle('mzr-active', active);
  if (active) {
    hud.textContent =
      lang() === 'en'
        ? 'MEASURE MODE — HOVER TO DIMENSION · ESC TO EXIT'
        : 'MODE MESURE — SURVOLEZ POUR COTER · ÉCHAP POUR SORTIR';
    draw();
  } else {
    svg.innerHTML = '';
  }
}

export function isMeasuring() {
  return active;
}
