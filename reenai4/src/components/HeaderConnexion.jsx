import { Link, useNavigate } from "react-router-dom";
import "../assets/css/Header.css";
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
      navigate('/connexion');
    }, 2000); // laisse le toast s'afficher 2 secondes
  };

  return (
    <header className="header">
      <div>
        <Link to="/">
          <h1>Reen</h1>
        </Link>
      </div>
      <nav>
        <SearchBar />
        <ul className="Header-connexion-ul">
          <li>
            <Link className="navLink" to="/Profil">
              <UserCircle size={33} />
            </Link>
          </li>

          {(user?.roles?.includes("admin") ||
            user?.roles?.includes("BOT_MANAGER")) && (
            <li>
              <Link className="navLink" to="/admin">
                <LayoutDashboard size={28} />
              </Link>
            </li>
          )}

          <li>
            <button className="logoutBtn" onClick={handleLogoutClick}>
              <LogOut size={28} />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
