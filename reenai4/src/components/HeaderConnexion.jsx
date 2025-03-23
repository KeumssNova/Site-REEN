import { Link } from 'react-router-dom';
import '../assets/css/Header.css'; 
import SearchBar from './SearchBar.jsx'

export default function Header() {
  return (
    <header className="header">
      <div>
        <Link to="/">
          <h1>Reenai</h1>
        </Link>
      </div>
      <nav>
        <SearchBar />
        <ul>
          <li><Link to="/">Profil</Link>Profil</li>
        </ul>
      </nav>
    </header>
  );
}