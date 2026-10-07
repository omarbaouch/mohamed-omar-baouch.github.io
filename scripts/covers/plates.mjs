// Une planche par article : le dessin technique de son sujet, en français et en anglais.
// Chaque fonction reçoit la langue et renvoie le SVG complet (cadre et outils : kit.mjs).
// Les valeurs affichées sont celles des articles (M10 8.8 : 48 N·m à µ 0,12 ; budget
// PDM 35 / 10 / 30 / 25 % ; licence 5 000 à 13 000 € HT ; etc.).
import { C, sheet, line, path, rect, circle, poly, text, axis, arrow, dim, leader, lang, SANS } from './kit.mjs';

const range = (n) => Array.from({ length: n }, (_, i) => i);
const rnd = (i, k = 0) => { const s = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return s - Math.floor(s); };
const tip = (x, y, a, c = C.accent, s = 16) => `<path d="M${x} ${y} l${(-s * Math.cos(a - 0.35)).toFixed(1)} ${(-s * Math.sin(a - 0.35)).toFixed(1)} L${(x - s * Math.cos(a + 0.35)).toFixed(1)} ${(y - s * Math.sin(a + 0.35)).toFixed(1)} Z" fill="${c}"/>`;

// ---- motifs partagés
function node(x, y, label, { w = 150, h = 42, accent = false } = {}) {
  let s = rect(x, y, w, h, { c: accent ? C.accent : C.mid, sw: accent ? 2.4 : 1.6, fill: accent ? 'rgba(239,164,113,.12)' : 'rgba(10,20,32,.85)' });
  s += rect(x, y + 8, 5, h - 16, { c: 'none', sw: 0, fill: accent ? C.accent : C.mid });
  s += text(x + 16, y + 27, label, { size: 17, c: accent ? C.accent : C.ink, weight: 700 });
  return s;
}
const link = (x1, y1, x2, y2, o = {}) => path(`M${x1} ${y1} V${(y1 + y2) / 2} H${x2} V${y2}`, { c: o.c || C.mid, w: o.w || 1.6, dash: o.dash, op: o.op });
function file(x, y, ext, { w = 74, h = 92, accent = false, op } = {}) {
  const c = accent ? C.accent : C.mid;
  let s = path(`M${x} ${y} H${x + w - 22} L${x + w} ${y + 22} V${y + h} H${x} Z`, { c, w: 2, fill: 'rgba(10,20,32,.85)', op });
  s += path(`M${x + w - 22} ${y} V${y + 22} H${x + w}`, { c, w: 1.6, op });
  s += text(x + w / 2, y + h - 16, ext, { size: 15, c: accent ? C.accent : C.ink, anchor: 'middle', weight: 700, op });
  return s;
}
function rack(x, y, w, h, { units = 6, accent = -1 } = {}) {
  let s = rect(x, y, w, h, { c: C.line, sw: 2.2, fill: 'rgba(10,20,32,.85)' });
  const uh = (h - 24) / units;
  for (const i of range(units)) {
    const yy = y + 12 + i * uh;
    s += rect(x + 12, yy + 4, w - 24, uh - 8, { c: i === accent ? C.accent : C.mid, sw: 1.4 });
    s += circle(x + 28, yy + uh / 2, 4, { c: 'none', w: 0, fill: i === accent ? C.accent : C.mid });
    for (const k of range(5)) s += line(x + w - 80 + k * 12, yy + 12, x + w - 80 + k * 12, yy + uh - 12, { c: C.mid, w: 1.2, op: 0.6 });
  }
  return s;
}

// ---------------------------------------------------------------- mémos & outils
function soudure(l) {
  const { t, num } = lang(l);
  let b = '';
  b += rect(700, 560, 720, 60, { sw: 2.4, fill: 'url(#hatch)' });
  b += rect(960, 250, 60, 310, { sw: 2.4, fill: 'url(#hatchX)' });
  b += axis(990, 205, 990, 660);
  b += poly([[1020, 560], [1110, 560], [1020, 470]], { c: C.accent, w: 2.6, fill: 'url(#hatchA)' });
  b += line(1020, 560, 1065, 515, { c: C.accent, w: 2.4 });
  b += text(1030, 530, 'a', { size: 26, c: C.accent, font: SANS, weight: 600 });
  b += dim(1020, 620, 1110, 620, 'z', { off: 42, size: 24 });
  b += arrow(1190, 330, 1078, 498, { c: C.line, w: 2, s: 18 });
  b += line(1190, 330, 1440, 330, { w: 2.4 });
  b += line(1190, 346, 1440, 346, { w: 2, dash: '12 8' });
  b += poly([[1268, 330], [1268, 296], [1302, 330]], { c: C.accent, w: 2.6, fill: C.accentSoft });
  b += text(1258, 322, 'a5', { size: 26, c: C.ink, anchor: 'end', weight: 700 });
  b += text(1312, 322, '200', { size: 26, c: C.ink, weight: 700 });
  b += path('M1440 330 L1468 306 M1440 330 L1468 354', { w: 2.2 });
  b += text(1476, 339, '135', { size: 24, c: C.mid, weight: 700 });
  b += text(1190, 404, t('━━  CÔTÉ FLÈCHE', '━━  ARROW SIDE'), { size: 16, c: C.mid, ls: 2 });
  b += text(1190, 430, t('╌╌  CÔTÉ OPPOSÉ', '╌╌  OTHER SIDE'), { size: 16, c: C.mid, ls: 2 });
  b += text(700, 690, 'z = a · √2', { size: 22, c: C.mid, ls: 1 });
  return sheet({ ref: 'MEM-08', std: 'ISO 2553 · ISO 4063', rev: 'A', scale: '2:1', key: 'a5', keySub: `z ${num('7.1')}`, body: b, keyY: 700, keySize: 210 });
}

function aciers(l) {
  const { t, num } = lang(l);
  let b = '';
  // section de poutrelle en I (semelles, âme, congés simplifiés)
  const x0 = 660, y0 = 210, w = 300, h = 400, tf = 34, tw = 22;
  const d = `M${x0} ${y0} H${x0 + w} V${y0 + tf} H${x0 + w / 2 + tw / 2 + 18} Q${x0 + w / 2 + tw / 2} ${y0 + tf} ${x0 + w / 2 + tw / 2} ${y0 + tf + 18} V${y0 + h - tf - 18} Q${x0 + w / 2 + tw / 2} ${y0 + h - tf} ${x0 + w / 2 + tw / 2 + 18} ${y0 + h - tf} H${x0 + w} V${y0 + h} H${x0} V${y0 + h - tf} H${x0 + w / 2 - tw / 2 - 18} Q${x0 + w / 2 - tw / 2} ${y0 + h - tf} ${x0 + w / 2 - tw / 2} ${y0 + h - tf - 18} V${y0 + tf + 18} Q${x0 + w / 2 - tw / 2} ${y0 + tf} ${x0 + w / 2 - tw / 2 - 18} ${y0 + tf} H${x0} Z`;
  b += path(d, { w: 2.4, fill: 'url(#hatch)' });
  b += axis(x0 + w / 2, y0 - 40, x0 + w / 2, y0 + h + 40);
  b += axis(x0 - 40, y0 + h / 2, x0 + w + 40, y0 + h / 2);
  b += dim(x0 + w, y0, x0 + w, y0 + tf, '', { off: -46, size: 22, c: C.accent, tc: C.accent });
  b += text(x0 + w + 72, y0 + 25, 't ≤ 16 mm', { size: 20, c: C.accent, weight: 700 });
  // courbe contrainte-déformation
  const gx = 1080, gy = 600, gw = 400, gh = 330;
  b += arrow(gx, gy, gx + gw, gy, { c: C.mid, w: 1.6 });
  b += arrow(gx, gy, gx, gy - gh, { c: C.mid, w: 1.6 });
  b += text(gx + gw - 6, gy + 32, 'ε', { size: 24, c: C.mid, anchor: 'end', font: SANS });
  b += text(gx - 14, gy - gh + 8, 'σ', { size: 24, c: C.mid, anchor: 'end', font: SANS });
  const yRe = gy - 190, yRm = gy - 260;
  b += path(`M${gx} ${gy} L${gx + 40} ${yRe} L${gx + 92} ${yRe} Q${gx + 220} ${yRm - 14} ${gx + 300} ${yRm} Q${gx + 340} ${yRm + 6} ${gx + 362} ${yRm + 40}`, { c: C.accent, w: 3 });
  b += line(gx, yRe, gx + 92, yRe, { c: C.accent, w: 1.2, dash: '6 6', op: 0.8 });
  b += text(gx + 104, yRe + 30, `Re ${num('355')} MPa`, { size: 20, c: C.accent, weight: 700 });
  b += line(gx, yRm, gx + 300, yRm, { c: C.mid, w: 1.2, dash: '6 6', op: 0.6 });
  b += text(gx + 12, yRm - 12, t('Rm 470 – 630', 'Rm 470 – 630'), { size: 18, c: C.mid });
  b += text(gx, gy + 70, t('E ≈ 210 000 MPa', 'E ≈ 210,000 MPa'), { size: 18, c: C.mid, ls: 1 });
  return sheet({ ref: 'MEM-09', std: 'EN 10025-2', rev: 'A', scale: '1:2', key: 'S355', keySub: 'J2 · −20 °C · 27 J', body: b, keyY: 760, keySize: 170 });
}

function durete(l) {
  const { t, num } = lang(l);
  let b = '';
  // empreinte Vickers vue de dessus : losange et diagonales d1, d2
  const cx = 860, cy = 400, r = 190;
  b += poly([[cx, cy - r], [cx + r, cy], [cx, cy + r], [cx - r, cy]], { c: C.line, w: 2.4, fill: 'url(#hatch)' });
  b += line(cx - r, cy, cx + r, cy, { c: C.accent, w: 2 });
  b += line(cx, cy - r, cx, cy + r, { c: C.accent, w: 2 });
  b += dim(cx - r, cy + r + 20, cx + r, cy + r + 20, 'd1', { off: 26, size: 22 });
  b += dim(cx + r + 20, cy - r, cx + r + 20, cy + r, 'd2', { off: -30, size: 22 });
  b += text(cx, cy - r - 34, t('136° · VICKERS', '136° · VICKERS'), { size: 18, c: C.mid, anchor: 'middle', ls: 2 });
  // échelle de correspondance
  const x = 1190, rows = [['HRC', '40', '60'], ['HV', '392', '697'], ['HBW', '371', '654']];
  rows.forEach(([k, a, c2], i) => {
    const y = 290 + i * 78;
    b += text(x, y, k, { size: 24, c: C.mid, weight: 700 });
    b += text(x + 120, y, a, { size: 28, c: C.ink, weight: 700 });
    b += text(x + 230, y, c2, { size: 28, c: C.accent, weight: 700 });
    b += line(x, y + 20, x + 320, y + 20, { c: C.mid, w: 1, op: 0.4 });
  });
  b += text(x, 290 + 3 * 78 + 10, t('≈ ASTM E140 · aciers', '≈ ASTM E140 · steels'), { size: 18, c: C.mid, ls: 1 });
  return sheet({ ref: 'MEM-10', std: 'ASTM E140 · ISO 18265', rev: 'A', scale: '200:1', key: '60', keySub: `HRC ≈ 697 HV`, body: b, keyY: 760, keySize: 200 });
}

