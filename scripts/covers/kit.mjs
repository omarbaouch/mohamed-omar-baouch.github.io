// Kit de dessin des couvertures d'articles : des planches de dessin technique,
// dans la palette du hero (bleu nuit, traits bleu acier, repère orange).
// Une planche = un cadre normalisé (repères de zones comme la grille de l'accueil,
// cartouche), un dessin propre au sujet, et une grande cote « clé » à gauche.
// Aucun texte à traduire : codes, normes et valeurs seulement — la même image
// sert la page française et la page anglaise.
export const W = 1600, H = 900;
export const C = {
  bg0: '#0a1420', bg1: '#13283d',
  line: '#d4e4f2',                    // trait fort
  mid: '#9bc6e6',                     // trait moyen, cotes
  faint: 'rgba(155,198,230,.32)',     // construction
  ghost: 'rgba(155,198,230,.12)',     // grille
  accent: '#efa471',                  // l'élément qui répond à la question
  accentSoft: 'rgba(239,164,113,.16)',
  ink: '#f4f3f0',
  fill: 'rgba(155,198,230,.07)',
};
export const MONO = "'DejaVu Sans Mono', monospace";
export const SANS = "'Instrument Sans', sans-serif";

const f = (n) => +n.toFixed(2);

// langue de la planche : libellés traduits, virgule décimale en français
// (les classes de qualité type « 8.8 » gardent leur point : ne pas les passer à num)
export function lang(l) {
  return {
    t: (fr, en) => (l === 'en' ? en : fr),
    num: (s) => (l === 'en' ? String(s) : String(s).replace(/(\d)\.(\d)/g, '$1,$2')),
  };
}
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function line(x1, y1, x2, y2, { c = C.line, w = 2, dash, cap = 'round', op } = {}) {
  return `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${c}" stroke-width="${w}" stroke-linecap="${cap}"${dash ? ` stroke-dasharray="${dash}"` : ''}${op != null ? ` opacity="${op}"` : ''}/>`;
}
export function path(d, { c = C.line, w = 2, fill = 'none', dash, op, join = 'round' } = {}) {
  return `<path d="${d}" stroke="${c}" stroke-width="${w}" fill="${fill}" stroke-linejoin="${join}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}${op != null ? ` opacity="${op}"` : ''}/>`;
}
export function rect(x, y, w, h, { c = C.line, sw = 2, fill = 'none', r = 0, dash, op } = {}) {
  return `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="${r}" stroke="${c}" stroke-width="${sw}" fill="${fill}"${dash ? ` stroke-dasharray="${dash}"` : ''}${op != null ? ` opacity="${op}"` : ''}/>`;
}
export function circle(cx, cy, r, { c = C.line, w = 2, fill = 'none', dash, op } = {}) {
  return `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" stroke="${c}" stroke-width="${w}" fill="${fill}"${dash ? ` stroke-dasharray="${dash}"` : ''}${op != null ? ` opacity="${op}"` : ''}/>`;
}
export function poly(pts, opts = {}) {
  return path('M' + pts.map(([x, y]) => `${f(x)} ${f(y)}`).join(' L') + (opts.open ? '' : ' Z'), opts);
}
export function text(x, y, s, { size = 20, c = C.mid, anchor = 'start', font = MONO, weight = 400, ls = 0, op, rotate } = {}) {
  const t = rotate ? ` transform="rotate(${rotate} ${f(x)} ${f(y)})"` : '';
  return `<text x="${f(x)}" y="${f(y)}" font-family="${font}" font-size="${size}" font-weight="${weight}" fill="${c}" text-anchor="${anchor}" letter-spacing="${ls}"${op != null ? ` opacity="${op}"` : ''}${t}>${esc(s)}</text>`;
}
// trait d'axe (mixte fin)
export const axis = (x1, y1, x2, y2, o = {}) => line(x1, y1, x2, y2, { c: C.mid, w: 1.4, dash: '28 7 4 7', op: 0.8, ...o });

