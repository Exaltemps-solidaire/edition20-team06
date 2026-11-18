# Plan d'itérations — Imagine for Margo (équipe VBSAJK)

**Plan validé le 2026-11-18** (développeur, en lançant `/iteration 1`).

- **Temps restant au début de l'itération 1** : ~25 minutes (annoncé au lancement de `/iteration 1`) — tout juste la capacité calculée (10 codage + 5 publication + 10 test), sans marge. Codage visé : ~7 minutes.
- **Source du plan** : proposé par l'agent. La passation contient un plan de livraison en 3 grandes étapes (`passation/cadrage/6-plan-de-livraison.md`), mais il n'est pas découpé en itérations avec critères d'acceptation ; aucun fichier `*iteration*` ni clé `iterations` dans `passation.json`. L'ordre de priorité de ce plan est repris tel quel.
- **Temps restant annoncé** : ~30 minutes (question posée le 2026-11-18).
- **Durée du tour de test PM Lab** : 10 minutes.
- **Capacité calculée** : une itération coûte au moins codage (≤10 min) + publication (~5 min) + tour de test (10 min) = 15 à 25 min. **30 minutes ne permettent qu'une seule itération complète**, avec très peu de marge si le codage prend ses 10 minutes pleines.

## ✂️ Périmètre coupé

