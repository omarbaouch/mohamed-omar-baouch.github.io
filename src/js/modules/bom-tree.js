// Signature du site : l'ARBRE D'ASSEMBLAGE PDM — rendu « pièce maîtresse ».
// La structure du site dessinée comme une nomenclature SOLIDWORKS PDM :
// épine dorsale EBOM qui traverse la composition typographique, coudes à
// congés arrondis (routage CAO), halos lumineux, anneaux orbitaux sur les
// assemblages, impulsions de check-in à traînée circulant sur des chemins
// complets, flux animé sur la chaîne des cas d'emploi au survol, et
// estompage doux derrière les lettres du titre pour une vraie intégration.
// Canvas 2D, thème-aware, 30 i/s, statique en reduced-motion.

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
  const canvas = document.getElementById('heroNet');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const hero = canvas.parentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const startTime = performance.now();

  let w = 0;
  let h = 0;
  let compact = false;
  let nodes = [];
  let links = [];
  let titleRects = []; // zones du titre : l'arbre s'y estompe
  let spineY = 0;
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
      if (reduce) draw(1e9);
    });
  });

  let guardRects = []; // zones interactives : l'arbre s'y efface totalement
  function measureTitle() {
    titleRects = [];
    guardRects = [];
    const hb = hero.getBoundingClientRect();
    hero.querySelectorAll('.hero-title .mask-line').forEach((line, i) => {
      const r = line.getBoundingClientRect();
      // tissage : l'arbre passe DEVANT la ligne centrale (i === 1) et
      // DERRIÈRE les deux autres — trois plans de profondeur
      titleRects.push({
        x: r.left - hb.left,
        y: r.top - hb.top,
        w: r.width,
        h: r.height,
        weaveFront: i === 1,
      });
    });
    hero.querySelectorAll('.hero-under, .hero-kicker, .hero-baseline').forEach((el) => {
      const r = el.getBoundingClientRect();
      guardRects.push({ x: r.left - hb.left, y: r.top - hb.top, w: r.width, h: r.height });
    });
  }

  function layout() {
    nodes = [];
    links = [];
    pulses.length = 0;
    compact = w < 900;
    const rootX = compact ? w * 0.5 : w * 0.6;
    const rootY = compact ? h * 0.86 : h * 0.44;
    spineY = rootY;
    const spread = compact ? Math.min(w, 560) : Math.min(w * 0.36, 470);
    const root = { ...TREE, x: rootX, y: rootY, depth: 0, parent: null, t0: 0, phase: Math.random() * 6.28 };
    nodes.push(root);
    const arc = compact ? [200, 250, 290, 340] : [-72, -24, 24, 72];
    TREE.children.forEach((branch, bi) => {
      const angle = (arc[bi] * Math.PI) / 180;
      const bx = rootX + Math.cos(angle) * spread * (compact ? 0.42 : 0.52);
      const by = rootY + Math.sin(angle) * spread * (compact ? 0.42 : 0.52) * (compact ? 1 : 0.72);
      const bNode = { ...branch, x: bx, y: by, depth: 1, parent: root, t0: 350 + bi * 220, phase: Math.random() * 6.28 };
      nodes.push(bNode);
      links.push({ a: root, b: bNode, t0: bNode.t0 - 150 });
      (compact ? branch.children.slice(0, 2) : branch.children).forEach((leaf, li) => {
        const la = angle + (li - (branch.children.length - 1) / 2) * (compact ? 0.5 : 0.42);
        let lx = bx + Math.cos(la) * spread * (compact ? 0.3 : 0.34);
        const ly = by + Math.sin(la) * spread * (compact ? 0.3 : 0.34) * (compact ? 1 : 0.72);
        lx = Math.min(lx, w - 130);
        const lNode = { ...leaf, x: lx, y: ly, depth: 2, parent: bNode, t0: bNode.t0 + 260 + li * 140, phase: Math.random() * 6.28 };
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

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = hero.clientWidth;
    h = hero.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    layout();
    measureTitle();
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

    // ---- épine dorsale EBOM : elle relie la composition typo à la racine
    if (!compact) {
      const sk = ease((elapsed - 100) / 900);
      if (sk > 0) {
        const x0 = w * 0.045;
        const x1 = nodes[0].x;
        ctx.strokeStyle = `rgba(${A},0.14)`;
        ctx.lineWidth = 1;
        ctx.setLineDash([1, 7]);
        ctx.beginPath();
        ctx.moveTo(x0, spineY);
        ctx.lineTo(x0 + (x1 - x0) * sk, spineY);
        ctx.stroke();
        ctx.setLineDash([]);
        // graduations
        for (let gx = x0; gx < x0 + (x1 - x0) * sk; gx += 90) {
          ctx.strokeStyle = `rgba(${A},0.22)`;
          ctx.beginPath();
          ctx.moveTo(gx, spineY - 4);
          ctx.lineTo(gx, spineY + 4);
          ctx.stroke();
        }
        ctx.font = `500 9px ui-monospace, "SF Mono", Menlo, monospace`;
        ctx.fillStyle = `rgba(${I},${0.34 * sk})`;
        ctx.fillText('EBOM — STRUCTURE PRODUIT', x0, spineY - 10);
      }
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
        titleRects.some(
          (r) => x + tw > r.x && x - 4 < r.x + r.w && y + fs > r.y && y - fs * 1.4 < r.y + r.h
        ) ||
        placedLabels.some(
          (r) => x + tw > r.x && x - 6 < r.x + r.w && y + fs > r.y && y - fs * 1.4 < r.y + r.h
        );
      // positions candidates : droite du nœud, dessous, dessus, gauche —
      // la première qui n'entre en collision ni avec le titre ni avec une
      // étiquette déjà posée gagne (la dernière sert de repli)
      const off = Math.max(size, 6);
      const spots = [
        [p.x + off + 10, p.y],
        [p.x - tw / 2, p.y + off + fs + 6],
        [p.x - tw / 2, p.y - off - fs - 2],
        [p.x - off - 10 - tw, p.y],
      ];
      let [tx, ty] = spots[spots.length - 1];
      for (const [sx, sy] of spots) {
        if (!labelHits(sx, sy)) {
          tx = sx;
          ty = sy;
          break;
        }
      }
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

    // ---- tissage typographique : trois plans de profondeur.
    // Le canvas est AU-DESSUS du texte ; on efface l'arbre derrière les lignes
    // « arrière » (le texte réapparaît devant lui) et on le laisse passer
    // DEVANT la ligne centrale. Les zones interactives sont toujours dégagées.
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    for (const r of titleRects) {
      if (r.weaveFront) continue; // l'arbre reste devant cette ligne
      const g = ctx.createLinearGradient(0, r.y - 10, 0, r.y + r.h + 10);
      const a = 0.94 - hoverGlow * 0.15;
      g.addColorStop(0, 'rgba(0,0,0,0)');
      g.addColorStop(0.18, `rgba(0,0,0,${a})`);
      g.addColorStop(0.82, `rgba(0,0,0,${a})`);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(r.x - 20, r.y - 10, r.w + 40, r.h + 20);
    }
    for (const r of guardRects) {
      ctx.fillStyle = 'rgba(0,0,0,1)';
      ctx.fillRect(r.x - 12, r.y - 12, r.w + 24, r.h + 24);
    }
    ctx.restore();
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
  hero.addEventListener(
    'pointermove',
    (e) => {
      const b = hero.getBoundingClientRect();
      pointer.x = e.clientX - b.left;
      pointer.y = e.clientY - b.top;
      const n = nodeAt(pointer.x, pointer.y);
      if (n !== hovered) {
        hovered = n;
        hero.style.cursor = n && n.href ? 'pointer' : '';
        if (reduce) draw(1e9);
      }
    },
    { passive: true }
  );
  hero.addEventListener('click', (e) => {
    if (e.target.closest('a, button, input, textarea, summary')) return;
    if (hovered?.href) {
      if (hovered.href.startsWith('#')) {
        document.querySelector(hovered.href)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
      } else {
        window.location.href = hovered.href;
      }
    }
  });

  window.addEventListener('resize', resize);
  // les fonts chargent après nous : re-mesure le titre une fois prêtes
  document.fonts?.ready?.then(() => measureTitle());
  resize();

  if (reduce) return;

  let visible = true;
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
  }).observe(hero);

  let last = 0;
  function frame(now) {
    requestAnimationFrame(frame);
    if (!visible || document.hidden) return;
    if (now - last < 32) return;
    last = now;
    draw(now);
  }
  requestAnimationFrame(frame);
}
