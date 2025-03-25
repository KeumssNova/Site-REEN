import { Link } from 'react-router-dom';
import '../assets/css/BarreLateral.css';
export default function Header() {
  return (
    <div>
        <ul className='Lien-BarreLateral'>
          <li><Link to="/actualites">Actualites</Link></li>
          <li><Link to="/entreprise">L&apos;entreprise</Link></li>
          <li><Link to="/contact">Nous Contacter</Link></li>
        </ul>
    </div>
  );
}