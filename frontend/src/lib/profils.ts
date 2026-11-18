export type Profil = {
  slug: string;
  nom: string;
  couleur: string;
  cta: string;
};

const PROFILS: readonly Profil[] = [
  { slug: "organisateurs", nom: "Organisateurs", couleur: "#11a2dd", cta: "Organiser une action" },
  { slug: "entreprises", nom: "Entreprises", couleur: "#e64587", cta: "Devenir partenaire" },
];

export function getProfil(slug: string): Profil | undefined {
  return PROFILS.find((profil) => profil.slug === slug);
}

export function listerProfils(): readonly Profil[] {
  return PROFILS;
}
