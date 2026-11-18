"use client";

import { useMemo, useState } from "react";
import { ARTICLES, CATEGORIES, EVENEMENTS, filtrerArticles } from "@/lib/fil";

export default function FilPage() {
  const [recherche, setRecherche] = useState("");
  const [categorie, setCategorie] = useState<string>("Tout");

  const articlesFiltres = useMemo(
    () => filtrerArticles(ARTICLES, { recherche, categorie }),
    [recherche, categorie],
  );

  return (
    <main className="page-rubrique">
      <h1>Le Fil</h1>

      <section className="fil-evenements">
        <h2>Événements à venir</h2>
        <ul>
          {EVENEMENTS.map((evenement) => (
            <li key={evenement.titre} className="evenement-carte">
              <span className="evenement-date">{evenement.date}</span>
              <div>
                <p className="evenement-titre">{evenement.titre}</p>
                <p className="evenement-lieu">{evenement.lieu}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Toutes les actualités</h2>
        <input
          type="search"
          value={recherche}
          onChange={(event) => setRecherche(event.target.value)}
          placeholder="Rechercher un sujet, un événement..."
          className="fil-recherche"
        />
        <ul className="fil-categories">
          {CATEGORIES.map((cat) => (
            <li key={cat}>
              <button
                type="button"
                className={cat === categorie ? "active" : undefined}
                onClick={() => setCategorie(cat)}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
        {articlesFiltres.length === 0 ? (
          <p>Aucun article ne correspond à votre recherche.</p>
        ) : (
          <ul className="fil-articles">
            {articlesFiltres.map((article) => (
              <li key={article.titre} className="fil-article">
                <div className="fil-article-photo" aria-hidden="true" />
                <span className="fil-article-tag">{article.categorie}</span>
                <h3>{article.titre}</h3>
                <p>{article.date}</p>
              </li>
            ))}
          </ul>
        )}
        <button type="button" className="fil-voir-plus" disabled>
          Voir plus d&apos;articles
        </button>
      </section>
    </main>
  );
}
