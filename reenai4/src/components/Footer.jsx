import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white p-6 border-0">
      <div className="max-w-full mx-auto flex flex-wrap justify-between gap-8">
        {/* Bloc liens */}
        <div className="flex flex-wrap gap-12 flex-grow min-w-[250px]">
          <ul className="entreprise flex flex-col gap-3 list-none p-0">
            <h4 className="text-lg font-semibold mb-2">L&apos;entreprise</h4>
            <li>
              <Link
                to="/entreprise"
                className="text-[#ddd] transition duration-300 hover:text-[#C3E8BD]"
              >
                À propos de nous
              </Link>
            </li>
          </ul>

          <ul className="informations flex flex-col gap-3 list-none p-0">
            <h4 className="text-lg font-semibold mb-2">
              Plus d&apos;informations
            </h4>
            <li>
              <Link
                to="/News"
                className="text-[#ddd] transition duration-300 hover:text-[#C3E8BD]"
              >
                L&apos;Actus
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-[#ddd] transition duration-300 hover:text-[#C3E8BD]"
              >
                Nous Contacter
              </Link>
            </li>
          </ul>

          <ul className="conditions flex flex-col gap-3 list-none p-0">
            <h4 className="text-lg font-semibold mb-2">
              Conditions et Politiques
            </h4>
            <li>
              <Link
                to="/Politique de Confidentialité"
                className="text-[#ddd] transition duration-300 hover:text-[#C3E8BD]"
              >
                Politique de Confidentialité
              </Link>
            </li>
            <li>
              <Link
                to="/MentionLegale"
                className="text-[#ddd] transition duration-300 hover:text-[#C3E8BD]"
              >
                Mention Légale
              </Link>
            </li>
          </ul>
        </div>

        <div className="w-full sm:w-auto mt-6 sm:mt-0 flex justify-center items-center">
          <span className="text-[14px] text-[#aaa] text-center">
            Nova Corporation © 2025
          </span>
        </div>
      </div>
    </footer>
  );
}
