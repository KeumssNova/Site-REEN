import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "../assets/css/Connexion.css";
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Connexion() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { user, login, error, loading } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/Ia'); // Si l'utilisateur est connecté, rediriger vers la page d'accueil ou une autre page protégée
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/Ia');
    }
  };

  return (
    <div className="connexion">
      <Header />
      <div className="connexion-container">
        <div className="connexion-main">
          <h2>Connexion</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              disabled={loading}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              required
              disabled={loading}
            />
            {error && <div className="error-message">{error}</div>}
            <button type="submit" disabled={loading}>
              {loading ? 'Chargement...' : 'Se connecter'}
            </button>
            <div className="text-connexion">
              <p>Vous n&apos;avez pas de compte ? <Link to="/inscription">Inscription</Link></p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}