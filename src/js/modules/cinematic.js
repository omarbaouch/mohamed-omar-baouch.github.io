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
      film:'De la pièce au système', play:'Animer l’assemblage', pause:'Mettre en pause', failed:'Animation indisponible — image fixe', loading:'Préparation de la scène…', opening:'Décomposer l’assemblage',
      interlude:'Relier les pièces. Donner du sens aux données.',
      detail:'Comprendre un produit, c’est aussi comprendre ce qui relie ses composants, ses versions et les équipes qui le font évoluer.',
      caption:'Étude de mouvement — flux de données', note:'Portfolio personnel · Consultant salarié chez Visiativ. Les opinions exprimées ici sont personnelles. Aucune prestation indépendante proposée.'},
    en: {name:'Mohamed Omar Baouch', identity:'Engineering / Data / Knowledge',
      subtitle:'From mechanical design to product data. My journey as a PDM/PLM consultant at Visiativ, selected projects and lessons from the field.',
      projects:'Explore my experience',blog:'Open the engineering notebook ↗',
      film:'From part to system',play:'Animate the assembly',pause:'Pause animation',failed:'Animation unavailable — still image',loading:'Preparing the scene…',opening:'Explode the assembly',
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

  function film(name, caption) {
    const figure = document.createElement('figure');
    figure.className = `motion-study motion-study--${name}`;
    figure.innerHTML = `<video muted loop playsinline preload="none" poster="/motion/precision.jpg" aria-hidden="true" tabindex="-1"></video>
      <figcaption class="motion-caption"><span data-cinema="${caption}"></span><span aria-hidden="true">MOB — 001</span></figcaption>
      <button class="motion-toggle" type="button"></button><label class="precision-control" hidden><span data-cinema="opening"></span><input type="range" min="0" max="100" value="70"></label><span class="motion-timeline" aria-hidden="true"></span>`;
    const video = figure.querySelector('video');
    const button = figure.querySelector('button');
    video.muted = true;
    const control=figure.querySelector('.precision-control');
    const range=control.querySelector('input');
    let manualPause=false, visible=false, failed=false, engine=null, loading=null, fallback=false, playing=false;
    let explicitPlay=false;
    const label=()=>{ button.textContent=text(failed?'failed':loading?'loading':playing?'pause':'play');button.disabled=failed; };
    const wanted=()=>visible&&!document.hidden&&!manualPause&&(explicitPlay||(!reduce.matches&&!lowData));
    const playFallback=()=>{
      if (!video.getAttribute('src')) video.src='/motion/precision.mp4';
      if(wanted()) video.play().catch(()=>{playing=false;label();});
    };
    const start=()=>{
      if(failed)return;
      if(engine){engine.play();playing=true;label();return;}
      if(fallback){playFallback();return;}
      if(loading)return;
      loading=import('./precision.js').then(({createPrecisionScene})=>createPrecisionScene(figure)).then(scene=>{
        engine=scene;figure.classList.add('precision-ready');control.hidden=false;
      }).catch(()=>{fallback=true;}).finally(()=>{loading=null;sync();});
      label();
    };
    const sync = () => {
      if(wanted()) start();
      else {engine?.pause();video.pause();playing=false;}
      label();
    };
    button.addEventListener('click', () => {
      if(playing||loading){manualPause=true;explicitPlay=false;}
      else {manualPause=false;explicitPlay=true;}
      sync();
    });
    range.addEventListener('input',()=>{manualPause=true;playing=false;engine?.seek(Number(range.value)/100);label();});
    figure.addEventListener('pointermove',event=>{
      if(reduce.matches||event.pointerType==='touch')return;
      const rect=figure.getBoundingClientRect();
      engine?.point((event.clientX-rect.left)/rect.width-.5,(event.clientY-rect.top)/rect.height-.5);
    });
    figure.addEventListener('pointerleave',()=>engine?.point(0,0));
    figure.addEventListener('precisionlost',()=>{
      engine?.dispose();engine=null;fallback=true;control.hidden=true;
      figure.classList.remove('precision-ready');sync();
    });
    video.addEventListener('play',()=>{playing=true;label();});
    video.addEventListener('pause',()=>{playing=false;label();});
    video.addEventListener('timeupdate', () => {
      if (Number.isFinite(video.duration)) figure.style.setProperty('--film-progress',video.currentTime/video.duration);
    });
    video.addEventListener('error',()=>{failed=true;playing=false;video.removeAttribute('src');video.load();label();});
    new IntersectionObserver(entries => { visible=entries[0].isIntersecting; sync(); }, {threshold:.12}).observe(figure);
    // L'observation est posée avant que la figure rejoigne le document, et la
    // première intersection n'est alors pas signalée : le film restait sur son
    // image d'attente jusqu'à ce qu'un aller-retour de défilement réveille
    // l'observateur. On mesure donc nous-mêmes, au frame suivant, une fois la
    // figure en place.
    requestAnimationFrame(() => {
      if (visible || !figure.isConnected) return;
      const rect = figure.getBoundingClientRect();
      if (rect.top < innerHeight && rect.bottom > 0 && rect.left < innerWidth && rect.right > 0) {
        visible = true;
        sync();
      }
    });
    document.addEventListener('visibilitychange',sync);
    reduce.addEventListener('change',()=>{explicitPlay=false;sync();});
    window.addEventListener('pagehide',()=>{engine?.pause();video.pause();playing=false;});
    window.addEventListener('pageshow',sync);
    window.addEventListener('langchange',label);
    label();
    return figure;
  }
  hero.append(film('assembly','film'));
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

  // Gentle depth on desktop without intercepting native scroll or touch input.
  const heroSection=hero.closest('.hero');
  let scheduled=false;
  const depth=()=>{
    scheduled=false;
    const rect=heroSection.getBoundingClientRect();
    const progress=reduce.matches ? 0 : Math.max(0,Math.min(1,-rect.top/rect.height));
    hero.style.setProperty('--hero-depth',`${progress*65}px`);
  };
  const onScroll=()=>{ if(!scheduled){scheduled=true;requestAnimationFrame(depth);} };
  window.addEventListener('scroll',onScroll,{passive:true});
  reduce.addEventListener('change',depth);
  depth();
}
