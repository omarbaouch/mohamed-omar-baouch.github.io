// Le film du site : une vignette muette qui s'ouvre en plein cadre au défilement,
// puis un lecteur plein écran (dialog natif) avec le son, les 9 vues en chapitres
// et des commandes au clavier. Les vidéos ne sont chargées qu'à l'approche.
const CHAPTERS = {
  fr: ['Ouverture', 'Titre', 'En chiffres', 'Le site', 'Vue éclatée', 'Projets', 'Carnet technique', 'Responsive', 'Publication'],
  en: ['Opening', 'Title', 'In numbers', 'The site', 'Exploded view', 'Projects', 'Notebook', 'Responsive', 'Release'],
};
const STARTS = [0, 4.5, 11, 16, 23.5, 31.5, 37.5, 42.5, 46];
const LABELS = {
  fr: { pause: 'Pause', play: 'Lecture', mute: 'Couper le son', unmute: 'Activer le son', sound: 'SON', close: 'Fermer', bar: 'Position dans le film', dialog: 'Film de présentation' },
  en: { pause: 'Pause', play: 'Play', mute: 'Mute', unmute: 'Unmute', sound: 'SOUND', close: 'Close', bar: 'Position in the film', dialog: 'Presentation film' },
};
const lang = () => (document.documentElement.lang === 'en' ? 'en' : 'fr');
const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

