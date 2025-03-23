import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/connexion">Connexion</Link></li>
        <li><Link to="/profil">Profil</Link></li>
        <li><Link to="/actualites">Actualités</Link></li>
      </ul>
    </nav>
  );
}