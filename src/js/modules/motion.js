// Motion design : smooth scroll Lenis, reveals GSAP typographiques (mots des
// titres), marquee pilotée par la vélocité de scroll, parallax des filigranes,
// compteurs, magnétisme. L'entrée du hero est en CSS (fluide même pendant le
// chargement).
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

function initHeadingReveals() {
  const en = document.documentElement.lang === 'en';
  document.querySelectorAll('.section .display-2').forEach((h) => {
    const words = splitWords(h);
    gsap.from(words, {
      yPercent: 115,
      duration: 0.9,
      ease: 'power4.out',
      stagger: 0.05,
      scrollTrigger: { trigger: h, start: 'top 86%', once: true },
    });
    // une fois le titre en place, sa contrainte d'assemblage est posée
    const chip = document.createElement('span');
    chip.className = 'mate-chip';
    chip.textContent = en ? '⊕ MATED' : '⊕ ASSEMBLÉ';
    h.appendChild(chip);
    gsap.from(chip, {
      autoAlpha: 0,
      scale: 0.6,
      duration: 0.5,
      ease: 'back.out(2.2)',
      delay: 0.75,
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

function initAssemblyLine() {
  // le fil de routage CAO : une ligne continue qui se trace au scroll le
  // long de toute la page et s'articule sur chaque section — la visite
  // entière devient la traversée d'un plan d'assemblage
  if (window.matchMedia('(max-width: 64rem)').matches) return;
  const sections = ['structure', 'expertise', 'about', 'experience', 'skills', 'education', 'contact']
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  if (sections.length < 2) return;

  const wrap = document.createElement('div');
  wrap.className = 'asm-line';
  wrap.setAttribute('aria-hidden', 'true');
  document.body.appendChild(wrap);

  const X = 40; // ligne principale (dans un SVG de 60px de large)
  const NX = 22; // position des nœuds (décrochement vers la gauche)
  let path = null;

  function build() {
    const H = document.documentElement.scrollHeight;
    let d = `M ${X} ${Math.round(window.innerHeight * 0.62)}`;
    const nodes = [];
    for (const s of sections) {
      const y = Math.round(s.getBoundingClientRect().top + window.scrollY + 120);
      d += ` L ${X} ${y - 20} L ${NX} ${y} L ${X} ${y + 20}`;
      nodes.push({ y, id: s.id });
    }
    d += ` L ${X} ${H - 60}`;
    wrap.innerHTML = `<svg width="60" height="${H}" viewBox="0 0 60 ${H}" fill="none">
      <path class="asm-path" d="${d}" />
      ${nodes
        .map(
          (n) =>
            `<rect class="asm-node" data-for="${n.id}" x="${NX - 4.5}" y="${n.y - 4.5}" width="9" height="9" transform="rotate(45 ${NX} ${n.y})" />`
        )
        .join('')}
    </svg>`;
    path = wrap.querySelector('.asm-path');
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    gsap.fromTo(
      path,
      { strokeDashoffset: len },
      {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.4 },
      }
    );
    // chaque nœud s'allume quand sa section est atteinte
    wrap.querySelectorAll('.asm-node').forEach((node) => {
      ScrollTrigger.create({
        trigger: `#${node.dataset.for}`,
        start: 'top 62%',
        onEnter: () => node.classList.add('is-active'),
        onLeaveBack: () => node.classList.remove('is-active'),
      });
    });
  }

  build();
  let rid = 0;
  window.addEventListener('resize', () => {
    clearTimeout(rid);
    rid = setTimeout(() => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === document.body) st.kill();
      });
      build();
    }, 250);
  });
}

// la nomenclature de compétences s'imprime ligne à ligne, puis chaque cote
// se remplit comme une mesure qui se prend — l'entête du coffre d'abord
function initSkillsSheet() {
  const sheet = document.querySelector('.skills-sheet');
  if (!sheet) return;
  const lines = sheet.querySelectorAll('.bom-head, .sheet-group-head, .sheet-row, .bom-foot');
  gsap.from(lines, {
    y: 22,
    autoAlpha: 0,
    duration: 0.7,
    ease: 'power3.out',
    stagger: 0.05,
    scrollTrigger: { trigger: sheet, start: 'top 82%', once: true },
  });
  sheet.querySelectorAll('.level-gauge i').forEach((fill, i) => {
    gsap.from(fill, {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 1.05,
      ease: 'power3.inOut',
      delay: 0.3 + (i % 4) * 0.09,
      scrollTrigger: { trigger: fill.closest('.sheet-row'), start: 'top 92%', once: true },
    });
  });
}

function initPhotoBand() {
  // la bande atelier glisse doucement pendant la traversée (parallax interne)
  const img = document.querySelector('.photo-band img');
  if (!img) return;
  gsap.fromTo(
    img,
    { yPercent: -7 },
    {
      yPercent: 7,
      ease: 'none',
      scrollTrigger: { trigger: '.photo-band', start: 'top bottom', end: 'bottom top', scrub: 0.6 },
    }
  );
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
  // la bande ne tourne que lorsqu'elle est à l'écran
  let onScreen = false;
  new IntersectionObserver(([e]) => {
    onScreen = e.isIntersecting;
  }).observe(track);
  gsap.ticker.add(() => {
    if (!onScreen) return;
    const vel = lenis ? lenis.velocity : 0;
    const speed = 0.045 + Math.min(0.4, Math.abs(vel) * 0.012);
    x -= speed;
    if (x <= -50) x += 50;
    gsap.set(track, { xPercent: x });
    setSkew(gsap.utils.clamp(-8, 8, vel * 0.45));
  });
}

function initMagnetic() {
  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    const strength = 18;
    // deux « quickTo » réutilisés : aucune animation créée à chaque mouvement
    const toX = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power2.out' });
    const toY = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power2.out' });
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      toX(((e.clientX - r.left) / r.width - 0.5) * strength);
      toY(((e.clientY - r.top) / r.height - 0.5) * strength);
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.45)' });
    });
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
  // le défilement doux d'abord ; le reste est installé par petits lots quand
  // le navigateur est libre, pour ne jamais bloquer une image au chargement
  initSmoothScroll();
  const tasks = [
    initHeadingReveals,
    initReveals,
    initWatermarks,
    initSkillsSheet,
    initPhotoBand,
    initAssemblyLine,
    initCounters,
    initVelocityMarquee,
    initMagnetic,
    initPhotoParallax,
  ];
  const idle = window.requestIdleCallback || ((cb) => setTimeout(() => cb({ timeRemaining: () => 8 }), 60));
  const run = (deadline) => {
    while (tasks.length && deadline.timeRemaining() > 4) tasks.shift()();
    if (tasks.length) idle(run, { timeout: 400 });
    else ScrollTrigger.refresh();
  };
  idle(run, { timeout: 400 });
}
