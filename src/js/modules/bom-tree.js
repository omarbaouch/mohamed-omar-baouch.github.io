// Structure du portfolio, rangée comme une nomenclature (section #structure).
// Le HTML porte tout le contenu et les liens ; ce module ne fait que :
//  · déclencher le tracé du tronc et des coudes à l'entrée à l'écran ;
//  · suivre la ligne active (survol, focus clavier ; au doigt : la ligne au
//    centre de l'écran) et y faire couler la chaîne orange depuis la racine ;
//  · sur grand écran, placer la vue de détail et son trait de rappel en face.
// Aucun rendu en boucle : on ne mesure qu'au changement de ligne ou de taille.
export function initBomTree() {
  const tree = document.querySelector('.bt-tree');
  if (!tree) return;
  const rows = [...tree.querySelectorAll('.bt-row')];
  const list = tree.querySelector('.bt-list');
  const node = tree.querySelector('.bt-node');
  const wide = matchMedia('(min-width: 64rem)');
  const hover = matchMedia('(hover: hover) and (pointer: fine)');
  let active = rows.find((r) => r.classList.contains('is-active')) || rows[0];

  const centerY = (el, top) => {
    const b = el.getBoundingClientRect();
    return b.top + b.height / 2 - top;
  };

  const place = () => {
    const tb = tree.getBoundingClientRect();
    const rootY = centerY(node, tb.top);
    const ys = rows.map((r) => centerY(r.querySelector('.bt-link'), tb.top));
    const y = ys[rows.indexOf(active)];
    const set = (k, v) => tree.style.setProperty(k, `${Math.round(v)}px`);
    set('--root-y', rootY);
    // le tronc s'arrête là où le dernier coude commence à tourner
    set('--trunk-h', ys[ys.length - 1] - rootY - 14);
    set('--chain', y - rootY - 14);
    if (wide.matches) {
      const kids = active.querySelector('.bt-kids');
      const kb = kids.getBoundingClientRect();
      // la vue de détail se cale en face de la ligne, sans sortir de l'arbre
      const kt = Math.max(0, Math.min(y - 34, tb.height - kb.height));
      set('--kt', kt);
      const lx = list.getBoundingClientRect().right - tb.left + 12;
      set('--ly', y);
      set('--lx', lx);
      set('--lw', Math.max(0, tb.width - kb.width - lx - 14));
    }
    tree.classList.add('is-measured');
  };

  const activate = (row) => {
    if (!row || row === active) return;
    active = row;
    rows.forEach((r) => r.classList.toggle('is-active', r === row));
    place();
  };

  // souris : la ligne survolée ; clavier : la ligne qui a le focus
  rows.forEach((row) => {
    row.addEventListener('pointerenter', () => hover.matches && activate(row));
    row.addEventListener('focusin', () => activate(row));
  });
  tree.addEventListener('pointerenter', () => hover.matches && tree.classList.add('is-engaged'));
  tree.addEventListener('pointerleave', () => tree.classList.remove('is-engaged'));

  // au doigt : la chaîne suit la ligne qui passe au centre de l'écran
  const middle = new IntersectionObserver(
    (entries) => {
      if (hover.matches) return;
      for (const e of entries) if (e.isIntersecting) activate(e.target);
    },
    { rootMargin: '-45% 0px -45% 0px' }
  );
  rows.forEach((r) => middle.observe(r));

  // entrée à l'écran : tronc, coudes et titres se tracent une fois
  tree.classList.add('js-ready');
  const enter = new IntersectionObserver(
    ([e]) => {
      if (!e.isIntersecting) return;
      tree.classList.add('is-in');
      enter.disconnect();
    },
    { threshold: 0.15 }
  );
  enter.observe(tree);

  let raf = 0;
  const schedule = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(place);
  };
  new ResizeObserver(schedule).observe(tree);
  addEventListener('langchange', schedule);
  document.fonts?.ready.then(schedule);
  place();
}
