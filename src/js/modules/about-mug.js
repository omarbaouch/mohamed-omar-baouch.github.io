// À propos : la tasse se prend à la souris (ou au doigt) et se repose
// n'importe où sur la table. Position en coordonnées de l'image (u = centre,
// v = base), convertie en pixels selon le cadrage réel (object-fit: cover),
// avec une perspective simple : plus la tasse avance vers soi, plus elle
// grossit. À la pose : léger rebond et « tac » de céramique sur le marbre,
// synthétisé par le navigateur (aucun fichier son).
//
// Invitation : lumière chaude, vapeur et mot manuscrit (.ah-mug-fx, au-dessus
// du voile de lecture) suivent la tasse ; tant qu'on ne l'a pas prise, elle
// frémit de temps en temps. Tout s'efface dès la première prise en main.

// géométrie mesurée sur les images (fractions de l'image)
const GEOM = {
  d: {
    w: 221 / 1672, ratio: 196 / 221, // largeur de la tasse, hauteur/largeur
    u: (604 + 110.5) / 1672, v: 911 / 941, // position d'origine
    vMin: 0.905, vMax: 0.985, // surface de la table
    persp: 2.2, // variation d'échelle par unité de profondeur
    blocked: (u, half) => u + half > 0.685, // pas sur l'ordinateur
  },
  m: {
    w: 270 / 941, ratio: 247 / 270,
    u: 135 / 941, v: 1442 / 1672,
    vMin: 0.8, vMax: 0.985,
    persp: 1.6,
    // l'ordinateur occupe la droite : la tasse ne peut y passer que devant lui
    blocked: (u, half, v) => v < 0.93 && u + half > 0.46,
  },
};

