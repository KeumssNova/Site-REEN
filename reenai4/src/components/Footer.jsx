import { Link } from 'react-router-dom';
import '../assets/css/Footer.css'

export default function Footer() {
    return (
      <footer>
        <div>

        </div>
        <div>

          <ul className='entreprise'>
            <h4>L&apos;entreprise</h4>
            <li><Link to="/entreprise">A propos de nous</Link></li>
          </ul>
          <ul className='Plus d&apos;informations'>
            <h4>Plus d&apos;informations</h4>
            <li><Link to="/News">L&apos;Actus</Link></li>
            <li><Link to="/contact">Nous Contacter</Link></li>
          </ul>
          <ul className='Conditions et politiques'>
            <h4>Conditions et Politiques</h4>
            <li><Link to="/PC">Politique de Confidentialité</Link></li>
            <li><Link to="/MentionLegale">Mention Legale</Link></li>
          </ul>
        </div>
        <div>
          <span>Nova Corporation © 2025</span>
        </div>
      </footer>
    );
  }