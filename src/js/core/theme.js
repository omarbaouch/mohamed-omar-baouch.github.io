// Thème clair (défaut) / sombre — persiste dans localStorage('theme'),
// compatible avec la valeur héritée de l'ancien site.
export function initTheme() {
  const btn = document.getElementById('themeSwitch');
  const root = document.documentElement;

  const apply = (dark) => {
    if (dark) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    // nettoie les classes héritées éventuelles
    root.classList.remove('dark-theme', 'light-theme', 'dark');
    // la barre du navigateur suit le thème (mobile surtout)
    document.getElementById('metaThemeColor')?.setAttribute('content', dark ? '#0e0f11' : '#faf9f6');
  };

  apply(localStorage.getItem('theme') === 'dark');

  btn?.addEventListener('click', () => {
    const dark = root.getAttribute('data-theme') !== 'dark';
    apply(dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  });
}
