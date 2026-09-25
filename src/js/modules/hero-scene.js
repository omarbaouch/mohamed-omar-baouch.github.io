// Scène du hero — « Du chaos à la source de vérité ».
// Utilisée en direct par le site (hero-film.js) et hors ligne par le rendu des
// affiches et du film de présentation (video/hero/hero-film.html).
//
//    0.00–0.17  le chaos : des centaines de fichiers en tourbillon, aux noms que tout
//               bureau d'études connaît (piece_finale_V3_OK, NE_PAS_TOUCHER…)
//    0.17–0.40  un balayage orange les renomme un à un (PRT-0042 · RÉV.B · PUBLIÉ),
//               les doublons fusionnent, tout se range en registre
//    0.42–0.62  le registre se replie en rosace : l'arbre de la nomenclature
//    0.63–0.76  toute la nomenclature converge en une seule fiche : la source unique
//    0.76–1.00  la fiche flotte, la donnée rangée gravite autour
//
// Fluidité : aucune allocation dans la boucle de rendu (le ramasse-miettes fait
// saccader), tout ce qui est fixe est précalculé, les tracés sont modifiés en place.
import * as THREE from 'three';
import { LineSegments2 } from 'three/addons/lines/LineSegments2.js';
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const P = (t, a, b) => clamp((t - a) / (b - a));
const lerp = (a, b, x) => a + (b - a) * x;
const eio = (x) => (x < 0.5 ? 4 * x ** 3 : 1 - Math.pow(-2 * x + 2, 3) / 2);
const hash = (i, k = 0) => { const s = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return s - Math.floor(s); };
const V = (x, y, z) => new THREE.Vector3(x, y, z);
const MONO = 'ui-monospace, "SF Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace';
const SANS = '"Instrument Sans Variable", "Instrument Sans", system-ui, sans-serif';

// ---------------------------------------------------------------- les fichiers
const CHAOS_BASE = [
  'piece_finale', 'piece_finale_V2', 'piece_finale_V2_OK', 'piece_finale_V3_def', 'NE_PAS_TOUCHER',
  'Copie de support', 'support (2)', 'support_modif_jean', 'plan_client_VRAI', 'ASSEMBLAGE_GENERAL_old',
  'bride_v7_final_final', 'test', 'test2', 'Nouveau document', 'carter_ok_marc', 'arbre_moteur_BON',
  'a_valider_URGENT', 'capot_v4 (conflit)', 'rev_C_ou_D', 'piece_sans_nom_12', 'Copie de Copie de platine',
  'ancien_NE_PLUS_UTILISER', 'moteur_v2_bis', 'chassis_def_OK2', 'support_final_v9', 'tole_pliee_v3',
  'ASM_client_modif', 'plan_A3_imprime', 'axe_BON_celui_la', 'embase (copie)', 'couvercle_vieux',
  'SAV_2019_reprise', 'bati_version_marc', 'flasque_ok_ok', 'vis_speciale_v5', 'ressort_test_final',
];
const EXT = ['.SLDPRT', '.SLDASM', '.SLDDRW', '.SLDPRT', '.SLDPRT', '.xlsx', '.pdf', '.STEP'];
const DESIGNATIONS = [
  'Bride arrière', 'Palier', 'Rotor cuivre', 'Turbine', 'Bague de blocage', 'Arbre moteur', 'Carter', 'Support moteur',
  'Platine', 'Capot', 'Châssis', 'Embase', 'Flasque', 'Couvercle', 'Axe', 'Tôle pliée', 'Entretoise', 'Joint',
  'Roulement', 'Équerre', 'Glissière', 'Vérin', 'Pignon', 'Moyeu', 'Clavette', 'Goupille', 'Rondelle', 'Écrou frein',
];
const SUBS = ['Fondations CAO', 'Coffre PDM', 'Workflows', 'Intégration ERP', 'Adoption'];
const COLS = 8, ROWS = 37;
const SLOTS = COLS * ROWS; // 296 cases par planche
const BASE_W = 512, BASE_H = 108; // case de référence (les planches sont réduites selon l'appareil)
const box = (g, x, y, w, h, r) => { g.beginPath(); g.roundRect(x, y, w, h, r); };

