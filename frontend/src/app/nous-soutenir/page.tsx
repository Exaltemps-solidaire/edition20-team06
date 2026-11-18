import Link from "next/link";

const ENTREPRISES = [
  {
    icone: "💶",
    titre: "Mécénat financier",
    description:
      "Un don de votre entreprise finance directement un programme de recherche contre les cancers pédiatriques, avec un reçu fiscal de mécénat.",
  },
  {
    icone: "🤝",
    titre: "Dons de compétences",
    description:
      "Mettez l'expertise de vos équipes au service de l'association : communication, juridique, logistique, développement.",
  },
  {
    icone: "🏃",
    titre: "Journée solidaire",
    description:
      "Organisez une journée de sensibilisation, une course ou une collecte avec vos salariés, au profit de la recherche.",
  },
];

const COLLECTIFS = [
  {
    icone: "🏫",
    titre: "Écoles et établissements",
    description:
      "Une classe ou un établissement organise une vente, un loto ou une kermesse solidaire au profit de la recherche.",
  },
  {
    icone: "⚽",
    titre: "Clubs et associations sportives",
    description: "Mobilisez votre club pour une course, un tournoi ou un match caritatif.",
  },
  {
    icone: "🎉",
    titre: "Associations et comités des fêtes",
    description: "Associez votre événement associatif existant à la cause et reversez les bénéfices collectés.",
  },
];

const PARTENAIRES = [
  {
    icone: "🏥",
    titre: "Acteurs de la santé",
    description: "Laboratoires, cliniques et professionnels de santé qui soutiennent la recherche sur la durée.",
  },
  {
    icone: "🏢",
    titre: "Grandes entreprises",
    description: "Groupes nationaux engagés dans un partenariat pluriannuel avec l'association.",
  },
  {
    icone: "🏪",
    titre: "PME et commerces locaux",
    description: "Entreprises de proximité qui reversent une part de leurs ventes ou organisent une collecte.",
  },
];

function SectionCartes({ titre, cartes }: { titre: string; cartes: typeof ENTREPRISES }) {
  return (
    <section className="soutien-section">
      <h2>{titre}</h2>
      <ul className="soutien-cartes">
        {cartes.map((carte) => (
          <li key={carte.titre} className="soutien-carte">
            <span className="soutien-carte-icone" aria-hidden="true">
              {carte.icone}
            </span>
            <h3>{carte.titre}</h3>
            <p>{carte.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function NousSoutenirPage() {
  return (
    <main className="page-rubrique">
      <section className="hero hero-petit">
        <h1>Nous soutenir</h1>
        <p>Entreprises, collectifs, partenaires : il existe une façon de vous engager à nos côtés.</p>
      </section>

      <SectionCartes titre="Entreprises" cartes={ENTREPRISES} />
      <SectionCartes titre="Collectifs" cartes={COLLECTIFS} />
      <SectionCartes titre="Partenaires" cartes={PARTENAIRES} />

      <div className="soutien-cta">
        <Link href="/contact" className="don-cta">
          Devenir partenaire →
        </Link>
      </div>
    </main>
  );
}
