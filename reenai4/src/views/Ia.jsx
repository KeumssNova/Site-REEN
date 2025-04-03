import Footer from '../components/Footer';
import BarreLateral from '../components/BarreLateral';
import ChatIa from '../components/ChatIa';
import HeaderConnexion from '../components/HeaderConnexion';

export default function Ia() {
  return (
    <div>
      <HeaderConnexion />
      <div className='main'>
        <div className='BarreLateral'>
        <BarreLateral />
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