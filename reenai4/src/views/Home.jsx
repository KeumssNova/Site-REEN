import "../assets/css/Home.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ArticleCard from "../components/ArticleCard";
import BarreLateral from "../components/BarreLateral";
import ChatIa from "../components/ChatIa";
import { useEffect, useState } from "react";

export default function Home() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch("http://localhost:5000/api/articles");
      const data = await response.json();
      setNews(data);
    };

    fetchArticles();
  }, []);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 900); // seuil de 100px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <Header />
      <div className="main">
        <div className="BarreLateral">
          <BarreLateral />
        </div>
        <div className="main-content">
          <div className="ia">
            <ChatIa />
          </div>
          <section className={`newsContainer  ${scrolled ? "scrolled" : ""}`}>
          <h1 className="section-title">Articles Récents</h1>
            <div className="News">
              {news.length > 0 ? (
                news.map((article, index) => (
                  <ArticleCard key={index} article={article} />
                ))
              ) : (
                <p>Chargement des articles...</p>
              )}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