export function initReel(section) {
  const stage = section.querySelector('.reel-stage');
  const preview = section.querySelector('.reel-preview');
  const playBtn = section.querySelector('.reel-play');
  const dialog = section.querySelector('.reel-dialog');
  const video = dialog.querySelector('.reel-video');
  const toggle = dialog.querySelector('.reel-toggle');
  const mute = dialog.querySelector('.reel-mute');
  const close = dialog.querySelector('.reel-close');
  const bar = dialog.querySelector('.reel-bar');
  const fill = dialog.querySelector('.reel-bar-fill');
  const marks = dialog.querySelector('.reel-chapters');
  const time = dialog.querySelector('.reel-time');
  const now = dialog.querySelector('.reel-chapter-now');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(pointer: fine)');

  section.classList.add('reel-live');

  // ---- ouverture au défilement : le cadre passe de la vignette au plein écran
  let ticking = false;
  const measure = () => {
    ticking = false;
    const r = section.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight - r.top) / (r.height * 0.62)));
    section.style.setProperty('--open', reduce.matches ? 1 : p.toFixed(4));
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(measure); } };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  measure();

  // ---- vignette : chargée et lue seulement quand elle est à l'écran
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      if (!preview.src) preview.src = preview.dataset.src;
      if (!reduce.matches && !navigator.connection?.saveData) preview.play().catch(() => {});
    } else preview.pause();
  }, { rootMargin: '200px 0px' }).observe(stage);

  // ---- bouton de lecture qui suit le pointeur dans le cadre
  const frame = section.querySelector('.reel-frame');
  let tx = 0, ty = 0, cx = 0, cy = 0, followRaf = 0;
  const follow = () => {
    cx += (tx - cx) * 0.14; cy += (ty - cy) * 0.14;
    playBtn.style.translate = `${cx}px ${cy}px`;
    if (Math.abs(tx - cx) + Math.abs(ty - cy) > 0.5) followRaf = requestAnimationFrame(follow);
    else followRaf = 0;
  };
  frame.addEventListener('pointermove', (e) => {
    if (!fine.matches || reduce.matches) return;
    const r = frame.getBoundingClientRect();
    tx = e.clientX - (r.left + r.width / 2);
    ty = e.clientY - (r.top + r.height / 2);
    if (!followRaf) followRaf = requestAnimationFrame(follow);
  });
  frame.addEventListener('pointerleave', () => { tx = 0; ty = 0; if (!followRaf) followRaf = requestAnimationFrame(follow); });
  frame.addEventListener('click', (e) => { if (e.target === frame || e.target.closest('.reel-scrim, video')) open(); });

  // ---- lecteur
  const chapters = () => CHAPTERS[lang()];
  const label = () => {
    const L = LABELS[lang()];
    toggle.setAttribute('aria-label', video.paused ? L.play : L.pause);
    toggle.textContent = video.paused ? '▶' : '❚❚';
    mute.setAttribute('aria-label', video.muted ? L.unmute : L.mute);
    mute.textContent = video.muted ? `${L.sound} ✕` : L.sound;
    close.setAttribute('aria-label', L.close);
    bar.setAttribute('aria-label', L.bar);
    dialog.setAttribute('aria-label', L.dialog);
    marks.innerHTML = STARTS.map((s, i) =>
      `<button type="button" class="reel-mark" style="left:${(s / 53) * 100}%" data-t="${s}" tabindex="-1"><span>${String(i + 1).padStart(2, '0')} ${chapters()[i]}</span></button>`
    ).join('');
  };
  const chapterAt = (t) => STARTS.reduce((a, s, i) => (t >= s ? i : a), 0);
  let lastChapter = -1;
  const update = () => {
    const d = video.duration || 53;
    const t = video.currentTime;
    fill.style.transform = `scaleX(${t / d})`;
    time.textContent = `${fmt(t)} / ${fmt(d)}`;
    bar.setAttribute('aria-valuenow', Math.round(t));
    bar.setAttribute('aria-valuetext', `${fmt(t)} — ${chapters()[chapterAt(t)]}`);
    const c = chapterAt(t);
    if (c !== lastChapter) {
      lastChapter = c;
      now.textContent = `VUE ${String(c + 1).padStart(2, '0')} / 09 — ${chapters()[c]}`;
      marks.querySelectorAll('.reel-mark').forEach((m, i) => m.classList.toggle('is-past', i <= c));
    }
  };
  const seekTo = (t) => { video.currentTime = Math.max(0, Math.min((video.duration || 53) - 0.05, t)); update(); };

  function open() {
    if (!video.src) video.src = video.dataset.src;
    preview.pause();
    dialog.showModal();
    document.documentElement.classList.add('reel-open');
    video.muted = false;
    video.currentTime = 0;
    video.play().catch(() => { video.muted = true; video.play().catch(() => {}); });
    label();
    toggle.focus();
  }
  dialog.addEventListener('close', () => {
    video.pause();
    document.documentElement.classList.remove('reel-open');
    playBtn.focus();
  });
  playBtn.addEventListener('click', open);
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
  toggle.addEventListener('click', () => (video.paused ? video.play() : video.pause()));
  video.addEventListener('click', () => (video.paused ? video.play() : video.pause()));
  mute.addEventListener('click', () => { video.muted = !video.muted; label(); });
  ['play', 'pause', 'volumechange'].forEach((ev) => video.addEventListener(ev, label));
  video.addEventListener('timeupdate', update);
  video.addEventListener('ended', () => dialog.close());
  marks.addEventListener('click', (e) => {
    const m = e.target.closest('.reel-mark');
    if (m) { e.stopPropagation(); seekTo(+m.dataset.t); }
  });
  bar.addEventListener('pointerdown', (e) => {
    if (e.target.closest('.reel-mark')) return;
    const r = bar.getBoundingClientRect();
    const go = (ev) => seekTo(((ev.clientX - r.left) / r.width) * (video.duration || 53));
    go(e);
    bar.setPointerCapture(e.pointerId);
    bar.addEventListener('pointermove', go);
    bar.addEventListener('pointerup', () => bar.removeEventListener('pointermove', go), { once: true });
  });
  dialog.addEventListener('keydown', (e) => {
    const t = video.currentTime;
    if (e.key === ' ' || e.key === 'k') { e.preventDefault(); video.paused ? video.play() : video.pause(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); seekTo(t + 5); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); seekTo(t - 5); }
    else if (e.key === 'PageDown' || e.key === 'n') { e.preventDefault(); seekTo(STARTS[Math.min(8, chapterAt(t) + 1)]); }
    else if (e.key === 'PageUp' || e.key === 'p') { e.preventDefault(); seekTo(STARTS[Math.max(0, chapterAt(t) - (t - STARTS[chapterAt(t)] < 1.5 ? 1 : 0))]); }
    else if (e.key === 'm') { video.muted = !video.muted; }
  });
  addEventListener('langchange', () => { label(); lastChapter = -1; update(); });
  label();
}
