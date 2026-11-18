export type Evenement = {
  titre: string;
  date: string;
  lieu: string;
};

export type Article = {
  categorie: string;
  titre: string;
  date: string;
};

export const CATEGORIES = [
  "Tout",
  "Savoirs médicaux",
  "Recherche",
  "Événement",
  "Collecte",
  "Vie de l'association",
] as const;

export const EVENEMENTS: readonly Evenement[] = [
  {
    titre: "Course solidaire de fin d'année",
    date: "6 décembre 2026",
    lieu: "Parc de la Villette, Paris",
  },
  {
    titre: "Soirée de gala Imagine for Margo",
    date: "14 janvier 2027",
    lieu: "Hôtel de Ville, Paris",
  },
];

export const ARTICLES: readonly Article[] = [
  {
    categorie: "Savoirs médicaux",
    titre: "Comprendre le traitement : ce que les équipes soignantes expliquent aux familles",
    date: "17 novembre 2026",
  },
  {
    categorie: "Recherche",
    titre: "Un nouveau protocole financé grâce à vos dons",
    date: "28 septembre 2026",
  },
  {
    categorie: "Événement",
    titre: "Retour sur la Course de Margo 2026",
    date: "12 octobre 2026",
  },
  {
    categorie: "Collecte",
    titre: "Bilan de la collecte 2026 et remerciements",
    date: "28 octobre 2026",
  },
  {
    categorie: "Vie de l'association",
    titre: "Le témoignage d'une famille accompagnée par l'association",
    date: "15 septembre 2026",
  },
];

export function filtrerArticles(
  articles: readonly Article[],
  { recherche, categorie }: { recherche: string; categorie: string },
): Article[] {
  const rechercheNormalisee = recherche.trim().toLowerCase();
  return articles.filter((article) => {
    const categorieOk = categorie === "Tout" || article.categorie === categorie;
    const rechercheOk =
      rechercheNormalisee === "" || article.titre.toLowerCase().includes(rechercheNormalisee);
    return categorieOk && rechercheOk;
  });
}
