export type Profil = {
  slug: string;
  nom: string;
  couleur: string;
  icone: string;
  accroche: string;
  description: string;
  cta: string;
};

// Couleurs et icônes reprises du croquis passation/croquis/ecran-01 (⚠️ hors charte graphique officielle
// pour testateurs/entreprises/organisateurs — à faire confirmer par les cadreurs, cf. ITERATIONS.md Itération 5).
const PROFILS: readonly Profil[] = [
  {
    slug: "particuliers",
    nom: "Particuliers",
    couleur: "#ec4899",
    icone: "♥",
    accroche: "Je veux donner ou courir",
    description: "Faire un don, m'inscrire à une course solidaire, créer ma page de collecte.",
    cta: "Faire un don",
  },
  {
    slug: "testateurs",
    nom: "Testateurs",
    couleur: "#7c3aed",
    icone: "💧",
    accroche: "Je souhaite transmettre",
    description: "Legs, donation, assurance-vie : préparer une transmission en toute sérénité.",
    cta: "Préparer ma transmission",
  },
  {
    slug: "entreprises",
    nom: "Entreprises",
    couleur: "#0d9488",
    icone: "💼",
    accroche: "J'engage mon entreprise",
    description: "Mécénat, équipe de coureurs, mobilisation des collaborateurs.",
    cta: "Devenir partenaire",
  },
  {
    slug: "organisateurs",
    nom: "Organisateurs",
    couleur: "#f97316",
    icone: "🚩",
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
