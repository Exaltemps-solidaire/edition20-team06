import { notFound } from "next/navigation";
import { getProfil, listerProfils } from "@/lib/profils";

export function generateStaticParams() {
  return listerProfils().map((profil) => ({ slug: profil.slug }));
}

export default async function ProfilPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profil = getProfil(slug);
  if (!profil) {
    notFound();
  }

  return (
    <main className="landing-profil" style={{ borderTop: `6px solid ${profil.couleur}` }}>
      <h1 style={{ color: profil.couleur }}>{profil.nom}</h1>
      <button type="button" style={{ backgroundColor: profil.couleur }}>
        {profil.cta}
      </button>
    </main>
  );
}
