import '../assets/css/Home.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NewsList from '../components/NewsList';
import BarreLateral from '../components/BarreLateral';

const news = [
  { title: "Titre article 1", date: "20/03/2025" },
  { title: "Titre article 2", date: "21/03/2025" },
];

export default function Home() {
  return (
    <div>
      <Header />
      <div className='main'>
        <div className='BarreLateral'>
        <BarreLateral />
        </div>
        <div className='News'>
        <NewsList news={news} />
        </div>
      </div>
      <Footer />
    </div>
  );
}