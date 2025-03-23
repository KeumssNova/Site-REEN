import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../assets/css/Inscription.css';


export default function Inscription() {
  return (
    <div className="inscription">
      <Header />
      <div className="inscription-container">
        <h2>Inscription</h2>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Entrez votre email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" placeholder="Entrez votre mot de passe" required />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirmez le mot de passe</label>
            <input type="password" id="confirm-password" placeholder="Confirmez votre mot de passe" required />
          </div>
          <button type="submit">S`&apos`inscrire</button>
        </form>
        <p className="login-link">
          Déjà inscrit ? <Link to="/connexion">Connectez-vous ici</Link>
        </p>
      </div>
      <Footer />
    </div>
  );
}