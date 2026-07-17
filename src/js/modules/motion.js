// Motion design : smooth scroll Lenis, reveals GSAP typographiques (lettres du
// hero, mots des titres), marquee pilotée par la vélocité de scroll, tilt 3D
// des cartes, parallax des filigranes, compteurs, magnétisme, curseur.
// Ce module n'est chargé que si prefers-reduced-motion n'est pas demandé ;
// sans lui, la page est complète et statique.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

let lenis = null;

function initSmoothScroll() {
  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  document.querySelectorAll('a[href^="#"], a[href^="/#"]').forEach((a) => {
    const hash = a.getAttribute('href').replace('/', '');
    if (hash.length < 2) return;
    a.addEventListener('click', (e) => {
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -72 });
    });
  });
}

// découpe un élément en lettres, mot par mot : chaque mot reste insécable
// (inline-block) pour ne jamais casser en milieu de mot au retour à la ligne
function splitChars(el) {
  const wordify = (text) => {
    const frag = document.createDocumentFragment();
    text.split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) {
        frag.appendChild(document.createTextNode(' '));
        return;
      }
      const word = document.createElement('span');
      word.style.display = 'inline-block';
      word.style.whiteSpace = 'nowrap';
      for (const ch of part) {
        const s = document.createElement('span');
        s.className = 'char';
        s.style.display = 'inline-block';
        s.style.willChange = 'transform';
        s.textContent = ch;
        word.appendChild(s);
      }
      frag.appendChild(word);
    });
    return frag;
  };
  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        node.replaceChild(wordify(child.textContent), child);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child);
      }
    });
  };
  walk(el);
  return el.querySelectorAll('.char');
}

// enveloppe chaque mot dans un masque pour un reveal ligne à ligne organique
function splitWords(el) {
  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(' '));
          } else {
            const mask = document.createElement('span');
            mask.className = 'word-mask';
            const inner = document.createElement('span');
            inner.className = 'word-inner';
            inner.textContent = part;
            mask.appendChild(inner);
            frag.appendChild(mask);
          }
        });
        node.replaceChild(frag, child);
      } else if (child.nodeType === Node.ELEMENT_NODE && !child.classList.contains('word-mask')) {
        // les accents serif deviennent eux-mêmes un mot masqué
        const mask = document.createElement('span');
        mask.className = 'word-mask';
        node.replaceChild(mask, child);
        const inner = document.createElement('span');
        inner.className = 'word-inner';
        inner.appendChild(child);
        mask.appendChild(inner);
      }
    });
  };
  walk(el);
  return el.querySelectorAll('.word-inner');
}

function initHeroIntro() {
  const title = document.querySelector('.hero-title');
  if (title) {
    const chars = [];
    title.querySelectorAll('.mask-inner').forEach((line) => chars.push(...splitChars(line)));
    gsap.from(chars, {
      yPercent: 118,
      rotate: () => gsap.utils.random(-8, 8),
      duration: 0.9,
      ease: 'power4.out',
      stagger: { each: 0.022, from: 'start' },
    });
  }
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.from('.hero-kicker', { y: 14, autoAlpha: 0, duration: 0.7 }, 0.15)
    .from('.hero-subtitle', { y: 20, autoAlpha: 0, duration: 0.8 }, 0.5)
    .from('.hero-cta > *', { y: 18, autoAlpha: 0, duration: 0.7, stagger: 0.08 }, 0.65)
    .from('.hero-side, .hero-baseline', { autoAlpha: 0, duration: 0.9 }, 0.9)
    .from('.hero-stat', { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.07 }, 0.8);

  // au scroll, la composition du hero se comprime et s'estompe doucement
  gsap.to('.hero-copy', {
    yPercent: -10,
    autoAlpha: 0.15,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: '75% top', scrub: 0.5 },
  });
}

function initHeadingReveals() {
  document.querySelectorAll('.section .display-2').forEach((h) => {
    const words = splitWords(h);
    gsap.from(words, {
      yPercent: 115,
      duration: 0.9,
      ease: 'power4.out',
      stagger: 0.05,
      scrollTrigger: { trigger: h, start: 'top 86%', once: true },
    });
  });
}

function initReveals() {
  const groups = [
    '.bom-frame',
    '.section .eyebrow',
    '.section-head .prose-lead',
    '.offer-card',
    '.sector-row',
    '.project-card',
    '.about-media',
    '.about-copy > p, .about-copy > ul, .about-copy > div',
    '.index-row',
    '.skill-group',
    '.education-card',
    '.contact-copy > p, .contact-copy > ul',
    '.contact-form',
    '.footer-top > *',
  ];
  groups.forEach((selector) => {
    gsap.utils.toArray(selector).forEach((el, i) => {
      gsap.from(el, {
        y: 26,
        autoAlpha: 0,
        duration: 0.85,
        ease: 'power3.out',
        delay: (i % 4) * 0.06,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });
  });
}

function initWatermarks() {
  // les grands numéros dérivent lentement pendant la traversée de la section
  gsap.utils.toArray('.section-watermark').forEach((el) => {
    gsap.fromTo(
      el,
      { yPercent: 22 },
      {
        yPercent: -22,
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
      }
    );
  });
}

function initCounters() {
  gsap.utils.toArray('.stat-value').forEach((el) => {
    const num = parseInt(el.textContent, 10);
    if (!Number.isFinite(num)) return;
    const target = el.firstChild;
    const state = { v: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 92%',
      once: true,
      onEnter: () =>
        gsap.to(state, {
          v: num,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => {
            target.textContent = String(Math.round(state.v));
          },
        }),
    });
  });
}

function initVelocityMarquee() {
  const track = document.querySelector('.marquee-track');
  if (!track) return;
  track.style.animation = 'none'; // la boucle passe sous contrôle GSAP
  let x = 0;
  const setSkew = gsap.quickTo(track, 'skewX', { duration: 0.4, ease: 'power2.out' });
  gsap.ticker.add(() => {
    const vel = lenis ? lenis.velocity : 0;
    const speed = 0.045 + Math.min(0.4, Math.abs(vel) * 0.012);
    x -= speed;
    if (x <= -50) x += 50;
    gsap.set(track, { xPercent: x });
    setSkew(gsap.utils.clamp(-8, 8, vel * 0.45));
  });
}

function initCardTilt() {
  document.querySelectorAll('.project-card, .offer-card').forEach((card) => {
    const rx = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power2.out' });
    const ry = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power2.out' });
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      ry(px * 7);
      rx(-py * 7);
      gsap.to(card, { transformPerspective: 800, z: 8, duration: 0.4 });
    });
    card.addEventListener('mouseleave', () => {
      rx(0);
      ry(0);
      gsap.to(card, { z: 0, duration: 0.6 });
    });
  });
}