function clavette(l) {
  const { t, num } = lang(l);
  let b = '';
  // coupe arbre Ø25 (échelle 12 px/mm) dans un moyeu, clavette 8 × 7, t1 = 4, t2 = 3,3
  const k = 12, cx = 860, cy = 450, R = 12.5 * k, Rh = 30 * k;
  const w = 8 * k, t1 = 4 * k, t2 = 3.3 * k, h = 7 * k;
  const yTop = cy - R;                       // génératrice supérieure de l'arbre
  const yShaftBottom = yTop + t1;            // fond de rainure d'arbre
  const yHubTop = yTop - t2;                 // fond de rainure de moyeu
  // moyeu (anneau) avec rainure
  const a = Math.asin((w / 2) / R);
  b += path(`M${cx - Rh} ${cy} A${Rh} ${Rh} 0 1 1 ${cx + Rh} ${cy} A${Rh} ${Rh} 0 1 1 ${cx - Rh} ${cy} Z`, { c: C.line, w: 2.2, fill: 'url(#hatchX)' });
  // alésage avec rainure de moyeu
  b += path(`M${cx - w / 2} ${cy - R * Math.cos(a)} V${yHubTop} H${cx + w / 2} V${cy - R * Math.cos(a)} A${R} ${R} 0 1 1 ${cx - w / 2} ${cy - R * Math.cos(a)} Z`, { c: C.line, w: 2.2, fill: C.bg0 });
  // arbre avec rainure
  b += path(`M${cx - w / 2} ${cy - R * Math.cos(a)} V${yShaftBottom} H${cx + w / 2} V${cy - R * Math.cos(a)} A${R} ${R} 0 1 1 ${cx - w / 2} ${cy - R * Math.cos(a)} Z`, { c: C.line, w: 2.4, fill: 'url(#hatch)' });
  // clavette
  b += rect(cx - w / 2, yShaftBottom - h, w, h, { c: C.accent, sw: 2.6, fill: 'url(#hatchA)' });
  b += axis(cx - Rh - 30, cy, cx + Rh + 30, cy);
  b += axis(cx, cy - Rh - 30, cx, cy + Rh + 30);
  b += dim(cx - w / 2, yHubTop, cx + w / 2, yHubTop, 'b = 8', { off: -54, size: 20, c: C.accent, tc: C.accent });
  b += line(cx + w / 2, yTop, cx + Rh + 20, yTop, { c: C.mid, w: 1, op: 0.6, dash: '4 6' });
  b += line(cx + w / 2, yShaftBottom, cx + Rh + 20, yShaftBottom, { c: C.mid, w: 1, op: 0.6, dash: '4 6' });
  b += text(cx + Rh + 60, yTop + 30, `t1 ${num('4')} · t2 ${num('3.3')}`, { size: 20, c: C.ink, weight: 700 });
  b += text(cx + Rh + 60, yTop + 62, `d − t1 = 21`, { size: 20, c: C.accent, weight: 700 });
  b += text(cx + Rh + 60, yTop + 94, `d + t2 = ${num('28.3')}`, { size: 20, c: C.mid, weight: 700 });
  b += text(cx, cy + R + 44, 'Ø25', { size: 22, c: C.mid, anchor: 'middle', weight: 700 });
  return sheet({ ref: 'MEM-11', std: 'DIN 6885-1 · ISO 773', rev: 'A', scale: '2:1', key: '8 × 7', keySub: 'Ø 22 – 30 · N9 / JS9', body: b, keyY: 760, keySize: 170 });
}

function filetageGaz(l) {
  const { t, num } = lang(l);
  let b = '';
  // deux profils de filet : 55° (G) en haut, 60° (NPT) en bas, même pas
  const P = 110, x0 = 640, x1 = 1460;
  const prof = (y0, ang, c, w) => {
    const half = Math.tan((ang / 2) * Math.PI / 180), H = (P / 2) / half;
    let d = `M${x0} ${y0}`;
    for (let x = x0; x + P <= x1; x += P) d += ` L${x + P / 2} ${y0 - H} L${x + P} ${y0}`;
    return { d: path(d, { c, w }), H };
  };
  const g = prof(400, 55, C.accent, 3), n = prof(700, 60, C.line, 2.2);
  b += g.d + n.d;
  b += axis(x0 - 20, 400, x1 + 20, 400, { op: 0.5 }) + axis(x0 - 20, 700, x1 + 20, 700, { op: 0.5 });
  // angles annotés sur le 3e filet
  const xa = x0 + 2 * P + P / 2;
  b += text(xa, 400 - g.H - 18, '55°', { size: 26, c: C.accent, anchor: 'middle', weight: 700 });
  b += text(xa, 700 - n.H - 18, '60°', { size: 26, c: C.ink, anchor: 'middle', weight: 700 });
  b += text(x1, 400 - g.H - 18, t('G · ISO 228 · 55°', 'G · ISO 228 · 55°'), { size: 20, c: C.accent, weight: 700, anchor: 'end' });
  b += text(x1, 700 - n.H - 18, t('NPT · conique 1:16', 'NPT · taper 1:16'), { size: 20, c: C.mid, weight: 700, anchor: 'end' });
  b += dim(x0 + P / 2, 400 - g.H, x0 + P + P / 2, 400 - g.H, `P ${num('1.814')}`, { off: -36, size: 18 });
  return sheet({ ref: 'MEM-12', std: 'ISO 228 · ISO 7 · NPT', rev: 'A', scale: '10:1', key: 'G ½', keySub: `Ø ${num('20.955')} · 14 TPI`, body: b, keyY: 760, keySize: 180 });
}

function filetage(l) {
  const { t, num } = lang(l);
  const P = 130, depth = 0.6134 * P, crest = P / 8, root = P / 4, run = (P - crest - root) / 2;
  const y0 = 300, yr = y0 + depth, axisY = 600, x0 = 640, x1 = 1500;
  const teeth = [];
  let d = `M${x0} ${axisY} L${x0} ${y0 + 20} L${x0 + 20} ${y0}`;
  let x = x0 + 20;
  while (x + P < x1) {
    teeth.push(x);
    d += ` L${x + crest} ${y0} L${x + crest + run} ${yr} L${x + crest + run + root} ${yr} L${x + P} ${y0}`;
    x += P;
  }
  d += ` L${x1} ${y0} L${x1} ${axisY} Z`;
  let b = path(d, { w: 2.4, fill: 'url(#hatch)' });
  b += axis(600, axisY, 1540, axisY);
  const dt = teeth[3];
  b += poly([[dt, y0], [dt + crest, y0], [dt + crest + run, yr], [dt + crest + run + root, yr], [dt + P, y0]], { c: C.accent, w: 3, open: true });
  const fx = dt + crest + run + root, vx = (dt + crest + run + fx) / 2, vy = yr + (root / 2) / Math.tan(Math.PI / 6);
  b += line(dt + crest + run, yr, vx, vy, { c: C.faint, w: 1.4, dash: '6 6' }) + line(fx, yr, vx, vy, { c: C.faint, w: 1.4, dash: '6 6' });
  const r = 70, s30 = Math.sin(Math.PI / 6), c30 = Math.cos(Math.PI / 6);
  b += path(`M${vx - r * s30} ${vy - r * c30} A${r} ${r} 0 0 1 ${vx + r * s30} ${vy - r * c30}`, { c: C.mid, w: 1.6 });
  b += text(vx, vy - r - 12, '60°', { size: 24, c: C.ink, anchor: 'middle', weight: 700 });
  b += dim(teeth[1] + crest / 2, y0, teeth[2] + crest / 2, y0, `P ${num('1.5')}`, { off: -60, size: 24, tc: C.ink });
  b += dim(1452, y0, 1452, axisY, 'Ø10', { off: 62, size: 22 });
  b += line(x0 - 10, yr + 2, x1 + 10, yr + 2, { c: C.accent, w: 1.6, dash: '18 8' });
  b += leader(x0 + 160, yr + 2, x0 + 230, yr + 120, t(`FORET Ø${num('8.5')}`, 'TAP DRILL Ø8.5'), { tc: C.accent, c: C.accent, size: 22 });
  return sheet({ ref: 'MEM-01', std: 'ISO 261 · ISO 965', rev: 'B', scale: '10:1', key: 'M10', keySub: `× ${num('1.5')} · Ø${num('8.5')}`, body: b, keyY: 760, keySize: 190 });
}

function tolGeo(l) {
  const { num } = lang(l);
  let b = '';
  b += rect(680, 210, 560, 360, { sw: 2.4, fill: C.fill });
  const hx = 1000, hy = 380;
  b += circle(hx, hy, 58, { w: 2.4 });
  b += axis(hx - 100, hy, hx + 100, hy) + axis(hx, hy - 100, hx, hy + 100);
  b += circle(hx, hy, 16, { c: C.accent, w: 2.4, fill: C.accentSoft });
  b += circle(hx + 7, hy - 5, 2.5, { c: C.accent, w: 0, fill: C.accent });
  const boxed = (x, y, s) => rect(x - 34, y - 22, 68, 32, { c: C.mid, sw: 1.6, fill: C.bg0 }) + text(x, y + 1, s, { size: 20, c: C.ink, anchor: 'middle', weight: 700 });
  b += line(680, 570, 680, 640, { c: C.mid, w: 1.2, op: 0.7 }) + line(hx, hy + 60, hx, 640, { c: C.mid, w: 1.2, op: 0.7 });
  b += arrow(840, 626, 680, 626) + arrow(840, 626, hx, 626) + boxed(840, 634, '80');
  b += line(1240, 570, 1300, 570, { c: C.mid, w: 1.2, op: 0.7 }) + line(hx + 60, hy, 1300, hy, { c: C.mid, w: 1.2, op: 0.7 });
  b += arrow(1286, 475, 1286, 570) + arrow(1286, 475, 1286, hy) + boxed(1286, 482, '50');
  const tri = (pts) => poly(pts, { w: 2, fill: C.line });
  const box = (x, y, s) => rect(x - 22, y - 22, 44, 44, { sw: 2, fill: C.bg0 }) + text(x, y + 9, s, { size: 26, c: C.ink, anchor: 'middle', weight: 700 });
  b += tri([[1104, 570], [1136, 570], [1120, 592]]) + line(1120, 592, 1120, 640, { w: 2 }) + box(1120, 662, 'A');
  b += tri([[680, 284], [680, 316], [658, 300]]) + line(658, 300, 624, 300, { w: 2 }) + box(602, 300, 'B');
  b += tri([[1240, 244], [1240, 276], [1262, 260]]) + line(1262, 260, 1296, 260, { w: 2 }) + box(1318, 260, 'C');
  const fx = 1040, fy = 112, ch = 58, cells = [70, 170, 56, 56, 56];
  b += arrow(fx + 35, fy + ch, hx + 40, hy - 44, { c: C.accent, w: 1.8 });
  let cx = fx;
  cells.forEach((w) => { b += rect(cx, fy, w, ch, { c: C.accent, sw: 2.4, fill: 'rgba(10,20,32,.92)' }); cx += w; });
  b += circle(fx + 35, fy + 29, 13, { c: C.ink, w: 2.4 }) + line(fx + 35, fy + 8, fx + 35, fy + 50, { c: C.ink, w: 2.4 }) + line(fx + 14, fy + 29, fx + 56, fy + 29, { c: C.ink, w: 2.4 });
  b += text(fx + 82, fy + 39, `Ø${num('0.1')}`, { size: 28, c: C.ink, weight: 700 });
  b += circle(fx + 205, fy + 29, 15, { c: C.ink, w: 2 }) + text(fx + 205, fy + 37, 'M', { size: 20, c: C.ink, anchor: 'middle', weight: 700 });
  ['A', 'B', 'C'].forEach((s, i) => { b += text(fx + 268 + i * 56, fy + 39, s, { size: 28, c: C.ink, anchor: 'middle', weight: 700 }); });
  return sheet({ ref: 'MEM-07', std: 'ISO 1101 · ISO 5459', rev: 'A', scale: '1:1', key: `⌖ ${num('0.1')}`, keySub: 'Ⓜ · A | B | C', body: b, keyY: 760, keySize: 170 });
}

