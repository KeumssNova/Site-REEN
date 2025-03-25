import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "../assets/css/Connexion.css";

export default function Connexion() {
  return (
    <div className="connexion">
      <Header />
      <div className="connexion-container">
      <div className="connexion-main">
        <h2>Connexion</h2>
        <form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Mot de passe" />
          <button type="submit">Se connecter</button>
          <div className="text-connexion">
            <p>Vous n’avez pas de compte ?</p>{" "}
            <Link to="/inscription">Inscription</Link>
          </div>
        </form>
      </div>
      </div>
      <Footer />
    </div>
  );
}