function initScrollProgress() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress-bar';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  gsap.to(bar, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
  });
}

function initMagnetic() {
  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    const strength = 18;
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * strength;
      const y = ((e.clientY - r.top) / r.height - 0.5) * strength;
      gsap.to(el, { x, y, duration: 0.35, ease: 'power2.out' });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.45)' });
    });
  });
}

function initCursor() {
  if (window.matchMedia('(hover: none)').matches) return;
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  document.body.appendChild(dot);
  const setX = gsap.quickTo(dot, 'x', { duration: 0.18, ease: 'power2.out' });
  const setY = gsap.quickTo(dot, 'y', { duration: 0.18, ease: 'power2.out' });
  let visible = false;
  window.addEventListener('mousemove', (e) => {
    if (!visible) {
      dot.style.opacity = '1';
      visible = true;
    }
    setX(e.clientX - 4);
    setY(e.clientY - 4);
  });
  const interactive = 'a, button, summary, input, textarea, [data-magnetic]';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactive)) gsap.to(dot, { scale: 2.6, duration: 0.25 });
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactive)) gsap.to(dot, { scale: 1, duration: 0.25 });
  });
}

// signature : les lettres du titre héro s'épaississent selon leur distance au
// curseur (police variable Instrument Sans, axe wght) — effet « aimant de poids »
function initVariableHeadline() {
  const chars = document.querySelectorAll('.hero-title .char');
  if (!chars.length) return;
  const items = [...chars].map((el) => ({ el, cx: 0, cy: 0 }));
  const measure = () => {
    items.forEach((it) => {
      const r = it.el.getBoundingClientRect();
      it.cx = r.left + r.width / 2;
      it.cy = r.top + r.height / 2;
    });
  };
  measure();
  window.addEventListener('resize', measure);
  const R = 180;
  let mx = -9999;
  let my = -9999;
  let dirty = false;
  let settled = true;
  window.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    dirty = true;
  });
  // ne recalcule que lorsque la souris bouge, plus une frame pour revenir au repos
  gsap.ticker.add(() => {
    if (!dirty && settled) return;
    let near = false;
    items.forEach((it) => {
      const d = Math.hypot(mx - it.cx, my - it.cy);
      const k = Math.max(0, 1 - d / R);
      if (k > 0) near = true;
      const wght = 500 + k * 400;
      it.el.style.fontVariationSettings = `"wght" ${wght.toFixed(0)}`;
    });
    settled = !near;
    dirty = false;
  });
}

// signature : au survol d'une ligne secteur, son nombre de clients apparaît en
// géant et suit le curseur
function initSectorFloat() {
  const rows = document.querySelectorAll('.sector-row');
  if (!rows.length) return;
  const float = document.createElement('div');
  float.className = 'hover-float';
  float.setAttribute('aria-hidden', 'true');
  document.body.appendChild(float);
  const setX = gsap.quickTo(float, 'x', { duration: 0.5, ease: 'power3.out' });
  const setY = gsap.quickTo(float, 'y', { duration: 0.5, ease: 'power3.out' });
  rows.forEach((row) => {
    const value = row.querySelector('.sector-count')?.textContent.trim() || '';
    row.addEventListener('mouseenter', () => {
      float.textContent = value;
      gsap.to(float, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' });
    });
    row.addEventListener('mouseleave', () => {
      gsap.to(float, { opacity: 0, scale: 0.6, duration: 0.3 });
    });
  });
  window.addEventListener('mousemove', (e) => {
    setX(e.clientX);
    setY(e.clientY);
  });
}

function initPhotoParallax() {
  const img = document.querySelector('.about-photo img');
  if (!img) return;
  gsap.set(img, { scale: 1.12 });
  gsap.fromTo(
    img,
    { yPercent: -6 },
    {
      yPercent: 6,
      ease: 'none',
      scrollTrigger: { trigger: '.about-photo', start: 'top bottom', end: 'bottom top', scrub: 0.6 },
    }
  );
}

export function initMotion() {
  initSmoothScroll();
  initHeroIntro();
  initHeadingReveals();
  initReveals();
  initWatermarks();
  initCounters();
  initVelocityMarquee();
  initCardTilt();
  initScrollProgress();
  initMagnetic();
  initCursor();
  initPhotoParallax();
  initVariableHeadline();
  initSectorFloat();
}
