export default function DonPage() {
  return (
    <main className="page-rubrique">
      <h1>Faire un don</h1>
      <ul className="rubrique-sections">
        <li>
          <h2>Don unique</h2>
          <p>Un don ponctuel pour soutenir la recherche contre les cancers des enfants.</p>
        </li>
        <li>
          <h2>Don mensuel</h2>
          <p>Un soutien régulier, prélevé chaque mois, pour financer la recherche dans la durée.</p>
        </li>
        <li>
          <h2>Merci + reçu</h2>
          <p>Un reçu fiscal est généré automatiquement après chaque don.</p>
        </li>
      </ul>
      <a className="don-cta" href="#" aria-disabled="true">
        Faire un don sur iRaiser →
      </a>
      <p className="rubrique-note">
        Le formulaire de don n&apos;est pas remplacé : ce bouton renverra vers la page iRaiser de
        l&apos;association (lien à confirmer avec les cadreurs).
      </p>
    </main>
  );
}
