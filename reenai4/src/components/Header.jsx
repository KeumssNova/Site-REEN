import { Link } from "react-router-dom";
import { useState } from "react";
// import SearchBar from "./SearchBar.jsx";
import "../assets/css/style.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = (
    <>
      <li className="list-none">
        <Link
          to="/connexion"
          className="p-3 text-white transition duration-300 ease-in-out hover:bg-[#8EB897] rounded-full w-24 text-center"
        >
          Connexion
        </Link>
      </li>
      <li className="list-none">
        <Link
          to="/inscription"
          className="p-3 text-white transition duration-300 ease-in-out hover:bg-[#8EB897] rounded-full w-24 text-center"
        >
          Inscription
        </Link>
      </li>
    </>
  );

  return (
    <header className="bg-black text-white w-full py-3 px-4 flex justify-between items-center">
      <div className="logo font-Conthrax text-xl font-bold">
        <Link to="/">Reen</Link>
      </div>

      {/* Menu burger (visible uniquement en mobile) */}
      <button
        className="md:hidden focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="space-y-1">
          <span className="block h-0.5 w-6 bg-white"></span>
          <span className="block h-0.5 w-6 bg-white"></span>
          <span className="block h-0.5 w-6 bg-white"></span>
        </div>
      </button>

      {/* Menu desktop */}
      <nav className="hidden md:flex items-center gap-3">{menuItems}</nav>

      {/* Menu mobile */}
      {isOpen && (
        <nav className="absolute top-14 left-0 w-full bg-black flex justify-center items-center gap-3 py-4 md:hidden z-50">
          {menuItems}
        </nav>
      )}
    </header>
  );
}
