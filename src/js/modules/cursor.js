// Curseur de CAO : une croix de visée avec la zone du plan (ex. « C4 ») et les
// coordonnées. Sur un élément interactif, il « s'accroche » comme une sélection
// SOLIDWORKS : quatre équerres viennent encadrer l'élément et une étiquette dit
// ce qu'il fait. Uniquement avec une souris ; le curseur natif revient sur les
// champs de saisie, et le focus clavier garde ses propres contours.
import { zoneAt } from './sheet.js';

const TARGETS = 'a, button, [role="button"], [role="slider"], summary, label[for], select, .reel-frame';
const TEXT = 'input:not([type="range"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]';
const LABELS = {
  fr: { link: 'Ouvrir', out: 'Ouvrir ↗', mail: 'Écrire', button: 'Activer', play: 'Lire le film', cv: 'Télécharger' },
  en: { link: 'Open', out: 'Open ↗', mail: 'Write', button: 'Activate', play: 'Play film', cv: 'Download' },
};

export function initCursor() {
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  if (!fine.matches) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const lang = () => (document.documentElement.lang === 'en' ? 'en' : 'fr');

  const el = document.createElement('div');
  el.className = 'cad-cursor';
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML = `<i class="cc-h"></i><i class="cc-v"></i><i class="cc-dot"></i>
    <span class="cc-read"></span>
    <span class="cc-box"><i></i><i></i><i></i><i></i><span class="cc-tag"></span></span>`;
  document.body.append(el);
  document.documentElement.classList.add('has-cad-cursor');
  const read = el.querySelector('.cc-read');
  const box = el.querySelector('.cc-box');
  const tag = el.querySelector('.cc-tag');

  let x = innerWidth / 2, y = innerHeight / 2;
  let target = null, native = false, hidden = true;
  const bx = { x: 0, y: 0, w: 0, h: 0 };
  let raf = 0;

  const describe = (t) => {
    const L = LABELS[lang()];
    if (t.matches('.reel-frame, .reel-play')) return L.play;
    if (t.matches('a[href^="mailto:"]')) return L.mail;
    if (t.matches('a[download], a[href$=".pdf"]')) return L.cv;
    if (t.matches('a[target="_blank"], a[href^="http"]:not([href*="baouch.fr"])')) return L.out;
    if (t.matches('a')) return L.link;
    return (t.getAttribute('aria-label') || L.button).slice(0, 24);
  };

  const frame = () => {
    raf = 0;
    const k = reduce.matches ? 1 : 0.28;
    if (target) {
      const r = target.getBoundingClientRect();
      const pad = 6;
      const tx = r.left - pad, ty = r.top - pad, tw = r.width + pad * 2, th = r.height + pad * 2;
      bx.x += (tx - bx.x) * k; bx.y += (ty - bx.y) * k; bx.w += (tw - bx.w) * k; bx.h += (th - bx.h) * k;
    } else {
      bx.x += (x - 14 - bx.x) * k; bx.y += (y - 14 - bx.y) * k; bx.w += (28 - bx.w) * k; bx.h += (28 - bx.h) * k;
    }
    el.style.setProperty('--x', `${x}px`);
    el.style.setProperty('--y', `${y}px`);
    box.style.transform = `translate(${bx.x}px, ${bx.y}px)`;
    box.style.width = `${bx.w}px`;
    box.style.height = `${bx.h}px`;
    read.textContent = `${zoneAt(x, y)} · X${String(Math.round(x)).padStart(4, '0')} Y${String(Math.round(innerHeight - y)).padStart(4, '0')}`;
    // on s'arrête une fois la sélection posée (position et taille)
    const r = target?.getBoundingClientRect();
    const goal = r ? [r.left - 6, r.top - 6, r.width + 12, r.height + 12] : [x - 14, y - 14, 28, 28];
    const settling = [bx.x, bx.y, bx.w, bx.h].some((v, i) => Math.abs(v - goal[i]) > 0.3);
    if (settling) raf = requestAnimationFrame(frame);
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };

  addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    x = e.clientX; y = e.clientY;
    if (hidden) { hidden = false; el.classList.remove('is-out'); bx.x = x - 14; bx.y = y - 14; }
    const t = e.target instanceof Element ? e.target : null;
    const isText = !!t?.closest(TEXT);
    if (isText !== native) { native = isText; el.classList.toggle('is-native', native); }
    const hit = isText ? null : t?.closest(TARGETS);
    if (hit !== target) {
      target = hit;
      el.classList.toggle('is-snap', !!target);
      if (target) tag.textContent = describe(target);
    }
    kick();
  }, { passive: true });
  // le défilement déplace l'élément sous un curseur immobile
  addEventListener('scroll', () => { if (target) kick(); }, { passive: true });
  document.addEventListener('pointerleave', () => { hidden = true; el.classList.add('is-out'); });
  addEventListener('pointerdown', () => el.classList.add('is-down'));
  addEventListener('pointerup', () => el.classList.remove('is-down'));
  addEventListener('blur', () => { hidden = true; el.classList.add('is-out'); });
  el.classList.add('is-out');
}
