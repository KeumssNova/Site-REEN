import Header from "../components/Header";
import HeaderConnexion from "../components/HeaderConnexion";
import Footer from "../components/Footer";
import { useAuth } from "../hooks/useAuth"; // ou "../context/AuthContext" si le hook est là

export default function MentionLegale() {
  const { user } = useAuth(); // Accès au user via ton contexte

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      {user ? <HeaderConnexion /> : <Header />}

      <main className="flex-grow flex justify-center px-4 py-12">
        <div className="w-full max-w-3xl">
          <h1 className="text-3xl font-bold mb-6 border-b pb-2">Mentions Légales</h1>

          <section className="space-y-1 mb-8">
            <p className="text-sm text-gray-500">Ce site est édité par :</p>
            <p><strong>Nova Corporation</strong></p>
            <p>Paris, France</p>
            <p>
              Téléphone : <a href="tel:1234567890" className="text-blue-600 hover:underline">1234567890</a>
            </p>
            <p>
              Email : <a href="mailto:novacorporation77@gmail.com" className="text-blue-600 hover:underline">novacorporation77@gmail.com</a>
            </p>
            <p>SIRET : <span className="italic text-gray-600">à inventer</span></p>
            <p>Directeur de la publication : Keumss</p>
            <p>Hébergeur : <span className="italic text-gray-600">à inventer</span></p>
            <p>Adresse de l'hébergeur : <span className="italic text-gray-600">à inventer</span></p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Propriété intellectuelle</h2>
            <p>
              Tous les contenus présents sur ce site (textes, images, vidéos, logos, etc.) sont protégés par le droit d'auteur et sont la propriété exclusive de Nova Corporation, sauf mention contraire.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Données personnelles</h2>
            <p>
              Les données collectées sur ce site sont utilisées uniquement dans le cadre de notre activité et ne sont ni revendues ni partagées sans votre consentement. Conformément à la loi, vous disposez d’un droit d’accès, de modification et de suppression de vos données personnelles.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
