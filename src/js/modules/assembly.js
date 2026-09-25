// Visite de l'assemblage : une seule scène 3D (le vrai modèle precision.glb) qui
// accompagne le lecteur du hero jusqu'à la vue éclatée.
//
//  · au chargement, la pièce se « développe » : un plan de balayage orange
//    remplace l'épure filaire par le rendu matière ;
//  · dans le hero, elle flotte dans la colonne de droite et suit le pointeur ;
//  · en défilant, elle glisse au centre de la section #assemblage (collante),
//    s'éclate, puis chaque composant est isolé à tour de rôle — les autres
//    passent en filaire, comme la commande « Isoler » d'un logiciel de CAO —
//    avec son repère projeté en direct et sa ligne de rappel ;
//  · en fin de visite l'assemblage se referme.
//
// Le canvas est fixe, derrière le contenu (z-index 1) : les sections suivantes,
// opaques et au-dessus, le recouvrent naturellement comme un rideau.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const P = (t, a, b) => clamp((t - a) / (b - a));
const lerp = (a, b, x) => a + (b - a) * x;
const eio = (x) => (x < 0.5 ? 4 * x ** 3 : 1 - Math.pow(-2 * x + 2, 3) / 2);
const eo = (x) => 1 - Math.pow(1 - x, 3);

// pondération du récit dans la section collante (0 → 1)
const INTRO_END = 0.12;
const STEPS_END = 0.86;

