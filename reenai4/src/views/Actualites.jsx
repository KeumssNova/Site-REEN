import Header from '../components/Header';
import Footer from '../components/Footer';
import NewsList from '../components/NewsList';

const news = [
  { title: "Titre article 1", date: "20/03/2025" },
  { title: "Titre article 2", date: "21/03/2025" },
];

export default function Actualites() {
  return (
    <div>
      <Header />
      <h1>Actualités</h1>
      <NewsList news={news} />
      <Footer />
    </div>
  );
}