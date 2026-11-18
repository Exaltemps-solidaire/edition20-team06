const MISSIONS = [
  {
    icone: "🔬",
    titre: "Financer la recherche",
    description:
      "Des appels à projets scientifiques, dont le programme européen Fight Kids Cancer, pour accélérer la recherche contre les cancers pédiatriques.",
  },
  {
    icone: "🎤",
    titre: "Mobiliser",
    description:
      "Le colloque FAST réunit chercheurs et soignants ; l'association porte aussi un plaidoyer pour la recherche pédiatrique.",
  },
  {
    icone: "📢",
    titre: "Sensibiliser",
    description:
      "Une campagne nationale chaque année, Septembre en Or, pour informer le grand public sur les cancers de l'enfant.",
  },
  {
    icone: "🤗",
    titre: "Soutenir les enfants et les familles",
    description:
      "Un accompagnement à l'hôpital, et des week-ends de répit pour souffler en dehors des traitements.",
  },
];

const CHIFFRES_EQUIPE = [
  { valeur: "17", libelle: "salariés" },
  { valeur: "1 800", libelle: "bénévoles" },
  { valeur: "2011", libelle: "année de création, à Saint-Germain-en-Laye" },
  { valeur: "France & Europe", libelle: "zones d'action" },
];

const ACTIONS = [
  {
    titre: "Course Enfants sans Cancer",
    description: "Un événement sportif populaire organisé au profit de la recherche contre les cancers pédiatriques.",
  },
  {
    titre: "Les Rallyes du Cœur",
    description: "Des rallyes organisés partout en France pour collecter des fonds et sensibiliser le public.",
  },
  {
    titre: "Plus de 200 actions par an",
    description:
      "Écoles, entreprises, clubs : plus de 200 actions solidaires sont organisées chaque année par des soutiens d'Imagine for Margo.",
  },
];

export default function AssociationPage() {
  return (
    <main className="page-rubrique">
      <section className="hero hero-petit">
        <h1>l&apos;Association</h1>
        <p>
          Imagine for Margo, reconnue d&apos;utilité publique depuis 2024, labellisée IDEAS depuis 2018 — 7,4 M€ de
          ressources en 2025.
        </p>
      </section>

      <section className="soutien-section">
        <h2>Mission</h2>
        <ul className="soutien-cartes">
          {MISSIONS.map((mission) => (
            <li key={mission.titre} className="soutien-carte">
              <span className="soutien-carte-icone" aria-hidden="true">
                {mission.icone}
              </span>
              <h3>{mission.titre}</h3>
              <p>{mission.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="soutien-section">
        <h2>Équipe</h2>
        <div className="association-photo" aria-hidden="true">
          Photo de l&apos;équipe
        </div>
        <ul className="association-chiffres">
          {CHIFFRES_EQUIPE.map((chiffre) => (
            <li key={chiffre.libelle}>
              <strong>{chiffre.valeur}</strong>
              <span>{chiffre.libelle}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="soutien-section">
        <h2>Actions</h2>
        <ul className="action-cartes">
          {ACTIONS.map((action) => (
            <li key={action.titre} className="action-carte">
              <div className="fil-article-photo" aria-hidden="true" />
              <h3>{action.titre}</h3>
              <p>{action.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="soutien-section">
        <h2>Rapports</h2>
        <p>
          Chaque année, Imagine for Margo publie son rapport d&apos;activité et ses comptes annuels.
        </p>
        <button type="button" className="fil-voir-plus" disabled>
          Télécharger le rapport d&apos;activité
        </button>
      </section>
    </main>
  );
}
