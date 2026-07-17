// Outils CAO du site : « M » bascule le mode mesure (cotation de la page),
// Échap le referme. Le module de mesure n'est chargé qu'à la 1ʳᵉ activation.
let loading = null;

function withMeasure(fn) {
  loading ||= import('../modules/measure.js');
  loading.then(fn);
}

export function initTools() {
  window.addEventListener('keydown', (e) => {
    const t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
    if (e.key.toLowerCase() === 'm' && !e.metaKey && !e.ctrlKey && !e.altKey) {
      withMeasure((m) => m.toggleMeasure());
    } else if (e.key === 'Escape' && loading) {
      withMeasure((m) => {
        if (m.isMeasuring()) m.toggleMeasure();
      });
    }
  });
}

export function openMeasure() {
  withMeasure((m) => {
    if (!m.isMeasuring()) m.toggleMeasure();
  });
}
