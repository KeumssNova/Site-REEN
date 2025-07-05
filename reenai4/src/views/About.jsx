import Header from '../components/Header';
import Footer from '../components/Footer';
import HeaderConnexion from '../components/HeaderConnexion';
import { useAuth } from '../context/AuthContext';

export default function About() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      {/* Header conditionnel */}
      {user ? <HeaderConnexion /> : <Header />}

      {/* Contenu principal - flex-grow pour prendre tout l'espace disponible */}
      <main className="flex-grow max-w-4xl mx-auto px-6 py-12 sm:px-12">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-4 border-b pb-2">Bienvenue chez Nova Corporation</h1>
          <p className="text-lg leading-relaxed">
            Nova Corporation est une entreprise innovante dédiée à l'optimisation des processus grâce à des solutions basées sur l'intelligence artificielle.
            Depuis sa création, Nova Corporation a su se distinguer par son approche avant-gardiste et sa capacité à transformer les industries avec des technologies de pointe.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Notre Mission</h2>
          <p className="text-lg leading-relaxed">
            Notre mission est de fournir des solutions intelligentes pour un avenir meilleur. Nous croyons en la puissance des données et de l'IA pour transformer
            les entreprises et les sociétés à travers le monde.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Nos Valeurs</h2>
          <ul className="list-disc list-inside space-y-2 text-lg leading-relaxed">
            <li><strong>Innovation :</strong> Nous cherchons constamment à repousser les limites de la technologie.</li>
            <li><strong>Excellence :</strong> Nous nous engageons à fournir des produits et services de qualité supérieure.</li>
            <li><strong>Responsabilité :</strong> Nous agissons avec intégrité et respect pour nos clients et la planète.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">Notre Équipe</h2>
          <p className="text-lg leading-relaxed">
            L'équipe de Nova Corporation est composée de professionnels passionnés et talentueux, allant des chercheurs en IA aux développeurs logiciels, qui travaillent ensemble pour créer des solutions innovantes.
          </p>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
