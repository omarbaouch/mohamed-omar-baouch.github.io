// Signature du site : l'ARBRE D'ASSEMBLAGE PDM, mis en scène dans son propre
// viewport (section .bom-stage) comme une fenêtre SOLIDWORKS posée dans la
// page. Arborescence gauche→droite type nomenclature : racine, sous-
// assemblages, composants ; coudes à congés arrondis (routage CAO), halos,
// anneaux orbitaux, impulsions de check-in à traînée, chaîne des cas
// d'emploi animée au survol, grille et règle graduées en fond. L'assemblage
// se construit quand la scène entre à l'écran. Canvas 2D, thème-aware,
// 30 i/s, statique en reduced-motion.

const TREE = {
  ref: 'ASM-BAOUCH',
  rev: 'RÉV.2026',
  href: null,
  children: [
    {
      ref: 'EXPÉRIENCE',
      rev: 'ASM-01',
      href: '#experience',
      children: [
        { ref: 'VISIATIV', rev: '2023—', href: '#experience' },
        { ref: 'ABMI GROUP', rev: '2021-23', href: '#experience' },
        { ref: 'EVOLUM', rev: '2020', href: '#experience' },
      ],
    },
    {
      ref: 'PROJETS',
      rev: 'ASM-02',
      href: '#expertise',
      children: [
        { ref: 'PRT-ORBITA', rev: 'RÉV.B', href: '/projets/robot-orbita/' },
        { ref: 'MIG-INTL', rev: 'RÉV.C', href: '/projets/migration-pdm-internationale/' },
        { ref: 'RATP-RETROFIT', rev: 'RÉV.A', href: '#expertise' },
      ],
    },
    {
      ref: 'COMPÉTENCES',
      rev: 'ASM-03',
      href: '#skills',
      children: [
        { ref: 'PDM PRO', rev: 'SQL', href: '#skills' },
        { ref: '3DEXPERIENCE', rev: '—', href: '#skills' },
        { ref: 'MYCADTOOLS', rev: 'ETL', href: '#skills' },
      ],
    },
    {
      ref: 'BLOG',
      rev: '13 DOCS',
      href: '/blog/',
      children: [
        { ref: 'BOM→ERP', rev: 'DOC', href: '/blog/nomenclature-bom-pdm-plm-erp/' },
        { ref: 'ECO/ECR', rev: 'DOC', href: '/blog/eco-ecr-gestion-modifications/' },
      ],
    },
  ],
};

