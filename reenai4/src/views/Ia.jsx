import Footer from '../components/Footer';
import HistoriqueIa from '../components/HistoriqueIa';
import ChatIa from '../components/ChatIa';
import HeaderConnexion from '../components/HeaderConnexion';
import { useState } from 'react';

export default function Ia() {
  const [showHistorique, setShowHistorique] = useState(false);

  return (
    <div className='flex flex-col min-h-screen relative'>
      <HeaderConnexion onToggleHistorique={() => setShowHistorique(!showHistorique)} />

      {/* Overlay historique */}
      {showHistorique && (
        <div className="absolute top-0 left-0 w-full h-[calc(100vh-80px)] bg-black/50 z-30" onClick={() => setShowHistorique(false)}>
          <div
            className="relative top-[119px] left-0 w-64 h-[calc(100vh-80px)] bg-[#C3E8BD] z-40 shadow-lg flex flex-col items-center p-5"
            onClick={(e) => e.stopPropagation()} // évite que le clic ferme si on clique dedans
          >
            <HistoriqueIa />
          </div>
        </div>
      )}

      <div className='main flex flex-grow h-[100vh] md:flex-grow lg:flex-grow'>
        {/* Barre latérale masquée en mobile */}
        <div className='BarreLateral hidden md:flex flex-col items-center w-64 pt-[80px] bg-[#C3E8BD] h-screen sticky top-0'>
          <HistoriqueIa />
        </div>

        <div className='main-content self-center flex flex-col items-center justify-center w-full h-full p-10 gap-20'>
          <div className='ia flex justify-center max-w-[600px] w-full'>
            <ChatIa />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}