function couple(l) {
  const { t, num } = lang(l);
  const cx = 1060;
  let b = '';
  b += rect(760, 330, 600, 90, { sw: 2.4, fill: 'url(#hatch)' });
  b += rect(760, 420, 600, 90, { sw: 2.4, fill: 'url(#hatchX)' });
  b += rect(cx - 34, 230, 68, 380, { sw: 2.4, fill: C.bg0 });
  b += rect(cx - 90, 236, 180, 94, { sw: 2.4, fill: 'rgba(10,20,32,.95)' });
  b += line(cx - 90, 266, cx + 90, 266, { c: C.mid, w: 1.2, op: 0.7 }) + line(cx - 90, 300, cx + 90, 300, { c: C.mid, w: 1.2, op: 0.7 });
  b += rect(cx - 90, 510, 180, 84, { sw: 2.4, fill: 'rgba(10,20,32,.95)' });
  b += line(cx - 90, 540, cx + 90, 540, { c: C.mid, w: 1.2, op: 0.7 }) + line(cx - 90, 566, cx + 90, 566, { c: C.mid, w: 1.2, op: 0.7 });
  b += axis(cx, 180, cx, 660);
  // moment de serrage autour de la tête
  const rx = 150, ry = 63, a0 = Math.PI * 1.1, a1 = Math.PI * 1.9;
  const P = (a) => [cx + rx * Math.cos(a), 276 + ry * Math.sin(a)];
  const [sx, sy] = P(a0), [ex, ey] = P(a1);
  b += path(`M${sx} ${sy} A${rx} ${ry} 0 0 1 ${ex} ${ey}`, { c: C.accent, w: 3.2 });
  b += tip(ex, ey, Math.atan2(ry * Math.cos(a1), -rx * Math.sin(a1)), C.accent, 20);
  b += text(cx + 160, 180, `48 N·m`, { size: 30, c: C.accent, weight: 700 });
  // précharge : les tôles serrées l'une contre l'autre
  b += arrow(720, 252, 720, 326, { c: C.mid, w: 2 }) + arrow(720, 594, 720, 514, { c: C.mid, w: 2 });
  b += text(704, 432, 'Fv', { size: 24, c: C.ink, anchor: 'end', weight: 700 }) + text(704, 462, '30 kN', { size: 20, c: C.mid, anchor: 'end' });
  b += dim(cx - 34, 620, cx + 34, 620, 'M10', { off: 40, size: 20 });
  b += text(1390, 380, '8.8', { size: 34, c: C.ink, weight: 700 }) + text(1390, 414, `µ ${num('0.12')}`, { size: 20, c: C.mid });
  return sheet({ ref: 'MEM-02', std: 'ISO 898-1 · VDI 2230', rev: 'A', scale: '1:1', key: '48', keySub: t('N·m · M10 · CLASSE 8.8', 'N·m · M10 · GRADE 8.8'), body: b, keyY: 740, keySize: 200 });
}

function ajustements(l) {
  const { t, num } = lang(l);
  const z = 420, k = 6;
  let b = '';
  b += line(640, z, 1500, z, { w: 2.4 });
  b += text(650, z - 12, '0', { size: 22, c: C.ink, weight: 700 });
  b += rect(760, z - 21 * k, 260, 21 * k, { c: C.mid, sw: 2.4, fill: 'url(#hatch)' });
  b += text(890, z - 21 * k - 18, 'H7', { size: 34, c: C.ink, anchor: 'middle', weight: 700 });
  b += dim(760, z - 21 * k, 760, z, '+21', { off: 48, size: 20 });
  b += rect(1100, z + 7 * k, 260, 13 * k, { c: C.accent, sw: 2.4, fill: 'url(#hatchA)' });
  b += text(1230, z + 20 * k + 44, 'g6', { size: 34, c: C.accent, anchor: 'middle', weight: 700 });
  b += dim(1360, z, 1360, z + 7 * k, '-7', { off: -50, size: 20 });
  b += dim(1360, z, 1360, z + 20 * k, '-20', { off: -110, size: 20 });
  b += line(1020, z, 1100, z + 7 * k, { c: C.faint, w: 1.4, dash: '6 6' });
  b += text(640, 640, t('JEU 7 … 41 µm', 'CLEARANCE 7 … 41 µm'), { size: 22, c: C.mid, ls: 1 });
  b += circle(1340, 210, 70, { w: 2.4 }) + circle(1340, 210, 58, { c: C.accent, w: 2.4, fill: 'url(#hatchA)' });
  b += axis(1250, 210, 1430, 210) + axis(1340, 120, 1340, 300);
  b += text(1430, 150, 'Ø25', { size: 24, c: C.ink, weight: 700 });
  return sheet({ ref: 'MEM-03', std: 'ISO 286-1 · ISO 286-2', rev: 'A', scale: 'µm', key: 'H7/g6', keySub: `Ø25 · +${num('0.007')} / +${num('0.041')}`, body: b, keyY: 760, keySize: 150 });
}

function iso2768(l) {
  const { num } = lang(l);
  let b = '';
  b += path('M700 560 V260 H900 V200 H1180 V320 H1400 V560 Z', { w: 2.6, fill: C.fill });
  b += circle(820, 430, 46, { w: 2.4 }) + axis(750, 430, 890, 430) + axis(820, 360, 820, 500);
  b += circle(1290, 450, 34, { w: 2.4 }) + axis(1236, 450, 1344, 450) + axis(1290, 396, 1290, 504);
  b += path('M1180 320 Q1180 340 1200 340', { c: C.accent, w: 2.4 });
  b += dim(700, 560, 1400, 560, '120', { off: 56, size: 22, tc: C.ink });
  b += dim(700, 260, 900, 260, '40', { off: -34, size: 20 });
  b += dim(900, 200, 1180, 200, '56', { off: -34, size: 20 });
  b += dim(1400, 320, 1400, 560, '48', { off: 50, size: 20 });
  b += leader(1192, 332, 1236, 384, 'R4', { size: 20, tc: C.accent, c: C.accent });
  b += rect(700, 650, 300, 52, { c: C.accent, sw: 2.4, fill: 'rgba(10,20,32,.9)' });
  b += text(850, 685, 'ISO 2768-mK', { size: 26, c: C.accent, anchor: 'middle', weight: 700 });
  const rows = [['6–30', '±0.2'], ['30–120', '±0.3'], ['120–400', '±0.5']];
  rows.forEach(([r, v], i) => {
    const y = 110 + i * 40;
    b += rect(1250, y, 140, 40, { c: C.mid, sw: 1.2, fill: 'rgba(10,20,32,.85)' }) + rect(1390, y, 110, 40, { c: i === 1 ? C.accent : C.mid, sw: i === 1 ? 2 : 1.2, fill: 'rgba(10,20,32,.85)' });
    b += text(1264, y + 27, r, { size: 18, c: C.ink }) + text(1406, y + 27, num(v), { size: 18, c: i === 1 ? C.accent : C.ink, weight: 700 });
  });
  return sheet({ ref: 'MEM-04', std: 'ISO 2768-1 · ISO 2768-2', rev: 'A', scale: '1:2', key: num('±0.3'), keySub: 'mK · 30–120 mm', body: b, keyY: 760, keySize: 170 });
}

function rugosite(l) {
  const { t, num } = lang(l);
  const x0 = 640, x1 = 1500, ym = 420, pts = [];
  for (let x = x0; x <= x1; x += 6) {
    const u = (x - x0) / 40;
    pts.push([x, ym + Math.sin(u) * 22 + Math.sin(u * 2.7 + 1) * 14 + (rnd(x) - 0.5) * 26]);
  }
  const prof = pts.map(([x, y]) => `${x} ${y.toFixed(1)}`).join(' L');
  let b = path(`M${x0} 620 L${prof} L${x1} 620 Z`, { c: 'none', w: 0, fill: 'url(#hatch)' });
  b += path('M' + prof, { w: 2.4 });
  b += line(x0, 620, x1, 620, { w: 2.4 });
  b += rect(x0, ym - 22, x1 - x0, 44, { c: 'none', sw: 0, fill: C.accentSoft });
  b += line(x0 - 20, ym, x1 + 20, ym, { c: C.accent, w: 2, dash: '16 8' });
  b += line(1500, ym - 22, 1530, ym - 22, { c: C.accent, w: 1.6 }) + line(1500, ym + 22, 1530, ym + 22, { c: C.accent, w: 1.6 });
  b += text(1520, ym - 36, 'Ra', { size: 22, c: C.accent, anchor: 'middle', weight: 700 });
  b += dim(x0, 620, x0 + 320, 620, t(`lr ${num('0.8')} mm`, 'lr 0.8 mm'), { off: 44, size: 20 });
  // symbole d'état de surface, enlèvement de matière exigé
  const sx = 760, sy = 250;
  b += path(`M${sx - 40} ${sy - 30} L${sx} ${sy + 30} L${sx + 70} ${sy - 90} H${sx + 250}`, { w: 3 });
  b += line(sx - 40, sy - 30, sx + 34, sy - 30, { w: 3 });
  b += text(sx + 90, sy - 104, `Ra ${num('1.6')}`, { size: 34, c: C.ink, weight: 700 });
  return sheet({ ref: 'MEM-05', std: 'ISO 21920 · ISO 1302', rev: 'A', scale: '1000:1', key: `Ra ${num('1.6')}`, keySub: 'N7 · 63 µin', body: b, keyY: 760, keySize: 160 });
}

function masse(l) {
  const { t } = lang(l);
  // trois barres de même volume en perspective isométrique : acier, aluminium, polyamide
  const iso = (x, y, z) => [820 + (x - z) * 0.866, 590 + (x + z) * 0.5 - y];
  const L = 230, Hh = 64, D = 64;
  const bar = (oz, c, fillTop) => {
    const P = (x, y, z) => iso(x, y, oz + z);
    return poly([P(0, Hh, 0), P(L, Hh, 0), P(L, Hh, D), P(0, Hh, D)], { c, w: 2.2, fill: fillTop })
      + poly([P(0, 0, D), P(L, 0, D), P(L, Hh, D), P(0, Hh, D)], { c, w: 2.2, fill: 'rgba(10,20,32,.92)' })
      + poly([P(L, 0, 0), P(L, 0, D), P(L, Hh, D), P(L, Hh, 0)], { c, w: 2.2, fill: 'url(#hatch)' });
  };
  let b = '';
  b += bar(-340, C.mid, 'rgba(155,198,230,.04)');
  b += bar(-170, C.line, C.fill);
  b += bar(0, C.accent, C.accentSoft);
  const lab = (oz, g, v, acc) => {
    const [x, y] = iso(L, Hh / 2, oz);
    return text(x + 86, y - 16, g, { size: 24, c: acc ? C.accent : C.ink, weight: 700 }) + text(x + 86, y + 14, v, { size: 20, c: acc ? C.accent : C.mid });
  };
  b += lab(0, 'S235', '7850 kg/m³', true) + lab(-170, 'EN AW-6061', '2700 kg/m³') + lab(-340, 'PA66', '1140 kg/m³');
  b += text(680, 220, 'm = ρ · V', { size: 30, c: C.ink, weight: 700 });
  b += text(680, 256, t('MÊME VOLUME', 'SAME VOLUME'), { size: 16, c: C.mid, ls: 3 });
  return sheet({ ref: 'MEM-06', std: 'EN 10025 · EN 573', rev: 'A', scale: '1:5', key: 'ρ 7850', keySub: 'kg/m³ · S235', body: b, keyY: 760, keySize: 150 });
}

