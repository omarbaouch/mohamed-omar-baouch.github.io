// À propos : les repères de plan se tracent quand le poste de travail arrive
// à l'écran. Sans JS ou en mouvement réduit, tout est affiché d'emblée : la
// classe .is-armed (qui cache avant l'entrée) n'est posée que si on anime.
export function initAboutScene() {
  const scene = document.querySelector('[data-about-scene]');
  if (!scene || !('IntersectionObserver' in window)) return;
  if (!matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
  scene.classList.add('is-armed');
  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      scene.classList.add('is-in');
      io.disconnect();
    },
    { threshold: 0.35 }
  );
  io.observe(scene);
}
