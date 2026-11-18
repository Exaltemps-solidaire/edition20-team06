import { describe, expect, it } from "vitest";
import { filtrerArticles, type Article } from "./fil";

const ARTICLES: Article[] = [
  { categorie: "Recherche", titre: "Un nouveau protocole financé grâce à vos dons", date: "28 septembre 2026" },
  { categorie: "Collecte", titre: "Bilan de la collecte 2026 et remerciements", date: "28 octobre 2026" },
  { categorie: "Recherche", titre: "Vers un traitement plus ciblé", date: "1 janvier 2027" },
];

describe("filtrerArticles", () => {
  it("renvoie tous les articles pour la catégorie Tout et une recherche vide", () => {
    expect(filtrerArticles(ARTICLES, { recherche: "", categorie: "Tout" })).toEqual(ARTICLES);
  });

  it("filtre par catégorie", () => {
    const resultat = filtrerArticles(ARTICLES, { recherche: "", categorie: "Collecte" });
    expect(resultat).toEqual([ARTICLES[1]]);
  });

  it("filtre par texte de recherche, insensible à la casse", () => {
    const resultat = filtrerArticles(ARTICLES, { recherche: "PROTOCOLE", categorie: "Tout" });
    expect(resultat).toEqual([ARTICLES[0]]);
  });
});
