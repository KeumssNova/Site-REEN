import { Link } from "react-router-dom";
import "../assets/css/Header.css";
import SearchBar from "./SearchBar.jsx";
import { useAuth } from "../context/AuthContext";
import { UserCircle, LayoutDashboard, LogOut } from "lucide-react";

export default function HeaderConnexion() {
  const { user, logout } = useAuth();

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
            <button className="logoutBtn" onClick={logout}>
              <LogOut size={28} />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