function modeleBom(l) {
  const { t, num } = lang(l);
  const x0 = 640, y0 = 130, cols = [70, 300, 90, 120, 150], rh = 44;
  const head = t('NIV|RÉF.|QTÉ|MASSE|ÉTAT', 'LVL|P/N|QTY|MASS|STATE').split('|');
  const ST = { REL: t('PUBLIÉ', 'RELEASED'), WIP: t('EN COURS', 'WIP'), DUP: t('DOUBLON', 'DUPLICATE') };
  const rows = [
    [0, 'ASM-1000', '1', '42.6', 'REL'], [1, 'ASM-1100', '1', '18.2', 'REL'], [2, 'PRT-1101', '2', '4.10', 'REL'],
    [2, 'PRT-1102', '4', '0.85', 'WIP'], [1, 'ASM-1200', '1', '21.9', 'REL'], [2, 'PRT-1201', '1', '12.4', 'REL'],
    [3, 'PRT-1201', '1', '12.4', 'DUP'], [2, 'STD-M10', '8', '0.02', 'REL'], [1, 'PRT-1300', '1', '2.50', 'REL'],
  ];
  let b = '', x = x0;
  cols.forEach((w, i) => { b += rect(x, y0 - 30, w, 30, { c: C.mid, sw: 1, fill: 'rgba(155,198,230,.08)' }) + text(x + w / 2, y0 - 9, 'ABCDE'[i], { size: 14, c: C.mid, anchor: 'middle' }); x += w; });
  x = x0;
  cols.forEach((w, i) => { b += rect(x, y0, w, rh, { c: C.mid, sw: 1.4, fill: 'rgba(155,198,230,.12)' }) + text(x + 12, y0 + 29, head[i], { size: 17, c: C.ink, weight: 700 }); x += w; });
  rows.forEach((r, j) => {
    const y = y0 + rh * (j + 1), dup = r[4] === 'DUP';
    let xx = x0;
    cols.forEach((w, i) => {
      b += rect(xx, y, w, rh, { c: dup ? C.accent : C.mid, sw: dup ? 2 : 1, fill: dup ? 'rgba(239,164,113,.10)' : 'rgba(10,20,32,.7)' });
      const v = i === 3 ? num(r[i]) : i === 4 ? ST[r[i]] : String(r[i]);
      if (i === 1 && r[0] > 0) b += path(`M${xx + r[0] * 26 - 4} ${y + 10} V${y + 22} H${xx + 8 + r[0] * 26}`, { c: C.mid, w: 1.2, op: 0.7 });
      b += text(i === 1 ? xx + 14 + r[0] * 26 : xx + 12, y + 29, v, { size: i === 4 ? 15 : 17, c: dup || (i === 4 && r[4] === 'WIP') ? C.accent : C.ink, weight: i === 1 ? 700 : 400 });
      xx += w;
    });
  });
  b += file(1420, 140, '.xlsx', { accent: true });
  return sheet({ ref: 'MOD-01', std: 'BOM · .xlsx', rev: 'C', scale: '—', key: 'BOM', keySub: '.xlsx · L0 → L3', body: b, keyY: 790, keySize: 150 });
}

function glossaire(l) {
  const { t } = lang(l);
  const tiles = ['PDM', 'PLM', 'ERP', t('CAO', 'CAD'), 'BOM', 'eBOM', 'mBOM', 'ECR', 'ECO', 'ECN', 'STEP', 'JT', 'PMI', 'MBD', 'API', 'SQL', 'REV', 'VER', 'WIP', 'REL', 'OBS', 'P/N', 'DTE', 'ETL'];
  let b = '';
  const tw = 100, th = 100, gap = 8, x0 = 640, y0 = 110, perRow = 8;
  tiles.forEach((s, i) => {
    const x = x0 + (i % perRow) * (tw + gap), y = y0 + Math.floor(i / perRow) * (th + gap);
    const acc = s === 'ECO' || s === 'REV';
    b += rect(x, y, tw, th, { c: acc ? C.accent : C.mid, sw: acc ? 2.4 : 1.4, fill: acc ? 'rgba(239,164,113,.12)' : 'rgba(10,20,32,.75)' });
    b += text(x + 10, y + 22, String(i + 1).padStart(2, '0'), { size: 13, c: acc ? C.accent : C.mid });
    b += text(x + tw / 2, y + 66, s, { size: s.length > 3 ? 22 : 28, c: acc ? C.accent : C.ink, anchor: 'middle', weight: 700, font: SANS });
  });
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach((c, i) => { b += text(642 + i * 32.6, 480, c, { size: 20, c: i === 4 ? C.accent : C.mid, weight: i === 4 ? 700 : 400 }); });
  b += line(640, 496, 1496, 496, { c: C.mid, w: 1, op: 0.5 });
  return sheet({ ref: 'DOC-17', std: 'PDM · PLM · ERP · A–Z', rev: 'B', scale: '—', key: '73', keySub: 'A → Z', body: b, keyY: 760, keySize: 210 });
}

// ---------------------------------------------------------------- nomenclatures & données
function ebomMbom(l) {
  const { t } = lang(l);
  let b = '';
  b += text(640, 140, 'eBOM', { size: 30, c: C.ink, weight: 700, font: SANS });
  b += text(1110, 140, 'mBOM', { size: 30, c: C.accent, weight: 700, font: SANS });
  b += node(640, 170, 'ASM-1000');
  [['ASM-1100', 250], ['ASM-1200', 430]].forEach(([s, y]) => { b += link(680, 212, 700, y) + node(700, y, s); });
  [['PRT-1101', 320], ['PRT-1102', 370]].forEach(([s, y]) => { b += path(`M712 292 V${y + 21} H760`, { c: C.mid, w: 1.6 }) + node(760, y, s, { w: 140 }); });
  [['PRT-1201', 500], ['PRT-1202', 550], ['STD-M10', 600]].forEach(([s, y]) => { b += path(`M712 472 V${y + 21} H760`, { c: C.mid, w: 1.6 }) + node(760, y, s, { w: 140 }); });
  b += node(1110, 170, 'ASM-1000', { accent: true });
  [[t('OP10 · SOUDURE', 'OP10 · WELD'), 250], [t('OP20 · PEINTURE', 'OP20 · PAINT'), 400], [t('OP30 · MONTAGE', 'OP30 · ASSY'), 520]].forEach(([s, y]) => { b += link(1150, 212, 1170, y, { c: C.accent }) + node(1170, y, s, { w: 210, accent: true }); });
  [['PRT-1101', 320], ['PRT-1201', 360]].forEach(([s, y]) => { b += path(`M1182 292 V${y + 21} H1230`, { c: C.accent, w: 1.6 }) + node(1230, y, s, { w: 140 }); });
  [['PRT-1102', 590], ['STD-M10', 636]].forEach(([s, y]) => { b += path(`M1182 562 V${y + 21} H1230`, { c: C.accent, w: 1.6 }) + node(1230, y, s, { w: 140 }); });
  [[341, 341], [521, 381], [391, 611], [621, 657]].forEach(([y1, y2]) => { b += path(`M900 ${y1} C1000 ${y1} 1120 ${y2} 1226 ${y2}`, { c: C.faint, w: 1.4, dash: '6 6' }); });
  return sheet({ ref: 'DOC-21', std: 'eBOM → mBOM', rev: 'C', scale: '—', key: 'e → m', keySub: 'BOM · 1:N', body: b, keyY: 760, keySize: 170 });
}

function bomTree(l) {
  const { t } = lang(l);
  let b = '';
  b += node(980, 120, 'ASM-0000', { accent: true, w: 170 });
  [680, 960, 1240].forEach((x, i) => {
    b += link(1065, 162, x + 75, 230) + node(x, 230, `ASM-0${i + 1}00`);
    [0, 1].forEach((k) => {
      const xx = x - 50 + k * 140;
      b += link(x + 75, 272, xx + 65, 340, { op: 0.9 }) + node(xx, 340, `PRT-0${i + 1}${k + 1}0`, { w: 130 });
      [0, 1].forEach((m) => {
        const x3 = xx - 6 + m * 70;
        b += link(xx + 65, 382, x3 + 30, 450, { op: 0.6 }) + rect(x3, 450, 60, 34, { c: C.mid, sw: 1.2, fill: 'rgba(10,20,32,.85)' }) + text(x3 + 30, 473, `${i + 1}${k + 1}${m + 1}`, { size: 14, c: C.mid, anchor: 'middle' });
      });
    });
  });
  ['L0', 'L1', 'L2', 'L3'].forEach((s, i) => { b += text(1530, [146, 256, 366, 472][i], s, { size: 18, c: i === 0 ? C.accent : C.mid, anchor: 'end', weight: 700 }); });
  b += line(640, 540, 1530, 540, { c: C.mid, w: 1, op: 0.4 });
  b += text(640, 584, t('CAO → PDM → PLM → ERP', 'CAD → PDM → PLM → ERP'), { size: 24, c: C.mid, ls: 2 });
  return sheet({ ref: 'DOC-05', std: 'BOM · eBOM · mBOM', rev: 'D', scale: '—', key: 'BOM', keySub: 'L0 · L1 · L2 · L3', body: b, keyY: 760, keySize: 190 });
}

function bomErp(l) {
  const { t } = lang(l);
  let b = '';
  b += node(640, 200, 'ASM-1000', { accent: true });
  [250, 300, 350, 400].forEach((y, i) => { b += path(`M652 242 V${y + 18} H690`, { c: C.mid, w: 1.4 }) + rect(690, y, 110, 36, { c: C.mid, sw: 1.2, fill: 'rgba(10,20,32,.85)' }) + text(704, y + 24, `PRT-${i + 1}0`, { size: 15, c: C.ink }); });
  const tx = 1260, ty = 180;
  b += rect(tx, ty, 240, 280, { sw: 2.2, fill: 'rgba(10,20,32,.85)' });
  b += rect(tx, ty, 240, 44, { sw: 2.2, fill: 'rgba(155,198,230,.12)' }) + text(tx + 120, ty + 30, 'ERP', { size: 22, c: C.ink, anchor: 'middle', weight: 700 });
  range(4).forEach((i) => { b += line(tx, ty + 44 + (i + 1) * 47, tx + 240, ty + 44 + (i + 1) * 47, { c: C.mid, w: 1, op: 0.5 }); });
  b += line(tx + 90, ty + 44, tx + 90, ty + 280, { c: C.mid, w: 1, op: 0.5 });
  const lanes = [['01', t('RESSAISIE', 'RE-KEYING'), 240, '6 6'], ['02', '.CSV', 300, '14 6'], ['03', 'API →', 360, null], ['04', 'eBOM ⇄ mBOM', 420, null]];
  lanes.forEach(([n, s, y, dash], i) => {
    const acc = i === 3;
    b += line(830, y, 1240, y, { c: acc ? C.accent : C.mid, w: acc ? 3 : 1.8, dash: dash || undefined, op: acc ? 1 : 0.55 + i * 0.12 });
    b += `<path d="M1240 ${y} l-16 -8 v16 Z" fill="${acc ? C.accent : C.mid}"/>`;
    b += text(840, y - 10, `${n} · ${s}`, { size: 17, c: acc ? C.accent : C.mid, weight: acc ? 700 : 400 });
  });
  b += text(640, 560, t('CAO · PDM · PLM', 'CAD · PDM · PLM'), { size: 22, c: C.mid, ls: 2 });
  return sheet({ ref: 'DOC-22', std: 'BOM ⇄ ERP', rev: 'B', scale: '—', key: '⇄ ERP', keySub: '01 · 02 · 03 · 04', body: b, keyY: 760, keySize: 170 });
}

