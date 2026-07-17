# Dossier de candidature — baouch.fr (RÉV.2026)

## Textes de soumission

### Titre
- **FR** : M.BAOUCH — Le portfolio géré comme un coffre PDM
- **EN** : M.BAOUCH — A portfolio managed like a PDM vault

### Description courte (~300 caractères)
- **FR** : Portfolio d'un consultant SOLIDWORKS PDM/PLM, conçu comme un coffre
  PDM vivant : chaque contenu est un document avec sa référence, sa révision et
  son état. Arbre d'assemblage interactif dessiné au canvas, palette de
  recherche Ctrl+K, 13 articles de fond. Fait main — zéro template.
- **EN** : Portfolio of a SOLIDWORKS PDM/PLM consultant, designed as a living
  PDM vault: every piece of content is a document with its reference, revision
  and state. Interactive assembly tree drawn on canvas, Ctrl+K search palette,
  13 in-depth articles. Handcrafted — zero templates.

### Behind the scenes (pour le champ « description longue »)
- **FR** : Le métier du propriétaire — la gestion de données techniques — est
  devenu le concept du site. La page d'accueil expose la structure du
  portfolio comme une nomenclature d'assemblage dans un viewport SOLIDWORKS :
  l'arbre se construit au scroll, chaque nœud se saisit (physique à ressorts
  écrite à la main), la racine déclenche une vue éclatée, et chaque composant
  navigue vers sa section. La métaphore irrigue tout : états PUBLIÉ / EXTRAIT /
  ARCHIVÉ sur les projets et l'expérience, cartouche de mise en plan en pied
  de page, 404 « référence introuvable », palette Ctrl+K qui interroge le
  coffre, images Open Graph générées comme des cartouches. Stack volontairement
  sobre : Vite, canvas 2D, GSAP + Lenis, CSS moderne — aucune librairie de
  composants, aucun template. Clair/sombre, FR/EN, reduced-motion complet,
  Lighthouse 98/100/100.
- **EN**: The owner's craft — technical data management — became the site's
  concept. The homepage renders the portfolio as an assembly BOM inside a
  SOLIDWORKS-like viewport: the tree assembles on scroll, every node can be
  grabbed (handwritten spring physics), the root triggers an exploded view,
  and each component navigates to its section. The metaphor runs everywhere:
  RELEASED / CHECKED-OUT / ARCHIVED states on projects and experience, a
  drawing title block in the footer, a "reference not found" 404, a Ctrl+K
  palette that queries the vault, Open Graph images generated as title blocks.
  Deliberately lean stack: Vite, 2D canvas, GSAP + Lenis, modern CSS — no
  component library, no template. Light/dark, FR/EN, full reduced-motion,
  Lighthouse 98/100/100.

### Tags suggérés
`portfolio` · `interactive` · `canvas` · `typography` · `light design` ·
`engineering` · `data visualization`

## Checklist de soumission

| Plateforme | Coût | Lien | Note |
|---|---|---|---|
| Awwwards | ~65 $ / soumission | awwwards.com/submit | viser SOTD ; choisir catégorie Portfolio |
| CSS Design Awards | ~40 $ (ou gratuit selon période) | cssdesignawards.com | mêmes textes |
| FWA | payant | thefwa.com/submit | exigeant sur la vidéo |
| Godly | gratuit | godly.website/submit | curation rapide, bon levier de visibilité |
| Minimal Gallery | gratuit | minimal.gallery/submit | correspond à la DA |
| Dark Mode Design | gratuit | darkmodedesign.com | soumettre le thème sombre |

**Timing recommandé** : soumettre partout la même semaine, APRÈS intégration
des captures PDM réelles anonymisées dans les études de cas (slots déjà prêts
dans le HTML, en commentaire). C'est le dernier point qui sépare une Honorable
Mention d'un SOTD : le contenu authentique.

## Ce qui reste à la main du propriétaire

1. 4-5 captures SOLIDWORKS PDM anonymisées (études de cas + à-propos)
2. 2-3 photos réelles cohérentes avec la direction artistique
3. Relecture des chiffres des deux études de cas
4. Création du compte Awwwards + paiement de la soumission

## Matériel dans ce dossier

- `captures/` — visuels de présentation (hero, viewport BOM, palette, blog, 404)
- `video/parcours.webm` — parcours scénarisé ~40 s (loader → hero → arbre :
  assemblage, survol, drag, vue éclatée → palette Ctrl+K → blog)

Scores mesurés au moment du dossier : Lighthouse mobile Perf 98 · A11y 100 ·
SEO 100 · axe-core 0 violation · LCP 2,2 s · CLS 0,004.
