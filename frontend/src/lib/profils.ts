export type Profil = {
  slug: string;
  nom: string;
  couleur: string;
  accroche: string;
  description: string;
  cta: string;
};

// Couleurs reprises de la charte graphique (passation/prototype/index.html, --i4m-*).
const PROFILS: readonly Profil[] = [
  {
    slug: "particuliers",
    nom: "Particuliers",
    couleur: "#ec64a0",
    accroche: "Je veux donner ou courir",
    description: "Faire un don, m'inscrire à une course solidaire, créer ma page de collecte.",
    cta: "Faire un don",
  },
  {
    slug: "testateurs",
    nom: "Testateurs",
    couleur: "#83bce7",
    accroche: "Je souhaite transmettre",
    description: "Legs, donation, assurance-vie : préparer une transmission en toute sérénité.",
    cta: "Préparer ma transmission",
  },
  {
    slug: "entreprises",
    nom: "Entreprises",
    couleur: "#e64587",
    accroche: "J'engage mon entreprise",
    description: "Mécénat, équipe de coureurs, mobilisation des collaborateurs.",
    cta: "Devenir partenaire",
  },
  {
    slug: "organisateurs",
    nom: "Organisateurs",
    couleur: "#11a2dd",
    accroche: "J'organise un événement",
    description: "Course, tournoi, concert, vente... collecter au profit de la recherche.",
    cta: "Organiser une action",
  },
];

export function getProfil(slug: string): Profil | undefined {
  return PROFILS.find((profil) => profil.slug === slug);
}

export function listerProfils(): readonly Profil[] {
  return PROFILS;
}
