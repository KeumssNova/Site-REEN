import { Link } from 'react-router-dom';
import '../assets/css/Footer.css'

export default function Footer() {
    return (
      <footer>
        <div>
          <ul>
            <li><Link to="/entreprise">L&apos;entreprise</Link></li>
            <li><Link to="/contact">Nous Contacter</Link></li>
          </ul>
        </div>
      </footer>
    );
  }