import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Link from "next/link";
import Footer from "@/components/Footer";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Imagine for Margo – Le Fil",
  description: "Le parcours adapté à votre profil",
};

const ONGLETS = [
  { href: "/", nom: "Accueil" },
  { href: "/fil", nom: "Fil d'actualité" },
  { href: "/don", nom: "Faire un don" },
  { href: "/nous-soutenir", nom: "Nous soutenir" },
  { href: "/association", nom: "l'Association" },
  { href: "/contact", nom: "Contact" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={poppins.variable}>
      <body>
        <header className="header">
          <Link href="/" className="header-logo">
            Imagine for Margo
          </Link>
          <a className="header-don" href="/don">
            Faire un don
          </a>
        </header>
        <nav className="onglets" aria-label="Rubriques">
          {ONGLETS.map((onglet) => (
            <Link key={onglet.href} href={onglet.href}>
              {onglet.nom}
            </Link>
          ))}
        </nav>
        {children}
        <Footer />
      </body>
    </html>
  );
}