export async function initAssembly({ anchor, tour }) {
  const stage = tour.querySelector('.tour-stage');
  const steps = [...tour.querySelectorAll('.tour-step')];
  const tags = [...tour.querySelectorAll('.tour-tag')];
  const leaders = tour.querySelector('.tour-leaders');
  const counter = tour.querySelector('.tour-count');
  const rail = tour.querySelector('.tour-rail');
  const coarse = matchMedia('(pointer: coarse)').matches;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, coarse ? 1.5 : 1.75));
  renderer.toneMapping = THREE.AgXToneMapping;
  renderer.toneMappingExposure = 1.3;
  renderer.localClippingEnabled = true;
  const canvas = renderer.domElement;
  canvas.className = 'assembly-canvas';
  canvas.setAttribute('aria-hidden', 'true');

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04);
  scene.environment = env.texture;
  scene.environmentIntensity = 1.6;
  pmrem.dispose();
  const key = new THREE.DirectionalLight(0xd8eaff, 4);
  key.position.set(-3, 6, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xffa16a, 3.2);
  rim.position.set(3, 3, -5);
  scene.add(rim);
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);

  const gltf = await new GLTFLoader().loadAsync('/motion/precision.glb');
  const model = gltf.scene;
  model.traverse((o) => { if (/Infinite.studio.floor/.test(o.name)) o.visible = false; });
  scene.add(model);
  const names = ['Rear flange', 'Bearing housing', 'Copper rotor', 'Turbine wheel', 'Front locking collar'];
  const groups = names.map((n) => model.getObjectByName(n.replaceAll(' ', '_')) || model.getObjectByName(n));
  if (groups.some((g) => !g)) throw new Error('Modèle incomplet');

  // Balayage d'apparition : la matière est rognée d'un côté du plan, l'épure de l'autre.
  const solidClip = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0);
  const edgeClip = new THREE.Plane(new THREE.Vector3(1, 0, 0), 0);
  const edgeColor = new THREE.Color('#9bc6e6');
  const parts = groups.map((g) => {
    const solids = [];
    const edges = [];
    g.traverse((o) => {
      if (!o.isMesh) return;
      const mats = (Array.isArray(o.material) ? o.material : [o.material]).map((m) => {
        const c = m.clone();
        c.transparent = true;
        c.clippingPlanes = [solidClip];
        return c;
      });
      o.material = Array.isArray(o.material) ? mats : mats[0];
      solids.push(...mats);
      const line = new THREE.LineSegments(
        new THREE.EdgesGeometry(o.geometry, 28),
        new THREE.LineBasicMaterial({ color: edgeColor, transparent: true, opacity: 0, clippingPlanes: [edgeClip], depthWrite: false })
      );
      o.add(line);
      edges.push(line.material);
    });
    return { g, solids, edges, solid: 1, edge: 0 };
  });
  // boîte des seules pièces : le sol de studio (masqué) est infini
  const box = new THREE.Box3();
  groups.forEach((g) => box.expandByObject(g));

  // anneau de balayage : un disque orange qui traverse la pièce à l'ouverture
  const scan = new THREE.Mesh(
    new THREE.RingGeometry(1.55, 1.6, 96),
    new THREE.MeshBasicMaterial({ color: 0xefa471, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false })
  );
  scan.rotation.y = Math.PI / 2;
  scene.add(scan);

  document.body.append(canvas);

  // ---------------------------------------------------------------- état
  let W = 0, H = 0;
  const resize = () => {
    W = innerWidth; H = innerHeight;
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
  };
  resize();
  addEventListener('resize', resize);

  const born = performance.now();
  let pointer = { x: 0, y: 0 }, pointerS = { x: 0, y: 0 };
  let running = false, raf = 0, paused = false, lastT = performance.now(), spin = 0;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;
    pointer = { x: e.clientX / W - 0.5, y: e.clientY / H - 0.5 };
  }, { passive: true });

  const v = new THREE.Vector3();
  const project = (obj, out) => {
    obj.getWorldPosition(v);
    v.project(camera);
    out.x = (v.x * 0.5 + 0.5) * W;
    out.y = (-v.y * 0.5 + 0.5) * H;
    return out;
  };

  let lastActive = -2, ready = false;
  function frame(now) {
    const dt = Math.min((now - lastT) / 1000, 0.05);
    lastT = now;
    if (!paused && !reduce.matches) spin += dt;
    pointerS.x += (pointer.x - pointerS.x) * Math.min(1, dt * 4);
    pointerS.y += (pointer.y - pointerS.y) * Math.min(1, dt * 4);

    // ---- où en est le lecteur ?
    const a = anchor.getBoundingClientRect();
    const tr = tour.getBoundingClientRect();
    const glide = eio(P(H - tr.top, H * 0.3, H)); // 0 : dans le hero · 1 : section collante atteinte
    const t = P(-tr.top, 0, tr.height - H); // avancement dans la visite
    const wide = W > 900;

    // position et taille à l'écran de la pièce
    // la pièce quitte le hero avec lui, mais reste dans le haut de l'écran
    const heroX = a.left + a.width / 2, heroY = Math.max(a.top + a.height / 2, H * 0.3);
    const tourX = wide ? W * 0.66 : W * 0.5, tourY = wide ? H * 0.5 : H * 0.34;
    // en sortie de section, la pièce part avec elle au lieu de rester fixe
    const cx = lerp(heroX, tourX, glide), cy = lerp(heroY, tourY, glide) + Math.min(0, tr.bottom - H);
    // part de la largeur d'écran occupée par la pièce
    const heroFrac = (a.width / W) * 0.95;
    const tourFrac = wide ? 0.46 : 0.95;
    const frac = lerp(heroFrac, tourFrac, glide);

    // ---- ouverture de l'assemblage et composant isolé
    const introOpen = 0.45 + 0.1 * Math.sin(spin * 0.6);
    const open = lerp(introOpen, 1, eio(P(t, 0.02, INTRO_END))) * (1 - eio(P(t, STEPS_END + 0.02, 0.98))) +
      0.05 * eio(P(t, STEPS_END + 0.02, 0.98));
    const stepF = P(t, INTRO_END, STEPS_END) * steps.length;
    const active = t > INTRO_END && t < STEPS_END ? Math.min(steps.length - 1, Math.floor(stepF)) : -1;

    groups.forEach((g, i) => {
      g.position.x = (i - 2) * (0.44 + 1.05 * open);
      g.rotation.x = i === 3 ? spin * 0.7 : 0.1 * Math.sin(spin * 0.8 + i);
    });

    // ---- caméra : orbite lente, parallaxe au pointeur, zoom sur le composant actif
    const focus = active >= 0 ? groups[active].position.x * 0.35 : 0;
    const az = lerp(0.62 + pointerS.x * 0.35, lerp(0.95, 0.12, t), glide) + (reduce.matches ? 0 : Math.sin(spin * 0.15) * 0.05);
    const el = lerp(0.38 - pointerS.y * 0.2, lerp(0.42, 0.22, t), glide);
    // largeur réelle de l'assemblage ouvert (écartement + épaisseur des pièces)
    const modelW = 4 * (0.44 + 1.05 * Math.max(open, 0.55)) + 1.4;
    const tanH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const dist = (modelW / (frac * 2 * tanH * (W / H))) * (active >= 0 ? 0.88 : 1);
    camera.position.set(focus + Math.sin(az) * Math.cos(el) * dist, Math.sin(el) * dist, Math.cos(az) * Math.cos(el) * dist);
    camera.lookAt(focus, 0, 0);
    // décale le cadrage pour poser l'origine au point (cx, cy) de l'écran
    camera.setViewOffset(W, H, W / 2 - cx, H / 2 - cy, W, H);
    camera.updateProjectionMatrix();

    // lumière de coupe qui suit le pointeur
    key.position.set(-3 + pointerS.x * 8, 6 - pointerS.y * 4, 5);

    // ---- balayage d'apparition (une seule fois, ~2 s)
    const age = (now - born) / 1000;
    const sweep = reduce.matches ? 1 : eio(P(age, 0.25, 2.2));
    const sx = lerp(box.min.x - 1.2, box.max.x + 1.2, sweep);
    solidClip.constant = sx;
    edgeClip.constant = -sx;
    scan.position.x = sx;
    scan.material.opacity = sweep > 0 && sweep < 1 ? 0.9 : 0;

    // ---- isolation : l'actif en matière, les autres en épure
    parts.forEach((p, i) => {
      const isoOn = active >= 0;
      const targetSolid = isoOn && i !== active ? 0.08 : 1;
      const targetEdge = sweep < 1 ? 0.85 : isoOn && i !== active ? 0.55 : 0;
      p.solid += (targetSolid - p.solid) * Math.min(1, dt * 6);
      p.edge += (targetEdge - p.edge) * Math.min(1, dt * 6);
      p.solids.forEach((m) => { m.opacity = p.solid; m.depthWrite = p.solid > 0.5; });
      p.edges.forEach((m) => { m.opacity = p.edge; });
    });

    renderer.render(scene, camera);

    // ---- surcouche HTML : repères projetés et lignes de rappel
    tour.style.setProperty('--t', t.toFixed(4));
    stage.dataset.phase = t < INTRO_END ? 'intro' : t < STEPS_END ? 'steps' : 'outro';
    if (active !== lastActive) {
      steps.forEach((s, i) => s.classList.toggle('is-active', i === active));
      tags.forEach((s, i) => s.classList.toggle('is-active', i === active));
      const shown = active >= 0 ? active : t >= STEPS_END ? steps.length - 1 : 0;
      counter.textContent = `${String(shown + 1).padStart(2, '0')} / ${String(steps.length).padStart(2, '0')}`;
      lastActive = active;
    }
    rail.style.transform = `scaleX(${P(t, INTRO_END, STEPS_END)})`;
    const showTags = glide > 0.98 && t > 0.06 && t < STEPS_END + 0.01;
    const sr = stage.getBoundingClientRect();
    let d = '';
    tags.forEach((tag, i) => {
      const pt = project(groups[i], { x: 0, y: 0 });
      const lx = pt.x - sr.left, ly = pt.y - sr.top;
      const up = i % 2 === 0;
      const reach = wide ? 0.26 : 0.13;
      const ty = up ? ly - H * reach : ly + H * reach;
      tag.style.transform = `translate(${lx}px, ${ty}px) translate(-50%, ${up ? '-100%' : '0'})`;
      tag.style.opacity = showTags ? (active < 0 || i === active ? 1 : 0.35) : 0;
      if (showTags) d += `M${lx} ${ly}L${lx} ${up ? ty + 6 : ty - 6}`;
    });
    leaders.setAttribute('d', d);

    if (!ready) { ready = true; document.body.classList.add('assembly-ready'); }
    if (running) raf = requestAnimationFrame(frame);
  }

  // ne rend que lorsque la scène est visible
  const visible = new Set();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
    sync();
  });
  io.observe(anchor.closest('.hero'));
  io.observe(tour);
  const sync = () => {
    const on = visible.size > 0 && !document.hidden;
    canvas.classList.toggle('is-off', visible.size === 0);
    if (on && !running) { running = true; lastT = performance.now(); raf = requestAnimationFrame(frame); }
    if (!on && running) { running = false; cancelAnimationFrame(raf); }
  };
  document.addEventListener('visibilitychange', sync);
  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    running = false;
    cancelAnimationFrame(raf);
    canvas.remove();
    document.body.classList.remove('assembly-live', 'assembly-ready');
  });
  document.body.classList.add('assembly-live');
  sync();

  return {
    togglePause() { paused = !paused; return paused; },
  };
}
