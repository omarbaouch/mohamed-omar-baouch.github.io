// Original motion studies: no external embeds, tracking, or client footage.
export function initCinematic() {
  const hero = document.querySelector('.hero-inner');
  if (!hero) return;
  document.body.classList.add('cinematic');
  // Content is available immediately; no artificial loading sequence.
  document.getElementById('siteLoader')?.remove();
  document.documentElement.classList.remove('is-loading');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const lowData = Boolean(navigator.connection?.saveData);
  const words = {
    fr: {name:'Mohamed Omar Baouch', identity:'Ingénierie / Données / Transmission',
      subtitle:'De la conception mécanique aux données produit. Mon parcours de consultant PDM/PLM chez Visiativ, mes réalisations et ce que le terrain m’a appris.',
      projects:'Explorer mon parcours', blog:'Ouvrir le carnet technique ↗', note:'Portfolio personnel · Consultant salarié chez Visiativ. Les opinions exprimées ici sont personnelles. Aucune prestation indépendante proposée.'},
    en: {name:'Mohamed Omar Baouch', identity:'Engineering / Data / Knowledge',
      subtitle:'From mechanical design to product data. My journey as a PDM/PLM consultant at Visiativ, selected projects and lessons from the field.',
      projects:'Explore my experience',blog:'Open the engineering notebook ↗',note:'Personal portfolio · Employed consultant at Visiativ. Views expressed here are personal. No independent consulting services offered.'}
  };
  const language = () => document.documentElement.lang === 'en' ? 'en' : 'fr';
  const text = key => words[language()][key];
  const identity = document.createElement('p');
  identity.className = 'cinematic-identity';
  identity.textContent = words.fr.name;
  hero.querySelector('.hero-copy')?.prepend(identity);

  // Le film du hero, lu au défilement. En mouvement réduit ou en économie de
  // données, l'image fixe et les textes à plat suffisent : rien n'est chargé.
  const filmHero=document.querySelector('.film-hero');
  if(filmHero && !reduce.matches && !lowData){
    import('./hero-film.js').then(({initHeroFilm})=>initHeroFilm(filmHero)).catch(()=>filmHero.classList.remove('is-live'));
  }
  const reel=document.getElementById('film');
  if(reel) import('./reel.js').then(({initReel})=>initReel(reel));

  const note=document.createElement('p');
  note.className='cinema-personal-note'; note.dataset.cinema='note';
  document.querySelector('.footer-bottom')?.before(note);
  const update = () => {
    document.querySelectorAll('[data-cinema]').forEach(el => { el.textContent=text(el.dataset.cinema); });
    const subtitle=document.querySelector('.hero-subtitle');
    if(subtitle) subtitle.textContent=text('subtitle');
    const primary=document.querySelector('[data-translate-key="hero_cta1"]');
    if(primary) { primary.href='#experience'; primary.textContent=text('projects'); }
    const secondary=document.querySelector('[data-translate-key="hero_cta2"]');
    if(secondary) { secondary.href='/blog/'; secondary.textContent=text('blog'); }
  };
  window.addEventListener('langchange',update);
  update();
}
