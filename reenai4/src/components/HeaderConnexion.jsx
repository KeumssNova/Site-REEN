import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import { useAuth } from "../context/AuthContext";
import { UserCircle, LayoutDashboard, LogOut } from "lucide-react";
import { toast } from "react-toastify";

export default function HeaderConnexion() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    logout(); // nettoie l’état
    toast.success("👋 Vous avez été déconnecté avec succès.");
    setTimeout(() => {
      navigate("/connexion");
    }, 2000);
  };

  return (
    <header className="header bg-[#000] text-[#fff] flex justify-between items-center w-full py-3">
      <div className="font-conthrax logo pl-5 text-xl font-bold">
        <Link to="/">
          <h1>Reen</h1>
        </Link>
      </div>
      <nav className="flex items-center px-4">
        <ul className="Header-connexion-ul flex justify-center items-center gap-3 list-none">
          <li>
            <SearchBar />
          </li>
          <li className="transition duration-300 hover:scale-120">
            <Link className="navLink" to="/Profil">
              <UserCircle size={33} />
            </Link>
          </li>

          {(user?.roles?.includes("admin") ||
            user?.roles?.includes("BOT_MANAGER")) && (
            <li className="transition duration-300 hover:scale-120">
              <Link className="navLink" to="/admin">
                <LayoutDashboard size={28} />
              </Link>
            </li>
          )}

          <li className="flex transition duration-300 hover:scale-120 ">
            <button className="logoutBtn" onClick={handleLogoutClick}>
              <LogOut size={28} />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
