import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext'; // Assurez-vous que c'est le bon chemin
import '../assets/css/Inscription.css';

export default function Inscription() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  
  // Récupérez bien toutes les valeurs du contexte
  const { register, error, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      // Vérifiez que register existe avant de l'appeler
      if (typeof register !== 'function') {
        throw new Error('La fonction register n\'est pas disponible');
      }

      const success = await register(email, password);
      if (success) {
        navigate('/');
      }
    } catch (err) {
      console.error('Erreur lors de l\'inscription:', err);
    }
  };

  return (
    <div className="inscription">
      <Header />
      <div className="inscription-container">
        <div className='inscription-main'>
          <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Entrez votre email" 
                  required
                  disabled={loading} // Désactivé pendant le chargement
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <input 
                  type="password" 
                  id="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez votre mot de passe" 
                  required
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirm-password">Confirmez le mot de passe</label>
                <input 
                  type="password" 
                  id="confirm-password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirmez votre mot de passe" 
                  required
                  disabled={loading}
                />
              </div>
              {error && <div className="error-message">{error}</div>}
              <button type="submit" disabled={loading}>
                {loading ? 'Inscription en cours...' : "S'inscrire"}
              </button>
            </form>
          <p className="login-link">
            Déjà inscrit ? <Link to="/connexion">Connectez-vous ici</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}