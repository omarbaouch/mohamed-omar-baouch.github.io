// Le film du hero — « Du chaos à la source de vérité » : une séquence d'images
// rendue à l'avance (video/hero/) et lue au rythme du défilement, comme une
// vidéo qu'on « scrube ».
//
//  · à l'arrivée, le chaos tourbillonne : des centaines de fichiers aux noms
//    que tout bureau d'études connaît (piece_finale_V3_OK, NE_PAS_TOUCHER…) ;
//  · au défilement, un balayage orange les renomme et les range en registre,
//    le registre se replie en nomenclature, la nomenclature converge en une
//    source unique — les 5 étapes du métier s'affichent en regard.
//
// Fluidité : les images arrivent compressées (du plus grossier au plus fin),
// puis sont décodées À L'AVANCE, hors du fil principal (createImageBitmap),
// dans une fenêtre qui suit le défilement. Le dessin ne décode donc jamais :
// il pose un bitmap déjà prêt. Les bitmaps lointains sont libérés (mémoire).
const U_INTRO = 0.15; // fin de la tempête jouée automatiquement
const INTRO_MS = 2600;
// étapes du métier en regard des phases : renommage, registre, cycle de vie,
// nomenclature, source unique
const STEPS = [[0.265, 0.345], [0.345, 0.44], [0.44, 0.53], [0.53, 0.64], [0.64, 0.81]];

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const P = (t, a, b) => clamp((t - a) / (b - a));
const eio = (x) => (x < 0.5 ? 4 * x ** 3 : 1 - Math.pow(-2 * x + 2, 3) / 2);