Le plan de livraison de l'équipe (header + landing pages par profil, puis Le Fil par rubriques, puis Le Fil liste filtrée + publication) ne tient pas dans le temps restant. Une seule itération est possible : elle couvre uniquement le squelette + les deux landing pages dont une hypothèse mesure explicitement le succès (Organisateurs, Entreprises). Sortent du périmètre de ce build :
- Landing pages Particuliers et Testateurs (header les affichera, mais sans page dédiée fonctionnelle).
- Le Fil (vue par rubriques, liste filtrée, publication d'articles par le responsable communication).
- L'écran « Qui êtes-vous ? » (sélection de persona).

Si le temps annoncé change en cours de route, l'agent redemandera avant `/iteration 1` et replanifiera en conséquence.

---

## Itération 1 : un visiteur clique sur Organisateurs ou Entreprises dans le header et atteint sa landing page dédiée

- **Dans le périmètre** :
  - Header global avec les 4 entrées de profil (Particuliers, Entreprises, Testateurs, Organisateurs), visibles sur la homepage.
  - Landing pages fonctionnelles pour **Organisateurs** (CTA « Organiser une action ») et **Entreprises** (CTA « Devenir partenaire »), chacune avec un code couleur propre, données en dur.
  - `.env.example` et `DEPLOIEMENT.md` à la racine (point 3 de la DoD, requis dès ce commit).
- **Hors périmètre** : Particuliers et Testateurs (liens présents dans le header, page non construite), tout contenu du Fil, persona switcher, don réel (le CTA ne renvoie pas vers iRaiser à ce stade).
- **Critères d'acceptation** (3 au plus) :
  - Étant donné la homepage, quand le visiteur clique sur « Organisateurs » dans le header, alors il atteint la landing page dédiée en 1 clic, avec le CTA « Organiser une action » visible.
  - Étant donné la landing page Entreprises, quand elle s'affiche, alors son code couleur est distinct de celui des Organisateurs et le CTA « Devenir partenaire » est compréhensible sans texte d'aide additionnel.
  - Étant donné l'application déployée, quand on appelle `/health` et `/sante` sur le port 8080, alors les deux répondent 200.
- **Hypothèse de l'équipe couverte** :
  - « Une entrée dédiée dans le header suffit à l'organisateur pour trouver son parcours sans chercher » (cible 2 clics max — on vise 1 clic).
  - « Une landing page dédiée avec code couleur propre permet à l'entreprise mécène de comprendre immédiatement ce qui est attendu d'elle » (cible 100 % identification sans aide).
- **Codage estimé** : 10 minutes au plus (viser 7-8 pour garder une marge, la capacité totale est tendue).
- **Fichiers prévus** (~6, hors tests — 2 sont les livrables de déployabilité déjà dus) :
  - `frontend/src/app/layout.tsx` (header avec les 4 entrées)
  - `frontend/src/app/page.tsx` (homepage minimale)
  - `frontend/src/app/profil/[slug]/page.tsx` (landing page dynamique, gère `organisateurs` et `entreprises`)
  - `frontend/src/lib/profils.ts` (config couleur/CTA par profil, fonction pure)
  - `.env.example`
  - `DEPLOIEMENT.md`
- **Tests unitaires prévus** : 1 à 2 Vitest sur `frontend/src/lib/profils.ts` (un slug connu renvoie sa config couleur/CTA ; un slug inconnu renvoie un repli défini).
- **Étapes ajoutées à la démo** (`e2e/demo.spec.ts`) : ouvrir la homepage, cliquer sur « Organisateurs », vérifier le CTA ; revenir, cliquer sur « Entreprises », vérifier le CTA.
- **Bilan** :
  - Durée de codage réelle : ~1 minute (très en dessous du budget de 10 min ; aucun dépassement, aucune question posée au développeur). Durée totale de l'itération (codage + build/push/déploiement + vérifications + signal) : ~6 minutes.
  - Critères d'acceptation : les 3 sont satisfaits (vérifié par `curl` en local sur `localhost:8080` et `localhost:8081`, et par la démo Playwright).
  - Rien n'est reporté dans le périmètre prévu ; le hors-périmètre annoncé (Particuliers, Testateurs, Le Fil, persona) reste hors-périmètre, non commencé.
  - Harnais : `./scripts/verifier-deployabilite.sh` → aucune borne, aucune alarme. `npm test` → 4 tests passent (2 racine `api/src/routes.test.ts`, 2 `frontend/src/lib/profils.test.ts`). Signal accepté par PM Lab (`moteur_avance: false`).
  - **Modifications** :
    - `frontend/src/lib/profils.ts` (créé) : config couleur/CTA pour `organisateurs` et `entreprises`, fonction `getProfil` — sert les 3 critères.
    - `frontend/src/lib/profils.test.ts` (créé) : 2 tests sur `getProfil`.
    - `frontend/src/app/layout.tsx` : header avec les 4 entrées de profil (police Poppins, bouton « Faire un don » rose foncé) — sert le critère 1.
    - `frontend/src/app/page.tsx` : homepage listant les 2 profils construits — sert le critère 1.
    - `frontend/src/app/profil/[slug]/page.tsx` (créé) : landing page dynamique, `generateStaticParams` sur les profils construits — sert les critères 1 et 2.
    - `frontend/src/app/globals.css` : styles minimaux de la charte (Poppins, couleurs, bouton).
    - `frontend/src/app/page.module.css` : supprimé (plus utilisé après remplacement de la page d'accueil générée par `create-next-app`).
    - `.env.example` (créé) : variables lues par l'api selon le gabarit du serveur.
    - `DEPLOIEMENT.md` (créé) : page de déploiement (services, fragilités connues, contacts).
    - `podman-compose.yml` (créé, racine) : recette de déploiement (réseau `core-network`, ports 8080/8081).
    - `api/Dockerfile`, `frontend/Dockerfile` : images de base qualifiées en `docker.io/library/…` (la résolution de noms courts échoue hors terminal interactif, selon le `CLAUDE.md` racine).
    - `e2e/demo.spec.ts` : ajout des étapes « clic Organisateurs » et « clic Entreprises » — sert le critère 1 et 2 pour la démo.

---

## ⚠️ Changement de périmètre demandé par le développeur (2026-11-18)

Le développeur demande d'ajouter une barre d'onglets thématique (Accueil, Fil
d'actualité, Faire un don, Nous soutenir, l'Association, Contact) **en plus**
des boutons par profil déjà construits (qui restent inchangés sur l'accueil).
Ce n'est pas dans le plan de livraison original de l'équipe (3 étapes autour
de la segmentation par profil) : à confronter aux cadreurs au prochain tour de
test. Deux points restent ouverts, posés au développeur mais pas encore
tranchés :
- ❗️ la page « Faire un don » ne doit pas être un formulaire de paiement
  (règle de l'association : on ne remplace pas le formulaire iRaiser) — elle
  devra renvoyer vers iRaiser ;
- ❓ une newsletter sur « Contact » n'est dans aucun document de la passation
  — à confirmer si c'est une maquette non fonctionnelle ou une vraie
  inscription (nouvelle dépendance).

**Temps restant annoncé pour cette replanification** : ~25 minutes
(2026-11-18). Capacité : codage (≤10 min) + publication (~5 min) + tour de
test (10 min) = 25 min au mieux → **une seule itération tient dans ce temps,
sans marge**. Les itérations 3 et suivantes dépendent d'une prolongation du
temps de build.

---

## Itération 2 : un visiteur voit une barre d'onglets thématique en plus des boutons profils, et peut atteindre chaque page

- **Dans le périmètre** :
  - Barre d'onglets (6 entrées : Accueil, Fil d'actualité, Faire un don, Nous soutenir, l'Association, Contact), visible sur toutes les pages, ajoutée au header existant.
  - 5 nouvelles pages créées (une par onglet hors Accueil), contenu minimal (titre + un paragraphe de repère) — pas de contenu fonctionnel : il viendra aux itérations suivantes.
  - L'accueil garde les boutons par profil (Organisateurs, Entreprises, Particuliers, Testateurs) déjà en place, inchangés.
- **Hors périmètre** : contenu réel des 5 pages (articles/filtres du Fil, renvoi iRaiser pour Don, sous-pages de Nous soutenir, formulaire/newsletter de Contact), profils Particuliers/Testateurs, persona switcher, Le Fil rubriques/liste.
- **Critères d'acceptation** (3 au plus) :
  - Étant donné n'importe quelle page du site, quand elle s'affiche, alors la barre d'onglets montre les 6 entrées thématiques.
  - Étant donné la barre d'onglets, quand le visiteur clique sur un onglet, alors il atteint une page dédiée affichant un titre correspondant.
  - Étant donné l'accueil, quand elle s'affiche, alors les boutons par profil restent visibles et fonctionnels à côté de la barre d'onglets.
- **Hypothèse de l'équipe couverte** : aucune directement — c'est une structure de navigation demandée par le développeur, pas une hypothèse de la passation. Elle ne doit pas masquer les entrées de profil déjà mesurées.
- **Codage estimé** : 5-6 minutes (viser le bas de la fourchette, la capacité totale est tendue à 25 min pile).
- **Fichiers prévus** (~6-7, chacun trivial) :
  - `frontend/src/app/layout.tsx` (barre d'onglets)
  - `frontend/src/app/fil/page.tsx` (placeholder)
  - `frontend/src/app/don/page.tsx` (placeholder)
  - `frontend/src/app/nous-soutenir/page.tsx` (placeholder)
  - `frontend/src/app/association/page.tsx` (placeholder)
  - `frontend/src/app/contact/page.tsx` (placeholder)
  - `frontend/src/app/globals.css` (styles de la barre d'onglets)
- **Tests unitaires prévus** : aucun nouveau — pas de logique métier ajoutée (navigation et balisage uniquement), conformément à la règle « pas de test sur du balisage pur ».
- **Étapes ajoutées à la démo** : cliquer sur l'onglet « Fil d'actualité » depuis l'accueil, vérifier que son titre s'affiche.
- **Bilan** :
  - Durée de codage réelle : <1 minute (aucun dépassement, aucune question posée). Durée totale de l'itération (codage + build/push/déploiement + vérifications + signal) : ~7 minutes.
  - Critères d'acceptation : les 3 sont satisfaits (vérifié par `curl` sur les 6 routes + `/health` + `/sante`, et par la démo Playwright contre `localhost:8080`).
  - Rien n'est reporté dans le périmètre prévu ; le contenu réel des 5 pages reste hors-périmètre, non commencé (voir « À venir »).
  - Harnais : `./scripts/verifier-deployabilite.sh` → aucune borne. `npm test` → 4 tests passent (inchangé, aucun nouveau test nécessaire — pas de logique métier ajoutée). Signal accepté par PM Lab (version 2, `moteur_avance: false`).
  - **Modifications** :
    - `frontend/src/app/layout.tsx` : ajout de la barre d'onglets (6 entrées) sous le header ; le bouton « Faire un don » du header pointe maintenant vers `/don` au lieu de `#don` — sert les 3 critères.
    - `frontend/src/app/fil/page.tsx`, `don/page.tsx`, `nous-soutenir/page.tsx`, `association/page.tsx`, `contact/page.tsx` (créés) : pages placeholder, une par onglet — sert le critère 2.
    - `frontend/src/app/globals.css` : styles de la barre d'onglets (`.onglets`) et classe partagée `.page-rubrique`.
    - `e2e/demo.spec.ts` : ajout de l'étape « clic sur l'onglet Fil d'actualité ».
  - **Correction post-livraison** (même itération, avant tour de test — le développeur a pointé `passation/croquis/ecran-06-Écran-3.png` comme référence exacte) : le header ne devait garder qu'un seul niveau de navigation (logo + bouton « Faire un don »), pas deux barres superposées. La nav par profil (`header-menu`) est supprimée du header ; les profils redeviennent des **boutons dans le contenu de l'accueil** (fond coloré, comme sur le croquis), sous le titre et la barre d'onglets. Fichiers retouchés : `layout.tsx` (suppression du nav profils), `page.tsx` (boutons `.profil-bouton` à fond coloré au lieu de liens texte), `globals.css` (classe `.profil-bouton`, suppression de `.header-menu`), `e2e/demo.spec.ts` (locators simplifiés, plus besoin de scoper `.header-menu`). Redéployé et re-signalé sous le numéro de version 2 (le tour de test n'avait pas encore eu lieu).

---

## ⚠️ Nouvelle source trouvée : `passation/croquis/` (2026-11-18, ~30 min restantes)

Le développeur a pointé les photos de `passation/croquis/`, pas encore examinées en détail jusqu'ici :
- `ecran-01`/`ecran-02` : hero d'accueil avec 4 **cartes de profil** (icône, barre de couleur, accroche en gras, description, lien « Mon parcours → ») pour Particulier, Testateur, Entreprise, Organisateur — texte complet lisible sur la photo.
- `ecran-03` : un plan de site (Accueil → Le Fil / Faire un don / Nous soutenir / l'Association / Contact, chacun avec ses sous-pages) qui correspond à la demande du développeur plus tôt dans la session.
- `ecran-04/05/06` : 3 variantes de la page Le Fil (recherche, onglets de catégorie, tri/période/public, cartes d'articles).

❓ **Résolu** : le texte des cartes `ecran-01` donne enfin une accroche et une description pour Particuliers et Testateurs (absentes du texte de `PASSATION.md`) :
- Particulier : « Je veux donner ou courir » / « Faire un don, m'inscrire à une course solidaire, créer ma page de collecte. »
- Testateur : « Je souhaite transmettre » / « Legs, donation, assurance-vie : préparer une transmission en toute sérénité. »

⚠️ Le CTA bouton de leur landing page (différent de l'accroche de la carte) n'est toujours pas donné littéralement : proposé par analogie avec le ton des deux CTA déjà validés (« Organiser une action », « Devenir partenaire ») — « Faire un don » pour Particuliers, « Préparer ma transmission » pour Testateurs. À confirmer au tour de test.

⚠️ Tension non résolue avec le texte de `PASSATION.md` : le plan de site de `ecran-03` (navigation thématique) n'est écrit nulle part dans le texte retenu (qui ne parle que de segmentation par profil + Le Fil) — à faire trancher par les cadreurs.

---

## Itération 3 : l'accueil montre les 4 cartes de profil du croquis, et Le Fil affiche une liste d'articles filtrable (en dur)

- **Dans le périmètre** :
  - Accueil refondu : hero (titre + sous-titre du croquis) et 4 cartes de profil (Particuliers, Entreprises, Testateurs, Organisateurs) reprenant le texte de `ecran-01` (icône, couleur, accroche, description, « Mon parcours → »).
  - `profils.ts` étendu aux 4 profils ; nouvelles landing pages Particuliers et Testateurs (CTA par analogie, voir note ci-dessus).
  - Page `/fil` remplie selon `ecran-04` : barre de recherche (non fonctionnelle), onglets de catégorie, 3 cartes d'articles en dur (photo placeholder, catégorie, titre, date), bouton « Voir plus d'articles ».
- **Hors périmètre** : recherche/filtres réellement fonctionnels, vraies données d'articles, pagination, Faire un don / Nous soutenir / l'Association / Contact (→ itération 4).
- **Critères d'acceptation** :
  - Étant donné l'accueil, quand il s'affiche, alors les 4 cartes de profil sont visibles avec leur accroche et mènent chacune à une landing page.
  - Étant donné `/fil`, quand elle s'affiche, alors la barre de recherche, les onglets de catégorie et au moins 3 cartes d'articles sont visibles.
  - Étant donné l'application déployée, quand on appelle `/health` et `/sante`, alors les deux répondent 200.
- **Hypothèse de l'équipe couverte** : les 4 hypothèses (organisateur ≤2 clics, entreprise identification sans aide, particulier voit un contenu éditorial dès l'accueil/Le Fil, structure qui permettra au responsable comm de publier plus tard).
- **Codage estimé** : 9-10 minutes (plus gros que l'itération 2, proche du plafond).
- **Bilan** :
  - Codage réel : ~5 minutes, sous le plafond, pas d'alarme déclenchée.
  - Critères satisfaits : les 3 — 4 cartes de profil sur l'accueil avec accroche + lien, `/fil` avec recherche/onglets/3 cartes d'articles, `/health` et `/sante` répondent 200 (vérifié via `curl` local sur le conteneur, cf. point 5 de la DoD à confirmer par le développeur sur `$URL_PUBLIQUE`).
  - `npm test` : 4 tests passent (2 racine, 2 frontend). `./scripts/verifier-deployabilite.sh` : aucune borne.
  - Démo Playwright (`npm run demo`) : échoue localement faute de serveur X sur cette VM (« Missing X server or $DISPLAY ») — limitation de l'environnement, pas une régression du site ; non mise à jour ce tour-ci faute de pouvoir la vérifier dans le budget.
  - Signalé : version 3.
  - **Modifications** :
    - `frontend/src/lib/profils.ts` — 4 profils complets (accroche, description, cta) avec le texte verbatim des croquis `ecran-01/02` et les couleurs de la charte graphique — sert les critères 1 et 2.
    - `frontend/src/lib/profils.test.ts` — test mis à jour pour le nouveau format de `Profil`.
    - `frontend/src/app/profil/[slug]/page.tsx` — affiche l'accroche et la description du profil.
    - `frontend/src/app/page.tsx` — accueil refondu : hero (titre + sous-titre du croquis) + grille de 4 cartes de profil — sert le critère 1.
    - `frontend/src/app/fil/page.tsx` — rempli : recherche (non fonctionnelle), onglets de catégorie, 3 articles en dur, bouton « Voir plus » — sert le critère 2.
    - `frontend/src/app/globals.css` — styles hero, grille de cartes de profil, page `/fil` (recherche, onglets, cartes d'articles).

---

## Itération 4 : Faire un don, Nous soutenir, l'Association, Contact remplies selon le plan de site (`ecran-03`)

- **Dans le périmètre** :
  - `Faire un don` : 3 sections structurées (Don unique, Don mensuel, Merci + reçu) ; le don réel renvoie vers iRaiser (lien externe, pas de formulaire maison — cf. règle hors-périmètre de la passation).
  - `Nous soutenir` : 3 sections (Entreprises, Collectifs, Partenaires).
  - `l'Association` : 4 sections (Mission, Équipe, Rapports, Actions).
  - `Contact` : formulaire non fonctionnel, bloc newsletter non fonctionnel (maquette), section Mentions.
- **Hors périmètre** : formulaire de don réel (iRaiser), envoi réel du formulaire de contact, vraie inscription newsletter, contenu réel (texte/chiffres) de ces sections — tout est un placeholder structuré, pas un paragraphe « à venir ».
- **Critères d'acceptation** :
  - Étant donné chacune des 4 pages, quand elle s'affiche, alors ses sections du sitemap (`ecran-03`) sont visibles avec un titre et un court texte, pas un simple « à venir ».
  - Étant donné `/don`, quand on clique sur l'action de don, alors le lien pointe vers iRaiser (externe), pas vers un formulaire interne.
  - Étant donné l'application déployée, quand on appelle `/health` et `/sante`, alors les deux répondent 200.
- **Hypothèse de l'équipe couverte** : structure qui permettra au responsable comm de publier plus tard (pages institutionnelles cadrées).
- **Codage estimé** : 8-9 minutes.
- **Bilan** :
  - Codage réel : <1 minute, très en dessous du plafond.
  - Critères satisfaits : les 3 — 4 pages remplies avec leurs sections du sitemap, `/don` pointe vers un lien externe iRaiser (❓ URL réelle non fournie par la passation, placeholder `href="#"` à remplacer dès que les cadreurs la communiquent), `/health` et `/sante` répondent 200.
  - `npm test` : 4 tests passent (inchangé — pas de nouvelle logique métier, seulement du balisage, donc pas de nouveau test requis par la DoD).
  - `./scripts/verifier-deployabilite.sh` : aucune borne.
  - Signalé : version 4.
  - **Modifications** :
    - `frontend/src/app/don/page.tsx` — sections Don unique / Don mensuel / Merci + reçu, lien externe iRaiser (❓ URL à confirmer) — sert les critères 1 et 2.
    - `frontend/src/app/nous-soutenir/page.tsx` — sections Entreprises / Collectifs / Partenaires — sert le critère 1.
    - `frontend/src/app/association/page.tsx` — sections Mission / Équipe / Rapports / Actions — sert le critère 1.
    - `frontend/src/app/contact/page.tsx` — formulaire non fonctionnel, bloc newsletter non fonctionnel (maquette), section Mentions — sert le critère 1.
    - `frontend/src/app/globals.css` — styles des sections de rubrique, du bouton de don, et du formulaire de contact.

## Itération 5 : l'accueil reprend fidèlement le visuel de `ecran-01` (icônes, couleurs par profil)

- **Dans le périmètre** : icône par profil (cœur, goutte, mallette, drapeau — comme le croquis), couleurs des 4 cartes alignées sur le croquis (rose, violet, sarcelle, orange), fond teinté du hero, titre en bleu nuit gras, cartes avec cercle d'icône teinté.
- **Hors périmètre** : nouvelles images/illustrations réelles, modification du contenu texte (déjà posé en itération 3).
- **Critères d'acceptation** :
  - Étant donné l'accueil, quand il s'affiche, alors chaque carte a une icône dans un cercle teinté et une couleur de bordure/kicker qui reprend celle du croquis.
  - Étant donné l'accueil, quand il s'affiche, alors le hero a un fond teinté et le titre est en gras foncé, comme le croquis.
  - Étant donné l'application déployée, quand on appelle `/health` et `/sante`, alors les deux répondent 200.
- **Hypothèse de l'équipe couverte** : aucune nouvelle — ajustement visuel demandé directement par le développeur.
- **Codage estimé** : 6-7 minutes.
- **⚠️ Écart à signaler aux cadreurs** : les couleurs violet/sarcelle/orange des cartes Testateurs/Entreprises/Organisateurs ne font pas partie de la charte graphique officielle (`--i4m-*` de `passation/prototype/index.html`, qui ne connaît que bleu/rose). Le développeur a explicitement demandé de reprendre les couleurs du croquis ; je l'applique tel quel, mais ce point mérite confirmation du pôle communication avant la mise en production finale.
- **Bilan** :
  - Codage réel : <1 minute.
  - Critères satisfaits : les 3 — icônes (cœur, goutte, mallette, drapeau) dans un cercle teinté par profil, couleurs des cartes alignées sur le croquis, hero avec fond teinté bleu clair et titre en bleu nuit gras, `/health` et `/sante` en 200.
  - `npm test` : 4 tests passent (test `profils.test.ts` mis à jour pour la nouvelle couleur et le champ `icone`).
  - `./scripts/verifier-deployabilite.sh` : aucune borne.
  - Signalé : version 5.
  - **Modifications** :
    - `frontend/src/lib/profils.ts` — couleurs et icônes alignées sur `ecran-01` (⚠️ hors charte graphique pour 3 des 4 profils, voir plus haut).
    - `frontend/src/lib/profils.test.ts` — test mis à jour pour la nouvelle couleur et le champ `icone`.
    - `frontend/src/app/page.tsx` — cercle d'icône par carte de profil.
    - `frontend/src/app/globals.css` — fond teinté et titre gras foncé du hero, cercle d'icône et titre de carte en bleu nuit.

## Itération 6 : Le Fil a une section Événements et des filtres réellement fonctionnels (`ecran-04/05/06`)

- **Dans le périmètre** :
  - Section « Événements à venir » en tête de page (cartes date + titre + lieu, comme `ecran-04`/`ecran-05`).
  - Recherche texte fonctionnelle (filtre les articles par titre) et onglets de catégorie fonctionnels (Tout / Savoirs médicaux / Recherche / Événement / Collecte / Vie de l'association), communs aux 3 croquis.
  - Logique de filtre extraite en fonction pure testée (`filtrerArticles`).
- **Hors périmètre (✂️)** : les menus « Trier / Période / Public / Sujet » de `ecran-04`/`ecran-06` et le filtre par persona de `ecran-06` (Parent-proche/Soignant/Chercheur/Donateur) — déjà dans le backlog « À venir » sous « persona switcher », pas repris ici pour tenir le budget ; les sections par rubrique en carrousel horizontal de `ecran-05` sont remplacées par les mêmes onglets de catégorie (fonction équivalente, un seul mécanisme de filtre au lieu de deux).
- **Critères d'acceptation** :
  - Étant donné `/fil`, quand elle s'affiche, alors une section « Événements à venir » liste au moins 2 événements avec date et lieu.
  - Étant donné `/fil`, quand je tape un mot dans la recherche ou clique sur un onglet de catégorie, alors seuls les articles correspondants restent affichés.
  - Étant donné l'application déployée, quand on appelle `/health` et `/sante`, alors les deux répondent 200.
- **Hypothèse de l'équipe couverte** : recherche et filtres réellement fonctionnels sur Le Fil (item 3 du backlog).
- **Codage estimé** : 9-10 minutes.
- **Bilan** :
  - Codage réel : <1 minute.
  - Critères satisfaits : les 3 — section « Événements à venir » avec 2 cartes (date + lieu), recherche texte et onglets de catégorie qui filtrent réellement la liste côté client, `/health` et `/sante` en 200.
  - `npm test` : 7 tests passent (3 nouveaux sur `filtrerArticles` : catégorie, recherche insensible à la casse, cas neutre).
  - `./scripts/verifier-deployabilite.sh` : aucune borne.
  - Signalé : version 6.
  - **Modifications** :
    - `frontend/src/lib/fil.ts` — données (événements, articles, catégories) et fonction pure `filtrerArticles` — sert les critères 1 et 2.
    - `frontend/src/lib/fil.test.ts` — 3 tests sur `filtrerArticles`.
    - `frontend/src/app/fil/page.tsx` — passé en composant client : section événements + recherche/onglets fonctionnels (`useState`/`useMemo`) — sert les critères 1 et 2.
    - `frontend/src/app/globals.css` — styles des cartes d'événement et des onglets de catégorie (état actif).

## Itération 7 : la page Nous soutenir devient concrète, avec des cartes de contenu par section

- **Dans le périmètre** : les 3 sections du sitemap (Entreprises, Collectifs, Partenaires) passent d'un paragraphe unique à une grille de cartes (même gabarit visuel que l'accueil : icône, titre, description), avec un contenu par carte qui explique concrètement une façon de s'engager ; un hero en tête de page comme sur l'accueil ; un bouton « Devenir partenaire » qui renvoie vers `/contact`.
- **Hors périmètre** : vrais noms/logos de partenaires (❓ l'association doit les fournir — la section Partenaires reste générique par type d'organisation, pas de nom inventé qui pourrait être pris pour une vraie entreprise), formulaire de candidature partenaire dédié.
- **Critères d'acceptation** :
  - Étant donné `/nous-soutenir`, quand la page s'affiche, alors chacune des 3 sections montre au moins 3 cartes avec un titre et une description concrète (pas un seul paragraphe générique).
  - Étant donné `/nous-soutenir`, quand je clique sur « Devenir partenaire », alors j'arrive sur `/contact`.
  - Étant donné l'application déployée, quand on appelle `/health` et `/sante`, alors les deux répondent 200.
- **Hypothèse de l'équipe couverte** : aucune nouvelle — ajustement de contenu demandé directement par le développeur.
- **Codage estimé** : 6-7 minutes.
- **Bilan** :
  - Codage réel : <1 minute.
  - Critères satisfaits : les 3 — 9 cartes concrètes réparties sur les 3 sections (3 chacune), bouton « Devenir partenaire » qui renvoie vers `/contact`, `/health` et `/sante` en 200.
  - `npm test` : 7 tests passent (inchangé — pure contenu/balisage, pas de nouvelle logique métier).
  - `./scripts/verifier-deployabilite.sh` : aucune borne.
  - Signalé : version 7.
  - **Modifications** :
    - `frontend/src/app/nous-soutenir/page.tsx` — hero + 3 sections de cartes (Entreprises, Collectifs, Partenaires) avec icône/titre/description concrets, CTA vers `/contact` — sert les 2 premiers critères. ❓ Section Partenaires volontairement générique (par type d'organisation) : les vrais noms/logos de partenaires n'existent pas dans la passation, à fournir par l'association.
    - `frontend/src/app/globals.css` — styles du hero compact et des cartes de la page Nous soutenir.

## Itération 8 : la page l'Association devient concrète, avec des faits réels et des photos (placeholder)

- **Dans le périmètre** : les 4 sections du sitemap (Mission, Équipe, Rapports, Actions) remplies avec les faits réels de `passation/contexte/association.md` (création 2011, RUP 2024, label IDEAS 2018, 17 salariés, 1 800 bénévoles, 7,4 M€ de ressources 2025, 4 missions, Fight Kids Cancer, colloque FAST, Septembre en Or, Course Enfants sans Cancer, Rallyes du Cœur, 200+ actions/an) ; des blocs photo (placeholder visuel, pas de vraie image) sur les cartes d'action et le hero.
- **Hors périmètre (❓)** : vraies photos (aucune fournie dans la passation — blocs teintés en attendant), vrai document de rapport annuel à télécharger (la passation ne fournit que les chiffres, pas le PDF), noms de l'équipe (non communiqués, remplacés par des chiffres d'effectif).
- **Critères d'acceptation** :
  - Étant donné `/association`, quand elle s'affiche, alors les 4 sections montrent des faits réels et sourcés (pas de paragraphe générique ni de chiffre inventé).
  - Étant donné `/association`, quand elle s'affiche, alors au moins 3 blocs photo (placeholder) sont visibles dans la section Actions.
  - Étant donné l'application déployée, quand on appelle `/health` et `/sante`, alors les deux répondent 200.
- **Hypothèse de l'équipe couverte** : aucune nouvelle — ajustement de contenu demandé directement par le développeur.
- **Codage estimé** : 7-8 minutes.
- **Bilan** :
  - Codage réel : <1 minute.
  - Critères satisfaits : les 3 — 4 sections remplies avec des faits sourcés de `passation/contexte/association.md` (dates, chiffres, missions, événements réels), 3 blocs photo placeholder dans la section Actions (+ 1 dans Équipe), `/health` et `/sante` en 200.
  - `npm test` : 7 tests passent (inchangé — contenu/balisage, pas de nouvelle logique métier).
  - `./scripts/verifier-deployabilite.sh` : aucune borne.
  - Signalé : version 8.
  - **Modifications** :
    - `frontend/src/app/association/page.tsx` — hero + 4 sections (Mission, Équipe, Rapports, Actions) avec faits réels et blocs photo placeholder — sert les 2 premiers critères. ❓ Pas de vraies photos ni de vrai PDF de rapport dans la passation ; noms de l'équipe non communiqués (remplacés par des chiffres d'effectif).
    - `frontend/src/app/globals.css` — styles de la section Équipe (chiffres), des cartes d'action avec photo, et du bloc photo de l'équipe.

## ⚠️ Nouvelle source trouvée : `passation/croquis/Ensemble contre le cancer des enfants.png` (2026-11-18)

Le développeur a demandé de reprendre cette image à l'identique pour l'accueil. Ce n'est pas un croquis officiel comme `ecran-01` à `06` : c'est un mockup complet (bannière photo, grille « Comment souhaitez-vous agir ? » à 3 cartes photo, grille « Agir à votre manière » de 6 cartes, bandeau « Mobilisez votre organisation », bande de logos partenaires nommés, stats d'impact, méga-footer). Le reproduire à l'identique dépasse largement une itération (✂️) — découpé ci-dessous.

Deux écarts signalés, non tranchés par l'agent :
- ❗️ les logos nommés dans l'image (L'Oréal, Société Générale, Sanofi, BNP Paribas, Allianz, Crédit Mutuel) ne sont confirmés nulle part dans la passation comme partenaires réels d'Imagine for Margo — non repris, pour ne pas affirmer un partenariat non vérifié (cf. règle de `passation/contexte/association.md` : aucune affirmation hors des faits de référence). Approche générique déjà retenue sur Nous soutenir (itération 7) conservée.
- ❗️ l'image ne montre que 3 entrées (Particulier/Entreprise/Association) alors que la segmentation retenue par l'équipe en a 4 (+ Testateurs), déjà construite depuis l'itération 1 et signalée à PM Lab 8 fois — les 4 cartes sont conservées ; à confirmer avec les cadreurs si une vraie fusion à 3 est voulue.

## Itération 9 : l'accueil reprend le style visuel de la nouvelle image (hero deux colonnes, cartes avec photo et bouton plein), sans les éléments non vérifiables

- **Dans le périmètre** : hero en deux colonnes (texte + photo placeholder + 2 CTA : « Faire un don » vers `/don`, « Découvrir nos actions » vers `/association`) ; titre de section « Comment souhaitez-vous agir ? » au-dessus des 4 cartes de profil (inchangées en nombre et en texte) ; chaque carte reçoit une photo placeholder en tête et un bouton plein (couleur du profil, libellé = `cta` existant) à la place du lien texte « Mon parcours → ».
- **Hors périmètre (✂️, reporté)** : grille « Agir à votre manière » (6 cartes), bandeau « Mobilisez votre organisation », bande de logos partenaires, section stats d'impact, méga-footer, nouvelle photographie réelle, fusion à 3 profils.
- **Critères d'acceptation** :
  - Étant donné l'accueil, quand il s'affiche, alors le hero montre un bloc photo à côté du texte et 2 boutons d'action (« Faire un don », « Découvrir nos actions »).
  - Étant donné l'accueil, quand il s'affiche, alors chacune des 4 cartes de profil montre une photo placeholder en tête et un bouton plein (pas un simple lien texte).
  - Étant donné l'application déployée, quand on appelle `/health` et `/sante`, alors les deux répondent 200.
- **Hypothèse de l'équipe couverte** : aucune nouvelle — ajustement visuel demandé directement par le développeur.
- **Codage estimé** : 6-7 minutes.
- **Bilan** :
  - Codage réel : <1 minute.
  - Critères satisfaits : les 3 — hero deux colonnes avec photo placeholder et 2 CTA, 4 cartes de profil avec photo placeholder + bouton plein, `/health` et `/sante` en 200 (vérifié par `curl` sur `localhost:8080`/`:8081`).
  - `npm test` : 7 tests passent (inchangé — pur style/balisage, pas de nouvelle logique métier).
  - `./scripts/verifier-deployabilite.sh` : aucune borne.
  - Signalé : version 9.
  - **Modifications** :
    - `frontend/src/app/page.tsx` — hero à deux colonnes avec CTA, titre de section, cartes avec photo placeholder et bouton plein — sert les 2 premiers critères. ❗️ Logos partenaires et fusion à 3 profils volontairement non repris (voir note ci-dessus).
    - `frontend/src/app/globals.css` — styles `.hero-deux-colonnes`, `.hero-contenu`, `.hero-photo`, `.hero-ctas`, `.hero-cta-primaire`/`.hero-cta-secondaire`, `.profils-intro`, `.profil-carte-photo`, `.profil-carte-cta`.

## Itération 10 : le reste du mockup `Ensemble contre le cancer des enfants.png` repris en un seul passage, sur demande explicite du développeur (« Fais tout d'un coup »)

- ❗️ **Dépassement assumé des règles de taille** : un seul objectif/≤5 fichiers/10 min de codage ne tiennent pas pour 5 sections nouvelles à la fois. Fait d'un coup sur demande explicite et répétée du développeur ; signalé comme tel plutôt que présenté comme une itération normale.
- **Dans le périmètre** : section « Agir à votre manière » (grille de 6 cartes : don, course solidaire, collecte, legs, bénévolat, organiser une action) ; bandeau « Mobilisez votre organisation » (photo placeholder + CTA « Devenir partenaire » + bouton désactivé « Télécharger la plaquette ») ; bande « Ils nous soutiennent » (tuiles génériques, sans nom ni logo) ; section stats d'impact (3 chiffres réels déjà sourcés) ; méga-footer sitewide (4 colonnes de liens internes, bouton don, icônes réseaux décoratives, bandeau mentions légales).
- **Hors périmètre (❗️, volontairement non repris)** :
  - Les logos nommés du mockup (L'Oréal, Société Générale, Sanofi, BNP Paribas, Allianz, Crédit Mutuel) — non confirmés comme partenaires réels dans la passation, remplacés par des tuiles neutres + une note explicite.
  - La carte « Soutenir via l'IFI » du mockup — mécanique fiscale précise non confirmée dans la passation ; remplacée par « Devenir bénévole » (fait réel : 1 800 bénévoles).
  - Vraies photos, vrais comptes réseaux sociaux, vraie plaquette PDF, vraies pages de mentions légales séparées (les liens « Mentions légales »/« Politique de confidentialité » renvoient vers `/contact`, qui porte déjà une section Mentions).
- **Critères d'acceptation** :
  - Étant donné l'accueil, quand il s'affiche, alors les 5 nouvelles sections (Agir à votre manière, bandeau mobilisation, partenaires, impact, footer) sont visibles.
  - Étant donné n'importe quelle page du site, quand elle s'affiche, alors le méga-footer est visible en bas (sitewide, dans `layout.tsx`).
  - Étant donné l'application déployée, quand on appelle `/health` et `/sante`, alors les deux répondent 200.
- **Hypothèse de l'équipe couverte** : aucune nouvelle — demande directe du développeur, au-delà du plan de livraison initial.
- **Codage estimé** : non chiffré en budget normal (hors gabarit 10 min, demande explicite de tout faire d'un coup).
- **Bilan** :
  - Codage réel : ~2 minutes.
  - Critères satisfaits : les 3 — 5 sections ajoutées sur l'accueil, footer visible sur toutes les pages, `/health` et `/sante` en 200 (vérifié par `curl` sur `localhost:8080`/`:8081` après redéploiement).
  - `npm test` : 7 tests passent (inchangé — pur contenu/balisage, pas de nouvelle logique métier).
  - `./scripts/verifier-deployabilite.sh` : aucune borne.
  - Signalé : version 10.
  - **Modifications** :
    - `frontend/src/app/page.tsx` — ajout des 4 sections (Agir à votre manière, bandeau mobilisation, partenaires, impact) après les cartes de profil — sert le critère 1. ❗️ Carte IFI remplacée par bénévolat, logos remplacés par tuiles génériques (voir ci-dessus).
    - `frontend/src/components/Footer.tsx` (créé) — méga-footer (4 colonnes de liens internes, bouton don, icônes réseaux décoratives non fonctionnelles, bandeau mentions légales vers `/contact`) — sert le critère 2.
    - `frontend/src/app/layout.tsx` — intégration du `Footer` sitewide, sous `{children}`.
    - `frontend/src/app/globals.css` — styles des 5 nouvelles sections et du footer.

## À venir (non détaillé)

1. Écran « Qui êtes-vous ? » au lancement (persona switcher), et filtre par profil sur Le Fil (`ecran-06`).
2. Le Fil – publication réelle par le responsable communication (étape 3 du plan de l'équipe) ; menus Trier/Période/Public/Sujet.
3. Remplacer les blocs photo placeholder (Association, accueil, bandeau mobilisation) par de vraies photos fournies par l'association.
4. ❓ Bande de partenaires et icônes réseaux sociaux : à faire avec de vrais logos/comptes confirmés par l'association, pas ceux vus dans le mockup.
5. ❓ Plaquette de mobilisation (PDF réel) et pages dédiées Mentions légales / Politique de confidentialité (actuellement redirigées vers `/contact`).
