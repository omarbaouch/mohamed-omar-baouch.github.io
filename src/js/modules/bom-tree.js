// Signature du site : l'ARBRE D'ASSEMBLAGE PDM vivant.
// La structure du site est dessinée comme une nomenclature SOLIDWORKS PDM :
// un assemblage racine, des sous-ensembles (expérience, projets, compétences,
// blog) et leurs pièces, avec références et révisions réelles. L'arbre se
// construit branche par branche au chargement, une impulsion de « check-in »
// circule dans les liens, le survol illumine la chaîne des cas d'emploi
// (where-used) et chaque nœud navigue réellement vers sa section.
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
  let nodes = []; // { x, y, ref, rev, href, depth, parent, t0 (délai d'apparition), phase }
  let links = []; // { a, b, t0 }
  const pointer = { x: -9999, y: -9999 };
  let hovered = null;
  let pulse = { link: 0, t: 0 }; // impulsion de check-in qui circule

  let ink = { r: 244, g: 243, b: 240 };
  let accent = { r: 111, g: 168, b: 214 };
  function hexToRgb(hex) {
    const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
    return m
      ? { r: parseInt(m[1].slice(0, 2), 16), g: parseInt(m[1].slice(2, 4), 16), b: parseInt(m[1].slice(4, 6), 16) }
      : null;
  }
  function readTheme() {
    const s = getComputedStyle(document.documentElement);
    accent = hexToRgb(s.getPropertyValue('--accent')) || accent;
    ink = hexToRgb(s.getPropertyValue('--ink')) || ink;
  }
  readTheme();
  document.getElementById('themeSwitch')?.addEventListener('click', () => {
    requestAnimationFrame(() => {
      readTheme();
      if (reduce) draw(1e9);
    });
  });

  // ---- Mise en plat de l'arbre : positions déterministes, en éventail à droite
  function layout() {
    nodes = [];
    links = [];
    compact = w < 900;
    const rootX = compact ? w * 0.5 : w * 0.6;
    const rootY = compact ? h * 0.86 : h * 0.44;
    const spread = compact ? Math.min(w, 560) : Math.min(w * 0.36, 470);
    const root = { ...TREE, x: rootX, y: rootY, depth: 0, parent: null, t0: 0, phase: Math.random() * 6.28 };
    nodes.push(root);
    const branches = TREE.children;
    // les branches s'ouvrent en éventail vers la droite (ou vers le haut en compact)
    const arc = compact ? [200, 250, 290, 340] : [-72, -24, 24, 72];
    branches.forEach((branch, bi) => {
      const angle = (arc[bi] * Math.PI) / 180;
      const bx = rootX + Math.cos(angle) * spread * (compact ? 0.42 : 0.52);
      const by = rootY + Math.sin(angle) * spread * (compact ? 0.42 : 0.52) * (compact ? 1 : 0.72);
      const bNode = { ...branch, x: bx, y: by, depth: 1, parent: root, t0: 350 + bi * 220, phase: Math.random() * 6.28 };
      nodes.push(bNode);
      links.push({ a: root, b: bNode, t0: bNode.t0 - 150 });
      (compact ? branch.children.slice(0, 2) : branch.children).forEach((leaf, li) => {
        const la = angle + ((li - (branch.children.length - 1) / 2) * (compact ? 0.5 : 0.42));
        let lx = bx + Math.cos(la) * spread * (compact ? 0.3 : 0.34);
        const ly = by + Math.sin(la) * spread * (compact ? 0.3 : 0.34) * (compact ? 1 : 0.72);
        // garde les étiquettes dans le cadre (elles s'écrivent à droite du nœud)
        lx = Math.min(lx, w - 130);
        const lNode = { ...leaf, x: lx, y: ly, depth: 2, parent: bNode, t0: bNode.t0 + 260 + li * 140, phase: Math.random() * 6.28 };
        nodes.push(lNode);
        links.push({ a: bNode, b: lNode, t0: lNode.t0 - 120 });
      });
    });
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = hero.clientWidth;
    h = hero.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    layout();
    if (reduce) draw(1e9);
  }

  const ease = (t) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);

  function nodePos(n, now) {
    // flottement organique très léger, jamais en reduced-motion
    if (reduce) return { x: n.x, y: n.y };
    const t = now * 0.001;
    return { x: n.x + Math.sin(t * 0.5 + n.phase) * 3, y: n.y + Math.cos(t * 0.4 + n.phase) * 3 };
  }

  function inChain(n) {
    // la chaîne « cas d'emploi » : le nœud survolé et tous ses parents
    let c = hovered;
    while (c) {
      if (c === n) return true;
      c = c.parent;
    }
    return false;
  }

  function draw(now) {
    ctx.clearRect(0, 0, w, h);
    const elapsed = reduce ? 1e9 : now - startTime;
    const A = `${accent.r},${accent.g},${accent.b}`;
    const I = `${ink.r},${ink.g},${ink.b}`;

    // liens : tracés progressivement (l'assemblage se construit)
    for (const l of links) {
      const k = ease((elapsed - l.t0) / 600);
      if (k <= 0) continue;
      const pa = nodePos(l.a, now);
      const pb = nodePos(l.b, now);
      const mx = pa.x + (pb.x - pa.x) * k;
      const my = pa.y + (pb.y - pa.y) * k;
      const lit = hovered && inChain(l.b) && inChain(l.a);
      ctx.strokeStyle = lit ? `rgba(${A},0.85)` : `rgba(${A},0.28)`;
      ctx.lineWidth = lit ? 1.4 : 1;
      ctx.beginPath();
      // coude orthogonal, comme un arbre de nomenclature
      ctx.moveTo(pa.x, pa.y);
      ctx.lineTo(pa.x + (mx - pa.x) * 0.5, pa.y);
      ctx.lineTo(pa.x + (mx - pa.x) * 0.5, my);
      ctx.lineTo(mx, my);
      ctx.stroke();
    }

    // impulsion de check-in circulant sur un lien
    if (!reduce && links.length) {
      pulse.t += 0.012;
      if (pulse.t >= 1) {
        pulse.t = 0;
        pulse.link = (pulse.link + 1 + Math.floor(Math.random() * 3)) % links.length;
      }
      const l = links[pulse.link];
      if (elapsed > l.t0 + 600) {
        const pa = nodePos(l.a, now);
        const pb = nodePos(l.b, now);
        const k = ease(pulse.t);
        // trajet le long du coude
        const midX = pa.x + (pb.x - pa.x) * 0.5;
        let px;
        let py;
        if (k < 0.34) {
          px = pa.x + (midX - pa.x) * (k / 0.34);
          py = pa.y;
        } else if (k < 0.67) {
          px = midX;
          py = pa.y + (pb.y - pa.y) * ((k - 0.34) / 0.33);
        } else {
          px = midX + (pb.x - midX) * ((k - 0.67) / 0.33);
          py = pb.y;
        }
        ctx.fillStyle = `rgba(${A},${(0.9 * Math.sin(Math.PI * k)).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(px, py, 2.6, 0, 6.283);
        ctx.fill();
      }
    }

    // nœuds + étiquettes
    ctx.textBaseline = 'middle';
    for (const n of nodes) {
      const k = ease((elapsed - n.t0) / 500);
      if (k <= 0) continue;
      const p = nodePos(n, now);
      const lit = n === hovered || inChain(n);
      const isRoot = n.depth === 0;
      const isBranch = n.depth === 1;
      const size = (isRoot ? 7 : isBranch ? 5.2 : 3.6) * k;

      // pastille : carré pivoté pour les assemblages, rond pour les pièces/docs
      ctx.fillStyle = lit ? `rgba(${A},1)` : `rgba(${A},${isRoot ? 0.95 : 0.62})`;
      if (isRoot || isBranch) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(Math.PI / 4);
        ctx.fillRect(-size, -size, size * 2, size * 2);
        ctx.restore();
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, 6.283);
        ctx.fill();
      }
      if (lit) {
        ctx.strokeStyle = `rgba(${A},0.4)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size + 6, 0, 6.283);
        ctx.stroke();
      }

      // étiquette : référence (mono) + révision atténuée
      const fs = isRoot ? 12 : isBranch ? 11 : 10;
      ctx.font = `600 ${fs}px ui-monospace, "SF Mono", Menlo, monospace`;
      const alpha = k * (lit ? 1 : isRoot ? 0.9 : isBranch ? 0.75 : 0.55);
      ctx.fillStyle = `rgba(${I},${alpha.toFixed(3)})`;
      const tx = p.x + size + 9;
      ctx.fillText(n.ref, tx, p.y - (isRoot || isBranch ? 6 : 0));
      if (isRoot || isBranch || lit) {
        ctx.font = `400 ${fs - 2}px ui-monospace, "SF Mono", Menlo, monospace`;
        ctx.fillStyle = `rgba(${A},${(alpha * 0.9).toFixed(3)})`;
        ctx.fillText(n.rev, tx, p.y + 8);
      }
    }
  }

  // ---- Interactions : survol (chaîne where-used) et clic (navigation)
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
    if (now - last < 32) return; // 30 i/s
    last = now;
    draw(now);
  }
  requestAnimationFrame(frame);
}