let audio = null;
function clink(strength = 1) {
  try {
    audio = audio || new (window.AudioContext || window.webkitAudioContext)();
    if (audio.state === 'suspended') audio.resume();
    const t = audio.currentTime;
    const out = audio.createGain();
    out.gain.value = 0.55 * Math.min(1, 0.35 + strength);
    out.connect(audio.destination);

    // choc sourd du fond de la tasse sur le marbre
    const thud = audio.createOscillator();
    const tg = audio.createGain();
    thud.type = 'sine';
    thud.frequency.setValueAtTime(190, t);
    thud.frequency.exponentialRampToValueAtTime(70, t + 0.09);
    tg.gain.setValueAtTime(0.9, t);
    tg.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    thud.connect(tg).connect(out);
    thud.start(t);
    thud.stop(t + 0.14);

    // tintement bref de la céramique : partiels inharmoniques
    [1870, 2960, 4410].forEach((f, i) => {
      const o = audio.createOscillator();
      const g = audio.createGain();
      o.type = 'sine';
      o.frequency.value = f * (0.98 + Math.random() * 0.04);
      g.gain.setValueAtTime(0.18 / (i + 1), t);
      g.gain.exponentialRampToValueAtTime(0.0008, t + 0.16 + 0.05 * (2 - i));
      o.connect(g).connect(out);
      o.start(t);
      o.stop(t + 0.3);
    });

    // attaque : souffle filtré très court
    const len = Math.floor(audio.sampleRate * 0.03);
    const buf = audio.createBuffer(1, len, audio.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const noise = audio.createBufferSource();
    const bp = audio.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 3200;
    bp.Q.value = 1.2;
    const ng = audio.createGain();
    ng.gain.value = 0.35;
    noise.buffer = buf;
    noise.connect(bp).connect(ng).connect(out);
    noise.start(t);
  } catch {
    // audio indisponible : la tasse se pose en silence
  }
}

export function initAboutMug() {
  const mug = document.querySelector('[data-mug]');
  if (!mug) return;
  const scene = mug.closest('[data-about-scene]');
  const layer = mug.closest('.ah-layer');
  const fill = layer.querySelector('.ah-fill img');
  const reduced = !matchMedia('(prefers-reduced-motion: no-preference)').matches;
  const mobileMq = matchMedia('(max-width: 48rem)');

  const state = { d: null, m: null }; // position choisie par le visiteur, par cadrage
  const geom = () => (mobileMq.matches ? GEOM.m : GEOM.d);
  const key = () => (mobileMq.matches ? 'm' : 'd');
  const pos = () => state[key()] || { u: geom().u, v: geom().v };

  // cadrage réel de l'image dans le calque
  const frame = () => {
    const W = layer.offsetWidth;
    const H = layer.offsetHeight;
    const nw = fill.naturalWidth || (mobileMq.matches ? 941 : 1672);
    const nh = fill.naturalHeight || (mobileMq.matches ? 1672 : 941);
    const r = Math.max(W / nw, H / nh);
    const dw = nw * r;
    const dh = nh * r;
    const [px, py] = getComputedStyle(fill).objectPosition.split(' ').map((v) => parseFloat(v) / 100);
    return { x: (W - dw) * (isNaN(px) ? 0.5 : px), y: (H - dh) * (isNaN(py) ? 0.5 : py), w: dw, h: dh };
  };

  let lift = 0; // hauteur de levée, en fraction de la hauteur de la tasse
  const render = () => {
    const g = geom();
    const { u, v } = pos();
    const f = frame();
    const s = 1 + (v - g.v) * g.persp;
    const w = g.w * f.w * s;
    const h = w * g.ratio;
    const x = f.x + u * f.w - w / 2;
    const y = f.y + v * f.h - h - lift * h;
    mug.style.left = `${x.toFixed(1)}px`;
    mug.style.top = `${y.toFixed(1)}px`;
    mug.style.width = `${w.toFixed(1)}px`;
    // l'ombre reste sur la table : elle descend et s'étale quand la tasse monte
    const shadow = mug.querySelector('.ah-mug-shadow');
    shadow.style.transform = `translateY(${(lift * h).toFixed(1)}px) scale(${(1 + lift * 1.6).toFixed(3)})`;
    shadow.style.opacity = String(Math.max(0.25, 1 - lift * 2.5));
  };

  const clamp = (u, v) => {
    const g = geom();
    v = Math.min(g.vMax, Math.max(g.vMin, v));
    const s = 1 + (v - g.v) * g.persp;
    const half = (g.w * s) / 2;
    u = Math.min(1 - half, Math.max(half, u));
    if (g.blocked(u, half, v)) {
      // se cale contre l'obstacle, du côté d'où l'on vient
      const prev = pos();
      if (!g.blocked(prev.u, half, v)) u = prev.u;
      else if (!g.blocked(u, half, prev.v)) v = prev.v;
      else return prev;
    }
    return { u, v };
  };

  // ------------------------------------------------------------ glisser-déposer
  let drag = null;
  const toImage = (e) => {
    const b = layer.getBoundingClientRect();
    const k = layer.offsetWidth / b.width; // le calque peut être transformé (relief)
    const f = frame();
    return { u: ((e.clientX - b.left) * k - f.x) / f.w, v: ((e.clientY - b.top) * k - f.y) / f.h };
  };

  mug.addEventListener('pointerdown', (e) => {
    if (e.button > 0) return;
    e.preventDefault();
    e.stopPropagation(); // pas de loupe au toucher de la tasse
    mug.setPointerCapture(e.pointerId);
    const p = toImage(e);
    const cur = pos();
    drag = { du: cur.u - p.u, dv: cur.v - p.v, lastV: 0, lastT: performance.now(), lastY: e.clientY };
    mug.classList.add('is-lifted');
    scene?.classList.add('is-dragging');
    known();
    scene?.dispatchEvent(new CustomEvent('mug:grab'));
    animateLift(0.14);
  });

  mug.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const p = toImage(e);
    const now = performance.now();
    drag.lastV = Math.abs(e.clientY - drag.lastY) / Math.max(1, now - drag.lastT);
    drag.lastT = now;
    drag.lastY = e.clientY;
    state[key()] = clamp(p.u + drag.du, p.v + drag.dv);
    render();
  });

  const release = () => {
    if (!drag) return;
    const speed = drag.lastV;
    drag = null;
    mug.classList.remove('is-lifted');
    scene?.classList.remove('is-dragging');
    drop(Math.min(1, 0.4 + speed));
  };
  mug.addEventListener('pointerup', release);
  mug.addEventListener('pointercancel', release);

  // levée et pose animées
  let liftRaf = 0;
  function animateLift(to, done) {
    cancelAnimationFrame(liftRaf);
    if (reduced) { lift = to; render(); done?.(); return; }
    const from = lift;
    const t0 = performance.now();
    const dur = to > from ? 160 : 180;
    const step = (now) => {
      const t = Math.min(1, (now - t0) / dur);
      const e = to > from ? 1 - Math.pow(1 - t, 3) : t * t; // la pose accélère, comme une chute
      lift = from + (to - from) * e;
      render();
      if (t < 1) liftRaf = requestAnimationFrame(step);
      else done?.();
    };
    liftRaf = requestAnimationFrame(step);
  }

  function drop(strength) {
    animateLift(0, () => {
      clink(strength);
      if (reduced) return;
      // petit rebond à l'impact
      animateLift(0.025, () => animateLift(0));
    });
  }

  // ------------------------------------------------------------ clavier
  mug.addEventListener('keydown', (e) => {
    const step = { ArrowLeft: [-0.02, 0], ArrowRight: [0.02, 0], ArrowUp: [0, -0.012], ArrowDown: [0, 0.012] }[e.key];
    if (!step) return;
    e.preventDefault();
    known();
    const cur = pos();
    state[key()] = clamp(cur.u + step[0], cur.v + step[1]);
    render();
  });
  mug.addEventListener('keyup', (e) => {
    if (e.key.startsWith('Arrow')) clink(0.5);
  });

  const labels = {
    fr: 'Tasse : la déplacer sur la table (flèches du clavier)',
    en: 'Mug: move it across the desk (arrow keys)',
  };
  // téléphone : la tasse n'est pas atteignable (sous le titre), hors du parcours clavier
  const syncFocus = () => mug.setAttribute('tabindex', mobileMq.matches ? '-1' : '0');
  mobileMq.addEventListener('change', syncFocus);
  syncFocus();

  const cursorLabels = { fr: 'Déplacer la tasse', en: 'Move the mug' };
  const relabel = () => {
    const l = document.documentElement.lang === 'en' ? 'en' : 'fr';
    mug.setAttribute('aria-label', labels[l]);
    mug.dataset.cursor = cursorLabels[l]; // étiquette courte du curseur du site
  };
  window.addEventListener('langchange', relabel);
  relabel();

  // ------------------------------------------------------------ invitation
  const fx = scene?.querySelector('.ah-mug-fx');
  const media = scene?.querySelector('.ah-media');
  let nudgeT = 0;
  function known() {
    if (scene?.classList.contains('is-mug-known')) return;
    scene?.classList.add('is-mug-known');
    clearTimeout(nudgeT);
    try { sessionStorage.setItem('mugKnown', '1'); } catch { /* stockage indisponible */ }
  }
  try { if (sessionStorage.getItem('mugKnown')) scene?.classList.add('is-mug-known'); } catch { /* idem */ }

  // le calque d'effets épouse la tasse, quelles que soient les transformations
  // des couches (vue éclatée, relief) : recalé à chaque image tant que la
  // scène est à l'écran
  let visible = false;
  let fxRaf = 0;
  const follow = () => {
    fxRaf = 0;
    if (!fx || !media) return;
    const m = media.getBoundingClientRect();
    const b = mug.getBoundingClientRect();
    fx.style.left = `${(b.left - m.left).toFixed(1)}px`;
    fx.style.top = `${(b.top - m.top).toFixed(1)}px`;
    fx.style.width = `${b.width.toFixed(1)}px`;
    fx.style.height = `${b.height.toFixed(1)}px`;
    if (visible) fxRaf = requestAnimationFrame(follow);
  };

  // frémissement : une fois à l'arrivée, puis toutes les 7 s, 4 fois au plus
  let nudges = 0;
  const nudge = () => {
    if (reduced || scene?.classList.contains('is-mug-known') || nudges >= 4) return;
    if (visible && !mobileMq.matches) {
      nudges++;
      mug.classList.remove('is-nudging');
      void mug.offsetWidth; // relance l'animation
      mug.classList.add('is-nudging');
    }
    nudgeT = setTimeout(nudge, 7000);
  };
  mug.addEventListener('animationend', () => mug.classList.remove('is-nudging'));

  if (fx && 'IntersectionObserver' in window) {
    let started = false;
    new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !fxRaf) fxRaf = requestAnimationFrame(follow);
      if (visible && !started) { started = true; nudgeT = setTimeout(nudge, 3200); }
    }).observe(scene);
  }

  new ResizeObserver(render).observe(layer);
  mobileMq.addEventListener('change', render);
  if (!fill.complete) fill.addEventListener('load', render, { once: true });
  render();
}