function logicielBom(l) {
  const { t } = lang(l);
  const fam = [[t('TABLEUR', 'SHEET'), 0.18], ['ERP', 0.46], ['PDM', 0.58], ['PLM', 0.92], ['BOM', 0.7]];
  let b = '';
  [0.25, 0.5, 0.75, 1].forEach((v) => { b += line(630, 600 - 400 * v, 1520, 600 - 400 * v, { c: C.mid, w: 1, dash: '4 8', op: 0.4 }); });
  fam.forEach(([n, v], i) => {
    const x = 660 + i * 170, h = 400 * v, acc = n === 'PLM';
    b += rect(x, 600 - h, 110, h, { c: acc ? C.accent : C.mid, sw: 2.2, fill: acc ? 'url(#hatchA)' : 'url(#hatch)' });
    b += text(x + 55, 640, n, { size: n.length > 4 ? 22 : 28, c: acc ? C.accent : C.ink, anchor: 'middle', weight: 700, font: SANS });
  });
  b += line(630, 600, 1520, 600, { w: 2.4 });
  return sheet({ ref: 'DOC-23', std: t('5 FAMILLES D\'OUTILS', '5 TOOL FAMILIES'), rev: 'A', scale: '—', key: '5×', keySub: t('TABLEUR → PLM', 'SHEET → PLM'), body: b, keyY: 760, keySize: 200 });
}

function codification(l) {
  const { t } = lang(l);
  let b = '';
  const x0 = 660, y0 = 250, cw = 0.602 * 92; // largeur d'un caractère, DejaVu Sans Mono à 92 px
  [['PRT', 0, false], ['-', 3, false], ['0042', 4, true], ['-', 8, false], ['B', 9, false]].forEach(([s, i, acc]) => {
    b += text(x0 + i * cw, y0, s, { size: 92, c: acc ? C.accent : C.ink, weight: 700 });
  });
  const brace = (x1, x2, y, s, acc) => path(`M${x1} ${y} q0 18 18 18 H${(x1 + x2) / 2 - 12} q12 0 12 14 q0 -14 12 -14 H${x2 - 18} q18 0 18 -18`, { c: acc ? C.accent : C.mid, w: 2 }) + text((x1 + x2) / 2, y + 66, s, { size: 20, c: acc ? C.accent : C.mid, anchor: 'middle', weight: 700 });
  b += brace(x0 + 4, x0 + 3 * cw - 4, y0 + 30, 'TYPE', false) + brace(x0 + 4 * cw + 4, x0 + 8 * cw - 4, y0 + 30, t('N° SÉQ.', 'SEQ'), true) + brace(x0 + 9 * cw - 6, x0 + 10 * cw + 6, y0 + 30, t('IND.', 'REV'), false);
  const props = [[t('Numéro', 'Number'), '"SW-File Name"'], [t('Révision', 'Revision'), 'B'], [t('Matériau', 'Material'), '"SW-Material"'], [t('Masse', 'Mass'), '"SW-Mass"']];
  props.forEach(([k, v], i) => {
    const y = 420 + i * 50;
    b += rect(660, y, 230, 44, { c: C.mid, sw: 1.2, fill: 'rgba(155,198,230,.08)' }) + rect(890, y, 420, 44, { c: i === 0 ? C.accent : C.mid, sw: i === 0 ? 2 : 1.2, fill: 'rgba(10,20,32,.8)' });
    b += text(676, y + 29, k, { size: 18, c: C.ink, weight: 700 }) + text(906, y + 29, v, { size: 18, c: i === 0 ? C.accent : C.mid });
  });
  b += file(1380, 410, '.SLDPRT', { w: 110, h: 130 });
  b += arrow(1320, 442, 1374, 470, { c: C.accent });
  return sheet({ ref: 'DOC-11', std: t('RÉFÉRENCE · PROPRIÉTÉS', 'P/N · CUSTOM PROPERTIES'), rev: 'B', scale: '—', key: t('RÉF.', 'P/N'), keySub: 'PRT-0042-B', body: b, keyY: 760, keySize: 170 });
}

// ---------------------------------------------------------------- PDM · PLM
function ecoEcr(l) {
  const { t } = lang(l);
  let b = '';
  b += rect(680, 260, 520, 280, { sw: 2.4, fill: C.fill });
  b += circle(860, 400, 60, { w: 2.4 }) + axis(780, 400, 940, 400) + axis(860, 320, 860, 480);
  b += dim(680, 540, 860, 540, '64', { off: 50, size: 22, tc: C.ink });
  const cx = 1080, cy = 330, rx = 120, ry = 62, n = 14;
  let cloud = `M${cx - rx} ${cy}`;
  for (let i = 1; i <= n; i++) {
    const a = (i / n) * Math.PI * 2 + Math.PI;
    cloud += ` A 22 22 0 0 1 ${(cx + rx * Math.cos(a)).toFixed(1)} ${(cy + ry * Math.sin(a)).toFixed(1)}`;
  }
  b += path(cloud, { c: C.accent, w: 2.4 });
  b += text(1080, 342, 'Ø24 → Ø25', { size: 26, c: C.ink, anchor: 'middle', weight: 700 });
  b += poly([[1236, 280], [1262, 236], [1288, 280]], { c: C.accent, w: 2.4, fill: C.accentSoft }) + text(1262, 274, 'B', { size: 22, c: C.accent, anchor: 'middle', weight: 700 });
  const rows = [[t('IND.', 'REV'), 'ECO', 'DATE'], ['A', '—', '2025-11'], ['B', 'ECO-0137', '2026-06']];
  rows.forEach((r, i) => {
    const y = 560 + i * 40;
    [[1240, 70], [1310, 130], [1440, 100]].forEach(([x, w], j) => {
      b += rect(x, y, w, 40, { c: i === 2 ? C.accent : C.mid, sw: i === 2 ? 2 : 1.2, fill: i === 0 ? 'rgba(155,198,230,.1)' : 'rgba(10,20,32,.8)' });
      b += text(x + 10, y + 27, r[j], { size: 16, c: i === 2 ? C.accent : C.ink, weight: i === 0 ? 700 : 400 });
    });
  });
  b += text(680, 200, 'ECR → ECO → ECN', { size: 26, c: C.mid, ls: 2 });
  return sheet({ ref: 'DOC-04', std: 'ECR · ECO · ECN', rev: 'B', scale: '1:1', key: 'A → B', keySub: 'ECO-0137', body: b, keyY: 760, keySize: 170 });
}

function pdmOuPlm(l) {
  const { t } = lang(l);
  const cx = 1060, cy = 380;
  let b = '';
  b += circle(cx, cy, 280, { c: C.accent, w: 2.6, dash: '2 10' });
  b += circle(cx, cy, 250, { c: C.accent, w: 2.4 });
  const sect = [t('EXIG.', 'REQ'), t('CAO', 'CAD'), 'BOM', 'ECO', t('FAB.', 'MFG'), t('SAV', 'SVC')];
  sect.forEach((s, i) => {
    const a = (i / sect.length) * Math.PI * 2 - Math.PI / 2;
    b += line(cx + 150 * Math.cos(a + Math.PI / 6), cy + 150 * Math.sin(a + Math.PI / 6), cx + 250 * Math.cos(a + Math.PI / 6), cy + 250 * Math.sin(a + Math.PI / 6), { c: C.accent, w: 1.4, op: 0.6 });
    b += text(cx + 205 * Math.cos(a), cy + 205 * Math.sin(a) + 8, s, { size: 22, c: i === 1 ? C.ink : C.accent, anchor: 'middle', weight: 700 });
  });
  b += circle(cx, cy, 150, { c: C.line, w: 2.6, fill: 'url(#hatch)' });
  b += circle(cx, cy, 104, { c: C.line, w: 2.2, fill: 'rgba(10,20,32,.95)' });
  b += text(cx, cy - 6, 'PDM', { size: 46, c: C.ink, anchor: 'middle', weight: 700, font: SANS });
  b += text(cx, cy + 28, t('COFFRE', 'VAULT'), { size: 16, c: C.mid, anchor: 'middle', ls: 3 });
  b += text(cx + 300, cy - 230, 'PLM', { size: 46, c: C.accent, weight: 700, font: SANS });
  return sheet({ ref: 'DOC-01', std: 'PDM ⊂ PLM', rev: 'C', scale: '—', key: 'PDM ⊂', keySub: 'PLM · 01–05', body: b, keyY: 760, keySize: 160 });
}

function plmGuide(l) {
  const { t } = lang(l);
  const cx = 1060, cy = 380, R = 230;
  const st = t('IDÉE|CONCEPTION|VALIDATION|PRODUCTION|SERVICE|FIN DE VIE', 'IDEA|DESIGN|VALIDATE|BUILD|SERVICE|END OF LIFE').split('|');
  let b = circle(cx, cy, R, { c: C.mid, w: 1.6, dash: '4 10' });
  st.forEach((s, i) => {
    const a = (i / st.length) * Math.PI * 2 - Math.PI / 2, a2 = ((i + 1) / st.length) * Math.PI * 2 - Math.PI / 2;
    const x = cx + R * Math.cos(a), y = cy + R * Math.sin(a), acc = i === 1;
    b += path(`M${cx + R * Math.cos(a + 0.2)} ${cy + R * Math.sin(a + 0.2)} A${R} ${R} 0 0 1 ${cx + R * Math.cos(a2 - 0.2)} ${cy + R * Math.sin(a2 - 0.2)}`, { c: C.accent, w: 2.6 });
    b += tip(cx + R * Math.cos(a2 - 0.2), cy + R * Math.sin(a2 - 0.2), a2 - 0.2 + Math.PI / 2, C.accent, 16);
    b += circle(x, y, 44, { c: acc ? C.accent : C.line, w: 2.4, fill: acc ? 'rgba(239,164,113,.14)' : 'rgba(10,20,32,.95)' });
    b += text(x, y + 7, `0${i + 1}`, { size: 22, c: acc ? C.accent : C.ink, anchor: 'middle', weight: 700 });
    if (Math.abs(Math.cos(a)) < 0.1) b += text(x, y + (Math.sin(a) < 0 ? -60 : 74), s, { size: 17, c: C.mid, anchor: 'middle', ls: 2 });
    else b += text(x + Math.sign(Math.cos(a)) * 58, y + 6, s, { size: 17, c: C.mid, anchor: Math.cos(a) > 0 ? 'start' : 'end', ls: 2 });
  });
  b += text(cx, cy + 22, 'PLM', { size: 64, c: C.ink, anchor: 'middle', weight: 700, font: SANS });
  return sheet({ ref: 'DOC-18', std: t('PLM · CYCLE DE VIE', 'PLM · LIFECYCLE'), rev: 'C', scale: '—', key: 'PLM', keySub: '01 → 06', body: b, keyY: 760, keySize: 200 });
}

