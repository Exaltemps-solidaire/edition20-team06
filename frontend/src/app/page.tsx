import Link from "next/link";
import { listerProfils } from "@/lib/profils";

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
    </main>
  );
}
