# Journal SEO — www.baouch.fr

Une entrée par passage, la plus récente en haut. Données : branche `seo-data` (gsc-report.md).

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
