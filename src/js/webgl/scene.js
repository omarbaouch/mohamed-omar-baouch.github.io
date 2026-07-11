// Blob 3D subtil du hero : icosphère déformée par bruit simplex, matériau mat
// ton sur ton. Le div .hero-blob (dégradé CSS) reste le fallback : on ne le
// remplace que si le rendu WebGL démarre réellement.
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  IcosahedronGeometry,
  MeshStandardMaterial,
  Mesh,
  AmbientLight,
  DirectionalLight,
  Color,
} from 'three';
import { SimplexNoise } from 'three/examples/jsm/math/SimplexNoise.js';

export function canRunWebGL() {
  if ((navigator.hardwareConcurrency || 0) < 4) return false;
  try {
    const c = document.createElement('canvas');
    return Boolean(c.getContext('webgl2'));
  } catch {
    return false;
  }
}

export function initBlobScene() {
  const host = document.querySelector('.hero-blob');
  if (!host || !canRunWebGL()) return null;

  const size = host.getBoundingClientRect();
  if (size.width < 40) return null;

  const scene = new Scene();
  const camera = new PerspectiveCamera(38, 1, 0.1, 20);
  camera.position.z = 3.9;

  const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(size.width, size.height);

  // couleurs dérivées des tokens du thème courant
  const styles = getComputedStyle(document.documentElement);
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const accent = new Color(styles.getPropertyValue('--accent').trim() || '#2f6e9b');
  const base = new Color(isDark ? '#232a33' : '#dfe5ea');
  base.lerp(accent, isDark ? 0.35 : 0.28);

  // détail 24 ≈ 5,8 k sommets : assez lisse, et la déformation CPU par frame reste légère
  const geometry = new IcosahedronGeometry(1.0, 24);
  const basePositions = Float32Array.from(geometry.attributes.position.array);
  const material = new MeshStandardMaterial({
    color: base,
    roughness: 0.55,
    metalness: 0.04,
  });
  const blob = new Mesh(geometry, material);
  scene.add(blob);

  scene.add(new AmbientLight(0xffffff, isDark ? 0.5 : 0.9));
  const key = new DirectionalLight(0xffffff, isDark ? 1.6 : 1.9);
  key.position.set(2.5, 2.2, 3.5);
  scene.add(key);
  const rim = new DirectionalLight(accent.getHex(), 1.1);
  rim.position.set(-3, -1.5, -2);
  scene.add(rim);

  const noise = new SimplexNoise();
  const pos = geometry.attributes.position;
  const count = pos.count;

  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener('mousemove', (e) => {
    pointer.tx = (e.clientX / window.innerWidth - 0.5) * 0.6;
    pointer.ty = (e.clientY / window.innerHeight - 0.5) * 0.6;
  });

  // le canvas remplace visuellement le dégradé CSS
  const canvas = renderer.domElement;
  canvas.style.cssText = 'position:absolute;inset:0;margin:auto;width:100%;height:100%;';
  host.style.background = 'none';
  host.style.boxShadow = 'none';
  host.style.filter = 'none';
  host.style.borderRadius = '0';
  host.appendChild(canvas);

  let running = true;
  let visible = true;
  let t = 0;

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
  });
  io.observe(host);
  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
  });

  function deform(time) {
    const amp = 0.11;
    const freq = 0.65;
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const x = basePositions[ix];
      const y = basePositions[ix + 1];
      const z = basePositions[ix + 2];
      const n = noise.noise4d(x * freq, y * freq, z * freq, time * 0.22);
      const s = 1 + n * amp;
      pos.array[ix] = x * s;
      pos.array[ix + 1] = y * s;
      pos.array[ix + 2] = z * s;
    }
    pos.needsUpdate = true;
    geometry.computeVertexNormals();
  }

  function frame(now) {
    requestAnimationFrame(frame);
    if (!running || !visible) return;
    t = now * 0.001;
    pointer.x += (pointer.tx - pointer.x) * 0.05;
    pointer.y += (pointer.ty - pointer.y) * 0.05;
    blob.rotation.y = t * 0.16 + pointer.x;
    blob.rotation.x = pointer.y * 0.8 + Math.sin(t * 0.1) * 0.1;
    deform(t);
    renderer.render(scene, camera);
  }
  requestAnimationFrame(frame);

  window.addEventListener('resize', () => {
    const r = host.getBoundingClientRect();
    if (r.width < 10) return;
    renderer.setSize(r.width, r.height);
  });

  return renderer;
}
