const CATEGORIES = ["Tout", "Courses", "Recherche", "Témoignages"];

const ARTICLES = [
  {
    categorie: "Courses",
    titre: "La Course de Margo réunit 2000 participants",
    date: "12 octobre 2026",
  },
  {
    categorie: "Recherche",
    titre: "Un nouveau protocole financé grâce à vos dons",
    date: "28 septembre 2026",
  },
  {
    categorie: "Témoignages",
    titre: "Le témoignage d'une famille accompagnée par l'association",
    date: "15 septembre 2026",
  },
];

export default function FilPage() {
  return (
    <main className="page-rubrique">
      <h1>Le Fil</h1>
      <input
        type="search"
        placeholder="Rechercher un article, un événement..."
        className="fil-recherche"
        disabled
      />
      <ul className="fil-categories">
        {CATEGORIES.map((categorie) => (
          <li key={categorie} className={categorie === "Tout" ? "active" : undefined}>
            {categorie}
          </li>
        ))}
      </ul>
      <ul className="fil-articles">
        {ARTICLES.map((article) => (
          <li key={article.titre} className="fil-article">
            <div className="fil-article-photo" aria-hidden="true" />
            <span className="fil-article-tag">{article.categorie}</span>
            <h2>{article.titre}</h2>
            <p>{article.date}</p>
          </li>
        ))}
      </ul>
      <button type="button" className="fil-voir-plus" disabled>
        Voir plus d&apos;articles
      </button>
    </main>
  );
}
