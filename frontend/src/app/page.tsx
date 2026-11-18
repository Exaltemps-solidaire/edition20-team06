import Link from "next/link";
import { listerProfils } from "@/lib/profils";

export default function Home() {
  return (
    <main className="homepage">
      <h1>Le Fil</h1>
      <p>Choisissez votre profil : nous vous montrons le parcours adapté.</p>
      <ul className="profils-liste">
        {listerProfils().map((profil) => (
          <li key={profil.slug}>
            <Link
              href={`/profil/${profil.slug}`}
              className="profil-bouton"
              style={{ background: profil.couleur }}
            >
              {profil.nom}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
