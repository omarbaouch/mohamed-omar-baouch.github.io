// La page est une feuille de plan : un cadre à repères de zones (1–8 en
// abscisse, A–F en ordonnée) borde l'écran, et un cartouche indique la vue
// consultée, la feuille et l'état — comme en bas à droite d'une mise en plan.
// Décoratif (aria-hidden) : la navigation réelle reste celle du site.
const VIEWS = {
  fr: { hero: 'Introduction', structure: 'Structure', expertise: 'Expertise', about: 'À propos', experience: 'Expérience', skills: 'Nomenclature', education: 'Formation', film: 'Film', contact: 'Contact' },
  en: { hero: 'Introduction', structure: 'Structure', expertise: 'Expertise', about: 'About', experience: 'Experience', skills: 'Bill of skills', education: 'Education', film: 'Film', contact: 'Contact' },
};
const WORDS = { fr: ['Vue', 'Feuille', 'État', 'Publié'], en: ['View', 'Sheet', 'State', 'Released'] };
// sections où la scène a déjà son propre habillage : le cartouche s'efface
const IMMERSIVE = new Set(['hero', 'film']);

export function initSheet() {
  const lang = () => (document.documentElement.lang === 'en' ? 'en' : 'fr');
  const sections = [document.querySelector('main .hero'), ...document.querySelectorAll('main > section[id]')].filter(Boolean);
  if (!sections.length) return;
  const idOf = (s) => s.id || 'hero';

  const frame = document.createElement('div');
  frame.className = 'sheet';
  frame.setAttribute('aria-hidden', 'true');
  const cols = Array.from({ length: 8 }, (_, i) => `<span>${i + 1}</span>`).join('');
  const rows = 'ABCDEF'.split('').map((l) => `<span>${l}</span>`).join('');
  frame.innerHTML = `
    <div class="sheet-cols sheet-top">${cols}</div>
    <div class="sheet-rows sheet-left">${rows}</div>
    <div class="sheet-rows sheet-right">${rows}</div>
    <i class="sheet-scroll"></i>`;
  // le cartouche est opaque (hors du calque en différence) : il ne se mêle pas au texte
  const block = document.createElement('div');
  block.className = 'sheet-block is-hidden';
  block.setAttribute('aria-hidden', 'true');
  block.innerHTML = `
      <div class="sb-cell sb-wide"><em class="sb-k"></em><b class="sb-view"></b></div>
      <div class="sb-cell"><em class="sb-k"></em><b class="sb-sheet"></b></div>
      <div class="sb-cell"><em class="sb-k"></em><b class="sb-state"><i></i></b></div>
      <div class="sb-cell sb-wide"><em>ASM</em><b>BAOUCH.SLDASM</b></div>
      <div class="sb-cell"><em>Rév.</em><b>2026</b></div>
      <div class="sb-cell"><em>Éch.</em><b>1:1</b></div>`;
  document.body.append(frame, block);
  const keys = [...block.querySelectorAll('.sb-k')];
  const view = block.querySelector('.sb-view');
  const sheetNo = block.querySelector('.sb-sheet');
  const state = block.querySelector('.sb-state');
  const bar = frame.querySelector('.sheet-scroll');

  let current = null;
  const render = () => {
    const L = lang();
    const [kView, kSheet, kState, released] = WORDS[L];
    keys[0].textContent = kView; keys[1].textContent = kSheet; keys[2].textContent = kState;
    state.innerHTML = `<i></i>${released}`;
    if (!current) return;
    const id = idOf(current);
    const i = sections.indexOf(current);
    view.textContent = VIEWS[L][id] ?? id;
    sheetNo.textContent = `${String(i + 1).padStart(2, '0')} / ${String(sections.length).padStart(2, '0')}`;
    block.classList.toggle('is-hidden', IMMERSIVE.has(id));
  };

  // vue courante : la section qui occupe le milieu de l'écran
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      current = e.target;
      render();
      // la nav garde la trace des vues consultées (LED sur le lien)
      if (current.id) document.querySelector(`.nav-link[href="/#${current.id}"]`)?.classList.add('is-seen');
    }
  }, { rootMargin: '-50% 0px -50% 0px' });
  sections.forEach((s) => io.observe(s));

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `translateY(${(max > 0 ? scrollY / max : 0) * (innerHeight - 120)}px)`;
    });
  };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  addEventListener('langchange', render);
  onScroll();
  render();
}

// zone du plan sous un point de l'écran, ex. « C4 » — utilisée par le curseur
export function zoneAt(x, y) {
  const col = Math.min(8, Math.max(1, Math.floor((x / innerWidth) * 8) + 1));
  const row = 'ABCDEF'[Math.min(5, Math.max(0, Math.floor((y / innerHeight) * 6)))];
  return `${row}${col}`;
}