export async function initHeroFilm(section) {
  const stage = section.querySelector('.fh-stage');
  const canvas = section.querySelector('.fh-canvas');
  const ctx = canvas.getContext('2d', { alpha: false });
  const steps = [...section.querySelectorAll('.fh-step')];
  const pct = section.querySelector('.fh-pct');
  const idxEl = section.querySelector('.fh-idx');

  const portrait = matchMedia('(max-aspect-ratio: 1/1)').matches;
  const variant = portrait ? 'mob' : 'desk';
  const FW = portrait ? 720 : 1440, FH = portrait ? 1280 : 810;
  const base = `/film/hero/${variant}/`;
  const meta = await fetch(base + 'meta.json').then((r) => r.json());
  const N = meta.frames;
  const introEnd = Math.ceil(U_INTRO * (N - 1));

  // ---------------------------------------------------------------- dessin
  let W = 0, H = 0, bw = FW, bh = FH, want = -1;
  const resize = () => {
    W = stage.clientWidth; H = stage.clientHeight;
    // pas plus de pixels que l'image n'en contient : au-delà, on paie pour rien
    const cover = Math.max(W / FW, H / FH);
    const dpr = Math.min(devicePixelRatio || 1, 2, 1.25 / cover);
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    // les bitmaps sont décodés directement à la taille de dessin
    const k = Math.max(canvas.width / FW, canvas.height / FH);
    bw = Math.round(FW * k); bh = Math.round(FH * k);
    want = -1;
  };

  // ---------------------------------------------------------------- décodage anticipé
  const blobs = new Array(N);
  const bitmaps = new Map(); // index → ImageBitmap prêt à dessiner
  const decoding = new Set();
  const AHEAD = portrait ? 14 : 24, BEHIND = portrait ? 6 : 10, KEEP = AHEAD + BEHIND + 8;
  let resizeOk = true;
  const decode = async (i) => {
    if (bitmaps.has(i) || decoding.has(i) || !blobs[i]) return;
    decoding.add(i);
    try {
      let bmp;
      if (resizeOk) {
        try {
          bmp = await createImageBitmap(blobs[i], { resizeWidth: bw, resizeHeight: bh, resizeQuality: 'high' });
        } catch { resizeOk = false; }
      }
      if (!bmp) bmp = await createImageBitmap(blobs[i]);
      bitmaps.set(i, bmp);
      want = -1;
    } catch { /* image non décodable : ses voisines la remplacent */ }
    decoding.delete(i);
  };
  let center = 0, dir = 1, pending = false;
  const schedule = () => {
    if (pending) return;
    pending = true;
    queueMicrotask(() => {
      pending = false;
      // fenêtre orientée dans le sens du défilement, 3 décodages à la fois
      const list = [];
      for (let k = 0; k <= AHEAD; k++) list.push(center + dir * k);
      for (let k = 1; k <= BEHIND; k++) list.push(center - dir * k);
      let running = decoding.size;
      for (const i of list) {
        if (running >= 3) break;
        if (i < 0 || i >= N || bitmaps.has(i) || decoding.has(i) || !blobs[i]) continue;
        running++;
        decode(i).then(schedule);
      }
      for (const [i, b] of bitmaps) {
        if (Math.abs(i - center) > KEEP) { b.close(); bitmaps.delete(i); }
      }
    });
  };

  // ---------------------------------------------------------------- téléchargement
  // la tempête d'abord, puis tout le film du plus grossier au plus fin
  const order = [];
  const seen = new Set();
  const push = (i) => { if (i < N && !seen.has(i)) { seen.add(i); order.push(i); } };
  for (let i = 0; i <= introEnd; i += 2) push(i);
  for (const step of [8, 4, 2, 1]) for (let i = 0; i < N; i += step) push(i);
  let fetched = 0, firstReady;
  const firstFrame = new Promise((r) => (firstReady = r));
  (async () => {
    let k = 0;
    const worker = async () => {
      while (k < order.length) {
        const i = order[k++];
        try {
          blobs[i] = await (await fetch(`${base}${String(i).padStart(3, '0')}.webp`)).blob();
        } catch { /* image manquante : ses voisines la remplacent */ }
        fetched++;
        pct.textContent = String(Math.round((fetched / N) * 100)).padStart(3, '0');
        if (i === 0) firstReady();
        schedule();
      }
    };
    await Promise.all(Array.from({ length: 6 }, worker));
    section.classList.add('is-loaded');
  })();

  const nearest = (i) => {
    if (bitmaps.has(i)) return i;
    for (let d = 1; d < N; d++) {
      if (bitmaps.has(i - d)) return i - d;
      if (bitmaps.has(i + d)) return i + d;
    }
    return -1;
  };
  const draw = (f) => {
    const i = nearest(Math.round(f));
    if (i < 0 || i === want) return;
    want = i;
    const b = bitmaps.get(i);
    const cw = canvas.width, ch = canvas.height;
    const k = Math.max(cw / b.width, ch / b.height);
    const dw = b.width * k, dh = b.height * k;
    ctx.drawImage(b, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    idxEl.textContent = String(i).padStart(3, '0');
  };

  // ---------------------------------------------------------------- pilotage
  let intro = 0; // avancement de la tempête jouée seule (0 → U_INTRO)
  let shown = 0; // image affichée
  let raf = 0, last = performance.now(), phase = '', activeStep = -2;
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
    // lissage court : le défilement du site est déjà adouci
    shown += (target - shown) * (1 - Math.exp(-dt * 30));
    if (Math.abs(target - shown) < 0.05) shown = target;
    const ci = Math.round(shown);
    if (ci !== center) { dir = ci > center ? 1 : -1; center = ci; schedule(); }
    draw(shown);
    const uu = shown / (N - 1);
    section.style.setProperty('--intro-out', P(uu, 0.165, 0.215).toFixed(3));
    // chapitres : on ne touche au DOM que quand quelque chose change
    const ph = uu < 0.2 ? 'intro' : uu < 0.265 ? 'chapter' : uu < 0.81 ? 'steps' : uu < 0.86 ? 'close' : 'plan';
    if (ph !== phase) { phase = ph; stage.dataset.phase = ph; }
    let active = -1;
    STEPS.forEach(([a, b], i) => { if (uu >= a && uu < b) active = i; });
    if (active !== activeStep) { activeStep = active; steps.forEach((el, i) => el.classList.toggle('is-active', i === active)); }
    raf = requestAnimationFrame(loop);
  };

  // départ : dès que la première image est décodée (au plus tard après 2,5 s).
  // La scène ne prend sa taille définitive (plein écran collant) qu'avec
  // .is-live : on mesure après, puis on suit ses changements de taille.
  section.classList.add('is-live');
  resize();
  new ResizeObserver(() => {
    const w = stage.clientWidth, h = stage.clientHeight;
    if (w !== W || h !== H) {
      resize();
      // les bitmaps décodés à l'ancienne taille sont refaits
      for (const bmp of bitmaps.values()) bmp.close();
      bitmaps.clear();
      schedule();
    }
  }).observe(stage);
  await Promise.race([firstFrame.then(() => decode(0)), new Promise((r) => setTimeout(r, 2500))]);
  section.classList.add('is-playing');
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
