# Déploiement

Imagine for Margo – « Le Fil » : un site segmenté par profil (particuliers, entreprises,
testateurs, organisateurs) pour que chaque visiteur trouve son parcours. Prototype de hackathon,
sans connexion ni compte.

## Services

- `frontend/` : export statique Next.js, servi par nginx, port 80 (conteneur) / 8080 (publié). **Service exposé.**
- `api/` : service Node minimal, port 8081 (conteneur et publié). Aujourd'hui : seulement `/health` et `/sante`.

## Services externes

Aucun pour l'instant (aucun appel IA, e-mail, carte ou paiement). Le bouton « Faire un don »
pointe vers `#` : il renverra vers le formulaire iRaiser existant de l'association, non câblé
dans cette itération.

## Connu comme fragile ou inachevé

- Seules les landing pages Organisateurs et Entreprises existent ; Particuliers et Testateurs
  sont dans le menu mais n'ont pas de page (404 statique).
- Aucun contenu éditorial (« Le Fil ») : pas d'articles, pas de publication.
- L'api ne sert aucune route métier, uniquement les routes de santé.

## Contacts

- Équipe : équipe 06 (hackathon eXaltemps Solidaire).
- Association : Imagine for Margo.