function head(x, y, ang, { c = C.mid, s = 14 } = {}) {
  const a1 = ang + Math.PI - 0.3, a2 = ang + Math.PI + 0.3;
  return `<path d="M${f(x)} ${f(y)} L${f(x + s * Math.cos(a1))} ${f(y + s * Math.sin(a1))} L${f(x + s * Math.cos(a2))} ${f(y + s * Math.sin(a2))} Z" fill="${c}"/>`;
}
export const arrow = (x1, y1, x2, y2, o = {}) => line(x1, y1, x2, y2, { c: o.c || C.mid, w: o.w || 1.6 }) + head(x2, y2, Math.atan2(y2 - y1, x2 - x1), o);

// cote linéaire entre deux points, décalée de `off` (perpendiculaire), valeur au milieu
export function dim(x1, y1, x2, y2, label, { off = 40, c = C.mid, size = 22, ext = true, tc } = {}) {
  const a = Math.atan2(y2 - y1, x2 - x1), nx = -Math.sin(a), ny = Math.cos(a);
  const p1 = [x1 + nx * off, y1 + ny * off], p2 = [x2 + nx * off, y2 + ny * off];
  let s = '';
  if (ext) {
    const k = Math.sign(off) * 10;
    s += line(x1 + nx * 6 * Math.sign(off), y1 + ny * 6 * Math.sign(off), p1[0] + nx * k, p1[1] + ny * k, { c, w: 1.2, op: 0.7 });
    s += line(x2 + nx * 6 * Math.sign(off), y2 + ny * 6 * Math.sign(off), p2[0] + nx * k, p2[1] + ny * k, { c, w: 1.2, op: 0.7 });
  }
  s += line(p1[0], p1[1], p2[0], p2[1], { c, w: 1.4 }) + head(p1[0], p1[1], a + Math.PI, { c }) + head(p2[0], p2[1], a, { c });
  const mx = (p1[0] + p2[0]) / 2, my = (p1[1] + p2[1]) / 2;
  let deg = (a * 180) / Math.PI;
  if (deg > 90 || deg < -90) deg += 180;
  const lx = mx + nx * 12 * Math.sign(off || 1), ly = my + ny * 12 * Math.sign(off || 1);
  return s + text(lx, ly + (Math.abs(deg) < 1 ? -2 : 0), label, { size, c: tc || c, anchor: 'middle', rotate: Math.abs(deg) > 0.5 ? deg : 0 });
}
// ligne de rappel avec texte au bout
export function leader(x1, y1, x2, y2, label, { c = C.mid, size = 20, side = 1, tc } = {}) {
  const x3 = x2 + side * 18;
  return arrow(x2, y2, x1, y1, { c }) + line(x2, y2, x3, y2, { c, w: 1.4 }) + text(x3 + side * 8, y2 + 7, label, { size, c: tc || c, anchor: side > 0 ? 'start' : 'end' });
}

const defs = `
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${C.bg1}"/><stop offset=".62" stop-color="${C.bg0}"/><stop offset="1" stop-color="#070f19"/>
    </linearGradient>
    <radialGradient id="glow" cx=".62" cy=".42" r=".55">
      <stop offset="0" stop-color="#1d4467" stop-opacity=".55"/><stop offset="1" stop-color="#1d4467" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="${C.ghost}" stroke-width="1"/>
    </pattern>
    <pattern id="hatch" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="14" stroke="${C.mid}" stroke-width="1.6" opacity=".55"/>
    </pattern>
    <pattern id="hatchA" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
      <line x1="0" y1="0" x2="0" y2="12" stroke="${C.accent}" stroke-width="2" opacity=".75"/>
    </pattern>
    <pattern id="hatchX" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
      <line x1="0" y1="0" x2="0" y2="14" stroke="${C.mid}" stroke-width="1.6" opacity=".55"/>
    </pattern>
  </defs>`;

