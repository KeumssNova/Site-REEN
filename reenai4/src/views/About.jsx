import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div>
      <Header />
      <main className="about-container">
        <section className="company-info">
          <h1>Bienvenue chez Nova Corporation</h1>
          <p>
            Nova Corporation est une entreprise innovante dédiée à l'optimisation des processus grâce à des solutions basées sur l'intelligence artificielle.
            Depuis sa création, Nova Corporation a su se distinguer par son approche avant-gardiste et sa capacité à transformer les industries avec des technologies de pointe.
          </p>
        </section>

        <section className="our-mission">
          <h2>Notre Mission</h2>
          <p>
            Notre mission est de fournir des solutions intelligentes pour un avenir meilleur. Nous croyons en la puissance des données et de l'IA pour transformer
            les entreprises et les sociétés à travers le monde.
          </p>
        </section>

        <section className="our-values">
          <h2>Nos Valeurs</h2>
          <ul>
            <li><strong>Innovation :</strong> Nous cherchons constamment à repousser les limites de la technologie.</li>
            <li><strong>Excellence :</strong> Nous nous engageons à fournir des produits et services de qualité supérieure.</li>
            <li><strong>Responsabilité :</strong> Nous agissons avec intégrité et respect pour nos clients et la planète.</li>
          </ul>
        </section>

        <section className="team">
          <h2>Notre Équipe</h2>
          <p>
            L'équipe de Nova Corporation est composée de professionnels passionnés et talentueux, allant des chercheurs en IA aux développeurs logiciels, qui travaillent ensemble pour créer des solutions innovantes.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
