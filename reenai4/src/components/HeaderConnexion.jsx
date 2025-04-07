import { Link } from "react-router-dom";
import "../assets/css/Header.css";
import SearchBar from "./SearchBar.jsx";
import { useAuth } from "../context/AuthContext";

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
          <Link to="/Profil">
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="33"
                height="33"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
            </li>
          </Link>
          {(user?.roles?.includes("admin") || user?.roles?.includes("BOT_MANAGER")) && (
            <li><Link to="/admin">Admin Panel</Link></li>
          )}
          <li>
            <svg 
              onClick={logout}
              xmlns="http://www.w3.org/2000/svg"
              width="33"
              height="33"
              fill="currentColor"
              className="bi bi-door-open"
              viewBox="0 0 16 16"
            >
              <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
              <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z" />
            </svg>
          </li>
        </ul>
      </nav>
    </header>
  );
}
