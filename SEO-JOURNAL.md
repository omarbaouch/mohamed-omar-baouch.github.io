# Journal SEO — www.baouch.fr

Une entrée par passage, la plus récente en haut. Données : branche `seo-data` (gsc-report.md).

## CONSIGNE DU PROPRIÉTAIRE (02/10/2026) — priorité : 1 000 clics Google par jour

L'indexation est quasi terminée (33 / 34). **La priorité de chaque passage devient la croissance des clics** ; l'indexation reste un contrôle (toute page nouvelle doit être indexée), plus l'objectif principal.

**Ordre de grandeur** : 0,4 clic/jour aujourd'hui pour ~40 impressions/jour. 1 000 clics/jour en positions 1–3 (CTR 3 à 5 %) demandent ~25 000 à 30 000 impressions/jour : la niche PDM/PLM n'y suffira pas. Leviers, par ordre d'effet attendu :
1. **Mémos / outils à fort volume** pour bureaux d'études, étudiants et techniciens (indexés en 2–3 jours, cf. 28/09 → 01/10) : un par passage, bilingue, avec calculateur quand c'est utile, valeurs normalisées vérifiées. Pistes : symboles de soudure (ISO 2553), conversions pouce/mm et unités, aciers (S235, S355, 42CrMo4 : caractéristiques), dureté (HRC/HB/HV), clavettes (DIN 6885), circlips, roulements (désignations), engrenages (module), ressorts, filetages gaz G/BSP et NPT, cotation fonctionnelle, SOLIDWORKS étudiant / raccourcis / erreurs, coefficient de dilatation, frottement.
2. **Requêtes déjà en positions 5–20** (rapport GSC) : renforcer la page qui les porte.
3. **Taux de clic** des pages déjà vues (titres, descriptions) — sans retoucher une page en test.
4. **Maillage** : chaque nouveau mémo relié depuis 2 mémos voisins et l'index du blog.
5. Piste structurelle à proposer au propriétaire avant d'engager : des URL anglaises distinctes (/en/…) pour viser le marché anglophone, beaucoup plus large (aujourd'hui le contenu anglais est dans les pages françaises et n'est pas indexé).

## CONSIGNES TECHNIQUES DU PROPRIÉTAIRE (03/10/2026) — s'appliquent à chaque passage, en complément des instructions de la tâche

Le site est désormais bilingue et indexable en anglais, et chaque article a une couverture dessinée. Le marché anglophone est le principal levier de volume : vise aussi les requêtes anglaises (« bolt torque chart », « tap drill chart », « hardness conversion chart »…).

**Toute nouvelle page (action a)** doit, en plus du modèle habituel :
1. être **entièrement bilingue** (spans `data-lang="fr"` / `data-lang="en"` sur tout le texte, anglais complet et naturel) — modèle : `src/blog/symboles-soudure-iso-2553/index.html` ;
2. avoir son entrée dans **`src/i18n/pages-en.json`** (title ≤ 65 caractères, description ≤ 160, écrits pour la requête anglaise visée) : c'est ce qui crée sa version `/en/…` au build ;
3. avoir sa **planche de couverture** dans `scripts/covers/plates.mjs` (même système que les autres : cadre, cartouche, cote clé, valeurs exactes reprises de l'article, libellés via `t(fr, en)` et `num()`) et ses deux textes alternatifs dans `src/i18n/covers.json`, puis `node scripts/covers/render.mjs <slug>` et `node scripts/covers/apply.mjs` ; regarder le rendu WebP 800 px avant de le garder. Plus de photos de banque d'images ;
4. mettre dans `src/i18n/strings-en.json` la traduction des libellés sans span bilingue (étiquettes, options de calculateur, `alt`/`aria-label`, textes de schémas SVG).

La carte se pose simplement dans la grille de `src/blog/index.html` (entre `grille:debut` et `grille:fin`) : compteur, tri et « À la une » sont calculés au build (`scripts/blog-hub.mjs`). Commiter ce que le prebuild régénère : `git status` doit être propre après `npm run build`.

**Nouvelle action (e), à intercaler après les actions a à d** : compléter l'anglais d'un article sans version `/en/` — dans l'ordre : `nomenclature-bom-pdm-plm-erp` (la page qui fait le plus d'impressions), puis `configuration-materielle-solidworks` (les deux autres articles de la liste ont été retirés le 16/10 pour conformité). Ajouter les spans anglais manquants sur tout le texte, puis l'entrée `pages-en.json`. Une page n'entre dans `pages-en.json` que si son anglais est complet.

**Pour une URL `/en/` peu cliquée (action c)**, réécrire son entrée dans `pages-en.json`, pas la page française.

