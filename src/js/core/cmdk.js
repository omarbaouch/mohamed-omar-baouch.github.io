// Déclencheur de la palette « recherche PDM » : Ctrl/Cmd+K ou le bouton de
// la nav. Le module palette (DOM + index) n'est chargé qu'à la 1ʳᵉ demande.
let loading = null;

function open() {
  loading ||= import('../modules/palette.js');
  loading.then((m) => m.openPalette());
}

export function initCmdk() {
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      open();
    }
  });
  document.querySelectorAll('[data-cmdk]').forEach((btn) => {
    btn.addEventListener('click', open);
  });
}
