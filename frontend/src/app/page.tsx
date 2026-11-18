import Link from "next/link";
import { listerProfils } from "@/lib/profils";

const AGIR_CARTES = [
  { icone: "♥", titre: "Faire un don", href: "/don" },
  { icone: "🏃", titre: "Participer à une course solidaire", href: "/profil/particuliers" },
  { icone: "📣", titre: "Créer une collecte", href: "/profil/particuliers" },
  { icone: "💧", titre: "Transmettre par un legs", href: "/profil/testateurs" },
  { icone: "🤗", titre: "Devenir bénévole", href: "/contact" },
  { icone: "🚩", titre: "Organiser une action solidaire", href: "/profil/organisateurs" },
];

const IMPACT_CHIFFRES = [
  { valeur: "1 800", libelle: "bénévoles mobilisés" },
  { valeur: "200+", libelle: "actions solidaires par an" },
  { valeur: "7,4 M€", libelle: "de ressources en 2025 dédiées à la mission" },
];

export default function Home() {
  return (
    <main className="homepage">
      <section className="hero hero-deux-colonnes">
        <div className="hero-contenu">
          <h1>Ensemble, faisons avancer la recherche contre les cancers des enfants</h1>
          <p>Vous êtes... Choisissez votre profil, on vous guide pas à pas.</p>
          <div className="hero-ctas">
            <Link href="/don" className="hero-cta-primaire">
              Faire un don →
            </Link>
            <Link href="/association" className="hero-cta-secondaire">
              Découvrir nos actions
            </Link>
          </div>
        </div>
        <div className="hero-photo" aria-hidden="true" />
      </section>

      <h2 className="profils-intro">Comment souhaitez-vous agir ?</h2>
      <ul className="profils-cartes">
        {listerProfils().map((profil) => (
          <li key={profil.slug} className="profil-carte" style={{ borderTopColor: profil.couleur }}>
            <div className="profil-carte-photo" aria-hidden="true" />
            <span
              className="profil-carte-icone"
              style={{ background: `${profil.couleur}22`, color: profil.couleur }}
              aria-hidden="true"
            >
              {profil.icone}
            </span>
            <p className="profil-carte-kicker" style={{ color: profil.couleur }}>
              {profil.nom}
            </p>
            <h2>{profil.accroche}</h2>
            <p>{profil.description}</p>
            <Link href={`/profil/${profil.slug}`} className="profil-carte-cta" style={{ background: profil.couleur }}>
              {profil.cta} →
            </Link>
          </li>
        ))}
      </ul>

      <section className="agir-section">
        <h2>Agir à votre manière</h2>
        <ul className="agir-grille">
          {AGIR_CARTES.map((carte) => (
            <li key={carte.titre}>
              <Link href={carte.href} className="agir-carte">
                <span aria-hidden="true">{carte.icone}</span>
                {carte.titre}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mobilisation-bandeau">
        <div className="mobilisation-photo" aria-hidden="true" />
        <div className="mobilisation-contenu">
          <h2>Mobilisez votre organisation pour les enfants</h2>
          <p>Entreprise, école, club : donnez du sens à votre organisation en la mobilisant pour la recherche.</p>
          <div className="hero-ctas">
            <Link href="/nous-soutenir" className="hero-cta-primaire">
              Devenir partenaire
            </Link>
            <button type="button" className="hero-cta-secondaire" disabled>
              Télécharger la plaquette
            </button>
          </div>
        </div>
      </section>

      <section className="partenaires-section">
        <h2>Ils nous soutiennent</h2>
        <ul className="partenaires-bande">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <li key={n} className="partenaire-tuile" aria-hidden="true" />
          ))}
        </ul>
        <p className="rubrique-note">
          ❓ Logos et noms réels à confirmer par l&apos;association avant publication finale — aucun partenaire
          nommé n&apos;est confirmé dans la passation.
        </p>
      </section>

      <section className="impact-section">
        <div className="association-photo" aria-hidden="true">
          Photo de terrain
        </div>
        <div>
          <h2>Notre combat, un impact concret</h2>
          <ul className="association-chiffres">
            {IMPACT_CHIFFRES.map((chiffre) => (
              <li key={chiffre.libelle}>
                <strong>{chiffre.valeur}</strong>
                <span>{chiffre.libelle}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
