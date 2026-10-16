// api/_alldocs.js
// Liste unifiée et ORDONNÉE des documents indexables : la base curée seule
// (les extraits de documentation d'éditeurs ont été retirés). Les vecteurs
// d'embedding précalculés (api/_data/vectors.js) y sont alignés par id.
// Le préfixe « _ » évite que Vercel en fasse une route HTTP.

import { KB_DOCS } from './_kb.js';

export const ALL_DOCS = KB_DOCS.map(d => ({ ...d, source: 'kb' }));
