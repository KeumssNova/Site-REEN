import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import NewsList from '../components/NewsList';

const news = [
  { title: "Titre article 1", date: "20/03/2025" },
  { title: "Titre article 2", date: "21/03/2025" },
];

export default function Home() {
  return (
    <div>
      <Header />
      <SearchBar />
      <NewsList news={news} />
      <Footer />
    </div>
  );
}