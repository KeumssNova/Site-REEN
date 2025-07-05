import Footer from '../components/Footer';
import HistoriqueIa from '../components/HistoriqueIa';
import ChatIa from '../components/ChatIa';
import HeaderConnexion from '../components/HeaderConnexion';

export default function Ia() {
  console.log('Rendu de la page IA');

  return (
    <div className='flex flex-col min-h-screen'>
      <HeaderConnexion />
      <div className='main flex flex-grow'>
        <div className='BarreLateral flex flex-col items-center w-64 pt-[80px] bg-[#C3E8BD] h-screen sticky top-0'>
        <HistoriqueIa />
        </div>
        <div className='main-content self-center  flex flex-col items-center justify-center w-full h-full p-10 gap-20'>
          <div className='ia flex justify-center max-w-[600px] w-full'>
            <ChatIa/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}