function pdmGuide(l) {
  const { t } = lang(l);
  const cx = 1040, cy = 380;
  let b = rect(cx - 250, cy - 250, 500, 500, { sw: 2.6, fill: 'rgba(10,20,32,.9)', r: 18 });
  b += rect(cx - 226, cy - 226, 452, 452, { c: C.mid, sw: 1.4, r: 10 });
  b += circle(cx, cy, 150, { w: 2.6, fill: 'url(#hatch)' });
  b += circle(cx, cy, 96, { w: 2.2, fill: 'rgba(10,20,32,.95)' });
  range(12).forEach((i) => { const a = (i / 12) * Math.PI * 2; b += line(cx + 106 * Math.cos(a), cy + 106 * Math.sin(a), cx + 140 * Math.cos(a), cy + 140 * Math.sin(a), { c: C.mid, w: 1.6 }); });
  range(3).forEach((i) => { const a = (i / 3) * Math.PI * 2 - Math.PI / 2; b += line(cx, cy, cx + 80 * Math.cos(a), cy + 80 * Math.sin(a), { c: C.accent, w: 5 }) + circle(cx + 80 * Math.cos(a), cy + 80 * Math.sin(a), 10, { c: C.accent, w: 0, fill: C.accent }); });
  b += circle(cx, cy, 16, { c: C.accent, w: 0, fill: C.accent });
  [-150, 0, 150].forEach((dy) => { b += rect(cx + 250, cy + dy - 16, 46, 32, { c: C.mid, sw: 1.6, fill: 'url(#hatch)' }); });
  b += arrow(630, 250, 760, 250, { c: C.accent, w: 2.4, s: 16 }) + text(630, 232, t('ARCHIVER', 'CHECK IN'), { size: 18, c: C.accent, ls: 2, weight: 700 });
  b += arrow(760, 520, 630, 520, { c: C.mid, w: 2.4, s: 16 }) + text(630, 556, t('EXTRAIRE', 'CHECK OUT'), { size: 18, c: C.mid, ls: 2, weight: 700 });
  return sheet({ ref: 'DOC-19', std: 'SOLIDWORKS PDM', rev: 'D', scale: '—', key: 'PDM', keySub: t('COFFRE · SQL · ARCHIVES', 'VAULT · SQL · ARCHIVE'), body: b, keyY: 760, keySize: 200 });
}

function stdVsPro(l) {
  const { t } = lang(l);
  let b = '';
  const col = (x, label, db, bars, acc) => {
    let s = text(x + 150, 150, label, { size: 34, c: acc ? C.accent : C.ink, anchor: 'middle', weight: 700, font: SANS });
    s += path(`M${x + 90} 200 v80 a60 18 0 0 0 120 0 v-80`, { c: acc ? C.accent : C.line, w: 2.2, fill: 'rgba(10,20,32,.9)' });
    s += path(`M${x + 90} 200 a60 18 0 0 0 120 0 a60 18 0 0 0 -120 0`, { c: acc ? C.accent : C.line, w: 2.2, fill: 'rgba(155,198,230,.08)' });
    s += text(x + 150, 262, db, { size: 15, c: C.mid, anchor: 'middle' });
    bars.forEach((v, i) => { const y = 350 + i * 52; s += rect(x, y, 300, 30, { c: C.mid, sw: 1, op: 0.5 }) + rect(x, y, 300 * v, 30, { c: 'none', sw: 0, fill: acc ? 'url(#hatchA)' : 'url(#hatch)' }); });
    return s;
  };
  // socle commun (coffre, versions) ; Professional : workflows, multisite, web, API/ERP
  b += col(680, 'STD', 'SQL EXPRESS', [1, 0.35, 0, 0, 0], false);
  b += col(1130, 'PRO', 'SQL SERVER', [1, 1, 1, 1, 1], true);
  t('COFFRE|WORKFLOWS|MULTISITE|WEB|API · ERP', 'VAULT|WORKFLOWS|MULTI-SITE|WEB|API · ERP').split('|').forEach((s, i) => { b += text(1055, 371 + i * 52, s, { size: 15, c: C.mid, anchor: 'middle', ls: 1 }); });
  return sheet({ ref: 'DOC-02', std: 'PDM STANDARD · PROFESSIONAL', rev: 'B', scale: '—', key: 'STD / PRO', keySub: 'SQL EXPRESS → SQL SERVER', body: b, keyY: 760, keySize: 130 });
}

