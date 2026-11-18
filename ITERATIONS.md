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

---

## À venir (non détaillé, à affiner si le temps est prolongé)

1. Itération 3 : page Fil d'actualité (articles à la une + filtres) — correspond aussi à l'étape 2 du plan de livraison de l'équipe.
2. Itération 4 : page Faire un don (texte explicatif + renvoi vers iRaiser, pas de formulaire propre).
3. Itération 5 : Nous soutenir — sous-page Entreprises partenaires.
4. Itération 6 : Nous soutenir — sous-page Actions solidaires effectuées.
5. Itération 7 : Contact — formulaire (+ newsletter selon la réponse du développeur à la question ❓ ci-dessus).
6. ❓ Landing pages Particuliers et Testateurs, pour compléter les 4 profils du header — la passation ne donne pas de CTA pour ces deux profils (contrairement à Organisateurs et Entreprises) : à demander aux cadreurs avant de coder, ou à proposer par analogie.
7. Écran « Qui êtes-vous ? » au lancement (choix d'une persona par rôle, bouton pour en changer).
8. Le Fil – liste filtrée avec publication : le responsable communication crée un article, lui attribue une catégorie, le publie (étape 3 du plan de l'équipe).
