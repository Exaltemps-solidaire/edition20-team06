import Link from "next/link";

const COLONNES = [
  {
    titre: "L'association",
    liens: [
      { nom: "Qui sommes-nous", href: "/association" },
      { nom: "Nos actions", href: "/association" },
      { nom: "Rapports annuels", href: "/association" },
    ],
  },
  {
    titre: "Agir",
    liens: [
      { nom: "Faire un don", href: "/don" },
      { nom: "Nous soutenir", href: "/nous-soutenir" },
      { nom: "Le Fil", href: "/fil" },
    ],
  },
  {
    titre: "Profils",
    liens: [
      { nom: "Particuliers", href: "/profil/particuliers" },
      { nom: "Entreprises", href: "/profil/entreprises" },
      { nom: "Testateurs", href: "/profil/testateurs" },
    ],
  },
  {
    titre: "Contact",
    liens: [{ nom: "Nous écrire", href: "/contact" }],
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-colonnes">
        {COLONNES.map((colonne) => (
          <div key={colonne.titre} className="footer-colonne">
            <h3>{colonne.titre}</h3>
            <ul>
              {colonne.liens.map((lien) => (
                <li key={lien.nom}>
                  <Link href={lien.href}>{lien.nom}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-don">
        <Link href="/don" className="hero-cta-primaire">
          Faire un don
        </Link>
        <ul className="footer-reseaux" aria-hidden="true">
          <li>f</li>
          <li>in</li>
          <li>ig</li>
        </ul>
      </div>

      <div className="footer-legal">
        <Link href="/contact">Mentions légales</Link>
        <Link href="/contact">Politique de confidentialité</Link>
      </div>
    </footer>
  );
}
