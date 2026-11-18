import Link from "next/link";
import { listerProfils } from "@/lib/profils";

export default function Home() {
  return (
    <main className="homepage">
      <section className="hero">
        <h1>Ensemble, faisons avancer la recherche contre les cancers des enfants</h1>
        <p>Vous êtes... Choisissez votre profil, on vous guide pas à pas.</p>
      </section>
      <ul className="profils-cartes">
        {listerProfils().map((profil) => (
          <li key={profil.slug} className="profil-carte" style={{ borderTopColor: profil.couleur }}>
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
            <Link href={`/profil/${profil.slug}`} style={{ color: profil.couleur }}>
              Mon parcours →
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
