import Footer from '../components/Footer';
import HistoriqueIa from '../components/HistoriqueIa';
import ChatIa from '../components/ChatIa';
import HeaderConnexion from '../components/HeaderConnexion';
import '../assets/css/IA.css';

export default function Ia() {
  return (
    <div>
      <HeaderConnexion />
      <div className='main'>
        <div className='BarreLateral'>
        <HistoriqueIa />
        </div>
        <div className='main-content'>
          <div className='ia'>
            <ChatIa/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}