function pdmLent(l) {
  const { t } = lang(l);
  const cx = 1060, cy = 520, R = 300;
  let b = '';
  const P = (r, a) => `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
  range(7).forEach((i) => {
    const a0 = Math.PI + (i / 7) * Math.PI, a1 = Math.PI + ((i + 1) / 7) * Math.PI - 0.03, acc = i === 5;
    b += path(`M${P(R, a0)} A${R} ${R} 0 0 1 ${P(R, a1)} L${P(R - 70, a1)} A${R - 70} ${R - 70} 0 0 0 ${P(R - 70, a0)} Z`, { c: acc ? C.accent : C.mid, w: acc ? 2.6 : 1.6, fill: acc ? 'url(#hatchA)' : 'rgba(155,198,230,.06)' });
    const am = (a0 + a1) / 2;
    b += text(cx + (R + 34) * Math.cos(am), cy + (R + 34) * Math.sin(am) + 8, `0${i + 1}`, { size: 22, c: acc ? C.accent : C.ink, anchor: 'middle', weight: 700 });
  });
  range(29).forEach((i) => { const a = Math.PI + (i / 28) * Math.PI, r2 = R - 80 - (i % 7 === 0 ? 20 : 0); b += line(cx + (R - 90) * Math.cos(a), cy + (R - 90) * Math.sin(a), cx + r2 * Math.cos(a), cy + r2 * Math.sin(a), { c: C.mid, w: 1.4 }); });
  const na = Math.PI + (5.5 / 7) * Math.PI;
  b += line(cx, cy, cx + (R - 110) * Math.cos(na), cy + (R - 110) * Math.sin(na), { c: C.accent, w: 5 });
  b += circle(cx, cy, 18, { c: C.accent, w: 0, fill: C.accent });
  b += text(cx, cy + 70, t('15 MIN / JOUR / POSTE', '15 MIN / DAY / SEAT'), { size: 20, c: C.mid, anchor: 'middle', ls: 2 });
  return sheet({ ref: 'DOC-03', std: 'SOLIDWORKS PDM · PERF', rev: 'B', scale: '—', key: '7', keySub: t('CAUSE N° 6', 'CAUSE #6'), body: b, keyY: 760, keySize: 240 });
}

function prixPdm(l) {
  const { t } = lang(l);
  // répartition type d'un premier projet PDM Professional (chiffres de l'article)
  const segs = [['LIC', 0.35], ['INFRA', 0.1], ['SERV', 0.3], [t('REPRISE', 'DATA'), 0.25]];
  let b = '';
  const x0 = 660, w = 840, y = 300, h = 120;
  let x = x0;
  segs.forEach(([n, v], i) => {
    const ww = w * v, acc = i === 0;
    b += rect(x, y, ww, h, { c: acc ? C.accent : C.line, sw: 2.2, fill: acc ? 'url(#hatchA)' : i % 2 ? 'url(#hatch)' : 'url(#hatchX)' });
    b += text(x + ww / 2, y - 18, n, { size: 22, c: acc ? C.accent : C.ink, anchor: 'middle', weight: 700 });
    b += text(x + ww / 2, y + h + 34, `${Math.round(v * 100)} %`, { size: 20, c: acc ? C.accent : C.mid, anchor: 'middle', weight: acc ? 700 : 400 });
    x += ww;
  });
  b += dim(x0, y + h, x0 + w, y + h, '100 %', { off: 110, size: 22, tc: C.ink });
  b += text(x0, 210, t('LES LICENCES : UN TIERS DU TOTAL', 'LICENSES: ONE THIRD OF THE TOTAL'), { size: 20, c: C.accent, ls: 2 });
  return sheet({ ref: 'DOC-09', std: 'SOLIDWORKS PDM · BUDGET', rev: 'A', scale: '—', key: 'Σ €', keySub: 'LIC · INFRA · SERV · DATA'.replace('DATA', t('REPRISE', 'DATA')), body: b, keyY: 760, keySize: 190 });
}

function swGratuit(l) {
  const { t } = lang(l);
  let b = '';
  const x = 700, y = 180, w = 760, h = 340, perf = x + 560;
  b += path(`M${x} ${y} H${x + w} V${y + h / 2 - 30} a30 30 0 0 0 0 60 V${y + h} H${x} V${y + h / 2 + 30} a30 30 0 0 0 0 -60 Z`, { sw: 2.6, w: 2.6, fill: 'rgba(10,20,32,.9)' });
  b += line(perf, y + 20, perf, y + h - 20, { c: C.mid, w: 1.6, dash: '8 8' });
  b += text(x + 40, y + 70, 'SOLIDWORKS', { size: 34, c: C.ink, weight: 700, font: SANS });
  b += text(x + 40, y + 108, t('LICENCE · 2026', 'LICENSE · 2026'), { size: 18, c: C.mid, ls: 3 });
  const price = t('5 000–13 000 €', '€5,000–13,000');
  b += text(x + 40, y + 200, price, { size: 44, c: C.mid, font: SANS, weight: 600 });
  b += line(x + 32, y + 186, x + 400, y + 186, { c: C.accent, w: 4 });
  b += text(x + 40, y + 228, t('HT / POSTE', 'EXCL. TAX / SEAT'), { size: 15, c: C.mid, ls: 2 });
  b += text((perf + x + w) / 2, y + 196, t('0 €', '€0'), { size: 64, c: C.accent, anchor: 'middle', weight: 700, font: SANS });
  t('ÉTUDIANT|MAKER|STARTUP|ESSAI|xDESIGN|ENSEIGNANT|PME', 'STUDENT|MAKER|STARTUP|TRIAL|xDESIGN|TEACHER|SME').split('|').forEach((s, i) => {
    const px = x + 40 + (i % 4) * 124, py = y + 252 + Math.floor(i / 4) * 40;
    b += rect(px, py, 116, 32, { c: i === 0 ? C.accent : C.mid, sw: 1.4, r: 16 }) + text(px + 58, py + 21, s, { size: 13, c: i === 0 ? C.accent : C.mid, anchor: 'middle' });
  });
  range(24).forEach((i) => { b += rect(perf + 30 + i * 6, y + 250, 2 + (rnd(i, 3) > 0.6 ? 3 : 0), 60, { c: 'none', sw: 0, fill: C.mid }); });
  return sheet({ ref: 'DOC-10', std: t('7 SOLUTIONS LÉGALES', '7 LEGAL OPTIONS'), rev: 'A', scale: '—', key: t('0 €', '€0'), keySub: '01 → 07', body: b, keyY: 760, keySize: 200 });
}

function raccourcis(l) {
  const { t } = lang(l);
  let b = '';
  const key = (x, y, w, s, acc, sub) => {
    let k = rect(x, y + 10, w, 96, { c: acc ? C.accent : C.mid, sw: 2, r: 14, fill: 'rgba(10,20,32,.95)' });
    k += rect(x + 8, y, w - 16, 84, { c: acc ? C.accent : C.line, sw: 2.4, r: 12, fill: acc ? 'rgba(239,164,113,.14)' : 'rgba(19,40,61,.95)' });
    k += text(x + w / 2, y + 54, s, { size: s.length > 2 ? 26 : 42, c: acc ? C.accent : C.ink, anchor: 'middle', weight: 700, font: SANS });
    if (sub) k += text(x + w / 2, y + 140, sub, { size: 14, c: acc ? C.accent : C.mid, anchor: 'middle', ls: 1 });
    return k;
  };
  b += key(680, 150, 150, 'Ctrl', false) + text(852, 210, '+', { size: 40, c: C.mid, anchor: 'middle' }) + key(880, 150, 110, 'Q', false, t('RECONSTRUCTION FORCÉE', 'FORCED REBUILD'));
  b += key(1080, 150, 150, 'Ctrl', false) + text(1252, 210, '+', { size: 40, c: C.mid, anchor: 'middle' }) + key(1280, 150, 110, 'B', false, t('RECONSTRUIRE', 'REBUILD'));
  b += key(680, 390, 120, 'S', true, t('BARRE S', 'S BAR')) + key(830, 390, 260, t('Espace', 'Space'), false, t('ORIENTATION', 'ORIENTATION')) + key(1120, 390, 120, 'F', false, t('ZOOM AU MIEUX', 'ZOOM TO FIT')) + key(1270, 390, 120, 'D', false, t('CONFIRMATION', 'CONFIRMATION'));
  return sheet({ ref: 'DOC-14', std: t('SOLIDWORKS · RACCOURCIS', 'SOLIDWORKS · SHORTCUTS'), rev: 'C', scale: '—', key: 'S', keySub: 'CTRL+Q · CTRL+B', body: b, keyY: 760, keySize: 240 });
}

function erreurs(l) {
  const { t } = lang(l);
  const items = [[t('Pièce1', 'Part1'), 0, ''], [t('Origine', 'Origin'), 1, ''], [t('Esquisse1', 'Sketch1'), 1, ''], [t('Bossage-Extru.1', 'Boss-Extrude1'), 1, ''], [t('Congé1', 'Fillet1'), 1, '!'], [t('Enlèv.-Extru.2', 'Cut-Extrude2'), 1, 'x'], [t('Esquisse4', 'Sketch4'), 2, '?'], [t('Symétrie1', 'Mirror1'), 1, '!'], [t('Perçage1', 'Hole1'), 1, '']];
  let b = '';
  items.forEach(([n, lvl, st], i) => {
    const y = 140 + i * 56, x = 700 + lvl * 44, err = st === 'x', warn = st === '!' || st === '?';
    if (lvl > 0) b += path(`M${x - 26} ${y - 30} V${y + 14} H${x - 6}`, { c: C.mid, w: 1.4, op: 0.6 });
    b += rect(x, y - 6, 30, 30, { c: err ? C.accent : C.mid, sw: 1.8, fill: err ? 'rgba(239,164,113,.18)' : 'rgba(155,198,230,.08)' });
    b += text(x + 46, y + 18, n, { size: 22, c: err ? C.accent : C.ink, weight: err ? 700 : 400 });
    if (warn || err) {
      const tx = x + 46 + n.length * 13.5 + 18;
      b += poly([[tx, y + 22], [tx + 26, y + 22], [tx + 13, y - 2]], { c: err ? C.accent : '#e8c26a', w: 2, fill: err ? C.accent : 'none' });
      b += text(tx + 13, y + 19, '!', { size: 14, c: err ? C.bg0 : '#e8c26a', anchor: 'middle', weight: 700 });
    }
  });
  // la cause racine : une loupe sur la référence perdue
  b += circle(1260, 448, 92, { c: C.accent, w: 3 }) + line(1325, 513, 1400, 588, { c: C.accent, w: 8 });
  b += text(1260, 440, t('RÉF.', 'REF'), { size: 28, c: C.accent, anchor: 'middle', weight: 700 }) + text(1260, 474, '∅ → ?', { size: 22, c: C.accent, anchor: 'middle' });
  b += path('M1168 448 C1110 448 1090 450 1050 450', { c: C.accent, w: 1.6, dash: '6 6' });
  return sheet({ ref: 'DOC-20', std: t('SOLIDWORKS · 10 ERREURS', 'SOLIDWORKS · 10 ERRORS'), rev: 'B', scale: '—', key: '10', keySub: t('3 CAUSES RACINES', '3 ROOT CAUSES'), body: b, keyY: 760, keySize: 220 });
}

function formatsCao(l) {
  const { t } = lang(l);
  const fm = [['.STEP', 1, true], ['.x_t', 0.95], ['.JT', 0.75], ['.IGES', 0.5], ['.STL', 0.3]];
  let b = '';
  fm.forEach(([e, q, acc], i) => {
    const y = 130 + i * 112;
    b += file(660, y, e, { accent: acc, op: 0.4 + q * 0.6 });
    b += path(`M740 ${y + 46} C900 ${y + 46} 960 380 1100 380`, { c: acc ? C.accent : C.mid, w: acc ? 3 : 1.8, dash: acc ? undefined : `${Math.round(q * 20)} ${Math.round((1 - q) * 20) + 4}`, op: 0.4 + q * 0.6 });
    b += text(760, y + 30, `${Math.round(q * 100)} %`, { size: 16, c: acc ? C.accent : C.mid });
  });
  const iso = (x, y, z) => [1300 + (x - z) * 0.866, 420 + (x + z) * 0.5 - y];
  const P = (x, y, z) => iso(x, y, z).join(' ');
  b += path(`M${P(0, 120, 0)} L${P(200, 120, 0)} L${P(200, 120, 140)} L${P(0, 120, 140)} Z`, { sw: 2.4, w: 2.4, fill: C.fill });
  b += path(`M${P(0, 0, 140)} L${P(200, 0, 140)} L${P(200, 120, 140)} L${P(0, 120, 140)} Z`, { w: 2.4, fill: 'rgba(10,20,32,.9)' });
  b += path(`M${P(200, 0, 0)} L${P(200, 0, 140)} L${P(200, 120, 140)} L${P(200, 120, 0)} Z`, { w: 2.4, fill: 'url(#hatch)' });
  const [hx, hy] = iso(100, 120, 70);
  b += `<ellipse cx="${hx}" cy="${hy}" rx="44" ry="25" stroke="${C.accent}" stroke-width="2.4" fill="none"/>`;
  b += text(1300, 620, t('B-REP · PMI · AP242', 'B-REP · PMI · AP242'), { size: 18, c: C.mid, anchor: 'middle', ls: 1 });
  return sheet({ ref: 'DOC-16', std: 'ISO 10303 · ISO 14306', rev: 'A', scale: '—', key: '.STEP', keySub: 'AP242 · B-REP', body: b, keyY: 760, keySize: 160 });
}

function choixCao(l) {
  const { t } = lang(l);
  const cx = 1060, cy = 380, R = 230;
  const ax = t('PRIX|SURFACIQUE|PDM|CLOUD|ÉCOSYSTÈME', 'PRICE|SURFACING|PDM|CLOUD|ECOSYSTEM').split('|');
  const sw = [0.7, 0.6, 0.95, 0.5, 0.95], inv = [0.75, 0.5, 0.7, 0.45, 0.8], f360 = [0.95, 0.55, 0.4, 1, 0.6], cat = [0.25, 1, 0.85, 0.7, 0.75];
  const pt = (v, i) => { const a = (i / 5) * Math.PI * 2 - Math.PI / 2; return [cx + R * v * Math.cos(a), cy + R * v * Math.sin(a)]; };
  let b = '';
  [0.25, 0.5, 0.75, 1].forEach((v) => { b += poly(range(5).map((i) => pt(v, i)), { c: C.mid, w: 1, op: 0.35 }); });
  ax.forEach((s, i) => { const [x, y] = pt(1, i); b += line(cx, cy, x, y, { c: C.mid, w: 1, op: 0.5 }); const [lx, ly] = pt(1.18, i); b += text(lx, ly + 6, s, { size: 16, c: C.mid, anchor: 'middle', ls: 1 }); });
  b += poly(cat.map(pt), { c: C.mid, w: 1.8, dash: '10 6' }) + poly(f360.map(pt), { c: C.mid, w: 1.8, dash: '3 6' }) + poly(inv.map(pt), { c: C.line, w: 1.6, op: 0.7 });
  b += poly(sw.map(pt), { c: C.accent, w: 3, fill: 'rgba(239,164,113,.12)' });
  [['SW', C.accent, null], ['INV', C.line, null], ['F360', C.mid, '3 6'], ['CATIA', C.mid, '10 6']].forEach(([n, c, d], i) => {
    const y = 160 + i * 40;
    b += line(1400, y, 1440, y, { c, w: 2.6, dash: d || undefined }) + text(1452, y + 7, n, { size: 18, c: n === 'SW' ? C.accent : C.ink, weight: 700 });
  });
  return sheet({ ref: 'DOC-15', std: 'SW · INV · F360 · CATIA', rev: 'A', scale: '—', key: t('4 CAO', '4 CAD'), keySub: t('5 CRITÈRES', '5 CRITERIA'), body: b, keyY: 760, keySize: 150 });
}

function iaPdm(l) {
  const { t } = lang(l);
  let b = '';
  // trois amas (pièces voisines par le sens) reliés par quelques ponts
  const centers = [[820, 260], [1180, 220], [1040, 470], [1380, 470]];
  const nodes = [];
  centers.forEach(([cx, cy], c) => range(8).forEach((i) => nodes.push([cx + (rnd(i, c * 3 + 1) - 0.5) * 230, cy + (rnd(i, c * 3 + 2) - 0.5) * 170, c])));
  nodes.forEach(([x, y, c], i) => nodes.forEach(([x2, y2, c2], j) => {
    if (j <= i) return;
    const d = Math.hypot(x - x2, y - y2);
    if ((c === c2 && d < 150) || (c !== c2 && d < 140)) b += line(x, y, x2, y2, { c: c !== c2 ? C.accent : C.mid, w: c !== c2 ? 1.8 : 1.2, op: c !== c2 ? 0.85 : 0.45 });
  }));
  nodes.forEach(([x, y], i) => {
    b += i % 8 === 0 ? rect(x - 50, y - 18, 100, 36, { c: C.accent, sw: 2, fill: 'rgba(10,20,32,.95)' }) + text(x, y + 6, `PRT-${String(i * 7 + 11).padStart(3, '0')}`, { size: 14, c: C.accent, anchor: 'middle', weight: 700 })
      : circle(x, y, 7, { c: C.line, w: 2, fill: C.bg0 });
  });
  b += rect(680, 630, 560, 50, { c: C.line, sw: 2, r: 25, fill: 'rgba(10,20,32,.95)' });
  b += circle(712, 655, 11, { c: C.mid, w: 2 }) + line(720, 663, 730, 673, { c: C.mid, w: 2 });
  b += text(742, 662, t('"équerre · S235 · IND. C"', '"bracket · S235 · REV.C"'), { size: 18, c: C.ink });
  return sheet({ ref: 'DOC-08', std: 'LLM · RAG · PDM', rev: 'C', scale: '—', key: 'RAG', keySub: t('PDM · RECHERCHE SÉMANTIQUE', 'PDM · SEMANTIC SEARCH'), body: b, keyY: 560, keySize: 190 });
}

function cloud(l) {
  const { t } = lang(l);
  let b = rack(680, 170, 260, 440, { units: 6, accent: 2 });
  b += path('M1170 430 a90 90 0 0 1 60 -160 a120 120 0 0 1 220 20 a80 80 0 0 1 30 150 Z', { c: C.accent, w: 3, fill: 'rgba(239,164,113,.08)' });
  b += text(1330, 400, '3DX', { size: 40, c: C.accent, anchor: 'middle', weight: 700, font: SANS });
  b += path('M960 380 C1040 380 1060 380 1150 380', { c: C.accent, w: 2.4, dash: '12 8' });
  b += `<path d="M1150 380 l-16 -8 v16 Z" fill="${C.accent}"/>`;
  b += rect(1030, 470, 60, 50, { c: C.mid, sw: 2, r: 6 }) + path('M1042 470 v-16 a18 18 0 0 1 36 0 v16', { c: C.mid, w: 2 });
  b += text(1060, 556, t('RÉVERSIBILITÉ ?', 'EXIT PLAN?'), { size: 14, c: C.mid, anchor: 'middle', ls: 1 });
  b += line(1170, 650, 1500, 650, { c: C.mid, w: 1.4 }) + line(1170, 650, 1170, 500, { c: C.mid, w: 1.4 });
  b += path('M1170 600 L1500 560', { w: 2 }) + path('M1170 640 L1500 512', { c: C.accent, w: 2.4 });
  b += text(1500, 680, t('5 ANS', '5 YRS'), { size: 16, c: C.mid, anchor: 'end' });
  return sheet({ ref: 'DOC-07', std: t('SUR SITE → SaaS · TCO', 'ON-PREM → SaaS · TCO'), rev: 'B', scale: '—', key: 'SaaS', keySub: t('TCO · 5 ANS', 'TCO · 5 YRS'), body: b, keyY: 760, keySize: 170 });
}

function migration(l) {
  const { t } = lang(l);
  let b = '';
  ['.SLDPRT', '.SLDASM', '.SLDDRW', '.SLDPRT', '.pdf', '.SLDPRT', '.xlsx', '.SLDASM'].forEach((e, i) => {
    const x = 660 + (i % 3) * 96 + rnd(i, 4) * 30, y = 140 + Math.floor(i / 3) * 150 + rnd(i, 5) * 30;
    b += `<g transform="rotate(${((rnd(i, 6) - 0.5) * 24).toFixed(1)} ${x + 37} ${y + 46})">${file(x, y, e, { accent: i === 3 })}</g>`;
  });
  b += path('M980 380 H1120', { c: C.accent, w: 3 }) + `<path d="M1120 380 l-18 -10 v20 Z" fill="${C.accent}"/>`;
  b += text(1050, 360, 'ETL', { size: 22, c: C.accent, anchor: 'middle', weight: 700 });
  b += rect(1150, 170, 340, 420, { sw: 2.6, r: 14, fill: 'rgba(10,20,32,.92)' });
  range(7).forEach((i) => {
    const y = 200 + i * 54;
    b += rect(1176, y, 288, 40, { c: i === 2 ? C.accent : C.mid, sw: 1.4, fill: i === 2 ? 'rgba(239,164,113,.1)' : 'none' });
    b += text(1192, y + 27, `PRT-0${42 + i} · ${t('IND.', 'REV.')}${'ABACBAA'[i]}`, { size: 16, c: i === 2 ? C.accent : C.ink });
  });
  return sheet({ ref: 'DOC-06', std: 'SOLIDWORKS PDM · MIGRATION', rev: 'C', scale: '—', key: '→ PDM', keySub: t('ETL · DÉDOUBLONNAGE', 'ETL · DEDUP · REV'), body: b, keyY: 760, keySize: 160 });
}

function config(l) {
  const { t } = lang(l);
  let b = rect(660, 140, 840, 540, { sw: 2.4, r: 10, fill: 'rgba(10,20,32,.9)' });
  range(18).forEach((i) => { b += path(`M${700 + i * 44} 160 v40 h20`, { c: C.mid, w: 1, op: 0.35 }); });
  b += rect(760, 230, 200, 200, { c: C.accent, sw: 2.6, fill: 'url(#hatchA)' }) + rect(800, 270, 120, 120, { c: C.accent, sw: 2, fill: 'rgba(10,20,32,.95)' });
  b += text(860, 340, 'CPU', { size: 30, c: C.accent, anchor: 'middle', weight: 700, font: SANS });
  range(4).forEach((i) => { b += rect(1010 + i * 40, 210, 22, 240, { sw: 1.8, fill: 'url(#hatch)' }); });
  b += text(1080, 478, t('RAM ECC', 'ECC RAM'), { size: 18, c: C.mid, anchor: 'middle', ls: 1 });
  b += rect(720, 520, 520, 120, { sw: 2.4, r: 8, fill: 'rgba(19,40,61,.95)' });
  b += circle(860, 580, 42, { c: C.mid, w: 2 }) + circle(1100, 580, 42, { c: C.mid, w: 2 });
  b += text(980, 589, 'GPU', { size: 26, c: C.ink, anchor: 'middle', weight: 700, font: SANS });
  b += rect(1260, 260, 200, 52, { c: C.mid, sw: 2, fill: 'url(#hatch)' }) + text(1360, 294, 'NVMe', { size: 22, c: C.ink, anchor: 'middle', weight: 700 });
  b += rect(1260, 340, 200, 52, { c: C.mid, sw: 2, fill: 'url(#hatch)' }) + text(1360, 374, 'NVMe', { size: 22, c: C.ink, anchor: 'middle', weight: 700 });
  return sheet({ ref: 'DOC-12', std: t('SOLIDWORKS 2025 · MATÉRIEL', 'SOLIDWORKS 2025 · HARDWARE'), rev: 'A', scale: '1:1', key: 'GHz', keySub: 'CPU · GPU · NVMe', body: b, keyY: 760, keySize: 190 });
}

function imageAdmin(l) {
  const { t } = lang(l);
  let b = rack(660, 180, 260, 400, { units: 6, accent: 2 });
  b += text(790, 620, '\\\\SERVER\\SW_Images', { size: 20, c: C.accent, anchor: 'middle', weight: 700 });
  b += text(790, 650, t('image administrative · 1 copie', 'administrative image · 1 copy'), { size: 16, c: C.mid, anchor: 'middle', ls: 1 });
  const ws = [[1120, 170], [1330, 170], [1120, 420], [1330, 420]];
  ws.forEach(([x, y], i) => {
    b += rect(x, y, 170, 112, { c: i === 0 ? C.accent : C.mid, sw: 2.2, r: 6, fill: 'rgba(10,20,32,.9)' });
    b += rect(x + 12, y + 12, 146, 78, { c: C.mid, sw: 1.2, fill: 'url(#hatch)', op: 0.7 });
    b += line(x + 85, y + 112, x + 85, y + 140, { c: C.mid, w: 2 }) + line(x + 50, y + 140, x + 120, y + 140, { c: C.mid, w: 2.4 });
    b += text(x + 85, y + 172, 'PC-' + String(i + 1).padStart(2, '0'), { size: 16, c: C.ink, anchor: 'middle', weight: 700 });
    b += arrow(920, 380, x - 6, y + 56, { c: C.accent, w: 1.6, s: 14 });
  });
  b += text(1310, 700, t('MÊME INSTALLATION · N POSTES', 'SAME INSTALL · N WORKSTATIONS'), { size: 17, c: C.mid, anchor: 'middle', ls: 2 });
  return sheet({ ref: 'DOC-18', std: t('SOLIDWORKS · IMAGE ADMIN.', 'SOLIDWORKS · ADMIN IMAGE'), rev: 'A', scale: '1:N', key: '1 → N', keySub: t('une image · tous les postes', 'one image · every workstation'), body: b, keyY: 760, keySize: 160 });
}

function resolutions() {
  let b = '';
  range(5).forEach((i) => {
    const y1 = 160 + i * 100, y2 = 220 + i * 80;
    let d = `M660 ${y1}`;
    for (let k = 1; k <= 6; k++) d += ` C${660 + k * 80 - 40} ${y1 + (rnd(i, k) - 0.5) * 340} ${660 + k * 80 - 20} ${y2 + (rnd(i, k + 9) - 0.5) * 340} ${660 + k * 80} ${(y1 + y2) / 2 + (rnd(i, k + 4) - 0.5) * 200}`;
    d += ` C1200 ${y2} 1180 ${y2} 1240 ${y2} H1500`;
    b += path(d, { c: i === 2 ? C.accent : C.mid, w: i === 2 ? 3 : 2, op: i === 2 ? 1 : 0.75 });
    b += circle(660, y1, 8, { c: 'none', w: 0, fill: i === 2 ? C.accent : C.mid }) + rect(1240, y2 - 18, 36, 36, { c: i === 2 ? C.accent : C.line, sw: 2, fill: C.bg0 }) + text(1258, y2 + 7, String(i + 1), { size: 18, c: i === 2 ? C.accent : C.ink, anchor: 'middle', weight: 700 });
  });
  return sheet({ ref: 'DOC-13', std: 'PLM · 5 × 1', rev: 'B', scale: '—', key: '5 → 1', keySub: 'PLM', body: b, keyY: 760, keySize: 170 });
}

export const PLATES = {
  'image-administrative-solidworks-installation': imageAdmin,
  'filetage-gaz-g-bsp-npt-tableau': filetageGaz,
  'clavettes-paralleles-din-6885-dimensions': clavette,
  'conversion-durete-hrc-hv-hb': durete,
  'aciers-s235-s275-s355-caracteristiques': aciers,
  'symboles-soudure-iso-2553': soudure,
  'tableau-filetage-metrique-percage-taraudage': filetage,
  'tolerances-geometriques-symboles-iso-1101': tolGeo,
  'couple-serrage-vis-tableau': couple,
  'ajustements-iso-286-tableau-h7-g6': ajustements,
  'tolerances-generales-iso-2768': iso2768,
  'rugosite-ra-tableau-classes-procedes': rugosite,
  'masse-volumique-materiaux-calcul-masse': masse,
  'modele-nomenclature-excel-gratuit': modeleBom,
  'glossaire-pdm-plm': glossaire,
  'ebom-vs-mbom': ebomMbom,
  'nomenclature-bom-pdm-plm-erp': bomTree,
  'integration-bom-erp': bomErp,
  'logiciel-gestion-nomenclatures': logicielBom,
  'codification-proprietes-solidworks': codification,
  'eco-ecr-gestion-modifications': ecoEcr,
  'pdm-ou-plm-quand-basculer': pdmOuPlm,
  'plm-guide-complet': plmGuide,
  'solidworks-pdm-guide-complet': pdmGuide,
  'solidworks-pdm-standard-vs-professional': stdVsPro,
  'solidworks-pdm-lent-7-causes': pdmLent,
  'prix-cout-projet-solidworks-pdm': prixPdm,
  'solidworks-gratuit-prix-guide': swGratuit,
  'raccourcis-clavier-solidworks': raccourcis,
  'erreurs-solidworks-frequentes': erreurs,
  'formats-echange-cao-step-iges-parasolid': formatsCao,
  'choisir-logiciel-cao-solidworks-inventor-fusion-catia': choixCao,
  'ia-solidworks-pdm-bureau-etudes': iaPdm,
  'migration-cloud-pdm-3dexperience': cloud,
  'migration-donnees-solidworks-pdm': migration,
  'configuration-materielle-solidworks': config,
  'resolutions-problematiques-plm': resolutions,
};