**Vérification** : en plus de `npm run build` et `npm run verify:seo`, **`npm run verify:en`** doit afficher 0 erreur et 0 texte à vérifier. Contrôler aussi la version `/en/` de la page dans Chromium (1280 px et 390 px : pas d'erreur JS, pas de défilement horizontal, aucun texte français visible).

**Suivi** : compter à part les URL `/en/` (indexation, impressions, requêtes anglaises). Dans le résumé, donner les URL à soumettre en version française ET anglaise. Si Search Console répond « Petit problème… Une erreur s'est produite » à une demande d'indexation, c'est une limite passagère de Google : réessayer plus tard ; le sitemap suffit à la découverte.

## CONSIGNE DU PROPRIÉTAIRE (16/10/2026) — conformité au contrat de travail (prioritaire sur tout le reste)

Le propriétaire est salarié et son contrat l'exige : le site doit rester un **site personnel, sans aucune activité professionnelle ni information de l'employeur**. Ces règles priment sur l'objectif de clics.
- **Aucune offre de service** :
  - pas de « Parler d'un projet », « Me contacter » en appel commercial, audit, devis, chiffrage, accompagnement ou disponibilité pour des missions ;
  - pas de JSON-LD de type Service ou Offer ;
  - le contact sert seulement aux questions et remarques sur les articles.
- **Aucune monétisation** (publicité, produit payant, affiliation, dons) sans accord écrit de l'employeur, que le propriétaire seul peut obtenir.
- **Aucune information sur l'employeur, ses clients ou ses projets** :
  - pas de nom de client, même ancien, même anonymisé de façon reconnaissable ;
  - pas de nombre de clients, de missions ou de projets (« 80+ clients », « sur 80 audits ») ;
  - pas de statistique tirée de missions, pas d'étude de cas de mission ;
  - pas de méthode interne, de tarif ou de pratique commerciale (remises, marges, prix « constatés ») ;
  - pas de capture ni de contenu repris d'un document de l'employeur.
- **Aucune documentation d'éditeur recopiée** (aide en ligne, guides), ni sur le site ni dans le dépôt, qui est public.
- **Ce qui reste permis** :
  - le CV factuel (poste, dates, compétences) ;
  - les notions techniques générales ;
  - les valeurs normalisées vérifiées ;
  - les prix publics officiels, avec leur source et leur date.
- **Mention fixe** : le pied de page de toutes les pages porte « Site personnel… aucune prestation n'est proposée sur ce site ». Ne pas la retirer.
- **Écriture** : à la première personne, on parle de ce qu'on recommande ou de ce qu'on observe en général, jamais de « mes clients » ni de « en mission ».

## CONSIGNE DU PROPRIÉTAIRE (16/10/2026) — des dessins dans les articles

« Rajoute des dessins dans les articles de blog pour que ce soit plus parlant », en commençant par le dernier article.

**À chaque passage, en plus de l'action du jour**, ajouter des schémas explicatifs à UN article existant, en suivant la liste ci-dessous, du plus récent au plus ancien.
- Ne pas toucher un article dont le titre ou la description est en test : passer au suivant et y revenir après la date de fin. Ne pas toucher non plus l'article qui reçoit l'action du jour.
- Un article qui reçoit des schémas ne change pas de titre pendant 14 jours : inscrire la date de fin dans les pages en test.

**Ce qu'est un bon schéma** :
- il explique ce que le texte décrit : cotes d'une pièce, coupe d'un montage, principe d'un calcul, flux d'un processus PDM/PLM. Jamais décoratif ;
- ses valeurs et ses lettres sont celles de l'article (mêmes symboles, mêmes exemples) ;
- 1 à 3 schémas par article, placés à côté du passage qu'ils éclairent.

**Méthode** (modèle : les trois figures de `src/blog/vis-chc-iso-4762-dimensions/index.html`) :
- SVG en ligne dans une `figure.article-figure`, avec une `figcaption` bilingue (spans data-lang) et un `aria-label` ;
- traits en `currentColor`, pour les thèmes clair et sombre ;
- cotes en accent : `style="color:var(--accent,#2f6e9b)"`, avec repli pour la fiche PDF ;
- masque de fond : `fill:var(--bg-0,#fff)` ;
- hachures : `pattern` aux identifiants uniques dans la page ;
- libellés courts, de 15 px au moins dans un viewBox d'environ 640 de large, pour rester lisibles à 390 px ;
- traduction : chaque `<text>` français va dans `text` de `src/i18n/strings-en.json` et chaque `aria-label` dans `attr`. Vérifier dans `dist/en/…` qu'aucun libellé français ne reste : verify:en ne repère que les accents ;
- si l'article a une fiche PDF : `figures: true` dans son entrée FICHES, puis régénérer la fiche et regarder l'aperçu ;
- contrôle Chromium à 1280 et 390 px, en FR, en /en/ et en thème sombre. Faire défiler jusqu'à la figure et attendre environ 1,5 s avant la capture : les sections apparaissent en fondu ;
- noter l'avancement dans le journal.

**Ordre** (du plus récent au plus ancien) ; ✓ = fait :
- ✓ vis-chc-iso-4762-dimensions (16/10) — soudure ISO 2553 a déjà ses schémas ;
- ✓ moment-quadratique-inertie-section-calcul (17/10) ;
- epaisseur-tole-jauge-gauge-tableau ;
- conversion-pouce-mm-tableau ;
- engrenage-module-calcul-diametres (titre en test jusqu'au 23/10) ;
- filetage-gaz-g-bsp-npt-tableau, clavettes-paralleles-din-6885-dimensions, conversion-durete-hrc-hv-hb, aciers-s235-s275-s355-caracteristiques (titres en test jusqu'au 23/10) ;
- tolerances-geometriques-symboles-iso-1101 ;
- tolerances-generales-iso-2768 ;
- rugosite-ra-tableau-classes-procedes ;
- modele-nomenclature-excel-gratuit ;
- masse-volumique-materiaux-calcul-masse (titre en test jusqu'au 23/10) ;
- couple-serrage-vis-tableau ;
- ajustements-iso-286-tableau-h7-g6 ;
- tableau-filetage-metrique-percage-taraudage ;
- logiciel-gestion-nomenclatures ;
- integration-bom-erp ;
- glossaire-pdm-plm ;
- ebom-vs-mbom ;
- solidworks-pdm-guide-complet ;
- plm-guide-complet ;
- erreurs-solidworks-frequentes ;
- raccourcis-clavier-solidworks (/en/ en test jusqu'au 27/10) ;
- formats-echange-cao-step-iges-parasolid ;
- choisir-logiciel-cao-solidworks-inventor-fusion-catia ;
- solidworks-gratuit-prix-guide (/en/ en test jusqu'au 27/10) ;
- ia-solidworks-pdm-bureau-etudes ;
- solidworks-pdm-standard-vs-professional ;
- pdm-ou-plm-quand-basculer ;
- eco-ecr-gestion-modifications ;
- solidworks-pdm-lent-7-causes ;
- codification-proprietes-solidworks ;
- migration-cloud-pdm-3dexperience ;
- nomenclature-bom-pdm-plm-erp ;
- configuration-materielle-solidworks ;

**Nouvelles pages (action a)** : au moins 2 schémas de ce type dès la publication.

## 2026-10-17 — nouveau mémo bilingue : chaîne de cotes (pire des cas, quadratique RSS, calculateur, fiche PDF) + schémas du moment quadratique

**Search Console** : rapport du 17/10, couvrant le 15/09 → 13/10.
- **7,8 clics/jour en moyenne sur 28 jours** (6,9 au passage précédent).
- 219 clics, 19 809 impressions (+17 %), position moyenne 11,2.
- Le 13/10 : 28 clics et 2 947 impressions, record d'impressions.
- **Pages /en/ en tête** :
  - soudure : 37 clics, 1 079 impressions, position 4,2 ;
  - ISO 1101 : 13 clics ;
  - couple de serrage : 12 clics, position 4,3 ;
  - ISO 2768 : 11 clics, 930 impressions, position 4,5, 1,2 % de clics.
- **Côté FR** : couple de serrage 13 clics (787 impressions, position 9,3), SOLIDWORKS gratuit 11, raccourcis 8, ISO 1101 8.
- **Moment quadratique FR**, 5 jours après publication : 3 clics, 120 impressions, position 7,8.
- **Indexation 82/86** : le rapport liste encore les pages retirées le 16/10. Vis CHC FR et /en/ sont « inconnues », car publiées la veille.
- /en/ logiciel-gestion-nomenclatures : 1 697 impressions en position 28,7, sans clic.

**Mots-clés** : relance ponctuelle sur « tolerance stack up » (rapport régénéré, mise à jour du 17/10).
- Bing a refusé la suite après 264 mots-clés (« ThrottleUser ») : pas de nouveau volume Bing.
- Suggestions Google, rang 1 : « tolerance stack up calculator », « … excel », « … pdf », « … chart ».
- Également : « tolerance stack up calculator excel free download », « rss tolerance stack up calculator ».
- France : « chaine de cote statistique », « … quadratique », « … fonctionnelle », « … exercice corrigé ».

**Choix de l'action (a)** :
- aucune page du site ne traitait le sujet ;
- ce ne sont que des mathématiques, sans valeur normalisée douteuse ;
- le mémo complète les pages de tolérances, qui sont les plus cliquées en /en/ (ISO 2768, ISO 1101, ajustements).

**Action (a)** : `/blog/chaine-de-cotes-tolerance-stack-up/` (MEM-18) et `/en/blog/chaine-de-cotes-tolerance-stack-up/`.
- **Contenu** :
  - construire la boucle en 5 étapes (condition, parcours, une cote par pièce, signe, calcul) ;
  - tableau des formules : J nominal, J mini et maxi au pire des cas, T = Σ Tᵢ, T = √Σ Tᵢ² ;
  - conversion des écarts dissymétriques ;
  - exemple chiffré contrôlé par le générateur :
    - a = 50 ±0,1 (+), b = 20 ±0,05 (−), c = 29,5 ±0,05 (−) ;
    - J = 0,5 ; pire des cas 0,3 … 0,7 ; RSS 0,378 … 0,622 ;
    - la cote a pèse 67 % de la variance ;
  - comparaison pour n = 2 à 10 cotes ;
  - quand choisir chaque méthode, Monte-Carlo ;
  - 5 questions FAQ.
- **Calculateur** :
  - lignes ajoutables (signe, nominale, écarts) ;
  - J moyen, intervalles au pire des cas et RSS, plus forte contribution ;
  - verdict sur la condition (J mini, J maxi) ;
  - contrôlé en FR et EN.
- **2 schémas SVG** :
  - la chaîne a − b − c = J (boîtier, pièces, jeu exagéré pour la lisibilité, ce que dit la légende) ;
  - la répartition de J (cloche, intervalles pire des cas et RSS à 99,73 %).
- **Fiche PDF A4 FR/EN** : chaine-de-cotes-formules-exemple.pdf et tolerance-stack-up-formulas-example.pdf, avec le schéma de répartition et les sections renumérotées. Relue.
- **Autour de la page** :
  - planche « boîtier, b, c, J » ;
  - image de partage `chaine-de-cotes` ;
  - carte du blog ;
  - liens depuis ISO 1101 et ajustements ISO 286.
  - ISO 2768 n'a volontairement pas été touchée : son titre /en/ reste le prochain candidat de l'action (d).
- **Conformité** : contenu général de mécanique, sans client, mission ni information de l'employeur ; aucun bouton de contact.

**3 bis, schémas** : moment-quadratique-inertie-section-calcul (coché dans la liste).
- **Flexion** : section b × h, axe neutre, contrainte linéaire de compression et de traction jusqu'à h/2, σmax = M/W. Placé sous le tableau des formules.
- **Théorème de Huygens** : aire A, axe central x, axe Δ à la distance d. Placé sous la section 4.
- `figures: true` dans la fiche PDF du formulaire, régénérée et relue.

**Vérifications** :
- build OK ;
- verify:seo (page nouvelle seule, baseline 41 pages) ; verify:en 0/0 (39 pages anglaises) ;
- grep de conformité vide ;
- Chromium 1280/390 sur 8 pages FR/EN : sans erreur JS ni défilement horizontal ; schémas regardés en clair et en sombre ;
- PDF en 200, version /en/ vers les fichiers anglais.
- Deux corrections après capture : formules restées en français sur /en/ (« cotes ») et libellés qui se chevauchaient (RSS sur la cloche, « axe neutre » sur h/2).

**Clics attendus** : aucun chiffre fiable avant indexation. À vérifier au 24/10 : indexation, premières impressions sur « tolerance stack up » et « chaine de cote ».

**Pages en test** :
- jusqu'au 23/10 : aciers, clavettes, dureté, engrenages, filetage gaz, masse volumique (titre ou description) ; couple de serrage, ISO 2768 (contenu) ;
- jusqu'au 24/10 : rugosité ;
- jusqu'au 25/10 : soudure ;
- jusqu'au 26/10 : jauges de tôle ;
- jusqu'au 27/10 : /en/ raccourcis SOLIDWORKS (titre et description) ;
- jusqu'au 30/10 : vis CHC, filetage métrique, pouce ↔ mm, SOLIDWORKS gratuit (/en/ compris) ;
- **jusqu'au 31/10 : chaîne de cotes (nouvelle), moment quadratique (schémas), ISO 1101 et ajustements (lien ajouté)**.

**Prochaines pistes** :
1. Le 23/10 : action (d) sur le titre /en/ d'ISO 2768 (930 impressions, position 4,5, 1,2 % de clics).
2. Action (b) : modèle Excel gratuit de chaîne de cotes, avec ses formules contrôlées (« tolerance stack up excel template » est en suggestion n° 1).
3. Schémas : epaisseur-tole-jauge-gauge-tableau, puis conversion-pouce-mm-tableau.
4. Conformité : le dépôt est toujours public au 17/10. Le propriétaire doit le passer en privé lui-même (Settings → Danger Zone), l'accès de l'agent ne le permet pas.

## 2026-10-16 (3) — mise en conformité du site avec le contrat de travail (demande du propriétaire)

**Demande** : « Il faut que tout le site soit conforme. Enlève tout ce risque. » Le contrat a été lu pour cet audit. Seules les règles sont reprises dans la consigne ci-dessus, rien de personnel ni de son contenu.

**Pages retirées** (404, à faire sortir de l'index Google ; liens, cartes, palette, index du pied de page, images et entrées pages-en/og/covers supprimés) :
- /projets/robot-orbita/ et /projets/migration-pdm-internationale/ : études de cas de missions ;
- /blog/image-administrative-solidworks-installation/ (+ /en/) : captures et astuces tirées d'un guide de l'employeur ;
- /blog/resolutions-problematiques-plm/ : récits de projets chez l'employeur et chez d'anciens employeurs ;
- /blog/prix-cout-projet-solidworks-pdm/ (+ /en/) : coûts de projets tirés du terrain et « devis gratuit » ;
- /blog/migration-donnees-solidworks-pdm/ : méthodologie et statistiques tirées de « 80+ audits » de clients.

**Accueil** :
- les offres de conseil deviennent une description du métier ;
- blocs « clients par secteur » et « projets phares » supprimés, avec leurs images ;
- compteurs de clients et de projets supprimés ;
- noms de clients d'un ancien employeur retirés ;
- mention « site personnel, aucune prestation » ajoutée au contact ;
- le sous-ensemble « Projets » de la structure devient « Mémos techniques ».

**Articles** :
- tous les boutons « Parler d'un projet », « Me contacter » et « Obtenir un chiffrage » retirés (49) ;
- compteurs « 80+ clients » et « 100+ projets » retirés (9 articles + le hub du blog) ;
- trois graphiques bâtis sur des statistiques de clients supprimés (PDM lent, nomenclature) ;
- formulations « mes clients », « en mission » et « en clientèle » réécrites ;
- mentions de l'employeur remplacées par « je travaille dans l'écosystème… ; avis personnel » ;
- SOLIDWORKS gratuit :
  - les ordres de grandeur « constatés » et le « conseil de négociation » (marges des revendeurs) sont remplacés par les prix publics de la boutique Dassault Systèmes, avec source et date ;
  - la licence perpétuelle est donnée « sur devis d'un revendeur agréé ».

**Chatbot** :
- prompt et base réécrits : plus de clients, de méthode, de chiffres, d'offre de projet ni d'information sur l'employeur ; consigne explicite de refuser ces sujets ;
- corpus recopiés de l'aide en ligne de l'employeur et de l'éditeur supprimés (6,5 Mo), vecteurs réduits à la base curée ;
- testé : chargement, recherche et prompt sans mention sensible.

**Dépôt public** :
- ancien script `public/assets/js/script.js` supprimé : il n'était plus chargé mais était en ligne, avec noms de clients et anecdotes ;
- captures et vidéo de `docs/awwwards/` supprimées, ainsi que l'ancien CV de `OLD/`.

**Pied de page** : mention « Site personnel. Les contenus n'engagent que leur auteur et ne représentent pas la position de son employeur ; aucune prestation n'est proposée sur ce site. »

**Pages en test** : le retrait des boutons de pied d'article touche aussi des pages en test de titre. C'est un changement mineur, imposé par la conformité, sans effet attendu sur le taux de clic. Les dates de fin ne bougent pas, sauf pour SOLIDWORKS gratuit, dont la section prix change : pas de titre avant le 30/10.

**Vérifications** :
- build OK ;
- verify:seo : seuls écarts, les pages retirées et deux descriptions débarrassées des « 80 clients/missions » ; baseline 40 pages ;
- verify:en 0/0 (38 pages anglaises) ;
- scan de dist : aucun nom de client, compteur ni appel à projet ; aucun lien interne cassé ;
- Chromium 1280/390 sur 14 pages FR et /en/ : sans erreur JS ni défilement horizontal, mention présente partout.

**Reste à la main du propriétaire** (voir son message) :
- l'historique Git du dépôt public garde les anciennes versions ;
- les CV PDF citent des clients d'un ancien employeur ;
- demande de suppression des URL retirées dans Search Console (outil « Suppressions ») pour aller plus vite.

## 2026-10-16 (2) — schémas dans le mémo vis CHC (demande du propriétaire)

**Demande** : ajouter des dessins dans les articles pour les rendre plus parlants, en commençant par le dernier. La tâche planifiée et la consigne ci-dessus organisent la suite, un article par passage.

**Fait sur `/blog/vis-chc-iso-4762-dimensions/` et sa version /en/** : trois schémas SVG en ligne.
1. **Cotes de la vis** (section 1) : profil d'une M8 × 40 à l'échelle et vue de dessus de la tête, avec dk, k, d, b, L (sous tête), t et s, les lettres du tableau.
2. **Montage dans un lamage** (section 2, au-dessus du calculateur) : coupe d'une M8 × 25, tête noyée, pièce serrée et pièce taraudée hachurées. Cotes e, prise et L = e + prise, lamage « ≥ k » et « Ø > dk », taraudage plus profond que la prise. Le schéma montre ce que le calculateur demande.
3. **Lecture d'une désignation** (section 4) : ISO 4762 – M8 × 30 – 12.9, avec norme, diamètre nominal, longueur L et classe de qualité.

**Autour** :
- libellés et `aria-label` traduits dans strings-en.json ; aucun libellé français dans dist/en ;
- **fiche PDF** : nouvelle option `figures` dans scripts/fiches-pdf.mjs, qui reprend les schémas des sections à tableau. Seule la fiche vis CHC l'active, les autres fiches sont inchangées. La fiche FR/EN contient maintenant le schéma des cotes ; relue visuellement.

**Vérifications** :
- build OK, verify:seo identique (44 pages), verify:en 0/0 ;
- Chromium FR et /en/ à 1280 px (clair et sombre) et 390 px : 3 figures, sans erreur JS ni défilement horizontal ;
- deux corrections après la première capture : libellé anglais coupé à droite et libellés de la désignation qui se chevauchaient.

**Pages en test** : inchangées. La page vis CHC est déjà en test jusqu'au 30/10.

**Prochain article à illustrer** : moment-quadratique-inertie-section-calcul (sections avec axe neutre et fibre extrême v, principe de Huygens).

## 2026-10-16 — nouveau mémo bilingue : vis CHC ISO 4762 (dimensions, pouces, classes, calculateur, fiche PDF)

**Passages manqués** : le passage du 14/10 s'est interrompu avant toute livraison, et le déclenchement du 15/10 est arrivé en retard. Ce passage les remplace : rien n'a été poussé entre le 13/10 (d542dc9) et aujourd'hui.

**Search Console** : rapport du 15/10, couvrant le 14/09 → 12/10.
- **6,9 clics/jour en moyenne sur 28 jours** (4,7 au passage du 13/10).
- 192 clics, 16 905 impressions (+35 %), position moyenne 11,4 (11,7).
- **Record : 41 clics le 12/10**, après un creux de week-end (8 le 10/10, 11 le 11/10).
- **Pages /en/ en tête** :
  - soudure : 33 clics, 908 impressions, position 4,3 ;
  - ISO 1101 : 12 clics, position 5,8 ;
  - couple de serrage : 11 clics, position 4,4 ;
  - ISO 2768 : 9 clics, 805 impressions, position 4,7 ;
  - clavettes : 5 clics, position 4,2.
- **Côté FR** : couple de serrage 11 clics (position 9,7), SOLIDWORKS gratuit 11 clics (1 044 impressions, position 16,0), ISO 1101 8 clics (position 6,7).
- **Indexation 82/84** : pouce ↔ mm FR et moment quadratique FR sont désormais indexées. Restent non indexées resolutions-problematiques-plm et /en/ formats d'échange (« détectée »).
- À noter : /en/ logiciel-gestion-nomenclatures fait 1 467 impressions en position 29,1, sans clic.

**Mots-clés** : relevé du 10/10, donc de moins de 7 jours, pas de nouvelle collecte.
- Bing US, impressions sur 90 jours : « socket head cap screw » 1 334, « socket head screw » 260, « socket head cap screws » 180, « socket head bolt » 117. Bing associe toutes ces requêtes à « socket head cap screw dimensions », première suggestion Google.
- Bing France : « vis chc » 754. Les suggestions Google portent sur les dimensions par taille (« vis chc m8 dimensions »…), le lamage et le PDF.
- Le sujet n'avait pas de page : le filetage métrique ne donne que la clé.

**Pourquoi l'action (a)** :
- Toutes les pages candidates à l'action (d) sont en test jusqu'au 23 à 27/10.
- Les requêtes en positions 4–15 avec au moins 30 impressions (« ebom » 114, « ebom mbom » 64, « mbom » 49) relèvent de nomenclature-bom-pdm-plm-erp. Cette page doit d'abord recevoir son anglais complet (action f).

**Action (a)** : `/blog/vis-chc-iso-4762-dimensions/` (MEM-17) et `/en/blog/vis-chc-iso-4762-dimensions/`.
- **Valeurs vérifiées par recherche web** :
  - ISO 4762:2004 : d, P, dk max, k max, s, t mini et b réf. de M1,6 à M36, relevés sur fasten.it et contrôlés sur globalfastener. Le générateur vérifie k = d, b = 2d + 12 et dk = 1,5·d à partir de M12.
  - Série des longueurs nominales de 2,5 à 300 mm.
  - ASME B18.3-2003, #4 à 1″ : A max, H max, clé J et T mini (aftfasteners). Les conversions en mm sont calculées et arrondies au centième.
  - ISO 898-1 : Rm et Rp0,2 des classes 8.8, 10.9 et 12.9 (trfastenings).
  - DIN 912, retirée et remplacée par l'ISO 4762 (pas gros) et l'ISO 12474 (pas fin).
- **Valeurs écartées** : les diamètres de lamage DIN 974-1. Les tableaux trouvés ne concordent pas (11 ou 11,25 mm pour M6, 14 ou 15 mm pour M8). La page donne seulement la règle : profondeur au moins k, diamètre supérieur à dk de la tête moletée, valeurs normalisées dans la DIN 974-1.
- Aucune règle de longueur en prise non normalisée (1·d, 1,5·d…) : la page renvoie à la VDI 2230.
- **Contenu** :
  - tableau métrique et tableau en pouces avec équivalents en mm ;
  - longueurs normalisées et désignation ;
  - classes de qualité, inox A2-70 et A4-70 ;
  - lamage et perçage, avec renvoi au tableau du filetage pour l'ISO 273 ;
  - assistance pour le perçage SOLIDWORKS ;
  - autres vis six pans creux : DIN 7984, ISO 7380, ISO 10642 ;
  - 5 questions FAQ.
- **Calculateur de longueur et de lamage** (métrique) :
  - longueur nécessaire = épaisseur serrée + rondelle + prise ;
  - longueurs normalisées encadrantes, avec la prise obtenue ;
  - profondeur et diamètre minimaux du lamage, clé et profondeur d'empreinte ;
  - alerte si la partie lisse d'une vis partiellement filetée atteindrait le taraudage.
  - Contrôlé en FR et EN : M8, e = 12, p = 12 → 24 mm → M8 × 25 (prise 13) ou × 20 (prise 8).
- **Fiche PDF A4 FR/EN** : tableau-vis-chc-iso-4762-dimensions.pdf et socket-head-cap-screw-dimensions-chart.pdf, avec les trois tableaux et les sections renumérotées. Relue visuellement.
- **Autour de la page** :
  - planche « vis M8 × 40 de profil et vue de la tête » (dk 13, k 8, clé 6), regardée en FR et EN ;
  - image de partage `vis-chc` ;
  - carte dans la grille du blog ;
  - liens depuis le filetage métrique et pouce ↔ mm ;
  - baseline : 44 pages.
- **Vérifications** :
  - build OK, verify:seo (page nouvelle seule, puis baseline à jour), verify:en 0/0 (40 pages anglaises) ;
  - Chromium 1280/390 sur 8 pages FR et /en/ (nouveau mémo, blog, filetage, pouce ↔ mm) : sans erreur JS ni défilement horizontal ;
  - PDF en 200, version /en/ vers le PDF anglais.

**Clics attendus** : aucun chiffre fiable avant indexation. Les mémos récents prennent position vite en /en/ (clavettes en position 4 en une semaine). En position 5 sur « socket head cap screw dimensions », compter 1 à 3 clics par jour. À vérifier au 23/10 : indexation et premières impressions.

**Pages en test** :
- jusqu'au 23/10 : aciers, clavettes, dureté, engrenages, filetage gaz, masse volumique (titre ou description) ; couple de serrage, ISO 2768, ISO 1101, ajustements (contenu) ;
- jusqu'au 24/10 : rugosité ;
- jusqu'au 25/10 : soudure ;
- jusqu'au 26/10 : moment quadratique, jauges de tôle ;
- jusqu'au 27/10 : /en/ raccourcis SOLIDWORKS et /en/ SOLIDWORKS gratuit (titre et description) ;
- **jusqu'au 30/10 : vis CHC (nouvelle), filetage métrique et pouce ↔ mm (lien ajouté le 16/10)**.

**Prochaines pistes** :
1. Action (f) : anglais complet de nomenclature-bom-pdm-plm-erp. Les requêtes « ebom », « ebom mbom », « mbom », « plm bom » et « bom erp » y arrivent déjà.
2. Le 23/10 : /en/ ISO 2768 (805 impressions, position 4,7, 1,1 % de clics).
3. /en/ logiciel-gestion-nomenclatures : 1 467 impressions en position 29. Regarder ses requêtes au prochain rapport.
4. Mémos d'après Bing : goupilles (« dowel pins » 1 000), joints toriques (« joint torique » 2 099), dilatation thermique.

## 2026-10-13 — action (d) : titres et descriptions de deux pages /en/ très vues mais non cliquées

**Search Console** : rapport du 12/10, couvrant le 11/09 → 09/10.
- 4,7 clics/jour en moyenne sur 28 jours (4,3 au passage précédent). 14 clics le 09/10, après 25, 29 et 23. Jalon 10/jour atteint sur 4 des 5 derniers jours, pas encore en moyenne.
- 12 533 impressions, position moyenne 11,7.
- **Pages /en/ en tête** :
  - soudure : 16 clics, position 4,9 ;
  - couple de serrage : 8 clics ;
  - ISO 1101 : 7 clics ;
  - clavettes : 5 clics, position 4,0 ;
  - ISO 2768 : 5 clics, 548 impressions, position 4,8.
- Indexation 80/84. Pages non indexées :
  - pouce ↔ mm FR et moment quadratique FR (« détectées ») ;
    - /en/ formats d'échange.
  - Jauges FR et /en/ sont indexées.

**Choix de l'action (d)** : quatre pages /en/ sont en position ≤ 10 avec moins de 1 % de clics.

| Page /en/ | Impressions | Position | Clics | Taux de clic |
|---|---:|---:|---:|---:|
| raccourcis SOLIDWORKS | 494 | 7,0 | 0 | 0 % |
| aciers | 320 | 4,0 | 0 | 0 % |
| SOLIDWORKS gratuit | 436 | 7,0 | 4 | 0,9 % |
| erreurs SOLIDWORKS | 296 | 7,9 | 3 | 1,0 % |

/en/ ISO 2768 (548 impressions, 0,9 %) reste bloquée jusqu'au 23/10, à cause du contenu ajouté le 09/10.

Le rapport ne donnait pas les requêtes de ces pages. Je n'ai donc réécrit que les deux entrées dont le défaut est objectif (descriptions de 166 caractères, coupées par Google ; titre de 66 caractères), en m'appuyant sur la demande Bing US sur 90 jours :
- « solidworks for makers » 2 144, « solidworks student » 1 753, « solidworks free » 450, « solidworks cost » 237, « solidworks price » 203 ;
- « solidworks shortcuts » 137, « solidworks keyboard shortcuts » 116.

Aciers et erreurs ne sont pas touchées tant que leurs requêtes réelles ne sont pas connues.

**Action** : deux entrées de pages-en.json, avec title, description, og et twitter générés au build. Aucun changement de contenu ; le headline JSON-LD suit le h1, inchangé.
- `/en/blog/raccourcis-clavier-solidworks/`
  - title : « SOLIDWORKS Keyboard Shortcuts: Full List and Custom Hotkeys » (59 caractères, avant 66) ;
  - description de 139 caractères (avant 166).
- `/en/blog/solidworks-gratuit-prix-guide/`
  - title : « Free SOLIDWORKS: Student, Makers Edition, Trial and Real Prices » (63 caractères) ;
  - description de 150 caractères (avant 166). Elle cite l'édition étudiant, SOLIDWORKS for Makers, l'essai de 30 jours, les visionneuses, le Mac et les prix 2026, tous traités dans la page.
- **Rapport Search Console** (`scripts/gsc-report.mjs`) : le détail « requêtes par page » couvre désormais les 5 pages les plus vues **et** les pages « à réécrire ». Les données sont déjà chargées, sans appel d'API supplémentaire. Les prochaines actions (d) partiront des requêtes réelles de chaque page.
- **Vérifications** :
  - build OK, verify:en 0/0, verify:seo identique (les URL /en/ ne sont pas dans la baseline) ;
  - Chromium 1280/390 sur les deux pages FR et /en/, sans erreur JS ni défilement horizontal.

**Clics attendus** : à 2 à 3 % de clics en position 7, soit 10 à 15 clics par 28 jours pour /en/ raccourcis (0 aujourd'hui) et 9 à 13 pour /en/ SOLIDWORKS gratuit (4 aujourd'hui). À comparer le 27/10, à fenêtre de 28 jours comparable.

**Pages en test** :
- jusqu'au 23/10 : aciers, clavettes, dureté, engrenages, filetage gaz, masse volumique (titre ou description) ; couple de serrage, ISO 2768, ISO 1101, ajustements (contenu) ;
- jusqu'au 24/10 : filetage métrique, rugosité ;
- jusqu'au 25/10 : soudure ;
- jusqu'au 26/10 : pouce ↔ mm, jauges de tôle, moment quadratique ;
- **jusqu'au 27/10 : /en/ raccourcis SOLIDWORKS et /en/ SOLIDWORKS gratuit (titre et description)**.

**Prochaines pistes** :
1. Dès que le rapport donne leurs requêtes : action (d) sur /en/ aciers (position 4,0, 0 clic) et /en/ erreurs SOLIDWORKS.
2. Le 23/10 : /en/ ISO 2768.
3. Mémos d'après Bing : vis CHC, goupilles, joints toriques.

## 2026-10-12 — nouveau mémo bilingue : moment quadratique (formules des sections, calculateur, fiche PDF)

**Search Console** : rapport du 11/10, couvrant le 10/09 → 08/10.
- **4,3 clics/jour en moyenne sur 28 jours** (2,4 au passage précédent). Records : 29 clics le 07/10, 23 le 08/10. Le jalon 10/jour est atteint sur les jours récents, pas encore en moyenne.
- 10 914 impressions (+63 %), position moyenne 11,9 (13,3).
- **Pages /en/ en tête** :
  - soudure : 14 clics, 533 impressions, position 4,9 ;
  - ISO 1101 : 7 clics, position 6,1 ;
  - couple de serrage : 6 clics, position 4,8 ;
  - clavettes : 4 clics, position 4,0, une semaine après publication ;
  - ISO 2768 : 4 clics, 455 impressions, position 4,5, mais 0,9 % de clics.
- **ISO 1101 FR est de nouveau indexée** : 8 clics, 373 impressions, position 6,8.
- Indexation 77/82. Pages non indexées :
  - nouveaux mémos encore inconnus : pouce ↔ mm FR, jauges FR et /en/ ;
    - /en/ formats d'échange (« détectée »).

**Mots-clés (impressions Bing sur 90 jours, relevé du jour)** :
- États-Unis :

  | Requête | Impressions |
  |---|---:|
  | « moment of inertia » | 2 075 |
  | « moment of inertia formula » | 1 040 |
  | « section modulus » | 643 |
  | « polar moment of inertia » | 553 |
  | « moment of inertia calculator » | 457 |
  | « area moment of inertia » | 416 |
  | « moment of inertia of a circle » | 362 |
  | « moment of inertia of a rectangle » | 299 |
  | « second moment of area » | 274 |

  Soit environ 6 100 au total.
- France : « moment d'inertie » 184, « moment quadratique » 129.
- Le sujet n'avait pas de page sur le site. Ce sont des formules mathématiques exactes, sans valeur normalisée à vérifier.

**Pourquoi pas l'action (d) aujourd'hui** :
- La page /en/ ISO 2768 (position 4,5, 0,9 % de clics) est la meilleure candidate, mais elle a reçu du contenu le 09/10 : pas de changement de titre avant le 23/10.
- /en/ SOLIDWORKS gratuit (357 impressions, position 6,9, 0,6 %) et /en/ erreurs SOLIDWORKS (244 impressions, position 7,4, 0,8 %) sont libres. Leur gain potentiel, environ 15 clics par 28 jours à 3 % de clics, est inférieur à celui d'un mémo : les mémos récents prennent vite des positions en /en/ (clavettes en position 4,0 en une semaine).

**Action (a)** : `/blog/moment-quadratique-inertie-section-calcul/` (MEM-16) et `/en/blog/moment-quadratique-inertie-section-calcul/`.
- **Contenu** :
  - formules de A, I, W et J pour le rectangle, le carré, le tube rectangulaire, le rond, le tube rond, le profilé en I et le triangle ;
  - exemples chiffrés calculés par le générateur et contrôlés : 20 × 40 sur chant = 106 667 mm⁴, quatre fois plus qu'à plat ; tube Ø 40 × 2 = 43 215,75 mm⁴ ; tube carré 40 × 40 × 2 = 73 365 mm⁴ ;
  - σ = M/W, flèches en console (F·L³/3EI) et sur deux appuis (F·L³/48EI), E acier 210 000 MPa ;
  - théorème de Huygens ;
  - conversions in⁴ et in³ exactes ;
  - Propriétés de section dans SOLIDWORKS ;
  - 5 questions FAQ, dont la différence entre moment quadratique et moment d'inertie de masse.
- **Calculateur à 5 sections** (rectangle, tube rectangulaire, rond, tube rond, I) : A, Ix (mm⁴ et cm⁴), Wx, Iy, J pour les sections rondes. Les champs affichés dépendent de la section ; les dimensions impossibles sont refusées. Libellés des options traduits dans strings-en.json. Contrôlé en FR et EN.
- **Fiche PDF A4 FR/EN** : formulaire-moment-quadratique-sections.pdf et area-moment-of-inertia-formulas.pdf, relue.
- **Autour de la page** :
  - planche « rectangle, tube, profilé en I et axe neutre » ;
  - image de partage `moment-quadratique` ;
  - carte dans la grille du blog ;
  - liens depuis les mémos jauges de tôle et pouce ↔ mm ;
  - baseline : 43 pages.
- **Vérifications** :
  - build OK, verify:seo (page nouvelle seule), verify:en 0/0 (39 pages anglaises) ;
  - Chromium 1280/390 sur 7 pages FR/EN, sans erreur JS ni défilement horizontal ;
  - téléchargements en 200, version /en/ vers les fichiers anglais.

**Clics attendus** : aucun chiffre fiable avant indexation. À vérifier au 19/10 : indexation et premières impressions sur « moment of inertia » et « section modulus ».

**Pages en test** :
- jusqu'au 23/10 : aciers, clavettes, dureté, engrenages, filetage gaz, masse volumique (titre ou description) ; couple de serrage, ISO 2768, ISO 1101, ajustements (contenu) ;
- jusqu'au 24/10 : filetage métrique, rugosité ;
- jusqu'au 25/10 : soudure ;
- jusqu'au 26/10 : pouce ↔ mm et jauges de tôle (contenu ajouté le 12/10).

**Prochaines pistes** :
1. Action (d) seule sur les entrées pages-en.json de /en/ SOLIDWORKS gratuit et /en/ erreurs SOLIDWORKS (libres).
2. Le 23/10 : titre de /en/ ISO 2768 (position 4,5, 0,9 % de clics).
3. Mémos d'après Bing US : « socket head cap screw » 1 334, « dowel pins » 1 000 ; en France, « joint torique » 1 898.

## 2026-10-11 — nouveau mémo bilingue : jauges de tôle (gauge), épaisseurs en mm et en pouces

**Search Console** : rapport du 10/10, couvrant le 09/09 → 07/10.
- 2,4 clics/jour en moyenne sur 28 jours ; le 06/10 reste le meilleur jour avec 25 clics. Jalon 10/jour pas encore atteint en moyenne.
- 6 707 impressions, position moyenne 13,3.
- Indexation : 76/80 pages.
  - Pages FR non indexées (3) :
    - conversion-pouce-mm (publiée le 10/10, inconnue) ;
        - **tolerances-geometriques-symboles-iso-1101**.
  - Pages /en/ non indexées (1) : formats d'échange CAO (« détectée »).
  - /en/ engrenages, filetage gaz et image administrative sont désormais indexées.

**Alerte ISO 1101 (FR)** : la page est « explorée, actuellement non indexée » depuis la visite du 05/10, alors qu'elle faisait 190 impressions en position 7,2. Cause probable : elle contenait alors toute la traduction anglaise masquée, en double de la page /en/ indexée ; c'est corrigé depuis le 09/10. Contrôle en ligne ce jour : réponse 200, canonical vers elle-même, hreflang FR/EN/x-default, plus aucun texte anglais caché, présente dans le sitemap. **À faire par le propriétaire** : demander l'indexation de l'URL dans Search Console. La page n'est pas modifiée aujourd'hui, pour ne pas mêler les effets.

**Mots-clés (impressions Bing US sur 90 jours, relevé du jour)** :

| Requête | Impressions |
|---|---:|
| « sheet metal gauge chart » | 2 693 |
| « 16 gauge thickness » | 1 739 |
| « 14 gauge thickness » | 1 136 |
| « steel gauge chart » | 1 112 |
| « gauge to mm » | 295 |
| « sheet metal gauge thickness » | 236 |
| « aluminum gauge chart » | 230 |

Soit environ 7 000 au total : la plus grosse famille anglaise sans page après la conversion pouce ↔ mm. En France, « jauge tôle » et « épaisseur tôle » font 0 sur Bing : la page vise d'abord l'anglais, avec un français utile pour lire des plans et des tables américaines. Elle rejoint aussi l'expertise SOLIDWORKS du site (tables de jauges en tôlerie).

**Action (a)** : `/blog/epaisseur-tole-jauge-gauge-tableau/` (MEM-15) et `/en/blog/epaisseur-tole-jauge-gauge-tableau/`.
- **Valeurs** : jauges 7 à 30 pour l'acier (Manufacturers' Standard Gauge), l'acier galvanisé, l'inox et l'aluminium (Brown & Sharpe), en pouces et en mm. Vérifiées le 11/10 sur deux tableaux concordants (T/J Fabricators, OpenSpindle) ; contrôle automatique de 8 valeurs mm dans le générateur ; mm arrondis au demi supérieur (11 ga inox = 3,18 mm).
- **Contenu** :
  - tableau des épaisseurs métriques courantes (0,5 à 4 mm) avec la jauge la plus proche par matériau ;
  - section « comprendre » : une jauge par matériau, 41,82 lb/ft² par pouce pour l'acier et 7,85 kg/m² par mm, commande en mm en Europe, tables de jauges SOLIDWORKS ;
  - 5 questions FAQ.
- **Convertisseur jauge ↔ épaisseur** : quatre matériaux à la fois, résultats identiques au tableau. Contrôlé en FR et EN : 16 ga → 1,52 / 1,61 / 1,59 / 1,29 mm ; 1,5 mm → 16 / 17 / 17 / 15 ga ; jauge 40 refusée.
- **Fiche PDF A4 FR/EN** : tableau-jauges-tole-gauge-mm.pdf et sheet-metal-gauge-chart.pdf, relue visuellement.
- **Autour de la page** :
  - planche « 4 tôles 16 ga en coupe » ;
  - image de partage `jauge-tole` ;
  - carte dans la grille du blog ;
  - liens depuis les mémos pouce ↔ mm et soudure (ajout de contenu seulement) ;
  - pages-en.json : title 62 caractères, description 141 ;
  - baseline : 42 pages.
- **Vérifications** :
  - build OK, verify:seo (page nouvelle seule), verify:en 0/0 ;
  - Chromium 1280/390 sur 7 pages FR/EN, sans erreur JS ni défilement horizontal ;
  - téléchargements en 200, version /en/ vers les fichiers anglais.

**Clics attendus** : aucun chiffre fiable avant indexation. À vérifier au 18/10 : indexation FR et /en/, premières impressions sur « gauge » et « gauge thickness ».

**Pages en test** :
- jusqu'au 23/10 : aciers, clavettes, dureté, engrenages, filetage gaz, masse volumique (titre ou description) ; couple de serrage, ISO 2768, ISO 1101, ajustements (contenu du 09/10) ;
- soudure : contenu ajouté le 09/10 et le 11/10, pas de titre avant le 25/10 ;
- filetage métrique et rugosité : pas de titre avant le 24/10 ;
- conversion pouce ↔ mm : pas de titre avant le 25/10.

**Prochaines pistes** (Bing US) : « socket head cap screw » 1 334, « moment of inertia formula » 1 040, « dowel pins » 1 000 ; en France, « joint torique » 1 898. Également : la page /en/ « SOLIDWORKS gratuit / prix » fait 195 impressions en position 7,5 avec 0,5 % de clics. C'est une candidate pour l'action (d) (réécrire son entrée pages-en.json), à faire seule sur un passage pour pouvoir la mesurer.

## 2026-10-10 — nouveau mémo bilingue : conversion pouce ↔ mm (fractions, convertisseur, fiche PDF)

**Search Console** : rapport du 09/10, couvrant le 08/09 → 06/10 ; celui du jour n'est pas encore publié.
- 2,5 clics/jour en moyenne sur 28 jours, 25 clics le 06/10. Jalon 10/jour pas encore atteint en moyenne.
- 6 756 impressions, position moyenne 13,3.
- Indexation : 73/78 pages.
  - Pages FR non indexées (1) : resolutions-problematiques-plm (« explorée, non indexée » depuis juillet).
  - Pages /en/ non indexées (4) : engrenages, filetage gaz, image administrative (« inconnues »), formats d'échange CAO (« détectée »).
- Pages /en/ les plus cliquées : couple de serrage (6 clics, pos. 3,8), soudure (6, pos. 4,6), ISO 2768 (4, pos. 5,0), ISO 1101 (4, pos. 7,3).

**Mots-clés — le choix vient des données Bing** (clé `BING_WEBMASTER_API_KEY` désormais dans l'environnement) :
- **FR, 90 jours** : la famille « pouce en mm » dépasse 5 000 impressions au total (« pouce en mm » 1 209, « conversion pouce mm » 773, « 1/2 pouces en mm » 410, « 3/8 pouce en mm » 377…).
- **US, 90 jours** : « inches to mm » 60 184, « inch to mm » 26 215, « mm to inch » 15 035, « 1/16 inch to mm » 1 405, « 5/16 inch to mm » 1 302, « 3/16 inch to mm » 1 215, « convert inch to mm » 1 006.
- Aucune page du site ne traitait le sujet.
- Les requêtes courtes (« inches to mm ») sont dominées par le convertisseur intégré de Google. La page vise surtout les fractions (« 5/16 inch to mm ») et les tableaux, où un tableau exact et une fiche imprimable ont leur place.

**Action (a)** : `/blog/conversion-pouce-mm-tableau/` (MEM-14) et `/en/blog/conversion-pouce-mm-tableau/`.
- **Contenu** :
  - 1 pouce = 25,4 mm exactement (accord international de 1959) ;
  - toutes les fractions de 1/64 à 1 pouce en valeurs exactes, sans arrondi, calculées en fractions exactes par le générateur ;
  - tailles courantes jusqu'au yard ;
  - mm → pouces avec la fraction la plus proche au 1/64 et l'écart ;
  - pièges : tailles nominales des tubes (G 1/2 = 20,955 mm), arrondi au 1/64 sur un ajustement, mil / µin, filetages et engrenages en pouces, unités MMGS / IPS de SOLIDWORKS ;
  - 5 questions FAQ.
- **Convertisseur bidirectionnel**, qui accepte « 3/8 », « 1 1/2 », « 1-1/2 », « 5/16" » et la virgule. Contrôlé en FR et EN : 3/8 → 9,525 ; 1 1/2 → 38,1 ; 10 mm → 0,3937 in, 25/64 (−0,078 mm) ; 12,7 mm → 1/2 exact.
- **Fiche PDF A4 FR/EN** : tableau-conversion-pouce-mm.pdf et inch-to-mm-conversion-chart.pdf. Relue visuellement ; valeurs recontrôlées, par exemple 3 mm → 1/8 (+0,175) et 1 000 mm → 39 3/8 (+0,125).
- **Autour de la page** :
  - planche « règle mm / pouces » ;
  - image de partage `pouce-mm` ;
  - carte dans la grille du blog ;
  - liens depuis filetage métrique et rugosité (µin) ;
  - entrée pages-en.json (title 61 caractères, description 150) ;
  - baseline : 41 pages.
- **Vérifications** :
  - build OK, verify:seo (page nouvelle seule), verify:en 0/0 ;
  - Chromium 1280/390 sur 7 pages FR/EN, sans erreur JS ni défilement horizontal ;
  - téléchargements en 200, version /en/ vers les fichiers anglais.

**Clics attendus** : aucun chiffre fiable avant indexation. À vérifier au 17/10 : indexation FR et /en/, premières impressions sur les fractions.

**Pages en test** :
- titres et descriptions des mémos aciers, clavettes, dureté, engrenages, filetage gaz (jusqu'au 23/10) ;
- masse volumique (23/10) ;
- couple de serrage, ISO 2768, ISO 1101, soudure et ajustements, qui ont reçu du contenu le 09/10 : pas de changement de titre avant le 23/10 ;
- filetage métrique et rugosité : contenu ajouté les 09/10 et 10/10, pas de changement de titre avant le 24/10.

**Outil de mots-clés** :
- les requêtes associées Bing déjà relevées ne sont plus redemandées (quota épargné) ;
- relevé anglais du 10/10 : 576 requêtes associées et 182 requêtes exactes avant le blocage « ThrottleUser » ; le script reprend au relevé suivant.

**Relevé Bing du 09/10, non consigné ce jour-là** (commande bloquée) :
- premier relevé FR : 1 307 requêtes associées et 218 requêtes exactes ;
- les requêtes associées ne sont gardées que si elles ont deux mots communs avec la graine ;
- sujets confirmés : joint torique (2 099), goupille fendue (443), circlips.

**Prochaines pistes, d'après Bing US** : « sheet metal gauge chart » 2 693, « socket head cap screw » 1 334, « moment of inertia formula » 1 040, « dowel pins » 1 000, et en France « joint torique » 2 099.

## 2026-10-09 (3) — données de mots-clés réelles et fichiers à télécharger (demande du propriétaire)

**1. Recherche de mots-clés sur données réelles** : `node scripts/mots-cles.mjs`, avec les graines dans `seo/graines.json`, produit le rapport `seo/mots-cles.md` et le cache `seo/mots-cles.json`. Chaque chiffre est attribué à sa source, aucun n'est estimé.
- **Suggestions de recherche Google** (sans clé, actif) : les requêtes réellement tapées, avec leur rang de popularité, pour 74 graines FR/EN et les modificateurs pdf / excel / tableau / calcul / télécharger. Premier relevé : 1 705 requêtes. Les suggestions sans mot commun avec leur graine sont écartées (correction orthographique de Google). Le rapport croise chaque requête avec Search Console et signale les sujets sans page sur le site et l'intention de téléchargement (⬇).
- **Volumes Google Ads mensuels** (DataForSEO) : actifs dès que `DATAFORSEO_LOGIN` et `DATAFORSEO_PASSWORD` sont définis dans l'environnement. Service payant, volumes gardés 30 jours en cache.
- **Impressions Bing** (API Bing Webmaster Tools, gratuite) : actives dès que `BING_WEBMASTER_API_KEY` est défini. Le site doit être vérifié dans Bing Webmaster Tools.
- Sans ces clés, le rapport classe par popularité des suggestions, sans volume. **À faire par le propriétaire** : ajouter ces variables dans les réglages de l'environnement cloud.
- Ce que le premier relevé confirme :
  - les recherches de fichiers sont fréquentes (261 requêtes ⬇ sur 1 705), par exemple « bolt torque chart pdf » (3ᵉ suggestion), « tolérance iso 2768 mk pdf », « symbole soudure pdf », « calcul ressort compression excel » ;
  - sujets sans page : ressorts (compression, traction), moment quadratique, cotation fonctionnelle, circlips, joints toriques, vis CHC, goupilles, pliage de tôle et facteur K, conversion pouce / mm, dilatation thermique.

**2. Fichiers à télécharger** :
- **Fiches PDF A4 imprimables, FR et EN**, pour les 7 mémos les plus vus : couple de serrage, filetage métrique, ISO 2768, ISO 1101, soudure ISO 2553, rugosité, ajustements ISO 286.
  - Générées par `node scripts/fiches-pdf.mjs` à partir des tableaux de la page construite : une seule source, donc une correction de la page se répercute à la régénération. Les phrases qui renvoient au web (calculateur, SOLIDWORKS) sont retirées.
  - Sur chaque page : un bouton « Télécharger en PDF » dans l'en-tête et un encadré « Version imprimable » ; la version /en/ pointe vers le PDF anglais (`data-href-en`, géré par build-en).
  - Toutes relues visuellement.
- **Calculateur Excel de couple de serrage, FR et EN** (`scripts/excel-couple-serrage.py`) : mêmes formules que la page (VDI 2230, ISO 898-1), en formules Excel sans macro, avec le tableau µ = 0,12 complet. Recalculé hors Excel par le script : il redonne exactement les valeurs publiées (M10 8.8 → 48 N·m, M36 12.9 → 4139 N·m…). Lien sous le calculateur de la page. Requête visée : « calcul couple de serrage excel », vue dans Search Console.

**3. Correction des pages anglaises** : les nombres des tableaux et des listes de choix, hors texte traduit, gardaient la virgule décimale (« 0,35 », « 1,25 ») sur les pages /en/, soit 224 cellules. build-en les passe au point.

Vérifications :
- build OK ;
- verify:seo identique ;
- verify:en 0/0 ;
- Chromium : 144 contrôles (72 pages FR + EN, 1280 et 390 px), sans erreur JS ni défilement horizontal ;
- les 18 fichiers répondent en 200.

Ces 7 pages ont reçu un ajout de contenu (téléchargements) : pas de changement de titre sur ces pages avant le 23/10, pour pouvoir mesurer l'effet.

**Pistes pour les prochains passages** (d'après le rapport de mots-clés) :
- tout nouveau mémo a sa fiche PDF ;
- version anglaise des modèles Excel de nomenclature (la page /en/ du modèle fait 4,9 % de clics en position 38, mais propose des fichiers en français) ;
- calculateurs Excel : ressort de compression, conversion pouce / mm ;
- mémos : ressorts, moment quadratique, circlips, joints toriques, vis CHC.

## 2026-10-09 (2) — revue critique de la stratégie, à la demande du propriétaire

**Constats chiffrés (rapport du 09/10, 08/09 → 06/10)** : 2,5 clics/jour en moyenne sur 28 jours (0,4 le 25/09), 25 clics le 06/10, 6 756 impressions, position moyenne 13,3.
- **La croissance vient surtout des pages /en/**, mises en ligne le 03/10. Elles se classent en positions 3,8 à 7,3 avec 2 à 4 % de clics : couple de serrage (6 clics), soudure (6), ISO 2768 (4), ISO 1101 (4). Les mêmes pages françaises sont en positions 7 à 16 avec moins de 1 % de clics. L'anglais est le premier levier vers 1 000 clics/jour ; les mémos français récents ne sont pas encore mesurables.
- **Calcul corrigé** : à 1 % de taux de clic, 1 000 clics/jour demandent environ 100 000 impressions/jour ; à 3 % (positions 3 à 5), environ 33 000. Aujourd'hui : environ 2 000 par jour. Jalons de suivi : 10/jour, puis 50, 100, 300, 1 000, sans garantie de délai.

**Défauts corrigés dans ce lot** :
1. **Texte anglais caché dans les pages françaises.** Les 36 pages qui ont une version /en/ contenaient toute leur traduction anglaise masquée en CSS, environ 48 % du texte, que le bouton EN n'affichait jamais puisqu'il mène à l'URL /en/. Google lisait des h1 mêlant les deux langues (« …désignationS235, S275, S355 steel… »). `scripts/build-en.mjs` retire désormais ces spans au build (`stripLang`). Les pages sans version anglaise gardent la bascule sur place. `check-en.mjs` signale tout span anglais restant sur une page française. Contrôles faits :
   - texte français visible identique avant et après sur les 36 pages ;
   - 564 Ko de HTML en moins ;
   - verify:seo : seuls les h1 divergent (baseline régénérée), verify:en 0/0 ;
   - Chromium 1280/390 sur les 36 pages, bascule FR ↔ EN et calculateurs vérifiés.
2. **IndexNow** : `node scripts/indexnow.mjs --since <commit>` ne signale que les pages modifiées depuis ce commit, et leur version /en/. Renvoyer chaque jour les 78 URL du sitemap n'apportait rien. Le sitemap complet reste pour les refontes, comme ce lot.
3. **Descriptions trop longues de mes mémos récents** (206 à 245 caractères, coupées par Google) ramenées à 148–157 caractères : aciers, clavettes, dureté, engrenages, filetage gaz. Ces 5 pages sont **en test jusqu'au 23/10** pour leur title et leur description.

**Critique des passages précédents (moi)** :
- Le passage du matin sur la masse volumique a changé titre et contenu en même temps, ce qui empêche de mesurer l'effet du titre. Sa requête principale est en position 25,7 : le frein est le classement, pas le titre.
- J'ai publié un mémo par jour, hors du cœur d'expertise PDM/PLM, sans relecture humaine des valeurs. Google sanctionne le contenu produit à la chaîne pour le classement. La valeur doit venir des calculateurs, des planches et de valeurs exactes, et la cadence ne doit pas dépasser la qualité.
- Les sujets « à fort volume » étaient choisis sans donnée de volume. Seules les requêtes réelles de Search Console sont des preuves.

**Nouvelles règles** (aussi inscrites dans les instructions de la tâche) :
- Anglais d'abord pour le choix des sujets.
- Action (c) seulement en position ≤ 10.
- Un seul changement mesurable par page, puis 14 jours sans y toucher.
- Ping limité aux URL modifiées.
- Clics attendus notés à chaque action.

**Titres et descriptions français trop longs** (titre > 65 ou description > 160 caractères ; Google les coupe ou les réécrit) : à raccourcir **par lots de 5**, un lot par passage d'action (c), en commençant par les pages en position ≤ 10, sans toucher aux titres en test.
- Lot 1 : raccourcis-clavier-solidworks (127, 7,8), ebom-vs-mbom (95, 8,5), puis, après le 23/10 (téléchargements ajoutés le 09/10) : couple-serrage-vis-tableau (334 impr., pos. 10,0), rugosite-ra-tableau-classes-procedes (202, 7,9), tolerances-geometriques-symboles-iso-1101 (190, 7,2).
- Lot 2 : solidworks-pdm-lent-7-causes, erreurs-solidworks-frequentes, ia-solidworks-pdm-bureau-etudes, prix-cout-projet-solidworks-pdm, tableau-filetage-metrique-percage-taraudage (pos. 13,1).
- Ensuite, les pages sans impressions, dans l'ordre du rapport.
- Exclues jusqu'à la fin de leur test : nomenclature-bom-pdm-plm-erp (en test depuis le 01/10) et masse-volumique-materiaux-calcul-masse (jusqu'au 23/10).

**Pistes de mémos, anglais d'abord** :
- vis CHC ISO 4762 / DIN 912 (dimensions) ;
- gorges de joints toriques ;
- roulements série 6000 / 6200 (dimensions) ;
- circlips DIN 471 / 472 ;
- facteur K et rayon de pliage en tôlerie (lien naturel avec SOLIDWORKS) ;
- lamages et fraisurages ISO.

**À faire par le propriétaire (hors de portée de la tâche)** :
1. Relire les valeurs des mémos et signaler toute erreur. Ne rien afficher comme « relu » sans relecture réelle.
2. Obtenir des liens entrants légitimes : profil LinkedIn et publications, forums SOLIDWORKS, écoles et IUT, GrabCAD, réponses utiles sur des forums techniques. Sans liens, un domaine récent n'atteint pas les requêtes à fort volume.
3. Soumettre à la main dans Search Console les URL listées à chaque passage.
4. Optionnel : déposer un export Keyword Planner (volumes FR et EN) dans le dépôt, pour choisir les sujets sur des volumes réels.

## 2026-10-09 — titre et contenu « densité » : masse volumique des matériaux (actions c + b)

- **Rapport GSC (07/09 → 05/10)** : 44 clics (≈ 1,6/jour, contre 1,2 au passage précédent), 4 847 impressions (+60 %), position moyenne 14,1 ; 70/78 pages indexées. Record journalier : 11 clics et 1 841 impressions le 05/10.
- **Action (c)** : `/blog/masse-volumique-materiaux-calcul-masse/` — 418 impressions, 0 clic, position 14,8. Sa première requête, « table densite materiaux » (78 impr., pos. 25,7), et « masse volumique plastique » (23 + 11 impr., pos. ≈ 10) ne retrouvaient pas le mot « densité » dans le titre. Nouveau title « Densité des matériaux : tableau des masses volumiques + calcul » (62 car.), meta description (156 car.), og/twitter, headline JSON-LD, fil d'Ariane et h1 alignés. **Titre en test depuis le 09/10 : ne pas y toucher avant le 23/10.**
- **Action (b), sur la même page** : colonne « g/cm³ (densité) », paragraphe densité / masse volumique, ordre de grandeur des plastiques, 2 questions FAQ (HTML + JSON-LD) : « différence entre densité et masse volumique », « masse volumique des plastiques ». Les valeurs viennent du tableau existant ; aucune valeur de grade chargé verre n'est ajoutée (elle varie selon le grade). dateModified passé au 09/10.
- Vérifications : build OK, verify:seo (seuls les champs voulus divergent, baseline régénérée), verify:en 0/0, Chromium 1280/390 FR et /en/ sans erreur JS ni défilement horizontal.
- Indexation : engrenages, filetage gaz et image administrative pas encore connus de Google (moins de 7 jours) ; resolutions-problematiques-plm « explorée, non indexée » depuis juillet, ce qui en fait le candidat de l'action (d)/(e).
- Prochaine piste : action (c) sur `couple-serrage-vis-tableau` (261 impr., CTR 0,8 %, pos. 10,4), ou nouveau mémo (roulements, circlips).

## 2026-10-08 — nouveau mémo bilingue : engrenages (module, diamètres, entraxe)

- **Rapport GSC (28 j)** : 33 clics (≈ 1,2/jour), 3 023 impressions, position moyenne 14,5 ; 68/76 pages indexées.
- **Action (a)** : création de `/blog/engrenage-module-calcul-diametres/` (MEM-13) + `/en/` : formules d'un engrenage droit à denture normale (d = m·z, da = m(z + 2), df = m(z − 2,5), db = d·cos α, p = π·m, h = 2,25 m), entraxe a = m(z1 + z2)/2, rapport, modules normalisés ISO 54 (séries I et II, vérifiées par recherche web), nombre minimal de dents à 20° (17 théorique, ≈ 14 en pratique), conversion diametral pitch m = 25,4/DP, FAQ et calculateur (contrôle m = 2, z = 20/50 → 40/44/35 mm, 100/104/95 mm, a = 70 mm, i = 2,5).
- Planche `engrenage` (pignon z20 / roue z50), alt FR/EN, image OG, carte dans la grille, lien depuis le mémo clavettes. Baseline SEO : 40 pages.
- Vérifications : build OK, verify:seo identique (après snapshot de la nouvelle page), verify:en 0 erreur / 0 texte à vérifier, Chromium 1280/390 FR et /en/ sans erreur JS ni défilement horizontal.
- Remarque : `apply.mjs` renseigne aussi l'alt vide de la figure de l'article « image administrative » ; modification annulée (hors périmètre de la passe).
- Prochaine piste : action (c) sur `couple-serrage-vis-tableau` (198 impressions, CTR 0,5 %, position 10,6).

## 2026-10-07 — nouveau mémo bilingue : filetages gaz G (BSP) et NPT

**Chiffres (05/09 → 03/10)** : **27 clics (1,0/jour, contre 0,8)**, 2 385 impressions (2 148), CTR 1,1 %, position moyenne 13,7. Pages qui montent : solidworks-gratuit-prix-guide 498 impressions, couple-serrage 158 (pos. 9,3, CTR 0,6 % — candidate action c), tableau-filetage 150, rugosité 66, ajustements 35 ; 1er clic sur une URL /en/ (couple-serrage). **Indexation : 67 / 72** (clavettes FR et /en/ d'hier, dureté FR détectée, /en/formats-echange-cao détectée, resolutions-problematiques-plm).

**Action (a)** : `/blog/filetage-gaz-g-bsp-npt-tableau/` et `/en/…` (requêtes : « filetage gaz », « filetage G 1/2 », « BSP NPT différence » ; en anglais « BSP thread chart », « NPT vs BSP », « pipe thread size chart »). Aucun recoupement (tableau-filetage ne couvre que le métrique ISO).
- tableau G 1/8 à G 2 (Ø ext., filets / pouce, pas, foret ; engineersedge DIN ISO 228 + valeurs connues) et NPT 1/8 à 1 (Ø ext. pouce / mm, filets / pouce, foret ASME B1.20.1 recoupé) ; comparatif G / R-Rp-Rc / NPT (angle, forme, étanchéité, norme) ; piège NPT dans G ; désignations sur plan ; outil d'identification (Ø mesuré + filets / pouce → G et NPT les plus proches, refus si aucune taille ne correspond) ; FAQ 5 (JSON-LD).
- entièrement bilingue, pages-en.json (title 62, description 157), planche MEM-12 (profils 55° / 60°), covers.json, carte dans la grille, liens depuis tableau-filetage et couple-serrage (« À lire aussi »), image OG `filetage-gaz`, baseline régénérée ; couvertures rendues avec le substitut ffmpeg local.

Vérifié : build, verify:seo, verify:en (34 pages, 0 erreur, 0 texte à vérifier), Chromium en-US FR et /en/ 1280/390 (pas d'erreur JS ni défilement horizontal ; 20,9 / 14 → G 1/2 ; 21,3 / 14 → 1/2 NPT ; 10,2 / 27 → 1/8 NPT ; 8 / 20 → aucune correspondance), git status propre après build.

**Prochain passage** : action c sur couple-serrage-vis-tableau (158 impressions, CTR 0,6 %, pos. 9,3) — lire ses requêtes ; ou nouveau mémo (module d'engrenage, roulements, circlips).

## 2026-10-06 — nouveau mémo bilingue : clavettes parallèles DIN 6885 / ISO 773

**Chiffres (04/09 → 02/10)** : **21 clics (0,8/jour, contre 0,5)**, **2 148 impressions (contre 1 204)**, CTR 1,0 %, position moyenne 13,0 (13,7). Hausse portée par solidworks-gratuit-prix-guide (436 impressions, 5 clics, pos. 15,6) et les mémos (filetage 125 impressions, rugosité 56). **Indexation : 64 / 70.** Non indexées : dureté (FR et /en/, d'hier), soudure (FR), /en/aciers (détectée), /en/formats-echange-cao, resolutions-problematiques-plm.

**Action (a)** : `/blog/clavettes-paralleles-din-6885-dimensions/` et `/en/…` (requêtes : « clavette dimensions », « clavette DIN 6885 », « rainure de clavette » ; en anglais « keyway size chart », « DIN 6885 key dimensions »). Aucun recoupement.
- tableau des 15 sections de 6 à 110 mm (b × h, t1, t2, longueurs), valeurs recoupées (engineeringhardware, aspenfasteners, recherche) ; longueurs normalisées ; formes A / B / C ; ajustements h9, N9 / JS9, P9 / P9, H9 / D10 ; calculateur (clavette, d − t1, d + t2, plage de longueurs) ; désignation type ; FAQ 5 (JSON-LD).
- entièrement bilingue, pages-en.json (title 62, description 158), planche MEM-11 (coupe d'arbre Ø 25 + clavette 8 × 7), covers.json, carte dans la grille, liens depuis ajustements-iso-286 et tableau-filetage (« À lire aussi »), image OG `clavettes`, baseline régénérée. Rendu des couvertures avec le substitut ffmpeg local (Pillow).

Vérifié : build, verify:seo, verify:en (33 pages, 0 erreur, 0 texte à vérifier), Chromium en-US FR et /en/ 1280/390 (pas d'erreur JS ni défilement horizontal ; Ø 25 → 8 × 7, 21 / 28,3 mm ; Ø 30 → 8 × 7 ; Ø 30,5 → 10 × 8), git status propre après build.

**Prochain passage** : solidworks-gratuit-prix-guide devient la 2e page du site (436 impressions, pos. 15,6) : action b dès qu'une requête passe sous 15 ; sinon mémo filetages gaz G / NPT ou module d'engrenage.

## 2026-10-05 — nouveau mémo bilingue : conversion de dureté HRC / HV / HB

**Chiffres (03/09 → 01/10)** : 14 clics (0,5/jour), 1 204 impressions (1 234), CTR 1,2 %, position moyenne 13,7 (13,9). **Indexation : 63 / 68** — le rapport couvre désormais les URL /en/ : quasi toutes indexées en 2 jours. Non indexées : aciers (FR et /en/, publiés hier), soudure (FR), /en/formats-echange-cao, resolutions-problematiques-plm. solidworks-gratuit-prix-guide reste à 211 impressions, requêtes « solidworks gratuit », « solidworks prix » en positions 14–20 (hors critère b, à surveiller).

**Action (a)** : `/blog/conversion-durete-hrc-hv-hb/` et `/en/…` (requêtes : « conversion dureté », « hrc hv », « hrc en hb », « tableau dureté » ; en anglais « hardness conversion chart », « hrc to hv »). Aucun recoupement.
- tableau HRC / HV / HBW de 20 à 65 HRC (pas de 5), valeurs ASTM E140 recoupées sur deux tables publiées ; lignes HRB et résistances à la traction écartées (sources divergentes) ;
- convertisseur par interpolation linéaire, sans extrapolation hors 20–65 HRC ; principe des trois essais ; règles de plan (plage, choix de l'échelle, réception sur valeur mesurée) ; FAQ 5 (JSON-LD) ;
- entièrement bilingue, pages-en.json (title 57, description 155), planche MEM-10 (empreinte Vickers + correspondances), covers.json, carte dans la grille, liens depuis aciers (paragraphe Rm) et rugosité (« À lire aussi »), image OG `durete`, baseline régénérée.
- render.mjs relancé avec le substitut ffmpeg local (Pillow).

Vérifié : build, verify:seo, verify:en (32 pages, 0 erreur, 0 texte à vérifier), Chromium en-US FR et /en/ à 1280/390 (pas d'erreur JS, pas de défilement horizontal ; 58 HRC → 656 HV / 616 HB ; 513 HV → 50 HRC / 481 HB ; 900 HV → hors plage), git status propre après build.

**Prochain passage** : un mémo à fort volume anglais/français (clavettes DIN 6885, filetages gaz G / NPT, ou module d'engrenage) ; vérifier l'indexation de soudure et aciers.

## 2026-10-04 — nouveau mémo bilingue : aciers S235, S275, S355 (EN 10025-2)

**Chiffres (02/09 → 30/09)** : 14 clics (0,5/jour), 1 234 impressions (1 270 au passage précédent, fenêtre glissante), CTR 1,1 %, position moyenne 13,9 (14,1). **Indexation : 34 / 36** (la page ISO 1101 du 02/10 est indexée ; soudure, publiée hier, pas encore connue ; resolutions-problematiques-plm toujours explorée non indexée). Les URL /en/ (publiées le 03/10) n'apparaissent pas encore dans le rapport. À noter : solidworks-gratuit-prix-guide monte à 211 impressions (pos. 16,2) — candidate à l'action b.

**Action (a)** : `/blog/aciers-s235-s275-s355-caracteristiques/` et `/en/blog/aciers-s235-s275-s355-caracteristiques/` (requêtes : « acier S235 / S355 caractéristiques », « limite élastique S355 », « S355J2 », « E24 équivalent » ; en anglais « S355 yield strength », « S235 vs S355 »). Aucun recoupement (masse-volumique ne donne que la densité).
- ReH mini par épaisseur (≤ 16 / 40 / 63 / 80 mm), Rm (< 3 mm et 3–100 mm), qualités JR / J0 / J2 / K2, décodage de S355J2C+N, équivalences E24 / E28 / E36 et A36 / A572 gr. 50 (présentées comme proches, pas équivalentes), calculateur (Re, Rm, effort à Re pour une section) ; FAQ 5 (JSON-LD). Valeurs croisées sur plusieurs sources (modulusmetal, steelcalculator, fiches EN 10025-2) ; au-delà de 80 mm seules les valeurs S355 recoupées (315 / 295 MPa) sont citées.
- entièrement bilingue ; entrée pages-en.json (title 61 car., description 157) ; planche de couverture MEM-09 (poutrelle en I + courbe σ-ε, Re 355 repéré) dans plates.mjs, textes alternatifs dans covers.json ; carte dans la grille du blog ; liens depuis masse-volumique (paragraphe ordre de grandeur) et soudure (« À lire aussi ») ; image OG `aciers` ; baseline régénérée (page nouvelle).
- Outil : ffmpeg absent du conteneur ; render.mjs lancé avec un substitut ffmpeg local (Pillow, mêmes tailles et qualités WebP/JPEG), script du dépôt inchangé.

Vérifié : build, verify:seo, verify:en (31 pages anglaises, 0 erreur, 0 texte à vérifier), Chromium en-US FR et /en/ à 1280/390 (pas d'erreur JS, pas de défilement horizontal ; S355 20 mm → Re 345, Rm 470–630, 200 mm² → 69 kN), git status propre après commit.

**Prochain passage** : action b sur solidworks-gratuit-prix-guide (211 impressions, pos. 16) ou nouveau mémo dureté HRC / HB / HV ; suivre l'apparition des URL /en/ dans le rapport.

## 2026-10-03 (3) — couvertures d'articles : une planche technique par article

Les 32 articles avaient des photos de banque d'images, souvent réutilisées (une même photo sur 11 articles) : rien d'unique pour Google Images ni pour le jury d'un concours de design. Chaque article a désormais sa planche de dessin technique dans la palette du hero (symbole de soudure a5, profil de filetage M10, cadre de tolérance ⌖ Ø0,1, zones H7/g6…), en français et en anglais (`scripts/covers/`, rendu par `node scripts/covers/render.mjs`, posé par `node scripts/covers/apply.mjs`).
- texte alternatif descriptif dans les deux langues (`src/i18n/covers.json`) : images uniques et décrites, éligibles à Google Images ;
- cartes du blog, « À la une » et figure d'ouverture de 19 articles ; jamais recadrées (16:9), sans désaturation ;
- pages anglaises : image de partage (og:image, JSON-LD) = planche anglaise en JPEG 1200 × 675 ; pages françaises : images OG inchangées ;
- poids : 12 Ko en moyenne en 800 px (84 Ko pour les photos), 32 Ko en 1600 px (276 Ko).

**Pour un nouvel article** : ajouter sa planche dans `scripts/covers/plates.mjs` et ses textes alternatifs dans `src/i18n/covers.json`, puis lancer render.mjs et apply.mjs.

## 2026-10-03 (2) — version anglaise indexable : /en/ (levier 5 de la consigne, engagé à la demande du propriétaire)

**Pourquoi** : 1 000 clics/jour demandent ~25 000 impressions/jour ; la niche PDM/PLM francophone n'y suffira pas. Le contenu anglais existait déjà (28 articles sur 32 bilingues à 85–91 %) mais seulement par bascule côté client sur les URL françaises : invisible pour Google. Les requêtes anglaises des mémos (« bolt torque chart », « tap drill chart », « welding symbols chart », « gd&t symbols », « iso 2768 », « surface roughness chart », « material density chart ») pèsent beaucoup plus que leurs équivalents français.

**Action** :
- `scripts/build-en.mjs` (plugin Vite, fin de build) : 30 pages anglaises statiques — accueil, index du blog, 28 articles — sous `/en/…` : `<html lang="en">`, textes français retirés, titres et descriptions rédigés pour les requêtes anglaises (`src/i18n/pages-en.json`), JSON-LD traduit (BlogPosting, fil d'Ariane, FAQ et glossaire reconstruits depuis le texte anglais de la page), canonical propre, liens internes vers `/en/`, textes alternatifs et étiquettes traduits (`src/i18n/strings-en.json`).
- hreflang fr / en / x-default (= français) sur les deux versions et dans le sitemap (66 URL, dont 30 anglaises ; IndexNow les lit dans le sitemap).
- Bouton FR / EN : sur une page bilingue, il mène à l'autre URL (ancre conservée). Redirection seulement sur choix explicite mémorisé du visiteur, jamais d'après la langue du navigateur : les robots voient chaque URL telle quelle.
- Accueil : canonical ajouté (il n'en avait pas) ; baseline SEO régénérée pour cette seule différence.
- Non traduites (restent françaises, sans /en/) : configuration-materielle-solidworks, migration-donnees-solidworks-pdm, nomenclature-bom-pdm-plm-erp, resolutions-problematiques-plm (anglais partiel), et les deux études de cas.

**Contrôle** : `node scripts/check-en.mjs` (0 erreur : lang, canonical, hreflang croisés, aucun texte ni JSON-LD français, aucun lien vers la version française), verify:seo, axe-core 0 violation FR et EN, Chromium : arrivée sur /en/ sans stockage, bascules FR ↔ EN, ancien choix EN, mobile 390 px sans défilement horizontal.

**Prochain passage** : soumettre le sitemap dans Search Console, vérifier l'indexation des URL /en/ (rapport GSC : filtrer `/en/`) ; tout nouvel article bilingue reçoit son entrée dans `src/i18n/pages-en.json` pour avoir sa version anglaise. Puis traduire les 4 articles partiels (nomenclature-bom-pdm-plm-erp en premier : c'est la page qui fait le plus d'impressions en français).

## 2026-10-03 — nouveau mémo : symboles de soudure ISO 2553

**Chiffres (01/09 → 29/09)** : 14 clics (0,5/jour, contre 0,4), 1 270 impressions (1 147 au passage du 02/10), CTR 1,1 %, position moyenne 14,1 (14,5). **Indexation : 33 / 34** dans le rapport (la page ISO 1101 du 02/10 n'y figure pas encore). Seule non indexée : resolutions-problematiques-plm.

**Action (a)** : `/blog/symboles-soudure-iso-2553/` (requêtes visées : « symbole soudure », « symboles de soudure », « soudure a5 », « cordon d'angle a z », « côté flèche soudure », « 135 soudure »). Aucun recoupement sur le site.
- encadré de lecture + schéma (flèche, trait continu, trait interrompu, a5, longueur, queue 135) ;
- tableau des 11 symboles élémentaires (I, V, demi-V, Y, U, J, angle, reprise à l'envers, bouchon, points, molette) en SVG, et 5 symboles complémentaires (plat, convexe, concave, périphérique, chantier) ;
- cotes à gauche / à droite, cordon discontinu n × l (e), queue ; procédés ISO 4063 111, 121, 131, 135, 136, 141 (vérifiés) ;
- convertisseur gorge a ↔ côté z (z = a√2) et mise en garde a / z sans lettre ;
- FAQ (5, JSON-LD) dont système A vs AWS / système B.
- carte en tête du blog, image OG `soudure`, liens depuis tolerances-generales-iso-2768 (paragraphe chaudronnerie / mécano-soudure), cartes « À lire aussi » de masse-volumique et tolerances-geometriques ; baseline régénérée (page nouvelle).

Vérifié : build, verify:seo, Chromium en-US 1280/390 (français, symboles complets, pas d'erreur JS, pas de défilement horizontal, z7 → a4,95).

**Prochain passage** : mémo dureté (HRC / HB / HV) ou désignation des aciers (S235, S355, C45, 42CrMo4) ; vérifier l'indexation des pages ISO 1101 et soudure.

## 2026-10-02 (2) — nouveau mémo : tolérances géométriques ISO 1101

**Action** : `/blog/tolerances-geometriques-symboles-iso-1101/` (requêtes visées : « tolérance géométrique », « symbole planéité / perpendicularité / tolérance de position », « cadre de tolérance », « coaxialité concentricité »). Aucun recoupement : la page ISO 2768 ne traite que les tolérances générales H, K, L.
- tableau des 14 caractéristiques ISO 1101 : symbole, famille, référence nécessaire ou non, zone de tolérance ;
- lecture du cadre (exemple ⌖ Ø 0,1 Ⓜ | A | B | C), références primaire / secondaire / tertiaire, cotes encadrées ;
- modificateurs Ⓜ Ⓛ Ⓔ Ⓟ Ⓕ CZ, exemple chiffré du bonus Ⓜ ;
- convertisseur ± ↔ tolérance de position (Ø = 2√(x² + y²), carré inscrit ± t/(2√2)) avec verdict de conformité ;
- FAQ (5 questions, JSON-LD) : planéité vs parallélisme, coaxialité vs concentricité, conversion ±, Ⓜ, ISO vs ASME (ASME Y14.5-2018 sans concentricité ni symétrie ; ISO 8015 indépendance vs Rule #1).
- carte en tête de /blog/, image OG `tol-geo`, liens depuis tolerances-generales-iso-2768 (section H, K, L) et ajustements-iso-286 (exigence de l'enveloppe Ⓔ) ; baseline SEO régénérée (page nouvelle).

Vérifié : build, verify:seo, Chromium en-US 1280/390 (français affiché, 14 symboles rendus, pas d'erreur JS, pas de défilement horizontal, convertisseur : ± 0,1 / ± 0,1 → Ø 0,283).

**Prochain passage** : un nouveau mémo à fort volume (symboles de soudure ISO 2553 ou conversion de dureté HRC/HB/HV), puis vérifier l'indexation de celui-ci.

## 2026-10-02 — requête « ebom » : page eBOM vs mBOM renforcée

**Chiffres (31/08 → 28/09)** : 12 clics (0,4/jour), 1 147 impressions, CTR 1,0 %, position moyenne 14,5 (15,4 au passage précédent). **Indexation : 33 / 34** : rugosité, modèle de nomenclature et l'étude de cas migration internationale sont indexées.

**Seule page non indexée** : resolutions-problematiques-plm (explorée le 09/07, retravaillée le 28/09). Rien de technique ne la bloque ; elle attend un nouveau passage de Google (soumission manuelle recommandée).

**Action (b)** : « ebom » (48 impressions, position 11,3), « ebom mbom pbom », « ebom mbom sbom », « ebom definition » → `/blog/ebom-vs-mbom/`. Le titre de la page nomenclature est en test depuis le 01/10 (passage du propriétaire) : non touché.
- définition des sigles en tête : eBOM = Engineering Bill of Materials, mBOM = Manufacturing Bill of Materials ;
- tableau des sigles BOM (eBOM, pBOM, mBOM, sBOM, as-built) : question à laquelle chacune répond, qui la tient ; paragraphe sur l'ambiguïté du terme pBOM (synonyme de mBOM ou étape intermédiaire selon les éditeurs) ;
- 2 questions ajoutées à la FAQ (HTML + JSON-LD) : « Que veut dire eBOM ? », « Qu'est-ce qu'une pBOM ? » ; dateModified 2026-10-02, mention « mis à jour » visible ;
- lien depuis la définition eBOM du glossaire (indexé, qui ne pointait pas vers cette page).

**Prochain passage** : relire positions et CTR de « ebom » / « ebom mbom » d'ici 7 à 14 jours, sans retoucher le titre de la page nomenclature pendant le test. Si toutes les pages sont indexées : « bom erp » (pos. 8,2) → integration-bom-erp.

## 2026-10-01 (soir) — test CTR sur la page BOM

**Publié dans ce lot** : uniquement title, meta description, OG/Twitter et headline/description JSON-LD de `/blog/nomenclature-bom-pdm-plm-erp/`. Aucun changement de H1, CSS, JS ou mise en page. Ancien titre : « Nomenclature (BOM) : définition, eBOM vs mBOM et lien PDM, PLM, ERP ». Nouveau : « Nomenclature BOM : définition, exemple et modèle Excel ». Description : « Définition de la BOM, tableau eBOM/mBOM et rôles du PDM, PLM et ERP. Un exemple concret et un modèle Excel gratuit pour structurer votre nomenclature. » Le modèle est déjà accessible depuis le contenu. Hypothèse : une réponse concrète et un livrable explicite donnent davantage envie de cliquer ; aucun gain encore mesuré.

**Point de départ** : export Search Console `seo-data` commit `2c6bc0a` (01/10 à 10:09 UTC), période 31/08–28/09 : 12 clics, 1 147 impressions, CTR 1,0 %, position 14,5 ; précédent export 30/08–27/09 : 11 clics, 1 025 impressions, position 15,4. Ces fenêtres se chevauchent et couvrent 29 jours inclusifs malgré le paramètre 28 du script. 22–28/09 : 2 clics / 451 impressions. Page BOM : 4 clics / 617 impressions, CTR 0,65 %, position 18,4. Requêtes globales à suivre : ebom (48 impressions, pos. 11,3), ebom mbom (47, pos. 8,1), bom erp (25, pos. 8,2). Indexation rapportée : 33/34, seule resolutions-problematiques-plm reste non indexée. Pas de métriques temps réel, sessions ou visiteurs uniques accessibles.

**Audit et validation** : main à jour, aucun AGENTS.md trouvé. HTTP 200 sur robots, sitemap et les deux pages de parcours ; redirection du domaine nu vers www ; exploration autorisée et sitemap de 34 URL. Build, JSON-LD et liens internes contrôlés. Baseline SEO actualisée seulement pour les six métadonnées attendues de cette page. Le navigateur local est bloqué par une interdiction de socket : les changements éditoriaux FR/EN (lien eBOM/mBOM vers modèle et procédure export SOLIDWORKS/PDM), ainsi que le H1 plus court, sont conservés dans `seo/ctr-bom-2026-10-01` et ne doivent pas être fusionnés avant contrôle visuel mobile/ordinateur. Le dépassement 500 kB du bundle hero-film est préexistant ; pas de mesure de performances terrain. Vercel list_teams renvoie zéro équipe : projet et déploiement via API non identifiés.

**Mesure** : attendre réexploration puis observer à 7 jours, comparer des fenêtres de 28 jours avec assez d'impressions, à requêtes/positions/appareils/pays comparables si disponibles. Ne pas réécrire chaque jour le même titre. Google peut réécrire titre et extrait : vérifier le résultat réellement affiché. Ne pas confondre gain de position et gain de CTR. Prochaine candidate : page SOLIDWORKS gratuit/prix (128 impressions, 2 clics), après analyse de l'intention et vérification des prix officiels. Priorité quotidienne CTR ajoutée à l'automatisation. Progression visée : améliorer les pages existantes vers 100 clics/jour, développer les sujets qui fonctionnent vers 300 puis 1 000, sans garantie de résultat ou de délai.

Sources : https://developers.google.com/search/docs/appearance/snippet et https://developers.google.com/search/docs/appearance/title-link . Procédure export préparée à partir de la documentation SOLIDWORKS 2026 : https://help.solidworks.com/2026/English/SolidWorks/sldworks/t_Saving_BOMs.htm et https://help.solidworks.com/2026/english/EnterprisePDM/fileexplorer/t_Exporting_CSV_Files.htm .

## 2026-09-28 (3) — série « Mémos & outils » : 5 calculateurs (session du propriétaire)

**Contexte** : objectif 1 000 visiteurs/jour. Avec 31 pages, le site ne peut pas y arriver : il faut des pages qui répondent à des recherches fréquentes du public bureau d'études. Décision : une série de mémos avec calculateur, reliés entre eux ; l'agent passe **tous les jours** (6 h 47).

**Livré** (catégorie de blog `memo`, nouveau groupe « Mémos & outils » dans l'index du pied de page, filetage déplacé dedans) :
- `/blog/ajustements-iso-286-tableau-h7-g6/` : calculateur ISO 286 (27 classes d'alésage × 30 d'arbre, jusqu'à 500 mm, correction Δ pour K/M/N/P), tableau H7/f7/g6/h6/k6/n6/p6, les 8 ajustements usuels ;
- `/blog/tolerances-generales-iso-2768/` : calculateur f/m/c/v, tableaux linéaires, rayons, angles, H/K/L, statut ISO 22081 ;
- `/blog/couple-serrage-vis-tableau/` : couples et précontraintes M3–M36 en 8.8/10.9/12.9, calcul VDI 2230 (contrôlé : M10 48, M12 84, M16 206 N·m à µ 0,12) ;
- `/blog/rugosite-ra-tableau-classes-procedes/` : classes N1–N12, convertisseur µm/µin, Ra par procédé et par fonction, ISO 21920 ;
- `/blog/masse-volumique-materiaux-calcul-masse/` : 33 matériaux, calculateur plaque/rond/tube/hexagone, masse SOLIDWORKS.

Liens entrants : filetage (paragraphe + 2 cartes), codification-proprietes-solidworks (masse). Chaque mémo pointe vers deux autres. Vérifié : build, verify:seo (baseline régénérée pour les 5 pages), Chromium 1280/390 en-US (français affiché, pas d'erreur JS, pas de défilement horizontal), calculateurs FR et EN.

**Modèles à télécharger** (même passage) : `/blog/modele-nomenclature-excel-gratuit/` (cible « modèle nomenclature Excel ») avec deux classeurs sans macro dans `public/telechargements/` : modèle de BOM multiniveau et checklist de migration SOLIDWORKS PDM (33 actions, 6 phases de l'article migration). Encarts de téléchargement dans migration-donnees-solidworks-pdm et nomenclature-bom-pdm-plm-erp. Les classeurs sont générés par script (openpyxl), pas à la main : pour les modifier, régénérer plutôt qu'éditer.

**À soumettre dans Search Console** : les 6 URL ci-dessus.

**Prochains passages** : (1) continuer l'indexation (eco-ecr, pages projets) ; (2) quand plus rien à indexer, suivre les requêtes des mémos dans le rapport et renforcer celles en positions 5–20 ; (3) mémos suivants possibles : cotation GPS / symboles de tolérances géométriques, conversions d'unités (pouces, psi, N·m ↔ lbf·ft), soudure (symboles ISO 2553), roulements (désignations), clavettes (ISO 773 / DIN 6885), goupilles, circlips, dureté (HRC/HB/HV), aciers (équivalences de nuances EN / AISI).

## 2026-10-01 — indexation : mémo rugosité Ra

**Chiffres (30/08 → 27/09)** : 11 clics (0,4/jour), 1 025 impressions (premier passage au-dessus de 1 000), CTR 1,1 %, position moyenne 15,4 (15,7 au passage précédent). **Indexation : 30 / 34** (26 il y a deux jours) : 5 des 6 pages outils du 28/09 sont déjà indexées, ainsi que projets/robot-orbita.

**Encore non indexées** : rugosite-ra-tableau-classes-procedes (URL inconnue de Google), modele-nomenclature-excel-gratuit (détectée), resolutions-problematiques-plm (explorée le 09/07, enrichie le 28/09), projets/migration-pdm-internationale (détectée, enrichie le 30/09).

**Action** : `/blog/rugosite-ra-tableau-classes-procedes/`, seule page outil encore inconnue de Google. Technique OK (rendu en-US en français, canonical, pas de noindex, 200, sitemap, pied de page). Le contenu est complet ; deux problèmes :
- découverte : seules deux pages outils récentes et le pied de page la liaient ; lien contextuel ajouté depuis tolerances-generales-iso-2768 (indexée), à l'endroit où l'article explique la logique « valeur générale près du cartouche, puis exceptions », que la page rugosité applique à l'état de surface ;
- exactitude : la FAQ donnait 0,8 µm ≈ 32 µin alors que le tableau donne 31 (0,8 × 39,37 = 31,5) ; corrigé en 31,5 en français, en anglais et dans le JSON-LD. dateModified laissé au 28/09 (correction mineure).

**Prochain passage** : modele-nomenclature-excel-gratuit (détectée) : lien depuis ebom-vs-mbom, la page la plus vue après la nomenclature. Ensuite, action (b) sur « ebom » (pos. 11,3) et « bom erp » (8,3).

## 2026-09-30 — indexation : étude de cas migration PDM internationale

**Chiffres (29/08 → 26/09)** : 10 clics (0,4/jour), 971 impressions, CTR 1,0 %, position moyenne 15,7 (16,2 au passage précédent). **Indexation : 26 / 34** — eco-ecr, ia-solidworks-pdm, migration-cloud et projets/robot-orbita sont passées indexées depuis leur reprise (27–29/09).

**Encore non indexées** : les 6 pages outils / modèles créées le 28/09 (URL encore inconnues de Google, normal à 2 jours), resolutions-problematiques-plm (enrichie le 28/09, pas encore revue), projets/migration-pdm-internationale (détectée, jamais explorée).

**Action** : `/projets/migration-pdm-internationale/`. Technique OK (rendu en-US en français, canonical, pas de noindex, 200, sitemap, pied de page) mais page mince, sans données structurées ni carte Twitter, liée seulement depuis l'accueil, robot-orbita et le guide PLM :
- section « Contrôles avant de rouvrir un site » : grille de 5 contrôles (références et métadonnées, droits par site, réplication, historique, retour arrière) avec la méthode et le critère bloquant ; renvoi vers le guide de migration de données pour l'audit (pas de doublon) et vers Standard vs Professional (la réplication demande Professional) ;
- JSON-LD Article + BreadcrumbList (datePublished = date d'ajout du fichier, dateModified 2026-09-30), twitter:card / title / description ;
- liens contextuels depuis solidworks-pdm-guide-complet (paragraphe multi-sites) et prix-cout-projet-solidworks-pdm (serveur d'archives répliqué).

**Prochain passage** : suivre l'arrivée des 6 pages outils dans le rapport ; si elles restent inconnues, les relier depuis des articles indexés proches (filetage, codification…). Sinon, action (a)/(b) sur les requêtes « ebom », « bom erp ».

## 2026-09-29 — indexation : page ECR / ECO

**Chiffres** : rapport du 28/09 (pas encore de rapport du 29, moins de 3 jours d'écart) — 28/08 → 25/09 : 0,4 clic/jour, 927 impressions, position moyenne 16,2 ; 22 / 28 pages indexées. Le sitemap compte désormais 34 URL (6 pages outils et modèles ajoutées le 28/09 par un autre passage) : le rapport ne les couvre pas encore.

**Action** : `/blog/eco-ecr-gestion-modifications/`, dernière page « explorée, non indexée » pas encore retravaillée (dernier passage Google 07/08). Technique OK (rendu en-US en français, canonical, pas de noindex, 200, sitemap, pied de page). L'article était déjà solide ; il lui manquait une définition directe et un élément de décision qu'aucune autre page du site ne couvre :
- encadré « en bref » en tête : ECR / ECO / ECN en une phrase chacun ;
- sous-section « Nouvel indice ou nouvelle référence ? » : la règle d'interchangeabilité (form, fit, function) et un tableau de 5 cas, dont le cas du joint de l'article ; renvoi vers codification pour la numérotation elle-même ;
- 1 question ajoutée à la FAQ (HTML + JSON-LD) ; dateModified 2026-09-29, mention « mis à jour » visible ;
- liens vers l'ancre #indice-ou-reference depuis codification-proprietes-solidworks et solidworks-pdm-standard-vs-professional (indexées).

**Bilan** : les 4 pages « explorées, non indexées » ont toutes été retravaillées (ia 27/09, cloud et problématiques PLM 28/09, ECR/ECO 29/09).

**Prochain passage** : pages projets (détectées, jamais explorées) : ajouter des liens depuis des articles du blog ; puis surveiller l'indexation des 6 nouvelles pages outils.

## 2026-09-28 (2) — indexation : page « 5 problématiques PLM »

**Chiffres** : rapport inchangé depuis le passage de ce matin (28/08 → 25/09 : 0,4 clic/jour, 927 impressions, position moyenne 16,2 ; 22 / 28 pages indexées).

**Action** : `/blog/resolutions-problematiques-plm/`, la page non indexée dont le dernier passage de Google est le plus ancien (09/07). Technique OK (rendu en-US en français, canonical, pas de noindex, 200, sitemap, pied de page ; ses paragraphes hérités à `data-translate-key` n'ont pas d'entrée dans le dictionnaire, donc pas de réécriture côté client). Récit d'expérience sans élément actionnable :
- « réponse courte » en tête ;
- tableau « plan d'action » : pour chacun des 5 problèmes, le premier geste de la semaine 1, l'indicateur à suivre et l'article dédié (guide PDM, nomenclature, codification, ECR/ECO, guide PLM) ; le détail reste dans ces articles, sans le répéter ici ;
- 1 question ajoutée à la FAQ (HTML + JSON-LD) ; dateModified 2026-09-28 (il était resté à 2025-09-15), mention « mis à jour » visible ;
- liens depuis integration-bom-erp (renvoi vers le cas vécu de nomenclature) et solidworks-pdm-guide-complet (liste thématique).

**Prochain passage** : relire le rapport pour voir l'effet des 3 pages enrichies (ia, cloud, problématiques PLM) ; ensuite eco-ecr-gestion-modifications, puis les deux pages projets (liens depuis le blog).

## 2026-09-28 — indexation : page cloud PDM / 3DEXPERIENCE

**Chiffres (28/08 → 25/09)** : 10 clics (0,4/jour), 927 impressions, CTR 1,1 %, position moyenne 16,2. **Indexation : 22 / 28** (21 hier ; le glossaire est maintenant indexé).

**Encore non indexées** : eco-ecr (explorée, 07/08), ia-solidworks-pdm (explorée, 14/07 — enrichie hier), migration-cloud (explorée, 12/07), resolutions-plm (explorée, 09/07), projets/robot-orbita et projets/migration-pdm-internationale (passées de « inconnue » à « détectée, non indexée »).

**Action** : `/blog/migration-cloud-pdm-3dexperience/`. Technique OK (rendu en-US en français, canonical, pas de noindex, 200, sitemap, pied de page). Article d'opinion sans élément concret, que rien ne distinguait :
- « réponse courte » en tête (dans quels cas le cloud convient, et comment décider) ;
- grille de coût sur 5 ans : 7 postes × sur site / cloud / ce qui fait varier le chiffre, avec un renvoi vers prix-cout-projet-solidworks-pdm pour les fourchettes (pas de doublon) ;
- 2 questions ajoutées à la FAQ (HTML + JSON-LD) ; dateModified 2026-09-28, mention « mis à jour » visible ;
- liens contextuels depuis prix-cout-projet-solidworks-pdm (section infrastructure) et pdm-ou-plm-quand-basculer (indexées).

Note : la première tentative de ce passage a été bloquée (contrôle de sécurité du shell sans réponse) ; reprise au déclenchement suivant.

**Prochain passage** : resolutions-problematiques-plm (dernier passage 09/07, le plus ancien), puis les pages projets (ajouter des liens depuis les articles du blog).

## 2026-09-27 — indexation : page IA et SOLIDWORKS PDM

**Chiffres (27/08 → 24/09)** : 10 clics (0,4/jour), 935 impressions, CTR 1,1 %, position moyenne 16,6. **Indexation : 21 / 28** (15 au passage du 25/09, soit +6 depuis le passage au français par défaut).

**Encore non indexées** : eco-ecr (explorée, dernier passage 07/08), ia-solidworks-pdm (explorée, 14/07), migration-cloud (explorée, 12/07), resolutions-plm (explorée, 09/07), glossaire (erreur interne de l'API d'inspection), projets/robot-orbita et projets/migration-pdm-internationale (URL inconnues de Google).

**Action** : `/blog/ia-solidworks-pdm-bureau-etudes/`, choisie parce qu'un seul article pointait vers elle (prix-cout). Technique OK (rendu en-US en français, canonical, pas de noindex, 200, dans le sitemap et l'index du pied de page). Page rendue plus concrète et plus distincte des autres articles :
- tableau « où se trouve l'IA aujourd'hui » (poste SOLIDWORKS / 3DEXPERIENCE avec AURA / coffre PDM), avec la source citée (GoEngineer) ;
- grille d'auto-diagnostic : 5 cas d'usage × données lues × contrôle à faire dans le coffre × signal d'alerte, avec des liens vers codification et migration de données au lieu de répéter leur méthode ;
- 2 questions ajoutées à la FAQ (HTML + JSON-LD) ; dateModified 2026-09-27, mention « mis à jour » visible ;
- liens contextuels ajoutés depuis codification-proprietes-solidworks et solidworks-pdm-guide-complet (indexées).

**À soumettre à la main** : ia-solidworks-pdm-bureau-etudes (modifiée), puis eco-ecr-gestion-modifications, migration-cloud-pdm-3dexperience, resolutions-problematiques-plm (non vues depuis plus de 30 jours), projets/robot-orbita, projets/migration-pdm-internationale.

**Prochain passage** : même traitement pour migration-cloud-pdm-3dexperience ou resolutions-problematiques-plm ; comprendre pourquoi les 2 pages projets sont inconnues de Google (liens entrants depuis le blog ?).

## 2026-09-25 (2) — indexation : cause technique trouvée

**Inspection des 28 URL du sitemap** : 15 indexées ; 9 « explorées, actuellement non indexées » (codification, configuration matérielle, eco-ecr, ia-solidworks-pdm, migration-cloud, migration-donnees, pdm-ou-plm, prix-cout-projet, resolutions-plm — dernier passage mai–août) ; 1 « détectée, non indexée » (solidworks-gratuit) ; 3 inconnues (solidworks-pdm-guide-complet, projets/robot-orbita, projets/migration-pdm-internationale).

**Cause** : le site basculait en anglais selon la langue du navigateur. Googlebot rend les pages en en-US : il voyait des articles en anglais sous des titres et des URL françaises.

**Action** : français par défaut, anglais uniquement sur choix explicite (src/js/core/i18n.js, src/partials/head-lang.hbs) ; sitemap daté par dateModified ; lien ajouté vers solidworks-gratuit depuis raccourcis-clavier ; IndexNow sur tout le sitemap.

**À suivre** : ré-inspecter les 12 URL non indexées dans 1 à 2 semaines (API URL Inspection).

## 2026-09-25 — passage manuel (avant la première exécution planifiée)

**Chiffres (25/08 → 22/09)** : 10 clics (0,4/jour), 931 impressions, CTR 1,1 %, position moyenne 17,6.

**Constat** : `/blog/nomenclature-bom-pdm-plm-erp/` fait 633 des 931 impressions (CTR 0,6 %, pos. 22). Elle ressort sur « ebom mbom » (pos. 8,3), « ebom » (12,7), « bom erp » (8,2), « logiciel bom / nomenclature » (42–62) — des requêtes qui ont chacune leur article dédié, vers lesquels le guide ne faisait aucun lien (cannibalisation). Titre de 110 caractères, tronqué dans Google.

**Action** :
- titre / description / og / twitter / JSON-LD réécrits : « Nomenclature (BOM) : définition, eBOM vs mBOM et lien PDM, PLM, ERP » (dateModified 2026-09-25) ;
- 3 encarts de liens contextuels vers `/blog/ebom-vs-mbom/`, `/blog/integration-bom-erp/`, `/blog/logiciel-gestion-nomenclatures/`, et ces 3 articles en « À lire aussi » ;
- rapport GSC enrichi : requêtes par page.

**À suivre au prochain passage** : CTR et position de la page nomenclature (effet attendu sous 1 à 3 semaines) ; positions de `/blog/ebom-vs-mbom/` sur « ebom », « ebom mbom ». Piste suivante : les anciennes URL `/blog/radar-2026-…` encore connues de Google (vérifier qu'elles renvoient bien 404 ou 410), puis une nouvelle page outil (ajustements ISO 286).