// le cadre de la planche : marges à repères de zones, cartouche, clé typographique
export function sheet({ ref, std = '', rev = 'A', scale = '1:1', key = '', keySub = '', body = '', keyX = 92, keyY = 720, keySize = 150 }) {
  const m = 34; // marge du cadre
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${defs}
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect x="${m}" y="${m}" width="${W - 2 * m}" height="${H - 2 * m}" fill="url(#grid)"/>`;
  // cadre et repères de zones (1…8, A…F), comme la grille de l'accueil
  s += rect(m, m, W - 2 * m, H - 2 * m, { c: C.mid, sw: 1.4, op: 0.45 });
  s += rect(m + 14, m + 14, W - 2 * m - 28, H - 2 * m - 28, { c: C.mid, sw: 1, op: 0.22 });
  for (let i = 1; i < 8; i++) {
    const x = m + ((W - 2 * m) * i) / 8;
    s += line(x, m, x, m + 14, { c: C.mid, w: 1, op: 0.45 }) + line(x, H - m - 14, x, H - m, { c: C.mid, w: 1, op: 0.45 });
  }
  for (let i = 0; i < 8; i++) s += text(m + ((W - 2 * m) * (i + 0.5)) / 8, m + 11, String(i + 1), { size: 10, anchor: 'middle', op: 0.5 });
  for (let i = 1; i < 6; i++) {
    const y = m + ((H - 2 * m) * i) / 6;
    s += line(m, y, m + 14, y, { c: C.mid, w: 1, op: 0.45 }) + line(W - m - 14, y, W - m, y, { c: C.mid, w: 1, op: 0.45 });
  }
  for (let i = 0; i < 6; i++) s += text(m + 7, m + ((H - 2 * m) * (i + 0.5)) / 6 + 4, 'ABCDEF'[i], { size: 10, anchor: 'middle', op: 0.5 });
  // repères d'angle
  for (const [x, y, dx, dy] of [[m, m, 1, 1], [W - m, m, -1, 1], [m, H - m, 1, -1], [W - m, H - m, -1, -1]]) {
    s += path(`M${x + dx * 46} ${y} H${x} V${y + dy * 46}`, { c: C.accent, w: 2.4, op: 0.9 });
  }
  // le dessin
  s += `<g>${body}</g>`;
  // clé typographique (la valeur que l'article donne)
  if (key) {
    s += text(keyX, keyY, key, { size: keySize, c: C.ink, font: SANS, weight: 600, ls: -3 });
    if (keySub) s += text(keyX + 4, keyY + 44, keySub, { size: 22, c: C.accent, ls: 4 });
  }
  // cartouche
  const bw = 520, bh = 92, bx = W - m - 14 - bw, by = H - m - 14 - bh, c1 = 340, c2 = 430;
  s += rect(bx, by, bw, bh, { c: C.mid, sw: 1.4, fill: 'rgba(10,20,32,.82)' });
  s += line(bx, by + 46, bx + bw, by + 46, { c: C.mid, w: 1, op: 0.6 });
  s += line(bx + c1, by, bx + c1, by + bh, { c: C.mid, w: 1, op: 0.6 });
  s += line(bx + c2, by + 46, bx + c2, by + bh, { c: C.mid, w: 1, op: 0.6 });
  s += text(bx + 16, by + 31, 'BAOUCH.FR', { size: 20, c: C.ink, ls: 3, weight: 700 });
  s += text(bx + c1 + 16, by + 31, ref, { size: 20, c: C.accent, ls: 1.5, weight: 700 });
  s += text(bx + 16, by + 76, std, { size: 16, c: C.mid, ls: 0.5 });
  s += text(bx + c1 + 16, by + 76, 'REV.' + rev, { size: 16, c: C.mid });
  s += text(bx + c2 + 14, by + 76, scale, { size: 16, c: C.mid });
  return s + '</svg>';
}
