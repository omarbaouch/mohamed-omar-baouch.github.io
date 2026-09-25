// Original motion studies: no external embeds, tracking, or client footage.
export function initCinematic() {
  const hero = document.querySelector('.hero-inner');
  if (!hero) return;
  document.body.classList.add('cinematic');
  // Content is available immediately; no artificial loading sequence.
  document.getElementById('siteLoader')?.remove();
  document.documentElement.classList.remove('is-loading');
  // mention personnelle en pied de page (le texte du hero est dans le HTML et l'i18n)
  const words = {
    fr: {note:'Portfolio personnel · Consultant salarié chez Visiativ. Les opinions exprimées ici sont personnelles. Aucune prestation indépendante proposée.'},
    en: {note:'Personal portfolio · Employed consultant at Visiativ. Views expressed here are personal. No independent consulting services offered.'}
  };
  const language = () => document.documentElement.lang === 'en' ? 'en' : 'fr';
  const text = key => words[language()][key];

  // Le film du hero, lu au défilement. En mouvement réduit ou en économie de
  // données (ou sans WebGL 2), l'image fixe et les textes à plat suffisent :
  // rien n'est chargé. Le script en ligne du hero a déjà posé .is-live.
  const filmHero=document.querySelector('.film-hero.is-live');
  if(filmHero){
    import('./hero-film.js').then(({initHeroFilm})=>initHeroFilm(filmHero)).catch(()=>filmHero.classList.remove('is-live'));
  }

  const note=document.createElement('p');
  note.className='cinema-personal-note'; note.dataset.cinema='note';
  document.querySelector('.footer-bottom')?.before(note);
  const update = () => {
    document.querySelectorAll('[data-cinema]').forEach(el => { el.textContent=text(el.dataset.cinema); });
  };
  window.addEventListener('langchange',update);
  update();
}
