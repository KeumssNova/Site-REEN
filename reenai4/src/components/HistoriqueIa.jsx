import '../assets/css/HistoriqueIa.css'
import { Link } from 'react-router-dom'
export default function Conversation() {
  return (
    <div>
        <div className='Conversation'>
        <h2>Conversation</h2>
            <h4>Aujourd&apos;hui</h4>
            <ul className="today">
              <li><Link to="Conversation">Bonjour !</Link></li>
            </ul>
        </div>
    </div>
  );
}