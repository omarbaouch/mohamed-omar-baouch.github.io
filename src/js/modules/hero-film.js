// Le hero — « Du chaos à la source de vérité », calculé EN DIRECT (hero-scene.js)
// au rythme du défilement : chaque pixel de défilement donne une image nouvelle,
// à la fréquence de l'écran (60 ou 120 Hz). Rien à télécharger.
//
//  · à l'arrivée, le chaos tourbillonne : des centaines de fichiers aux noms
//    que tout bureau d'études connaît (piece_finale_V3_OK, NE_PAS_TOUCHER…) ;
//  · au défilement, un balayage orange les renomme et les range en registre,
//    le registre se replie en nomenclature, la nomenclature converge en une
//    source unique — les 5 étapes du métier s'affichent en regard.
//
// Fluidité garantie : si l'appareil peine, la résolution de rendu baisse
// d'elle-même ; on ne redessine que si l'image change ; rien ne tourne hors écran.
import { createHeroScene } from './hero-scene.js';

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
  const steps = [...section.querySelectorAll('.fh-step')];
  const pctEl = section.querySelector('.fh-idx');
  const coarse = matchMedia('(pointer: coarse)').matches;

  // qualité de départ selon l'appareil ; ajustée ensuite à la mesure
  const big = innerWidth * (devicePixelRatio || 1) > 2200;
  const hero = await createHeroScene({ canvas, atlasScale: coarse ? 0.5 : big ? 1 : 0.75 });
  let dpr = Math.min(devicePixelRatio || 1, coarse ? 1.5 : 1.75);
  const MIN_DPR = coarse ? 0.75 : 1;

  let W = 0, H = 0, dirty = true;
  const resize = () => {
    W = stage.clientWidth; H = stage.clientHeight;
    hero.setSize(W, H, dpr);
    dirty = true;
  };

  // ---------------------------------------------------------------- pilotage
  let intro = 0; // avancement de la tempête jouée seule (0 → U_INTRO)
  let shown = 0, lastU = -1;
  let raf = 0, last = performance.now(), phase = '', activeStep = -2, pct = -1, introOut = '';
  // mesure de charge : moyenne glissante du temps entre deux images dessinées
  let avg = 16.7, slow = 0;
  const t0 = performance.now();
  const progress = () => {
    const r = section.getBoundingClientRect();
    return P(-r.top, 0, r.height - innerHeight);
  };
  const loop = (now) => {
    raf = requestAnimationFrame(loop);
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    const p = progress();
    const target = p > 0 ? Math.max(intro, U_INTRO + p * (1 - U_INTRO)) : intro;
    // lissage court : le défilement du site est déjà adouci
    shown += (target - shown) * (1 - Math.exp(-dt * 24));
    if (Math.abs(target - shown) < 1e-4) shown = target;
    const u = shown;
    if (Math.abs(u - lastU) > 1e-5 || dirty || hero.idle(u)) {
      hero.render(u, (now - t0) / 1000);
      lastU = u; dirty = false;
      // résolution adaptative : on descend si l'image dépasse durablement son budget
      avg += (dt * 1000 - avg) * 0.08;
      if (avg > 24 && dpr > MIN_DPR) {
        if (++slow > 20) { dpr = Math.max(MIN_DPR, dpr - 0.25); slow = 0; avg = 16.7; hero.setSize(W, H, dpr); }
      } else slow = 0;
    }
    // variable héritée par tout le hero : ne l'écrire que si elle change
    const io = P(u, 0.165, 0.215).toFixed(3);
    if (io !== introOut) { introOut = io; section.style.setProperty('--intro-out', io); }
    const pc = Math.round(u * 100);
    if (pc !== pct) { pct = pc; pctEl.textContent = String(pc).padStart(3, '0'); }
    // chapitres : on ne touche au DOM que quand quelque chose change
    const ph = u < 0.2 ? 'intro' : u < 0.265 ? 'chapter' : u < 0.81 ? 'steps' : u < 0.86 ? 'close' : 'plan';
    if (ph !== phase) { phase = ph; stage.dataset.phase = ph; }
    let active = -1;
    STEPS.forEach(([a, b], i) => { if (u >= a && u < b) active = i; });
    if (active !== activeStep) { activeStep = active; steps.forEach((el, i) => el.classList.toggle('is-active', i === active)); }
  };

  // la scène prend sa taille définitive (plein écran collant) avec .is-live
  section.classList.add('is-live');
  resize();
  new ResizeObserver(() => { if (stage.clientWidth !== W || stage.clientHeight !== H) resize(); }).observe(stage);
  hero.render(0, 0);
  section.classList.add('is-playing', 'is-loaded');

  const start = performance.now();
  const tick = (now) => {
    intro = U_INTRO * eio(P(now - start, 0, INTRO_MS));
    if (intro < U_INTRO) requestAnimationFrame(tick);
    else section.classList.add('is-intro-done');
  };
  requestAnimationFrame(tick);

  // ne tourne que lorsque le hero est à l'écran
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !raf) { last = performance.now(); dirty = true; raf = requestAnimationFrame(loop); }
    if (!e.isIntersecting && raf) { cancelAnimationFrame(raf); raf = 0; }
  }).observe(section);
  canvas.addEventListener('webglcontextlost', (ev) => {
    ev.preventDefault();
    cancelAnimationFrame(raf); raf = 0;
    section.classList.remove('is-playing');
  });
}