export function initBomTree() {
  const canvas = document.getElementById('bomCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const stage = canvas.parentElement; // .bom-viewport
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // l'assemblage démarre quand la scène devient visible, pas au chargement
  let started = reduce;
  let startTime = performance.now();

  let w = 0;
  let h = 0;
  let compact = false;
  let nodes = [];
  let links = [];
  let grid = null; // fond statique (grille + règle), redessiné au resize/thème
  const pointer = { x: -9999, y: -9999 };
  let hovered = null;
  let hoverGlow = 0; // intensité lissée du survol

  // impulsions : chacune suit un chemin racine→feuille complet, avec traînée
  const pulses = [];

  let ink = { r: 244, g: 243, b: 240 };
  let accent = { r: 111, g: 168, b: 214 };
  let paper = { r: 14, g: 15, b: 17 };
  const hexToRgb = (hex) => {
    const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
    return m
      ? { r: parseInt(m[1].slice(0, 2), 16), g: parseInt(m[1].slice(2, 4), 16), b: parseInt(m[1].slice(4, 6), 16) }
      : null;
  };
  function readTheme() {
    const s = getComputedStyle(document.documentElement);
    accent = hexToRgb(s.getPropertyValue('--accent')) || accent;
    ink = hexToRgb(s.getPropertyValue('--ink')) || ink;
    paper = hexToRgb(s.getPropertyValue('--bg-0')) || paper;
  }
  readTheme();
  document.getElementById('themeSwitch')?.addEventListener('click', () => {
    requestAnimationFrame(() => {
      readTheme();
      buildGrid();
      if (reduce) draw(1e9);
    });
  });

  // arborescence de nomenclature, gauche→droite : racine à gauche,
  // sous-assemblages au centre, composants à droite — chaque niveau lisible
  function layout() {
    nodes = [];
    links = [];
    pulses.length = 0;
    compact = w < 760;
    const rootX = compact ? w * 0.09 : w * 0.13;
    const rootY = h * 0.5;
    const branchX = compact ? w * 0.38 : w * 0.42;
    const leafX = compact ? w * 0.72 : w * 0.68;
    const root = { ...TREE, x: rootX, y: rootY, depth: 0, parent: null, t0: 0, phase: Math.random() * 6.28 };
    nodes.push(root);
    const nB = TREE.children.length;
    TREE.children.forEach((branch, bi) => {
      const by = h * (0.15 + (bi * 0.7) / (nB - 1));
      const bNode = { ...branch, x: branchX, y: by, depth: 1, parent: root, t0: 350 + bi * 220, phase: Math.random() * 6.28 };
      nodes.push(bNode);
      links.push({ a: root, b: bNode, t0: bNode.t0 - 150 });
      const kids = compact ? branch.children.slice(0, 2) : branch.children;
      const step = Math.min(h * 0.09, compact ? 46 : 58);
      kids.forEach((leaf, li) => {
        const ly = by + (li - (kids.length - 1) / 2) * step;
        const lNode = { ...leaf, x: leafX, y: ly, depth: 2, parent: bNode, t0: bNode.t0 + 260 + li * 140, phase: Math.random() * 6.28 };
        nodes.push(lNode);
        links.push({ a: bNode, b: lNode, t0: lNode.t0 - 120 });
      });
    });
    // 3 impulsions décalées sur des chemins racine→feuille distincts
    const leaves = nodes.filter((n) => n.depth === 2);
    for (let i = 0; i < Math.min(3, leaves.length); i++) {
      pulses.push({ leaf: leaves[(i * 4 + 1) % leaves.length], t: -i * 0.45, trail: [] });
    }
  }

  // fond du viewport : grille de points + règle graduée, rendus une fois
  function buildGrid() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    grid = document.createElement('canvas');
    grid.width = Math.max(1, Math.round(w * dpr));
    grid.height = Math.max(1, Math.round(h * dpr));
    const g = grid.getContext('2d');
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    const I = `${ink.r},${ink.g},${ink.b}`;
    const A = `${accent.r},${accent.g},${accent.b}`;
    g.fillStyle = `rgba(${I},0.07)`;
    for (let gx = 28; gx < w; gx += 46) {
      for (let gy = 28; gy < h; gy += 46) g.fillRect(gx, gy, 1, 1);
    }
    // règle graduée en pied de viewport, comme un cartouche de mise en plan
    const ry = h - 22;
    g.strokeStyle = `rgba(${A},0.2)`;
    g.lineWidth = 1;
    g.beginPath();
    g.moveTo(24, ry);
    g.lineTo(w - 24, ry);
    g.stroke();
    for (let gx = 24, i = 0; gx < w - 24; gx += 30, i++) {
      const major = i % 5 === 0;
      g.strokeStyle = `rgba(${A},${major ? 0.34 : 0.18})`;
      g.beginPath();
      g.moveTo(gx, ry);
      g.lineTo(gx, ry - (major ? 8 : 4));
      g.stroke();
    }
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = stage.clientWidth;
    h = stage.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    layout();
    buildGrid();
    if (reduce) draw(1e9);
  }

  const ease = (t) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);

  function nodePos(n, now) {
    if (reduce) return { x: n.x, y: n.y };
    const t = now * 0.001;
    return { x: n.x + Math.sin(t * 0.5 + n.phase) * 3, y: n.y + Math.cos(t * 0.4 + n.phase) * 3 };
  }

  function inChain(n) {
    let c = hovered;
    while (c) {
      if (c === n) return true;
      c = c.parent;
    }
    return false;
  }

  // chemin d'un lien : coude orthogonal à congés arrondis (routage CAO)
  function linkPath(pa, pb, k) {
    const midX = pa.x + (pb.x - pa.x) * 0.5;
    const r = Math.min(10, Math.abs(pb.y - pa.y) / 2, Math.abs(pb.x - pa.x) / 4);
    ctx.beginPath();
    ctx.moveTo(pa.x, pa.y);
    if (k < 1) {
      // pendant la construction : trajet simple proportionnel
      const mx = pa.x + (pb.x - pa.x) * k;
      const my = pa.y + (pb.y - pa.y) * k;
      ctx.lineTo(pa.x + (mx - pa.x) * 0.5, pa.y);
      ctx.lineTo(pa.x + (mx - pa.x) * 0.5, my);
      ctx.lineTo(mx, my);
    } else {
      ctx.arcTo(midX, pa.y, midX, pb.y, r);
      ctx.arcTo(midX, pb.y, pb.x, pb.y, r);
      ctx.lineTo(pb.x, pb.y);
    }
  }

  // point le long du coude (pour les impulsions), k dans [0,1]
  function pointOnLink(pa, pb, k) {
    const midX = pa.x + (pb.x - pa.x) * 0.5;
    if (k < 0.34) return { x: pa.x + ((midX - pa.x) * k) / 0.34, y: pa.y };
    if (k < 0.67) return { x: midX, y: pa.y + ((pb.y - pa.y) * (k - 0.34)) / 0.33 };
    return { x: midX + ((pb.x - midX) * (k - 0.67)) / 0.33, y: pb.y };
  }

  function chainOf(leaf) {
    const segs = [];
    let n = leaf;
    while (n.parent) {
      segs.unshift([n.parent, n]);
      n = n.parent;
    }
    return segs;
  }

  function draw(now) {
    ctx.clearRect(0, 0, w, h);
    const elapsed = reduce ? 1e9 : now - startTime;
    const A = `${accent.r},${accent.g},${accent.b}`;
    const I = `${ink.r},${ink.g},${ink.b}`;
    const P = `${paper.r},${paper.g},${paper.b}`;
    hoverGlow += ((hovered ? 1 : 0) - hoverGlow) * 0.12;

    // ---- fond : grille de points + règle graduée (pré-rendus)
    if (grid) {
      ctx.globalAlpha = Math.min(1, ease(elapsed / 700));
      ctx.drawImage(grid, 0, 0, w, h);
      ctx.globalAlpha = 1;
    }

    // ---- liens : congés arrondis + dégradé le long du lien
    for (const l of links) {
      const k = ease((elapsed - l.t0) / 600);
      if (k <= 0) continue;
      const pa = nodePos(l.a, now);
      const pb = nodePos(l.b, now);
      const lit = hovered && inChain(l.b) && inChain(l.a);
      const grad = ctx.createLinearGradient(pa.x, pa.y, pb.x, pb.y);
      if (lit) {
        grad.addColorStop(0, `rgba(${A},0.95)`);
        grad.addColorStop(1, `rgba(${A},0.55)`);
      } else {
        grad.addColorStop(0, `rgba(${A},0.42)`);
        grad.addColorStop(1, `rgba(${A},0.12)`);
      }
      ctx.strokeStyle = grad;
      ctx.lineWidth = lit ? 1.6 : 1;
      if (lit && !reduce) {
        ctx.setLineDash([6, 5]);
        ctx.lineDashOffset = -(now * 0.02);
      }
      linkPath(pa, pb, k);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // ---- impulsions de check-in avec traînée, sur des chemins complets
    if (!reduce) {
      for (const p of pulses) {
        p.t += 0.004;
        if (p.t > 1.25) {
          p.t = -0.15;
          p.trail.length = 0;
          const leaves = nodes.filter((n) => n.depth === 2);
          p.leaf = leaves[Math.floor(Math.random() * leaves.length)];
        }
        if (p.t < 0 || p.t > 1) continue;
        const segs = chainOf(p.leaf);
        if (!segs.length) continue;
        const segF = p.t * segs.length;
        const si = Math.min(segs.length - 1, Math.floor(segF));
        const [a, b] = segs[si];
        if (elapsed < (links.find((l) => l.a === a && l.b === b)?.t0 ?? 0) + 600) continue;
        const pt = pointOnLink(nodePos(a, now), nodePos(b, now), segF - si);
        p.trail.push(pt);
        if (p.trail.length > 14) p.trail.shift();
        p.trail.forEach((tp, i) => {
          const al = (i / p.trail.length) * 0.55;
          ctx.fillStyle = `rgba(${A},${al.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(tp.x, tp.y, 1 + (i / p.trail.length) * 1.8, 0, 6.283);
          ctx.fill();
        });
        const halo = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 12);
        halo.addColorStop(0, `rgba(${A},0.8)`);
        halo.addColorStop(1, `rgba(${A},0)`);
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 12, 0, 6.283);
        ctx.fill();
        ctx.fillStyle = `rgba(255,255,255,0.9)`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 1.8, 0, 6.283);
        ctx.fill();
      }
    }

    // ---- nœuds : halo + cœur + anneau orbital (assemblages)
    ctx.textBaseline = 'middle';
    if ('letterSpacing' in ctx) ctx.letterSpacing = '0.08em';
    const placedLabels = []; // étiquettes déjà posées ce frame (anti-chevauchement)
    for (const n of nodes) {
      const k = ease((elapsed - n.t0) / 500);
      if (k <= 0) continue;
      const p = nodePos(n, now);
      const lit = n === hovered || inChain(n);
      const isRoot = n.depth === 0;
      const isBranch = n.depth === 1;
      const size = (isRoot ? 6.5 : isBranch ? 5 : 3.4) * k * (lit ? 1.25 : 1);

      // halo lumineux
      const hr = (isRoot ? 26 : isBranch ? 20 : 12) * k * (lit ? 1.5 : 1);
      const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, hr);
      halo.addColorStop(0, `rgba(${A},${lit ? 0.5 : isRoot ? 0.4 : 0.25})`);
      halo.addColorStop(1, `rgba(${A},0)`);
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(p.x, p.y, hr, 0, 6.283);
      ctx.fill();

      // cœur : losange pour les assemblages, pastille bicolore pour les pièces
      if (isRoot || isBranch) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle = `rgba(${A},${lit ? 1 : 0.9})`;
        ctx.fillRect(-size, -size, size * 2, size * 2);
        ctx.fillStyle = `rgba(255,255,255,${lit ? 0.85 : 0.5})`;
        ctx.fillRect(-size * 0.38, -size * 0.38, size * 0.76, size * 0.76);
        ctx.restore();
        // anneau orbital animé
        if (!reduce) {
          const ro = (isRoot ? 13 : 10) + Math.sin(now * 0.0012 + n.phase) * 1.2;
          const a0 = now * 0.0009 + n.phase;
          ctx.strokeStyle = `rgba(${A},${lit ? 0.7 : 0.32})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, ro, a0, a0 + 4.2);
          ctx.stroke();
        }
      } else {
        ctx.fillStyle = `rgba(${A},${lit ? 1 : 0.75})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, 6.283);
        ctx.fill();
        ctx.fillStyle = `rgba(255,255,255,${lit ? 0.9 : 0.45})`;
        ctx.beginPath();
        ctx.arc(p.x - size * 0.25, p.y - size * 0.25, size * 0.35, 0, 6.283);
        ctx.fill();
      }

      // étiquette avec dosseret discret ; elle ÉVITE les lettres du titre
      // (bascule sous le nœud en cas de collision) au lieu de les recouvrir
      const fs = isRoot ? 12 : isBranch ? 11 : 10;
      ctx.font = `600 ${fs}px ui-monospace, "SF Mono", Menlo, monospace`;
      const alpha = k * (lit ? 1 : isRoot ? 0.9 : isBranch ? 0.72 : 0.5);
      const tw = ctx.measureText(n.ref).width;
      const labelHits = (x, y) =>
        placedLabels.some(
          (r) => x + tw > r.x && x - 6 < r.x + r.w && y + fs > r.y && y - fs * 1.4 < r.y + r.h
        );
      // positions candidates selon le niveau : les assemblages étiquettent
      // au-dessus (leurs liens partent à droite), les composants à droite ;
      // la première position sans chevauchement d'étiquette gagne
      const off = Math.max(size, 6);
      const above = [p.x - tw / 2, p.y - off - fs - 4];
      const below = [p.x - tw / 2, p.y + off + fs + 6];
      const right = [p.x + off + 10, p.y];
      const left = [p.x - off - 10 - tw, p.y];
      const spots =
        n.depth === 2
          ? compact
            ? [below, right, above, left]
            : [right, below, above, left]
          : [above, below, left, right];
      let [tx, ty] = spots[spots.length - 1];
      for (const [sx, sy] of spots) {
        if (!labelHits(sx, sy)) {
          tx = sx;
          ty = sy;
          break;
        }
      }
      tx = Math.min(Math.max(tx, 8), w - tw - 8); // jamais rognée par le cadre
      placedLabels.push({ x: tx - 4, y: ty - fs, w: tw + 8, h: fs * 2.4 });
      ctx.fillStyle = `rgba(${P},${(alpha * 0.5).toFixed(3)})`;
      ctx.fillRect(tx - 4, ty - fs, tw + 8, isRoot || isBranch ? fs * 2.3 : fs * 1.6);
      ctx.fillStyle = `rgba(${I},${alpha.toFixed(3)})`;
      ctx.fillText(n.ref, tx, ty - (isRoot || isBranch ? 6 : 0));
      if (isRoot || isBranch || lit) {
        ctx.font = `400 ${fs - 2}px ui-monospace, "SF Mono", Menlo, monospace`;
        ctx.fillStyle = `rgba(${A},${(alpha * 0.95).toFixed(3)})`;
        ctx.fillText(n.rev, tx, ty + 8);
      }
    }
    if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
  }

  // ---- interactions
  function nodeAt(x, y) {
    let best = null;
    let bd = 26;
    for (const n of nodes) {
      const d = Math.hypot(n.x - x, n.y - y);
      if (d < bd) {
        bd = d;
        best = n;
      }
    }
    return best;
  }
  stage.addEventListener(
    'pointermove',
    (e) => {
      const b = stage.getBoundingClientRect();
      pointer.x = e.clientX - b.left;
      pointer.y = e.clientY - b.top;
      const n = nodeAt(pointer.x, pointer.y);
      if (n !== hovered) {
        hovered = n;
        stage.style.cursor = n && n.href ? 'pointer' : '';
        if (reduce) draw(1e9);
      }
    },
    { passive: true }
  );
  stage.addEventListener('click', () => {
    if (hovered?.href) {
      if (hovered.href.startsWith('#')) {
        document.querySelector(hovered.href)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
      } else {
        window.location.href = hovered.href;
      }
    }
  });

  window.addEventListener('resize', resize);
  resize();

  if (reduce) return;

  let visible = false;
  new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      // premier passage à l'écran : c'est là que l'assemblage se construit
      if (visible && !started) {
        started = true;
        startTime = performance.now();
      }
    },
    { threshold: 0.25 }
  ).observe(stage);

  let last = 0;
  function frame(now) {
    requestAnimationFrame(frame);
    if (!started || !visible || document.hidden) return;
    if (now - last < 32) return;
    last = now;
    draw(now);
  }
  requestAnimationFrame(frame);
}
