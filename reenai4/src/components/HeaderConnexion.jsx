import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserCircle, LayoutDashboard, LogOut,History } from "lucide-react";
import { toast } from "react-toastify";
import "../assets/css/style.css";

export default function HeaderConnexion({ onToggleHistorique }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logout();
    toast.success("👋 Vous avez été déconnecté avec succès.");
    setTimeout(() => navigate("/connexion"), 2000);
  };

  const isAdmin =
    user?.roles?.includes("admin") || user?.roles?.includes("BOT_MANAGER");

  const navItems = (
    <>
      <li>
        <button
          onClick={onToggleHistorique}
          className="md:hidden text-gray-800 focus:outline-none flex"
          aria-label="Ouvrir l'historique"
        >
          <History size={28} color="white" />
        </button>
      </li>
      <li>
        <Link to="/ia">
          <span className="text-lg font-bold">ReenAI</span>
        </Link>
      </li>
      <li className="transition duration-300 hover:scale-110">
        <Link to="/Profil">
          <UserCircle size={28} />
        </Link>
      </li>
      {isAdmin && (
        <li className="transition duration-300 hover:scale-110">
          <Link to="/admin">
            <LayoutDashboard size={24} />
          </Link>
        </li>
      )}
      <li className="transition duration-300 hover:scale-110 flex items-center">
        <button onClick={handleLogoutClick}>
          <LogOut size={24} />
        </button>
      </li>
    </>
  );

  return (
    <header className="bg-black text-white w-full py-3 px-4 flex justify-between items-center relative z-50">
      <div className=" logo font-conthrax text-xl font-bold">
        <Link to="/">Reen</Link>
      </div>
      {/* Burger menu */}
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

      {/* Desktop menu */}
      <nav className="hidden md:flex items-center gap-4">
        <ul className="flex items-center gap-4 list-none">{navItems}</ul>
      </nav>

      {/* Mobile menu (slide down) */}
      {isOpen && (
        <nav className="absolute top-full left-0 w-full bg-black py-4 md:hidden">
          <ul className="flex justify-around items-center">{navItems}</ul>
        </nav>
      )}
    </header>
  );
}
