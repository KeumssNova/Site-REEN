import { Link } from "react-router-dom";
export default function Header() {
  return (
    <div>
          <ul className="flex  text-black flex-col h-full list-none gap-4 ">
            <li>
              <Link to="/news">Actualités</Link>
            </li>
            <li>
              <Link to="/entreprise">L&apos;entreprise</Link>
            </li>
            <li>
              <Link to="/contact">Nous Contacter</Link>
            </li>
            {/* etc */}
          </ul>
    </div>
  );
}
