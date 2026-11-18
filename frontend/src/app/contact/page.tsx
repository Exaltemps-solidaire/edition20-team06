export default function ContactPage() {
  return (
    <main className="page-rubrique">
      <h1>Contact</h1>
      <section className="rubrique-sections">
        <h2>Formulaire</h2>
        <form className="contact-formulaire">
          <label htmlFor="contact-nom">Nom</label>
          <input id="contact-nom" type="text" disabled />
          <label htmlFor="contact-email">Email</label>
          <input id="contact-email" type="email" disabled />
          <label htmlFor="contact-message">Message</label>
          <textarea id="contact-message" rows={4} disabled />
          <button type="button" disabled>
            Envoyer
          </button>
        </form>
      </section>
      <section className="rubrique-sections">
        <h2>Newsletter</h2>
        <form className="contact-newsletter">
          <input type="email" placeholder="Votre email" disabled />
          <button type="button" disabled>
            S&apos;inscrire
          </button>
        </form>
      </section>
      <section className="rubrique-sections">
        <h2>Mentions</h2>
        <p>Mentions légales et politique de confidentialité de l&apos;association.</p>
      </section>
    </main>
  );
}
