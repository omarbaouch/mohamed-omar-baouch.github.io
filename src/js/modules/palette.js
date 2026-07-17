// Palette « recherche PDM » (Ctrl+K) : tout le site indexé comme un coffre —
// sections, études de cas et articles, chacun avec sa référence. Overlay
// accessible : dialog modal, flèches/entrée, aria-activedescendant, focus
// restitué à la fermeture.

const INDEX = [
  { ref: 'ASM-BAOUCH', fr: 'Structure du portfolio', en: 'Portfolio structure', type: 'ASM', href: '/#structure' },
  { ref: 'DOC-PROFIL', fr: 'À propos', en: 'About', type: 'SECTION', href: '/#about' },
  { ref: 'ASM-01', fr: 'Expérience — journal de check-ins', en: 'Experience — check-in log', type: 'SECTION', href: '/#experience' },
  { ref: 'ASM-02', fr: 'Projets phares', en: 'Featured projects', type: 'SECTION', href: '/#expertise' },
  { ref: 'ASM-03', fr: 'Compétences techniques', en: 'Technical skills', type: 'SECTION', href: '/#skills' },
  { ref: 'DOC-EDU', fr: 'Formation', en: 'Education', type: 'SECTION', href: '/#education' },
  { ref: 'ECO-CONTACT', fr: 'Contact', en: 'Contact', type: 'SECTION', href: '/#contact' },
  { ref: 'ASM-04', fr: 'Blog — articles de fond', en: 'Blog — in-depth articles', type: 'SECTION', href: '/blog/' },
  { ref: 'PRT-ORBITA · RÉV.B', fr: 'Structurer le PDM d’un robot humanoïde', en: 'Structuring the PDM of a humanoid robot', type: 'CASE', href: '/projets/robot-orbita/' },
  { ref: 'MIG-INTL · RÉV.C', fr: 'Migration PDM multi-sites internationale', en: 'International multi-site PDM migration', type: 'CASE', href: '/projets/migration-pdm-internationale/' },
  { ref: 'DOC-01', fr: 'PDM ou PLM : les 5 signaux de bascule', en: 'PDM or PLM: the 5 switch signals', type: 'DOC', href: '/blog/pdm-ou-plm-quand-basculer/' },
  { ref: 'DOC-02', fr: 'SOLIDWORKS PDM Standard ou Professional', en: 'SOLIDWORKS PDM Standard vs Professional', type: 'DOC', href: '/blog/solidworks-pdm-standard-vs-professional/' },
  { ref: 'DOC-03', fr: 'SOLIDWORKS PDM lent : les 7 vraies causes', en: 'Slow SOLIDWORKS PDM: the 7 real causes', type: 'DOC', href: '/blog/solidworks-pdm-lent-7-causes/' },
  { ref: 'DOC-04', fr: 'La révision fantôme : maîtriser les ECO/ECR', en: 'The phantom revision: mastering ECO/ECR', type: 'DOC', href: '/blog/eco-ecr-gestion-modifications/' },
  { ref: 'DOC-05', fr: 'Nomenclature BOM, eBOM, mBOM et ERP', en: 'BOM, eBOM, mBOM and ERP backbone', type: 'DOC', href: '/blog/nomenclature-bom-pdm-plm-erp/' },
  { ref: 'DOC-06', fr: 'Migration de données vers SOLIDWORKS PDM', en: 'Migrating data to SOLIDWORKS PDM', type: 'DOC', href: '/blog/migration-donnees-solidworks-pdm/' },
  { ref: 'DOC-07', fr: 'PDM dans le cloud : les angles morts', en: 'Cloud PDM: the blind spots', type: 'DOC', href: '/blog/migration-cloud-pdm-3dexperience/' },
  { ref: 'DOC-08', fr: 'IA et SOLIDWORKS PDM en 2026', en: 'AI and SOLIDWORKS PDM in 2026', type: 'DOC', href: '/blog/ia-solidworks-pdm-bureau-etudes/' },
  { ref: 'DOC-09', fr: 'Combien coûte un projet SOLIDWORKS PDM ?', en: 'What does a SOLIDWORKS PDM project cost?', type: 'DOC', href: '/blog/prix-cout-projet-solidworks-pdm/' },
  { ref: 'DOC-10', fr: 'SOLIDWORKS gratuit : les 7 solutions légales', en: 'Free SOLIDWORKS: the 7 legal options', type: 'DOC', href: '/blog/solidworks-gratuit-prix-guide/' },
  { ref: 'DOC-11', fr: 'Codification & propriétés SOLIDWORKS', en: 'SOLIDWORKS codification & properties', type: 'DOC', href: '/blog/codification-proprietes-solidworks/' },
  { ref: 'DOC-12', fr: 'Configuration matérielle SOLIDWORKS', en: 'SOLIDWORKS hardware configuration', type: 'DOC', href: '/blog/configuration-materielle-solidworks/' },
  { ref: 'DOC-13', fr: 'Résolutions de problématiques PLM', en: 'Solving PLM issues', type: 'DOC', href: '/blog/resolutions-problematiques-plm/' },
];