function atlas(draw, R, maxAniso) {
  const cw = Math.round(BASE_W * R), ch = Math.round(BASE_H * R);
  const c = document.createElement('canvas');
  c.width = COLS * cw; c.height = ROWS * ch;
  const g = c.getContext('2d');
  for (let s = 0; s < SLOTS; s++) {
    g.setTransform(R, 0, 0, R, (s % COLS) * cw, Math.floor(s / COLS) * ch);
    draw(g, s);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = maxAniso;
  return t;
}
function drawChaos(g, s) {
  const suffix = s >= CHAOS_BASE.length ? ['', '_v' + (2 + (s % 7)), ' (' + (1 + (s % 4)) + ')', '_OK', '_def'][s % 5] : '';
  const name = CHAOS_BASE[s % CHAOS_BASE.length] + suffix + EXT[s % EXT.length];
  const hot = hash(s, 3) < 0.14; // conflit, doublon, verrou perdu
  box(g, 6, 6, BASE_W - 12, BASE_H - 12, 10);
  g.fillStyle = hot ? '#2a1710' : '#121b28'; g.fill();
  g.lineWidth = 2; g.strokeStyle = hot ? '#c65a1e' : '#2c3a4d'; g.stroke();
  g.fillStyle = hot ? '#efa471' : '#6d7f95';
  g.fillRect(26, 30, 30, 40);
  g.fillStyle = hot ? '#2a1710' : '#121b28'; g.fillRect(44, 30, 12, 12);
  g.font = `500 28px ${MONO}`;
  g.fillStyle = hot ? '#ffd8bd' : '#c9d4e0';
  g.fillText(name.length > 27 ? name.slice(0, 26) + '…' : name, 76, 60);
  g.font = `18px ${MONO}`;
  g.fillStyle = hot ? '#efa471' : '#6d7f95';
  g.fillText(hot ? ['⚠ CONFLIT DE VERSION', '⚠ DOUBLON', '⚠ VERROUILLÉ PAR ?', '⚠ RÉFÉRENCE INTROUVABLE'][s % 4]
    : `modifié le ${1 + (s % 28)}/0${1 + (s % 9)} · ${['?', 'jean', 'marc', 'stagiaire', 'inconnu'][s % 5]}`, 76, 88);
}
const cleanName = (s) => {
  if (s === 0) return { code: 'ASM-BAOUCH', des: 'Produit · source unique', rev: '2026' };
  if (s <= 5) return { code: `ASM-0${s}`, des: SUBS[s - 1], rev: 'C' };
  const kind = s % 9 === 0 ? 'DRW' : s % 5 === 0 ? 'ASM' : 'PRT';
  return { code: `${kind}-${String(1000 + ((s * 37) % 8999)).padStart(4, '0')}`, des: DESIGNATIONS[s % DESIGNATIONS.length], rev: 'ABCDE'[s % 5] };
};
function drawClean(g, s) {
  const n = cleanName(s);
  const top = s <= 5;
  box(g, 6, 6, BASE_W - 12, BASE_H - 12, 10);
  g.fillStyle = top ? '#152a41' : '#0e1b2b'; g.fill();
  g.lineWidth = 2; g.strokeStyle = top ? '#efa471' : '#3f6d93'; g.stroke();
  g.fillStyle = top ? '#efa471' : '#9bc6e6'; g.fillRect(6, 16, 7, BASE_H - 32);
  g.font = `600 31px ${MONO}`;
  g.fillStyle = '#f1f3f5'; g.fillText(n.code, 34, 50);
  g.font = `500 25px ${SANS}`;
  g.fillStyle = '#b6c2d0'; g.fillText(n.des, 34, 84);
  g.font = `17px ${MONO}`;
  const chip = `RÉV.${n.rev} · PUBLIÉ`;
  const w = g.measureText(chip).width + 22;
  box(g, BASE_W - w - 20, 22, w, 32, 16);
  g.fillStyle = top ? 'rgba(239,164,113,.18)' : 'rgba(155,198,230,.15)'; g.fill();
  g.fillStyle = top ? '#efa471' : '#9bc6e6'; g.fillText(chip, BASE_W - w - 9, 44);
}
function heroCardTexture(R, maxAniso) {
  const W = 2048, H = 560;
  const c = document.createElement('canvas');
  c.width = Math.round(W * R); c.height = Math.round(H * R);
  const g = c.getContext('2d');
  g.scale(R, R);
  box(g, 8, 8, W - 16, H - 16, 36);
  const bg = g.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#16304a'); bg.addColorStop(1, '#0c1826');
  g.fillStyle = bg; g.fill();
  g.lineWidth = 5; g.strokeStyle = '#efa471'; g.stroke();
  g.fillStyle = '#efa471'; g.fillRect(8, 60, 22, H - 120);
  g.font = `600 64px ${MONO}`;
  g.fillStyle = '#9bc6e6'; g.fillText('ASM-BAOUCH · RÉV.2026', 96, 128);
  g.font = `500 150px ${SANS}`;
  g.fillStyle = '#f4f3f0'; g.fillText('Source unique', 90, 292);
  g.font = `44px ${MONO}`;
  g.fillStyle = '#b6c2d0';
  g.fillText('440 fichiers → 296 références · 144 doublons fusionnés · 0 conflit', 96, 420);
  const chip = '● PUBLIÉ';
  g.font = `600 52px ${MONO}`;
  const w = g.measureText(chip).width + 70;
  box(g, W - w - 70, 70, w, 92, 46);
  g.fillStyle = 'rgba(239,164,113,.18)'; g.fill();
  g.fillStyle = '#efa471'; g.fillText(chip, W - w - 35, 134);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = maxAniso;
  return t;
}
// halo doux (dégradé radial) : remplace un post-traitement « bloom », trop coûteux en direct
function glowTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d');
  const r = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(0.35, 'rgba(255,255,255,.35)'); r.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = r; g.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

// ---------------------------------------------------------------- la scène
export async function createHeroScene({ canvas, atlasScale = 0.75, antialias = true } = {}) {
  if (document.fonts?.load) await Promise.race([document.fonts.load(`500 40px ${SANS}`), new Promise((r) => setTimeout(r, 800))]).catch(() => {});

  const renderer = new THREE.WebGLRenderer({ canvas, antialias, alpha: false, powerPreference: 'high-performance', preserveDrawingBuffer: false });
  renderer.setPixelRatio(1);
  const maxAniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  const scene = new THREE.Scene();
  {
    const c = document.createElement('canvas'); c.width = c.height = 256;
    const g = c.getContext('2d');
    const r = g.createRadialGradient(128, 120, 5, 128, 128, 190);
    r.addColorStop(0, '#15233a'); r.addColorStop(0.55, '#0b1320'); r.addColorStop(1, '#080e18');
    g.fillStyle = r; g.fillRect(0, 0, 256, 256);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
    scene.background = t;
  }
  const camera = new THREE.PerspectiveCamera(35, 16 / 9, 0.05, 500);

  // ---- les cartes (instanciées)
  const N = 440;          // fichiers du chaos
  const KEEP = SLOTS;     // ceux qui survivent ; les autres sont des doublons qui fusionnent
  const CARD_W = 1.1, CARD_H = CARD_W * BASE_H / BASE_W;
  const chaosTex = atlas(drawChaos, atlasScale, maxAniso);
  const cleanTex = atlas(drawClean, atlasScale, maxAniso);
  const cardGeo = new THREE.PlaneGeometry(1, 1);
  const aChaos = new Float32Array(N), aClean = new Float32Array(N), aMix = new Float32Array(N), aAlpha = new Float32Array(N);
  const attr = (arr) => new THREE.InstancedBufferAttribute(arr, 1).setUsage(THREE.DynamicDrawUsage);
  cardGeo.setAttribute('aChaos', new THREE.InstancedBufferAttribute(aChaos, 1));
  cardGeo.setAttribute('aClean', new THREE.InstancedBufferAttribute(aClean, 1));
  cardGeo.setAttribute('aMix', attr(aMix));
  cardGeo.setAttribute('aAlpha', attr(aAlpha));
  const cardMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.DoubleSide,
    uniforms: { tChaos: { value: chaosTex }, tClean: { value: cleanTex } },
    vertexShader: `
      attribute float aChaos; attribute float aClean; attribute float aMix; attribute float aAlpha;
      varying vec2 vA; varying vec2 vB; varying float vMix; varying float vAlpha;
      vec2 slot(float s, vec2 p) {
        float c = mod(s, ${COLS}.0), r = floor(s / ${COLS}.0);
        return vec2((c + p.x) / ${COLS}.0, 1.0 - (r + 1.0 - p.y) / ${ROWS}.0);
      }
      void main() {
        vA = slot(aChaos, uv); vB = slot(aClean, uv); vMix = aMix; vAlpha = aAlpha;
        gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: `
      uniform sampler2D tChaos; uniform sampler2D tClean;
      varying vec2 vA; varying vec2 vB; varying float vMix; varying float vAlpha;
      void main() {
        if (vAlpha < 0.004) discard;
        vec4 c = vMix < 0.5 ? texture2D(tChaos, vA) : texture2D(tClean, vB);
        gl_FragColor = vec4(c.rgb, c.a * vAlpha);
        #include <colorspace_fragment>
      }`,
  });
  const cards = new THREE.InstancedMesh(cardGeo, cardMat, N);
  cards.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  cards.frustumCulled = false;
  scene.add(cards);

  // rosace de la nomenclature : racine, 5 sous-ensembles, 55 feuilles
  const LEAVES = 55;
  const tree = [{ pos: V(0, 0, 0), ang: 0 }];
  for (let k = 0; k < 5; k++) {
    const a = -Math.PI / 2 + (k + 0.5) * (Math.PI * 2 / 5);
    tree.push({ pos: V(Math.cos(a) * 2.4, Math.sin(a) * 2.4, 0), ang: a, parent: 0 });
  }
  for (let j = 0; j < LEAVES; j++) {
    const k = Math.floor(j / 11), m = j % 11;
    const a = -Math.PI / 2 + k * (Math.PI * 2 / 5) + (m + 0.5) * (Math.PI * 2 / 5 / 11);
    tree.push({ pos: V(Math.cos(a) * 5.1, Math.sin(a) * 5.1, 0), ang: a, parent: 1 + k });
  }
  const isNode = (slot) => slot < tree.length;
  const nodeOf = (slot) => (isNode(slot) ? slot : 6 + (slot % LEAVES));

  // chaque fichier : tout ce qui ne dépend pas de l'avancement est précalculé
  const WALL_C = 16, WALL_R = Math.ceil(KEEP / WALL_C);
  const IDENT = new THREE.Quaternion();
  const F = Array.from({ length: N }, (_, i) => {
    const cleanSlot = i < KEEP ? i : Math.floor(hash(i, 9) * KEEP);
    const n = nodeOf(cleanSlot), node = tree[n], onTree = isNode(cleanSlot);
    const radial = V(Math.cos(node.ang), Math.sin(node.ang), 0);
    const upright = Math.cos(node.ang) < -0.01 ? Math.PI : 0; // texte jamais à l'envers
    const f = {
      i, cleanSlot, chaosSlot: i % SLOTS, onTree, node: n,
      r: 1.6 + 8 * Math.pow(hash(i, 1), 0.9), th: hash(i, 2) * Math.PI * 2, y: (hash(i, 3) - 0.5) * 7.5, z0: (hash(i, 4) - 0.5) * 2,
      spin: 0.25 + 0.9 / (1 + hash(i, 1) * 4),
      tumble: [hash(i, 5) * 6, hash(i, 6) * 6, hash(i, 7) * 6], tsp: 0.5 + hash(i, 8) * 2,
      wall: V(((cleanSlot % WALL_C) - (WALL_C - 1) / 2) * (CARD_W + 0.08), ((WALL_R - 1) / 2 - Math.floor(cleanSlot / WALL_C)) * (CARD_H + 0.07), 0),
      dest: n > 5 && onTree ? node.pos.clone().add(radial.multiplyScalar(CARD_W / 2)) : node.pos.clone(),
      rz: n <= 5 ? IDENT.clone() : new THREE.Quaternion().setFromAxisAngle(V(0, 0, 1), node.ang + upright),
      treeK: hash(i, 11), coreK: hash(i, 12), core: V(0, 0, 0.02 * (cleanSlot % 7)),
    };
    aChaos[i] = f.chaosSlot; aClean[i] = cleanSlot;
    return f;
  });
  const chaosPos = (f, u, swirl, out) => {
    const w = f.th + (u * 9 + swirl) * f.spin;
    return out.set(Math.cos(w) * f.r * 0.95, f.y + Math.sin(u * 6 + f.i) * 0.25, Math.sin(w) * f.r * 0.9 + f.z0);
  };
  const T0 = 0.17, T1 = 0.36;
  {
    const tmp = V(0, 0, 0);
    // la carte se renomme quand le filet passe sur elle
    F.forEach((f) => { f.flip = lerp(T0, T1, 0.03 + 0.9 * P(chaosPos(f, T0, 0, tmp).x, -11, 11)); });
  }

  // ---- liens de la nomenclature : un seul tampon, modifié en place
  const SEGS_MAX = (tree.length - 1) * 10;
  const treeLineGeo = new LineSegmentsGeometry();
  treeLineGeo.setPositions(new Float32Array(SEGS_MAX * 6));
  const treeBuf = treeLineGeo.attributes.instanceStart.data;
  const treeLineMat = new LineMaterial({ color: 0x9bc6e6, linewidth: 2.2, transparent: true, opacity: 0, depthWrite: false });
  const treeLines = new LineSegments2(treeLineGeo, treeLineMat);
  treeLines.frustumCulled = false;
  treeLines.renderOrder = -1;
  scene.add(treeLines);
  const ctrl = tree.map((n, k) => (k > 5 ? V(Math.cos(n.ang), Math.sin(n.ang), 0).multiplyScalar(3.7) : null));

  // ---- la source unique, son onde, ses orbites
  const glow = glowTexture();
  const heroCard = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 4.2 * 560 / 2048), new THREE.MeshBasicMaterial({ map: heroCardTexture(Math.min(1, atlasScale * 1.35), maxAniso), transparent: true, opacity: 0, depthWrite: false }));
  heroCard.renderOrder = 3;
  const cardHalo = new THREE.Mesh(new THREE.PlaneGeometry(9, 5), new THREE.MeshBasicMaterial({ map: glow, color: 0x6fa8d6, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }));
  cardHalo.position.z = -0.05;
  heroCard.add(cardHalo);
  scene.add(heroCard);
  const waveMat = new THREE.MeshBasicMaterial({ color: 0xefa471, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending });
  const wave = new THREE.Mesh(new THREE.RingGeometry(0.97, 1, 160), waveMat);
  scene.add(wave);
  const ORBIT = [{ r: 3.3, tilt: 1.25, yaw: 0.2 }, { r: 4.1, tilt: 1.05, yaw: -0.5 }, { r: 5.0, tilt: 1.4, yaw: 0.9 }];
  const PER = 700;
  const orbPos = new Float32Array(ORBIT.length * PER * 3);
  const orbGeo = new THREE.BufferGeometry();
  orbGeo.setAttribute('position', new THREE.BufferAttribute(orbPos, 3).setUsage(THREE.DynamicDrawUsage));
  const orbMat = new THREE.PointsMaterial({ color: 0x9bc6e6, size: 0.05, sizeAttenuation: true, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending });
  const orbits = new THREE.Points(orbGeo, orbMat);
  orbits.frustumCulled = false;
  scene.add(orbits);
  const orbQ = ORBIT.map((o) => new THREE.Quaternion().setFromEuler(new THREE.Euler(o.tilt, o.yaw, 0)));
  const orbJ = Array.from({ length: ORBIT.length * PER }, (_, n) => [(hash(n % PER, Math.floor(n / PER) + 20) - 0.5) * 0.08, (hash(n % PER, Math.floor(n / PER) + 40) - 0.5) * 0.05]);

  // ---- filet de balayage (renommage), avec son halo
  const scanMat = new THREE.MeshBasicMaterial({ color: 0xffb07a, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending });
  const scan = new THREE.Mesh(new THREE.PlaneGeometry(0.04, 26), scanMat);
  const scanGlowMat = new THREE.MeshBasicMaterial({ map: glow, color: 0xef8a4a, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending });
  const scanGlow = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 26), scanGlowMat);
  scan.add(scanGlow);
  scene.add(scan);

  // ---------------------------------------------------------------- caméra
  const camA = V(0, 0, 0), camB = V(-5.5, 1.6, 0), camC = V(0, -1.3, 0), camD = V(0, 0, 0);
  const tgtA = V(0, 0, -1), tgtB = V(0.6, 0, 0), tgtC = V(0, 0.1, 0), tgtD = V(0, 0, 0);
  const pos = V(0, 0, 0), tgt = V(0, 0, 0);
  const TAN20 = Math.tan(THREE.MathUtils.degToRad(20));
  function pose(u, portrait) {
    const back = portrait ? 1.75 : 1;
    camA.set(0.4, 0.3, 10.5 * back - u * 8);
    camB.z = 15.5 * back;
    // la rosace (rayon ≈ 6,3) doit tenir dans l'écran, quel qu'en soit le format
    camC.z = Math.max((6.3 / TAN20) * 0.86, 6.5 / (TAN20 * (W / H)));
    const d = P(u, 0.76, 1);
    const az = lerp(0, -0.42, d);
    const dist = lerp(8.2, 10.5, d) * (portrait ? 1.6 : 1);
    camD.set(Math.sin(az) * dist, lerp(0.3, 1.6, d), Math.cos(az) * dist);
    let fov = 40;
    if (u < 0.17) { pos.copy(camA); tgt.copy(tgtA); }
    else if (u < 0.3) { const k = eio(P(u, 0.17, 0.3)); pos.lerpVectors(camA, camB, k); tgt.lerpVectors(tgtA, tgtB, k); }
    else if (u < 0.42) { pos.copy(camB); tgt.copy(tgtB); }
    else if (u < 0.52) { const k = eio(P(u, 0.42, 0.52)); pos.lerpVectors(camB, camC, k); tgt.lerpVectors(tgtB, tgtC, k); }
    else if (u < 0.63) { pos.copy(camC); tgt.copy(tgtC); }
    else if (u < 0.78) { const k = eio(P(u, 0.64, 0.78)); pos.lerpVectors(camC, camD, k); tgt.lerpVectors(tgtC, tgtD, k); fov = lerp(40, 36, k); }
    else { pos.copy(camD); tgt.copy(tgtD); fov = 36; }
    return fov;
  }

  // ---------------------------------------------------------------- rendu
  const m4 = new THREE.Matrix4(), sc = V(1, 1, 1);
  const cp = V(0, 0, 0), wp = V(0, 0, 0), q = new THREE.Quaternion(), qf = new THREE.Quaternion(), e = new THREE.Euler();
  const AX = V(1, 0, 0);
  const va = V(0, 0, 0), vb = V(0, 0, 0), vp = V(0, 0, 0), vo = V(0, 0, 0);
  let W = 1, H = 1;

  function setSize(w, h, dpr) {
    W = w; H = h;
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);
    const db = renderer.getDrawingBufferSize(new THREE.Vector2());
    treeLineMat.resolution.set(db.x, db.y);
  }

  // u : avancement du film ; t : temps en secondes (vie de la scène au repos)
  function render(u, t = 0, portrait = W / H < 1) {
    const fov = pose(u, portrait);
    // au repos, la tempête respire ; ce mouvement s'éteint avant le balayage
    const calm = 1 - P(u, 0.12, 0.17);
    const swirl = 0.55 * Math.sin(t * 0.16) * calm;
    const wobble = t * 0.35 * calm;

    for (let n = 0; n < N; n++) {
      const f = F[n];
      chaosPos(f, Math.min(u, f.flip), swirl, cp);
      // rotation contenue : les noms restent lisibles, le désordre se voit quand même
      e.set(0.55 * Math.sin(f.tumble[0] + u * f.tsp * 3 + wobble * 0.5), 0.75 * Math.sin(f.tumble[1] + u * f.tsp * 2 + wobble * 0.3), 0.45 * Math.sin(f.tumble[2] + u * f.tsp));
      q.setFromEuler(e);
      const flipK = P(u, f.flip - 0.006, f.flip + 0.006);
      const go = eio(P(u, f.flip + 0.004, f.flip + 0.075));
      wp.copy(cp).lerp(f.wall, go);
      q.slerp(IDENT, go).multiply(qf.setFromAxisAngle(AX, Math.PI * 2 * flipK));
      let alpha = 1, scale = 1;
      if (f.i >= KEEP) {
        // doublon : il rejoint son original et s'y fond
        alpha = 1 - P(go, 0.65, 1);
        scale = lerp(1, 0.7, go);
      } else {
        // registre → rosace
        if (u > 0.42) {
          const k = eio(P(u, 0.42 + 0.06 * f.treeK, 0.53 + 0.06 * f.treeK));
          wp.lerp(f.dest, k);
          q.slerp(f.rz, k);
          if (!f.onTree) { alpha = 1 - P(k, 0.55, 1); scale = lerp(1, 0.4, k); }
          else scale = lerp(1, f.node === 0 ? 1.6 : f.node <= 5 ? 1.35 : 1.15, k);
        }
        // rosace → source unique : chaque fiche vient se fondre dans la racine
        if (u > 0.62 && f.onTree) {
          const k = eio(P(u, 0.62 + 0.07 * f.coreK, 0.69 + 0.07 * f.coreK));
          wp.lerp(f.core, k);
          q.slerp(IDENT, k);
          if (f.cleanSlot === 0) alpha *= 1 - P(u, 0.745, 0.76);
          else { scale = lerp(scale, 1.6, k); alpha *= 1 - P(k, 0.8, 1); }
        }
      }
      sc.set(CARD_W * scale, CARD_H * scale, 1);
      m4.compose(wp, q, sc);
      cards.setMatrixAt(n, m4);
      aMix[n] = flipK;
      // brume de profondeur : les fichiers lointains s'effacent
      // et ceux qui frôlent la caméra aussi (ils masqueraient le titre)
      const dist = wp.distanceTo(pos);
      const fog = u < 0.34 ? lerp(clamp(1.4 - dist * 0.085) * P(dist, 2.4, 3.8), 1, P(u, 0.26, 0.34)) : 1;
      aAlpha[n] = alpha * fog;
    }
    cards.instanceMatrix.needsUpdate = true;
    cardGeo.attributes.aMix.needsUpdate = true;
    cardGeo.attributes.aAlpha.needsUpdate = true;

    // filet de renommage
    const on = u > T0 + 0.004 && u < T1 - 0.004;
    scan.position.set(lerp(-11.5, 11.5, eio(P(u, T0, T1))), 0, 0.4);
    scanMat.opacity = on ? 1 : 0;
    scanGlowMat.opacity = on ? 0.5 : 0;

    // liens de la nomenclature : tracés depuis la racine, puis condensés avec elle
    const grow = P(u, 0.5, 0.6), shrink = P(u, 0.62, 0.69);
    let segs = 0;
    if (grow > 0 && shrink < 1) {
      const arr = treeBuf.array;
      const s = 1 - shrink;
      for (let n = 1; n < tree.length; n++) {
        const local = P(grow, n <= 5 ? 0 : 0.35, n <= 5 ? 0.5 : 1);
        if (local <= 0) continue;
        va.copy(tree[tree[n].parent].pos); vb.copy(tree[n].pos);
        vp.copy(va).multiplyScalar(s);
        for (let k = 1; k <= 10; k++) {
          const tt = (k / 10) * local;
          if (ctrl[n]) vo.copy(va).multiplyScalar((1 - tt) ** 2).addScaledVector(ctrl[n], 2 * (1 - tt) * tt).addScaledVector(vb, tt * tt);
          else vo.copy(va).lerp(vb, tt);
          vo.multiplyScalar(s);
          const o = segs * 6;
          arr[o] = vp.x; arr[o + 1] = vp.y; arr[o + 2] = vp.z - 0.05;
          arr[o + 3] = vo.x; arr[o + 4] = vo.y; arr[o + 5] = vo.z - 0.05;
          segs++;
          vp.copy(vo);
        }
      }
      treeBuf.needsUpdate = true;
    }
    treeLineGeo.instanceCount = segs;
    treeLines.visible = segs > 0;
    treeLineMat.opacity = 0.5 * (1 - shrink);

    // la source unique : la fiche apparaît quand la racine a tout absorbé
    const born = P(u, 0.745, 0.765);
    heroCard.material.opacity = born;
    cardHalo.material.opacity = 0.22 * born;
    heroCard.visible = born > 0;
    heroCard.scale.setScalar(lerp(0.42, 1, eio(P(u, 0.745, 0.8))));
    heroCard.rotation.set(0, -0.18 * P(u, 0.78, 1), 0);
    heroCard.position.y = 0.08 * Math.sin(u * 14 + t * 1.1) * P(u, 0.8, 1);
    const w = P(u, 0.745, 0.84);
    wave.visible = w > 0 && w < 1;
    wave.scale.setScalar(lerp(0.5, 11, eio(w)));
    waveMat.opacity = wave.visible ? 0.9 * (1 - w) : 0;
    const orbK = P(u, 0.77, 0.87);
    orbits.visible = orbK > 0;
    if (orbits.visible) {
      for (let k = 0; k < ORBIT.length; k++) {
        const o = ORBIT[k];
        const spin = (u * (1.4 - k * 0.35) + t * (0.06 + k * 0.02)) * (k % 2 ? -1 : 1);
        for (let j = 0; j < PER; j++) {
          const idx = k * PER + j;
          const a = (j / PER) * Math.PI * 2 + spin;
          const [jr, jz] = orbJ[idx];
          vo.set(Math.cos(a) * (o.r + jr), Math.sin(a) * (o.r + jr) * 0.98, jz).applyQuaternion(orbQ[k]);
          orbPos[idx * 3] = vo.x; orbPos[idx * 3 + 1] = vo.y; orbPos[idx * 3 + 2] = vo.z;
        }
      }
      orbGeo.attributes.position.needsUpdate = true;
      orbMat.opacity = 0.75 * orbK;
      orbits.rotation.y = -0.18 * P(u, 0.78, 1);
    }

    // caméra, et place du sujet dans le cadre : texte à gauche (desktop) ou dessous (portrait)
    camera.fov = fov;
    camera.aspect = W / H;
    camera.position.copy(pos);
    camera.lookAt(tgt);
    const wall = P(u, 0.24, 0.3) * (1 - P(u, 0.4, 0.46));
    if (portrait) camera.setViewOffset(W, H, 0, lerp(0.13, 0.02, wall) * H, W, H);
    else {
      // la rosace est large : on la pousse un peu plus à droite, loin du texte
      const rosace = P(u, 0.46, 0.52) * (1 - P(u, 0.63, 0.7));
      camera.setViewOffset(W, H, -(lerp(0.13, 0, wall) + 0.08 * rosace) * W, 0, W, H);
    }
    camera.updateProjectionMatrix();

    renderer.render(scene, camera);
  }

  // Tous les programmes graphiques sont compilés d'emblée, objets rendus visibles :
  // sinon, la première apparition des traits, des orbites ou de la fiche finale
  // déclencherait une compilation en plein défilement — une saccade garantie.
  {
    const hidden = [];
    scene.traverse((o) => { if (!o.visible) { hidden.push(o); o.visible = true; } });
    treeLineGeo.instanceCount = 1;
    camera.aspect = 16 / 9; camera.position.set(0, 0, 14); camera.lookAt(0, 0, 0); camera.updateProjectionMatrix();
    if (renderer.compileAsync) await renderer.compileAsync(scene, camera);
    else renderer.compile(scene, camera);
    hidden.forEach((o) => { o.visible = false; });
    // un premier rendu hors écran téléverse aussi les textures vers la carte graphique
    renderer.setSize(8, 8, false);
    renderer.render(scene, camera);
    treeLineGeo.instanceCount = 0;
  }

  // la scène vit-elle au repos à cet avancement ? (sinon, inutile de redessiner)
  const idle = (u) => u < 0.17 || u > 0.77;

  function dispose() {
    renderer.dispose();
    [chaosTex, cleanTex, glow, heroCard.material.map, scene.background].forEach((t) => t?.dispose());
  }

  return { renderer, scene, camera, setSize, render, idle, dispose };
}
