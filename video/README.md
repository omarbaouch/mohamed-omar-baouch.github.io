# Film de présentation — baouch.fr

Vidéo de 53 s (1920×1080, 30 i/s, son stéréo) : `public/video/presentation-baouch.mp4`,
affiche `public/video/presentation-baouch.jpg`.

Le film est une page HTML (`film.html`) pilotée image par image : `window.__seek(t)` pose
l'état exact de chaque élément à l'instant t, puis `render.mjs` capture chaque image avec
Playwright et encode avec ffmpeg. La pièce 3D est le vrai modèle du site
(`public/motion/precision.glb`), la bande-son est synthétisée par `soundtrack.py` (120 BPM,
chaque coupe tombe sur un temps — aucun échantillon externe).

| Vue | Temps | Contenu |
| --- | --- | --- |
| 01 Ouverture | 0 – 4,5 s | la mise en plan s'ouvre, chargement de ASM-BAOUCH.SLDASM |
| 02 Titre | 4,5 – 11 s | le hero ligne par ligne, pièce 3D en vue éclatée |
| 03 En chiffres | 11 – 16 s | 80+ / 100+ / 100+ / 20+ cotés, clients par secteur |
| 04 Le site | 16 – 23,5 s | défilement complet, écran partagé clair / sombre |
| 05 Vue éclatée | 23,5 – 31,5 s | les sections du site empilées comme une EBOM |
| 06 Projets | 31,5 – 37,5 s | volets à palettes, photos bichromes, tampons d'état |
| 07 Carnet technique | 37,5 – 42,5 s | le mur des 23 articles |
| 08 Responsive | 42,5 – 46 s | mobile clair et sombre |
| 09 Publication | 46 – 53 s | l'assemblage se referme, baouch.fr — ÉTAT PUBLIÉ |

## Régénérer

```sh
npm ci && npx vite build && npx vite preview --port 4174 &   # le site, pour les captures
node video/capture.mjs http://localhost:4174                 # → video/shots/ (non versionné)
# réduit les pleines pages à 1360 px de large (limite de texture du navigateur)
for t in light dark; do ffmpeg -i video/shots/home-$t-full.png -vf scale=1360:-1 video/shots/home-$t-full-1360.png; done
pip install numpy
npx http-server -p 8090 -s -c-1 . &                          # le film charge public/ et node_modules/
node video/render.mjs                                        # → public/video/presentation-baouch.mp4
```

Prévisualiser en temps réel : `http://localhost:8090/video/film.html?play`
(ou `?t=12.5` pour figer un instant ; `node video/render.mjs --stills 5,12.5` pour des images fixes).

## Film du hero (page d'accueil) — « Du chaos à la source de vérité »

Le hero est un second film, lu **au défilement** : `video/hero/hero-film.html` compose la scène
en Three.js et la rend image par image ; `video/hero/render-hero.mjs` écrit la séquence WebP
dans `public/film/hero/{desk,mob}/` (240 images 1440×810, 120 images 720×1280) avec `meta.json`.
Côté site : `src/js/modules/hero-film.js` (chargement grossier → fin, intro jouée seule, image
pilotée par le défilement, étapes du métier en regard) et `src/styles/components/hero-film.css`.

Scénario : des centaines de fichiers en tourbillon, aux noms que tout bureau d'études connaît
(`piece_finale_V3_OK`, `NE_PAS_TOUCHER`, conflits, doublons) → un balayage orange les renomme
(PRT-0042 · RÉV.B · PUBLIÉ), les doublons fusionnent, tout se range en registre → le registre se
replie en rosace de nomenclature → la nomenclature se condense en nuage de points, en épure,
puis en produit. Fin : « Du chaos à une seule source de vérité », et les chiffres clés.

```sh
npx http-server -p 8090 -s -c-1 . &
node video/hero/render-hero.mjs --variant desk     # ~15 min en rendu logiciel
node video/hero/render-hero.mjs --variant mob
node video/hero/render-hero.mjs --stills 0,0.5,1   # images de contrôle → video/hero/.stills/
```
