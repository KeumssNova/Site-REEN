import HeaderConnexion from '../components/HeaderConnexion';
import Footer from '../components/Footer';
import '../assets/css/Profil.css'
export default function Profil() {
  return (
    <div>
      <HeaderConnexion />
      <div className='container'>
        <div className='card'>
            <form>
              <div className='top'>
                  <div className='Photo'>
                    <img src='../assets/icons/user.jpg'/>
                  </div>
                  <div className='Btn'>
                    <button>Changer la photo</button>
                    <button>Supprimer la Photo</button>
                  </div>
              </div>
              <div className='bottom'>
                  <input className='pseudo' type='text' />
                  <input className='mail' type='email' />
                  <button type='submit'>sasuvegarder les changement</button>
              </div>
            </form>
        </div>

      </div>
      
      <Footer />
    </div>
  );
}