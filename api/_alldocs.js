// api/_alldocs.js
// Liste unifiée et ORDONNÉE de tous les documents indexables (base curée +
// corpus documentaire). L'ordre et les ids doivent rester stables : les
// vecteurs d'embedding précalculés (api/_data/vectors.js) y sont alignés
// par id. Le préfixe « _ » évite que Vercel en fasse une route HTTP.

import { KB_DOCS } from './_kb.js';
import { DOCS as CORPUS_SW } from './_data/corpus_sw.js';
import { DOCS as CORPUS_VISIATIV } from './_data/corpus_visiativ.js';

export const ALL_DOCS = [
    ...KB_DOCS.map(d => ({ ...d, source: 'kb' })),
    ...CORPUS_SW.map(d => ({ ...d, source: 'sw' })),
    ...CORPUS_VISIATIV.map(d => ({ ...d, source: 'visiativ' }))
];
