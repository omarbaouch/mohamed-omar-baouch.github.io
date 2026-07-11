// Motion design : smooth scroll Lenis, reveals GSAP, compteurs, magnétisme, curseur.
// Ce module n'est chargé que si prefers-reduced-motion n'est pas demandé ;
// sans lui, la page est complète et statique.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

function initSmoothScroll() {
  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // ancres internes via Lenis (offset pour la nav fixe)
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
  return lenis;
}

function initHeroIntro() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.from('.hero-title .mask-inner', {
    yPercent: 115,
    duration: 1.05,
    stagger: 0.12,
  })
    .from('.hero-kicker', { y: 14, autoAlpha: 0, duration: 0.7 }, 0.15)
    .from('.hero-subtitle', { y: 20, autoAlpha: 0, duration: 0.8 }, 0.45)
    .from('.hero-cta > *', { y: 18, autoAlpha: 0, duration: 0.7, stagger: 0.08 }, 0.6)
    .from('.hero-blob', { scale: 0.7, autoAlpha: 0, duration: 1.4, ease: 'power2.out' }, 0.2)
    .from('.hero-stat', { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.07 }, 0.75);
}

function initReveals() {
  const groups = [
    '.section .eyebrow',
    '.section .display-2',
    '.section-head .prose-lead',
    '.offer-card',
    '.sector-row',
    '.project-card',
    '.about-media',
    '.about-copy > *',
    '.index-row',
    '.skill-group',
    '.education-card',
    '.contact-copy > *',
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

function initCounters() {
  gsap.utils.toArray('.stat-value').forEach((el) => {
    const num = parseInt(el.textContent, 10);
    if (!Number.isFinite(num)) return;
    const target = el.firstChild; // le nœud texte avant le +
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

function initBlobDrift() {
  // légère dérive du blob avec le scroll + parallax souris (remplacé par WebGL en phase 5)
  const blob = document.querySelector('.hero-blob');
  if (!blob) return;
  gsap.to(blob, {
    yPercent: 18,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.6 },
  });
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 24;
    const y = (e.clientY / window.innerHeight - 0.5) * 24;
    gsap.to(blob, { x, y, duration: 1.2, ease: 'power2.out' });
  });
}

export function initMotion() {
  initSmoothScroll();
  initHeroIntro();
  initReveals();
  initCounters();
  initMagnetic();
  initCursor();
  initBlobDrift();
}
