// À propos : entrée du portrait en situation quand il arrive à l'écran —
// contenu qui monte, cote qui se trace, chiffres qui défilent jusqu'à leur
// valeur. Sans JS ou en mouvement réduit, tout est affiché d'emblée : la
// classe .is-armed (qui cache avant l'entrée) n'est posée que si on anime.
//
// « Vue plan » : une loupe suit le pointeur et révèle la photo convertie en
// dessin technique (contours calculés en direct par un filtre de Sobel, trame
// de plan, réticule et coordonnées). Rien à télécharger en plus ; le calcul
// n'a lieu qu'une fois, au premier besoin, et la boucle d'affichage s'arrête
// dès que la loupe est immobile.

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

// ------------------------------------------------------------- dessin technique
const INK = [155, 198, 230]; // bleu acier du site
function blueprintOf(img) {
  const W = 900;
  const H = Math.round((W * img.naturalHeight) / img.naturalWidth);
  const src = document.createElement('canvas');
  src.width = W;
  src.height = H;
  const g = src.getContext('2d', { willReadFrequently: true });
  g.drawImage(img, 0, 0, W, H);
  const px = g.getImageData(0, 0, W, H).data;
  const raw = new Float32Array(W * H);
  for (let i = 0; i < W * H; i++) raw[i] = px[i * 4] * 0.299 + px[i * 4 + 1] * 0.587 + px[i * 4 + 2] * 0.114;
  // léger flou 3×3 : des traits nets plutôt que le grain des cheveux et du tissu
  const lum = new Float32Array(W * H);
  for (let y = 1; y < H - 1; y++) {
    for (let x = 1; x < W - 1; x++) {
      const i = y * W + x;
      lum[i] = (raw[i - W - 1] + raw[i - W] + raw[i - W + 1] + raw[i - 1] + raw[i] + raw[i + 1] + raw[i + W - 1] + raw[i + W] + raw[i + W + 1]) / 9;
    }
  }

  const out = g.createImageData(W, H);
  const o = out.data;
  for (let y = 1; y < H - 1; y++) {
    for (let x = 1; x < W - 1; x++) {
      const i = y * W + x;
      const gx = -lum[i - W - 1] - 2 * lum[i - 1] - lum[i + W - 1] + lum[i - W + 1] + 2 * lum[i + 1] + lum[i + W + 1];
      const gy = -lum[i - W - 1] - 2 * lum[i - W] - lum[i - W + 1] + lum[i + W - 1] + 2 * lum[i + W] + lum[i + W + 1];
      const m = Math.min(1, Math.max(0, (Math.hypot(gx, gy) - 26) / 120));
      const a = Math.pow(m, 0.7);
      const j = i * 4;
      // fond de plan bleu nuit, traits bleu acier
      o[j] = 11 + (INK[0] - 11) * a;
      o[j + 1] = 20 + (INK[1] - 20) * a;
      o[j + 2] = 34 + (INK[2] - 34) * a;
      o[j + 3] = 255;
    }
  }
  g.putImageData(out, 0, 0);

  // trame de plan : grille fine + grille majeure
  g.lineWidth = 1;
  for (const [step, alpha] of [[18, 0.06], [90, 0.14]]) {
    g.strokeStyle = `rgba(155,198,230,${alpha})`;
    g.beginPath();
    for (let x = 0.5; x < W; x += step) { g.moveTo(x, 0); g.lineTo(x, H); }
    for (let y = 0.5; y < H; y += step) { g.moveTo(0, y); g.lineTo(W, y); }
    g.stroke();
  }
  return src;
}

// position de l'image affichée (object-fit: cover + object-position)
function coverRect(img, w, h) {
  const r = Math.max(w / img.naturalWidth, h / img.naturalHeight);
  const dw = img.naturalWidth * r;
  const dh = img.naturalHeight * r;
  const [px, py] = getComputedStyle(img).objectPosition.split(' ').map((v) => parseFloat(v) / 100);
  return { x: (w - dw) * (isNaN(px) ? 0.5 : px), y: (h - dh) * (isNaN(py) ? 0.5 : py), w: dw, h: dh };
}

