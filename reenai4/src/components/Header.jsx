import { Link } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import "../assets/css/style.css";

export default function Header() {
  return (
    <header className="bg-[#000] text-[#fff] flex justify-between items-center w-full py-3">
      <div className=" font-Conthrax pl-5 logo text-xl font-bold">
        <Link to="/">Reen</Link>
      </div>
      <nav className="flex items-center px-4">
        <ul className="flex justify-center items-center gap-3 list-none">
          <li>
            <SearchBar />
          </li>
          <li>
            <Link
              to="/connexion"
              className="p-3  text-white transition duration-300 ease-in-out
                         hover:bg-[#8EB897] rounded-full w-24"
            >
              Connexion
            </Link>
          </li>
          <li>
            <Link
              to="/inscription"
              className="p-3  text-white transition duration-300 ease-in-out
                         hover:bg-[#8EB897] rounded-full w-24"
            >
              Inscription
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
