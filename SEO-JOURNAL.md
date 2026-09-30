# Journal SEO — www.baouch.fr

Une entrée par passage, la plus récente en haut. Données : branche `seo-data` (gsc-report.md).

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
