// Le film du hero — « Du chaos à la source de vérité » : une séquence d'images
// rendue à l'avance (video/hero/) et lue au rythme du défilement, comme une
// vidéo qu'on « scrube ».
//
//  · à l'arrivée, le chaos tourbillonne : des centaines de fichiers aux noms
//    que tout bureau d'études connaît (piece_finale_V3_OK, NE_PAS_TOUCHER…) ;
//  · au défilement, un balayage orange les renomme et les range en registre,
//    le registre se replie en nomenclature, la nomenclature se condense en
//    produit — les 5 étapes du métier s'affichent en regard.
//
// Les images arrivent du plus grossier au plus fin (1 sur 8, puis 1 sur 4…) :
// le film est « scrubable » presque tout de suite, puis s'affine.
const U_INTRO = 0.15; // fin de la révélation jouée automatiquement
const INTRO_MS = 2600;
// étapes du métier en regard des phases : renommage, registre, cycle de vie,
// nomenclature, produit
const STEPS = [[0.265, 0.345], [0.345, 0.44], [0.44, 0.53], [0.53, 0.64], [0.64, 0.81]];

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
  // l'intro démarre dès qu'une image sur deux est là ; les autres complètent en route
  const introEnd = Math.ceil(U_INTRO * (N - 1));
  for (let i = 0; i <= introEnd; i += 2) push(i);
  const introFrames = order.slice();
  for (const step of [8, 4, 2, 1]) for (let i = 0; i < N; i += step) push(i);

  let introReady = null;
  const introDone = new Promise((r) => (introReady = r));
  let introCount = 0;
  const load = (i) => new Promise((resolve) => {
    const im = new Image();
    im.decoding = 'async';
    im.onload = () => {
      imgs[i] = im; ready[i] = 1; loaded++;
      if (i <= introEnd && i % 2 === 0 && ++introCount === introFrames.length) introReady();
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
  };
  // couverture du cadre, comme object-fit: cover
  const cover = () => {
    const fw = variant === 'mob' ? 720 : 1440, fh = variant === 'mob' ? 1280 : 810;
    const s = Math.max(W / fw, H / fh);
    return { w: fw * s, h: fh * s, x: (W - fw * s) / 2, y: (H - fh * s) / 2 };
  };
  const nearest = (i) => {
    if (ready[i]) return i;
    for (let d = 1; d < N; d++) {
      if (i - d >= 0 && ready[i - d]) return i - d;
      if (i + d < N && ready[i + d]) return i + d;
    }
    return -1;
  };
  let want = -1;
  const draw = (f) => {
    const i = nearest(Math.round(f));
    if (i < 0 || i === want) return;
    want = i;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const c = cover();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.drawImage(imgs[i], c.x, c.y, c.w, c.h);
    idxEl.textContent = String(i).padStart(3, '0');
  };

  // ---------------------------------------------------------------- pilotage
  let intro = 0; // avancement de l'intro jouée seule (0 → U_INTRO)
  let shown = 0; // image affichée (lissée)
  let raf = 0, last = performance.now();
  const progress = () => {
    const r = section.getBoundingClientRect();
    return P(-r.top, 0, r.height - innerHeight);
  };
  const loop = (now = performance.now()) => {
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    const p = progress();
    const u = p > 0 ? Math.max(intro, U_INTRO + p * (1 - U_INTRO)) : intro;
    const target = u * (N - 1);
    // lissage indépendant de la fréquence d'affichage (même rendu à 60 ou 120 Hz)
    shown += (target - shown) * (1 - Math.exp(-dt * 14));
    if (Math.abs(target - shown) < 0.05) shown = target;
    draw(shown);
    const uu = shown / (N - 1);
    section.style.setProperty('--u', uu.toFixed(4));
    section.style.setProperty('--intro-out', P(uu, 0.165, 0.215).toFixed(3));
    // chapitres, calés sur les phases du film
    stage.dataset.phase = uu < 0.2 ? 'intro' : uu < 0.265 ? 'chapter' : uu < 0.81 ? 'steps' : uu < 0.86 ? 'close' : 'plan';
    let active = -1;
    STEPS.forEach(([a, b], i) => { if (uu >= a && uu < b) active = i; });
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
    if (e.isIntersecting && !raf) { last = performance.now(); raf = requestAnimationFrame(loop); }
    if (!e.isIntersecting && raf) { cancelAnimationFrame(raf); raf = 0; }
  }).observe(section);
}
