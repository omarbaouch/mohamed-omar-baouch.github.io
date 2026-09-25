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
      projects:'Explorer mon parcours', blog:'Ouvrir le carnet technique ↗',
      interlude:'Relier les pièces. Donner du sens aux données.',
      detail:'Comprendre un produit, c’est aussi comprendre ce qui relie ses composants, ses versions et les équipes qui le font évoluer.',
      caption:'Étude de mouvement — flux de données', note:'Portfolio personnel · Consultant salarié chez Visiativ. Les opinions exprimées ici sont personnelles. Aucune prestation indépendante proposée.'},
    en: {name:'Mohamed Omar Baouch', identity:'Engineering / Data / Knowledge',
      subtitle:'From mechanical design to product data. My journey as a PDM/PLM consultant at Visiativ, selected projects and lessons from the field.',
      projects:'Explore my experience',blog:'Open the engineering notebook ↗',
      interlude:'Connecting parts. Giving data meaning.',
      detail:'Understanding a product means understanding the connections between its components, versions and the teams bringing it to life.',
      caption:'Motion study — data flow',note:'Personal portfolio · Employed consultant at Visiativ. Views expressed here are personal. No independent consulting services offered.'}
  };
  const language = () => document.documentElement.lang === 'en' ? 'en' : 'fr';
  const text = key => words[language()][key];
  const identity = document.createElement('p');
  identity.className = 'cinematic-identity';
  identity.textContent = words.fr.name;
  hero.querySelector('.hero-copy')?.prepend(identity);

  // La pièce 3D du hero et la vue éclatée au défilement : un seul moteur WebGL,
  // chargé après le premier rendu. En mouvement réduit, économie de données ou
  // sans WebGL, l'image fixe du hero et la liste de la visite restent en place.
  const tour=document.getElementById('assemblage');
  const anchor=hero.querySelector('.hero-model');
  if(tour && anchor && !reduce.matches && !lowData){
    // la mise en page collante est posée d'emblée : pas de saut quand la 3D arrive
    document.body.classList.add('assembly-live');
    const boot=()=>import('./assembly.js').then(({initAssembly})=>initAssembly({anchor,tour})).then(engine=>{
      const pause=tour.querySelector('.tour-pause');
      pause?.setAttribute('aria-pressed','false');
      pause?.addEventListener('click',()=>pause.setAttribute('aria-pressed',String(engine.togglePause())));
    }).catch(()=>document.body.classList.remove('assembly-live'));
    if('requestIdleCallback' in window) requestIdleCallback(boot,{timeout:1200}); else setTimeout(boot,300);
  }
  const reel=document.getElementById('film');
  if(reel) import('./reel.js').then(({initReel})=>initReel(reel));

  const chapter = document.createElement('section');
  chapter.className='cinema-chapter';
  chapter.setAttribute('aria-labelledby','cinema-chapter-title');
  chapter.innerHTML = `<div class="cinema-chapter-copy"><p class="eyebrow" data-cinema="identity"></p>
    <h2 id="cinema-chapter-title" data-cinema="interlude"></h2><p class="cinema-detail" data-cinema="detail"></p></div>`;
  // One coherent moving scene; the editorial chapter uses a quiet still.
  const chapterImage = document.createElement('img');
  chapterImage.className='cinema-chapter-art';
  chapterImage.src='/motion/engineering-art.webp';
  chapterImage.alt=''; chapterImage.width=1672; chapterImage.height=941;
  chapterImage.loading='lazy'; chapterImage.decoding='async';
  chapter.append(chapterImage);
  document.getElementById('about')?.before(chapter);
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
