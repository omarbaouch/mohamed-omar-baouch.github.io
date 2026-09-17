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
      film:'Étude de mouvement — assemblage', play:'Lire l’animation', pause:'Mettre en pause', failed:'Animation indisponible — image fixe',
      interlude:'Relier les pièces. Donner du sens aux données.',
      detail:'Comprendre un produit, c’est aussi comprendre ce qui relie ses composants, ses versions et les équipes qui le font évoluer.',
      caption:'Étude de mouvement — flux de données', note:'Portfolio personnel · Consultant salarié chez Visiativ. Les opinions exprimées ici sont personnelles. Aucune prestation indépendante proposée.'},
    en: {name:'Mohamed Omar Baouch', identity:'Engineering / Data / Knowledge',
      subtitle:'From mechanical design to product data. My journey as a PDM/PLM consultant at Visiativ, selected projects and lessons from the field.',
      projects:'Explore my experience',blog:'Open the engineering notebook ↗',
      film:'Motion study — assembly',play:'Play animation',pause:'Pause animation',failed:'Animation unavailable — still image',
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
    figure.innerHTML = `<video muted loop playsinline preload="none" poster="/motion/${name}.jpg" aria-hidden="true" tabindex="-1"></video>
      <figcaption class="motion-caption"><span data-cinema="${caption}"></span><span aria-hidden="true">${name==='assembly'?'01 / 02':'02 / 02'}</span></figcaption>
      <button class="motion-toggle" type="button"></button>`;
    const video = figure.querySelector('video');
    const button = figure.querySelector('button');
    video.muted = true;
    let manualPause = false, visible = false, failed = false;
    const label = () => { button.textContent = text(failed?'failed':video.paused?'play':'pause'); button.disabled = failed; };
    const play = () => {
      if (failed) return;
      if (!video.getAttribute('src')) video.src = `/motion/${name}.mp4`;
      video.play().catch(label);
    };
    const sync = () => {
      if (visible && !document.hidden && !manualPause && !reduce.matches && !lowData) play();
      else video.pause();
      label();
    };
    button.addEventListener('click', () => {
      if (video.paused) { manualPause=false; play(); }
      else { manualPause=true; video.pause(); }
      label();
    });
    video.addEventListener('play', label);
    video.addEventListener('pause', label);
    video.addEventListener('error', () => { failed=true; video.removeAttribute('src'); video.load(); label(); });
    new IntersectionObserver(entries => { visible=entries[0].isIntersecting; sync(); }, {threshold:.12}).observe(figure);
    document.addEventListener('visibilitychange',sync);
    reduce.addEventListener('change',sync);
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
  chapter.append(film('dataflow','caption'));
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
