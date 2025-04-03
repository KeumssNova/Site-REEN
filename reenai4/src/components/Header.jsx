import { Link } from 'react-router-dom';
import '../assets/css/Header.css'; 
import SearchBar from './SearchBar.jsx'

export default function Header() {
  return (
    <header className="header">
      <div>
        <Link to="/">
          <h1>Reen</h1>
        </Link>
      </div>
      <nav>
        <SearchBar />
        <ul className='public-header'>
          <li><Link to="/connexion">Connexion</Link></li>
          <li><Link to="/inscription">Inscription</Link></li>
        </ul>
      </nav>
    </header>
  );
}