const T = {
  fr: { placeholder: 'Référence ou titre…', label: 'RECHERCHE — COFFRE ASM-BAOUCH', empty: 'Aucun document trouvé dans le coffre', hint: '↑↓ naviguer — ↵ ouvrir — échap fermer', types: { ASM: 'ASSEMBLAGE', SECTION: 'SECTION', CASE: 'ÉTUDE DE CAS', DOC: 'ARTICLE' } },
  en: { placeholder: 'Reference or title…', label: 'SEARCH — ASM-BAOUCH VAULT', empty: 'No document found in the vault', hint: '↑↓ navigate — ↵ open — esc close', types: { ASM: 'ASSEMBLY', SECTION: 'SECTION', CASE: 'CASE STUDY', DOC: 'ARTICLE' } },
};

let root = null;
let input = null;
let list = null;
let hintEl = null;
let labelEl = null;
let results = [];
let active = 0;
let lastFocus = null;

const norm = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

function lang() {
  return document.documentElement.lang === 'en' ? 'en' : 'fr';
}

function build() {
  root = document.createElement('div');
  root.className = 'cmdk';
  root.innerHTML = `
    <div class="cmdk-backdrop" data-close></div>
    <div class="cmdk-panel" role="dialog" aria-modal="true" aria-label="Recherche">
      <div class="cmdk-head"><span class="cmdk-label"></span><span class="cmdk-esc">ESC</span></div>
      <div class="cmdk-inputrow">
        <span class="cmdk-prompt" aria-hidden="true">&gt;</span>
        <input class="cmdk-input" type="text" spellcheck="false" autocomplete="off"
               role="combobox" aria-expanded="true" aria-controls="cmdkList" aria-activedescendant="">
      </div>
      <ul class="cmdk-list" id="cmdkList" role="listbox"></ul>
      <div class="cmdk-foot"></div>
    </div>`;
  document.body.appendChild(root);
  input = root.querySelector('.cmdk-input');
  list = root.querySelector('.cmdk-list');
  hintEl = root.querySelector('.cmdk-foot');
  labelEl = root.querySelector('.cmdk-label');

  root.addEventListener('click', (e) => {
    if (e.target.closest('[data-close]')) close();
    const row = e.target.closest('.cmdk-item');
    if (row) go(results[Number(row.dataset.i)]);
  });
  root.addEventListener('pointermove', (e) => {
    const row = e.target.closest('.cmdk-item');
    if (row && Number(row.dataset.i) !== active) {
      active = Number(row.dataset.i);
      paintActive();
    }
  });
  input.addEventListener('input', () => filter(input.value));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      active = Math.min(active + 1, results.length - 1);
      paintActive();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      active = Math.max(active - 1, 0);
      paintActive();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[active]) go(results[active]);
    } else if (e.key === 'Escape') {
      close();
    } else if (e.key === 'Tab') {
      e.preventDefault(); // focus verrouillé sur le champ
    }
  });
}

function filter(q) {
  const L = lang();
  const nq = norm(q.trim());
  results = !nq
    ? INDEX.slice()
    : INDEX.map((item) => {
        const hay = norm(`${item.ref} ${item[L]}`);
        let score = -1;
        if (hay.startsWith(nq)) score = 0;
        else if (hay.split(/[\s·]+/).some((w) => w.startsWith(nq))) score = 1;
        else if (hay.includes(nq)) score = 2;
        return { item, score };
      })
        .filter((r) => r.score >= 0)
        .sort((a, b) => a.score - b.score)
        .map((r) => r.item);
  active = 0;
  paint();
}

function paint() {
  const L = lang();
  list.innerHTML = results.length
    ? results
        .map(
          (item, i) => `
      <li class="cmdk-item" id="cmdk-opt-${i}" data-i="${i}" role="option" aria-selected="${i === active}">
        <span class="cmdk-ref">${item.ref}</span>
        <span class="cmdk-title">${item[L]}</span>
        <span class="cmdk-type">${T[L].types[item.type]}</span>
      </li>`
        )
        .join('')
    : `<li class="cmdk-empty">${T[L].empty}</li>`;
  paintActive();
}

function paintActive() {
  list.querySelectorAll('.cmdk-item').forEach((el, i) => {
    el.setAttribute('aria-selected', String(i === active));
  });
  input.setAttribute('aria-activedescendant', results.length ? `cmdk-opt-${active}` : '');
  list.querySelector(`#cmdk-opt-${active}`)?.scrollIntoView({ block: 'nearest' });
}

function go(item) {
  if (!item) return;
  close();
  if (item.href.startsWith('/#') && location.pathname === '/') {
    const target = document.querySelector(item.href.slice(1));
    if (target) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
      return;
    }
  }
  window.location.href = item.href;
}

function close() {
  if (!root) return;
  root.classList.remove('is-open');
  document.documentElement.classList.remove('cmdk-lock');
  lastFocus?.focus?.();
}

export function openPalette() {
  if (!root) build();
  const L = lang();
  labelEl.textContent = T[L].label;
  hintEl.textContent = T[L].hint;
  input.placeholder = T[L].placeholder;
  lastFocus = document.activeElement;
  root.classList.add('is-open');
  document.documentElement.classList.add('cmdk-lock');
  input.value = '';
  filter('');
  input.focus();
}