function initBlueprintLens(scene) {
  const media = scene.querySelector('.ah-media');
  if (!media) return;
  const canvas = document.createElement('canvas');
  canvas.className = 'ah-lens';
  canvas.setAttribute('aria-hidden', 'true');
  media.querySelector('.ah-shade').before(canvas);
  const ctx = canvas.getContext('2d');
  const label = () => (document.documentElement.lang === 'en' ? 'PLAN VIEW' : 'VUE PLAN');

  let W = 0, H = 0, dpr = 1;
  let plan = null, planFor = null;
  let target = { x: 0, y: 0 }, pos = { x: 0, y: 0 };
  let radius = 0, radiusTarget = 0;
  let raf = 0, auto = null;

  const visibleImg = () => [...scene.querySelectorAll('.ah-pic img')].find((i) => i.offsetParent !== null && i.complete && i.naturalWidth);
  const ensurePlan = () => {
    const img = visibleImg();
    if (!img) return null;
    const key = img.currentSrc;
    if (planFor !== key) { plan = blueprintOf(img); planFor = key; }
    return img;
  };
  const resize = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = media.clientWidth;
    H = media.clientHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    draw();
  };

  function draw() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    if (radius < 1) return;
    const img = ensurePlan();
    if (!img || !plan) return;
    const r = coverRect(img, W, H);
    const { x, y } = pos;

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(plan, r.x, r.y, r.w, r.h);
    ctx.restore();

    // réticule de CAO
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(239,164,113,.95)';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(155,198,230,.55)';
    ctx.beginPath();
    ctx.arc(x, y, radius + 7, -0.35, 0.35);
    ctx.arc(x, y, radius + 7, Math.PI - 0.35, Math.PI + 0.35);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(239,164,113,.9)';
    ctx.beginPath();
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      ctx.moveTo(x + dx * (radius - 10), y + dy * (radius - 10));
      ctx.lineTo(x + dx * (radius + 16), y + dy * (radius + 16));
    }
    ctx.moveTo(x - 5, y); ctx.lineTo(x + 5, y);
    ctx.moveTo(x, y - 5); ctx.lineTo(x, y + 5);
    ctx.stroke();

    // coordonnées normalisées dans l'image
    const u = Math.min(1, Math.max(0, (x - r.x) / r.w));
    const v = Math.min(1, Math.max(0, (y - r.y) / r.h));
    ctx.font = '500 10px ui-monospace, "SF Mono", Menlo, monospace';
    ctx.fillStyle = 'rgba(241,243,245,.92)';
    const tx = x + radius * 0.72 + 12;
    const ty = y + radius * 0.72 + 14;
    ctx.fillText(label(), tx, ty);
    ctx.fillStyle = 'rgba(155,198,230,.9)';
    ctx.fillText(`X ${u.toFixed(3)}  Y ${v.toFixed(3)}`, tx, ty + 14);
  }

  const loop = () => {
    raf = 0;
    const k = 0.18;
    pos.x += (target.x - pos.x) * k;
    pos.y += (target.y - pos.y) * k;
    radius += (radiusTarget - radius) * 0.14;
    draw();
    const moving = Math.abs(target.x - pos.x) > 0.3 || Math.abs(target.y - pos.y) > 0.3 || Math.abs(radiusTarget - radius) > 0.3;
    if (moving) raf = requestAnimationFrame(loop);
    else if (radiusTarget === 0) { radius = 0; draw(); }
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
  const lensSize = () => Math.max(70, Math.min(150, W * 0.11));

  // parallaxe légère : la photo et la loupe reçoivent la même transformation
  // (voir .ah-pic, .ah-lens), le dessin reste donc calé sur le visage
  const SCALE = 1.03;
  let shift = { x: 0, y: 0 };
  const tilt = (nx, ny) => {
    shift = { x: -nx * 10, y: -ny * 6 };
    scene.style.setProperty('--ah-px', `${shift.x.toFixed(2)}px`);
    scene.style.setProperty('--ah-py', `${shift.y.toFixed(2)}px`);
  };

  const place = (e) => {
    const b = media.getBoundingClientRect();
    const mx = e.clientX - b.left;
    const my = e.clientY - b.top;
    tilt(mx / b.width - 0.5, my / b.height - 0.5);
    // point écran → repère de la photo transformée
    target = { x: W / 2 + (mx - W / 2 - shift.x) / SCALE, y: H / 2 + (my - H / 2 - shift.y) / SCALE };
    if (radius < 1) pos = { ...target };
  };

  // souris : la loupe suit le pointeur tant qu'il survole la photo
  scene.addEventListener('pointerenter', (e) => {
    if (e.pointerType !== 'mouse') return;
    if (auto) { cancelAnimationFrame(auto); auto = null; }
    place(e);
    radiusTarget = lensSize();
    kick();
  });
  scene.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse' && radiusTarget === 0) return;
    place(e);
    kick();
  });
  scene.addEventListener('pointerleave', (e) => {
    if (e.pointerType !== 'mouse') return;
    radiusTarget = 0;
    tilt(0, 0);
    kick();
  });
  // toucher : la loupe se pose au point touché, puis se referme
  let closeT = 0;
  scene.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse') return;
    place(e);
    radiusTarget = lensSize();
    kick();
    clearTimeout(closeT);
    if (auto) { cancelAnimationFrame(auto); auto = null; }
    closeT = setTimeout(() => { radiusTarget = 0; tilt(0, 0); kick(); }, 2400);
  });

  // démonstration à l'arrivée : la loupe passe seule sur le portrait
  const demo = () => {
    const img = ensurePlan();
    if (!img) return;
    const r = coverRect(img, W, H);
    const from = { x: r.x + r.w * 0.5, y: r.y + r.h * 0.62 };
    const to = { x: r.x + r.w * 0.66, y: r.y + r.h * 0.3 };
    const t0 = performance.now();
    radiusTarget = lensSize();
    pos = { ...from };
    const step = (now) => {
      const t = Math.min(1, (now - t0) / 2200);
      const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      target = { x: from.x + (to.x - from.x) * e, y: from.y + (to.y - from.y) * e };
      kick();
      if (t < 1) auto = requestAnimationFrame(step);
      else { auto = null; setTimeout(() => { if (!auto && !scene.matches(':hover')) { radiusTarget = 0; kick(); } }, 900); }
    };
    auto = requestAnimationFrame(step);
  };

  new ResizeObserver(resize).observe(media);
  window.addEventListener('langchange', () => { planFor = null; draw(); });
  resize();
  return { demo };
}

export function initAboutScene() {
  const scene = document.querySelector('[data-about-scene]');
  if (!scene || !('IntersectionObserver' in window)) return;
  if (!matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
  scene.classList.add('is-armed');
  const lens = initBlueprintLens(scene);
  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      scene.classList.add('is-in');
      setTimeout(() => scene.querySelectorAll('[data-count]').forEach(countUp), 500);
      // l'image doit être chargée avant la démonstration
      const img = [...scene.querySelectorAll('.ah-pic img')].find((i) => i.offsetParent !== null);
      const go = () => setTimeout(() => lens?.demo(), 1300);
      if (img && !img.complete) img.addEventListener('load', go, { once: true });
      else go();
      io.disconnect();
    },
    { threshold: 0.3 }
  );
  io.observe(scene);
}
