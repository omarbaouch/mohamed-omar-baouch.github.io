// Le film du hero : une séquence d'images rendue à l'avance (video/hero/) et lue
// au rythme du défilement, comme une vidéo qu'on « scrube » au doigt.
//
//  · à l'arrivée, l'intro se joue seule : l'épure filaire est balayée par
//    l'anneau orange et la pièce prend matière ;
//  · ensuite chaque pixel de défilement avance le film : éclatement, travelling
//    macro sur les 5 composants (les étapes du métier s'affichent en regard),
//    refermeture, puis retour à la mise en plan où les chiffres clés se posent
//    comme des cotes.
//
// Les images arrivent du plus grossier au plus fin (1 sur 8, puis 1 sur 4…) :
// le film est « scrubable » presque tout de suite, puis s'affine.
const U_INTRO = 0.15; // fin de la révélation jouée automatiquement
const INTRO_MS = 2600;

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const P = (t, a, b) => clamp((t - a) / (b - a));
const eio = (x) => (x < 0.5 ? 4 * x ** 3 : 1 - Math.pow(-2 * x + 2, 3) / 2);

export async function initHeroFilm(section) {
  const stage = section.querySelector('.fh-stage');
  const canvas = section.querySelector('.fh-canvas');
  const ctx = canvas.getContext('2d');
  const steps = [...section.querySelectorAll('.fh-step')];
  const pct = section.querySelector('.fh-pct');
  const idxEl = section.querySelector('.fh-idx');
  const svg = section.querySelector('.fh-dimlines');
  const stats = [...section.querySelectorAll('.hero-stat')];

  const variant = matchMedia('(max-aspect-ratio: 1/1)').matches ? 'mob' : 'desk';
  const base = `/film/hero/${variant}/`;
  const meta = await fetch(base + 'meta.json').then((r) => r.json());
  const N = meta.frames;
  const imgs = new Array(N);
  const ready = new Uint8Array(N);
  let loaded = 0;

  // ordre de chargement : l'intro d'abord, puis du grossier au fin
  const order = [];
  const seen = new Set();
  const push = (i) => { if (i < N && !seen.has(i)) { seen.add(i); order.push(i); } };
  const introEnd = Math.ceil(U_INTRO * (N - 1));
  for (let i = 0; i <= introEnd; i++) push(i);
  for (const step of [8, 4, 2, 1]) for (let i = 0; i < N; i += step) push(i);
  const introFrames = order.slice(0, introEnd + 1);

  let introReady = null;
  const introDone = new Promise((r) => (introReady = r));
  let introCount = 0;
  const load = (i) => new Promise((resolve) => {
    const im = new Image();
    im.decoding = 'async';
    im.onload = () => {
      imgs[i] = im; ready[i] = 1; loaded++;
      if (i <= introEnd && ++introCount === introFrames.length) introReady();
      pct.textContent = String(Math.round((loaded / N) * 100)).padStart(3, '0');
      if (loaded === N) section.classList.add('is-loaded');
      want = -1; // force un redessin
      resolve();
    };
    im.onerror = resolve;
    im.src = `${base}${String(i).padStart(3, '0')}.webp`;
  });
  // 6 téléchargements en parallèle, dans l'ordre voulu
  (async () => {
    let k = 0;
    const worker = async () => { while (k < order.length) await load(order[k++]); };
    await Promise.all(Array.from({ length: 6 }, worker));
  })();

  // ---------------------------------------------------------------- dessin
  let W = 0, H = 0, dpr = 1;
  const resize = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = stage.clientWidth; H = stage.clientHeight;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    want = -1;
    layoutDims();
  };
  // couverture du cadre (comme object-fit: cover) : sert au dessin et aux cotes
  // en portrait, le dessin final descend un peu pour laisser la place au titre
  let planDrop = 0;
  const cover = (drop = planDrop) => {
    const fw = variant === 'mob' ? 720 : 1600, fh = variant === 'mob' ? 1280 : 900;
    const s = Math.max(W / fw, H / fh);
    const dy = variant === 'mob' ? H * 0.07 * drop : 0;
    return { s, w: fw * s, h: fh * s, x: (W - fw * s) / 2, y: (H - fh * s) / 2 + dy };
  };
  const nearest = (i) => {
    if (ready[i]) return i;
    for (let d = 1; d < N; d++) {
      if (i - d >= 0 && ready[i - d]) return i - d;
      if (i + d < N && ready[i + d]) return i + d;
    }
    return -1;
  };
  let want = -1, drawnDrop = -1;
  const draw = (f) => {
    const i = nearest(Math.round(f));
    if (i < 0 || (i === want && drawnDrop === planDrop)) return;
    want = i; drawnDrop = planDrop;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const c = cover();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.drawImage(imgs[i], c.x, c.y, c.w, c.h);
    idxEl.textContent = String(i).padStart(3, '0');
  };

  // ---------------------------------------------------------------- cotes de la mise en plan
  // Les chiffres clés deviennent les cotes du dessin final (points exportés au rendu).
  const A = meta.anchors;
  const NS = 'http://www.w3.org/2000/svg';
  function layoutDims() {
    if (!A || !W) return;
    const c = cover(1);
    const pt = ([x, y]) => [c.x + x * c.w, c.y + y * c.h];
    const R = pt(A.right), T = pt(A.top), B = pt(A.bottom), RT = pt(A.rotorTop), HL = pt(A.housingL), HR = pt(A.housingR);
    const EL = pt(A.endL ?? A.left), ER = pt(A.endR ?? A.right);
    const portrait = A.portrait;
    const off = Math.min(W, H) * 0.09;
    // cote = ligne de cote + lignes d'attache + position de l'étiquette
    const specs = portrait
      ? [
          // l'axe est vertical en portrait : peu de place sur les côtés, les étiquettes vont sous le dessin
          { p: [[B[0] + 12, ER[1]], [B[0] + 12, EL[1]]], lab: [B[0] + 12, EL[1] + 34], ext: [[ER, [B[0] + 18, ER[1]]], [EL, [B[0] + 18, EL[1]]]] },
          { p: [[T[0], EL[1] + 16], [B[0], EL[1] + 16]], lab: [T[0], EL[1] + 34], ext: [[T, [T[0], EL[1] + 22]], [B, [B[0], EL[1] + 22]]] },
        ]
      : [
          // encombrement total, sous le dessin
          { p: [[EL[0], B[1] + off], [ER[0], B[1] + off]], lab: [(EL[0] + ER[0]) / 2, B[1] + off + 12], ext: [[[EL[0], EL[1] + 14], [EL[0], B[1] + off + 6]], [[ER[0], ER[1] + 14], [ER[0], B[1] + off + 6]]] },
          // diamètre de bride, à droite
          { p: [[ER[0] + off * 0.7, T[1]], [ER[0] + off * 0.7, B[1]]], lab: [ER[0] + off * 0.7 + 14, (T[1] + B[1]) / 2], ext: [[[R[0], T[1]], [ER[0] + off * 0.7 + 6, T[1]]], [[R[0], B[1]], [ER[0] + off * 0.7 + 6, B[1]]]] },
          // repère du rotor
          { p: [RT, [RT[0] + off * 1.6, T[1] - off * 0.35]], lab: [RT[0] + off * 1.6 + 10, T[1] - off * 0.35], ext: [], leader: true },
          // largeur du palier
          { p: [[HL[0], HL[1] + off * 0.6], [HR[0], HR[1] + off * 0.6]], lab: [(HL[0] + HR[0]) / 2, HL[1] + off * 0.6 + 12], ext: [[HL, [HL[0], HL[1] + off * 0.6 + 6]], [HR, [HR[0], HR[1] + off * 0.6 + 6]]] },
        ];
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.innerHTML = '';
    stats.forEach((st, i) => {
      const sp = specs[i];
      if (!sp) { st.classList.add('is-free'); return; }
      st.classList.remove('is-free');
      const g = document.createElementNS(NS, 'g');
      const line = (a, b, cls) => {
        const l = document.createElementNS(NS, 'line');
        l.setAttribute('x1', a[0]); l.setAttribute('y1', a[1]); l.setAttribute('x2', b[0]); l.setAttribute('y2', b[1]);
        l.setAttribute('class', cls);
        l.setAttribute('pathLength', '1');
        g.append(l);
      };
      sp.ext.forEach(([a, b]) => line(a, b, 'ext'));
      line(sp.p[0], sp.p[1], sp.leader ? 'lead' : 'dim');
      g.style.setProperty('--d', i * 0.12 + 's');
      svg.append(g);
      st.style.left = `${sp.lab[0]}px`;
      st.style.top = `${sp.lab[1]}px`;
      st.dataset.side = portrait ? (i === 0 ? 'below-end' : 'below-start') : ['below', 'right', 'right', 'below'][i];
    });
  }

  // ---------------------------------------------------------------- pilotage
  let intro = 0; // avancement de l'intro jouée seule (0 → U_INTRO)
  let shown = 0; // image affichée (lissée)
  let raf = 0;
  const progress = () => {
    const r = section.getBoundingClientRect();
    return P(-r.top, 0, r.height - innerHeight);
  };
  const loop = () => {
    const p = progress();
    const u = p > 0 ? Math.max(intro, U_INTRO + p * (1 - U_INTRO)) : intro;
    const target = u * (N - 1);
    shown += (target - shown) * 0.22;
    if (Math.abs(target - shown) < 0.05) shown = target;
    draw(shown);
    const uu = shown / (N - 1);
    section.style.setProperty('--u', uu.toFixed(4));
    planDrop = eio(P(uu, 0.9, 1));
    // chapitres
    const intoCopy = P(uu, 0.17, 0.24);
    section.style.setProperty('--intro-out', intoCopy.toFixed(3));
    stage.dataset.phase = uu < 0.24 ? 'intro' : uu < 0.345 ? 'chapter' : uu < 0.78 ? 'steps' : uu < 0.94 ? 'close' : 'plan';
    // l'étape active suit l'arrêt de la caméra sur chaque pièce (même courbe qu'au rendu)
    const s = P(uu, 0.36, 0.76) * 4;
    const active = uu >= 0.35 && uu < 0.78 ? Math.max(0, Math.min(4, Math.round(s - 0.1))) : -1;
    steps.forEach((el, i) => el.classList.toggle('is-active', i === active));
    raf = requestAnimationFrame(loop);
  };

  // l'intro démarre dès que ses images sont là (ou au plus tard après 4 s)
  await Promise.race([introDone, new Promise((r) => setTimeout(r, 4000))]);
  section.classList.add('is-live');
  resize();
  addEventListener('resize', resize);
  const t0 = performance.now();
  const tick = (now) => {
    intro = U_INTRO * eio(P(now - t0, 0, INTRO_MS));
    if (intro < U_INTRO) requestAnimationFrame(tick);
    else section.classList.add('is-intro-done');
  };
  requestAnimationFrame(tick);

  // ne tourne que lorsque le hero est à l'écran
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !raf) raf = requestAnimationFrame(loop);
    if (!e.isIntersecting && raf) { cancelAnimationFrame(raf); raf = 0; }
  }).observe(section);
}
