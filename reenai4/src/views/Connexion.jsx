import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Connexion() {
  return (
    <div>
      <Header />
      <h2>Connexion</h2>
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Mot de passe" />
        <button type="submit">Se connecter</button>
      </form>
      <Footer />
    </div>
  );
}