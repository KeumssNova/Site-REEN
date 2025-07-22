import Header from "../components/Header";
import Footer from "../components/Footer";
import ArticleCard from "../components/ArticleCard";
import BarreLateral from "../components/BarreLateral";
import ChatIa from "../components/ChatIa";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import HeaderConnexion from "../components/HeaderConnexion";

export default function Home() {
  const [news, setNews] = useState([]);
  const {user} = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch(`${API_URL}/api/articles`);
      const data = await response.json();
      setNews(data);
    };

    fetchArticles();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {user ? <HeaderConnexion /> : <Header />}
      <div className="main flex flex-col md:flex-row md:flex-grow lg:flex-grow">
        <div className="BarreLateral flex flex-col w-screen items-start pl-5 pb-5 md:items-center md:pl-0 md:pb-0 md:w-64 pt-[80px] bg-[#C3E8BD] md:h-screen md:sticky md:top-0">
          <BarreLateral />
        </div>
        <div className="main-content flex flex-col w-full h-full p-10 gap-20">
          <div className="ia h-full max-h-[900px] md:mt-[150px] flex justify-center items-center">
            <ChatIa />
          </div>
          <section className="newsContainer h-auto flex flex-col justify-center items-center bg-cover pb-10">
            <h1 className="section-title text-left text-3xl w-full pl-[10%] text-black mb-3 ">
              Articles Récents
            </h1>
            <div className="News flex flex-col max-w-[1200px] w-full md:grid md:grid-cols-3 gap-4 p-4">
              {/* Premier article en grand */}
              {news[0] && <ArticleCard article={news[0]} index={0} />}

              {/* Les 3 suivants dans un bloc scrollable */}
              <div className="col-start-3 h-[500px] overflow-y-auto flex flex-col gap-4 pr-1">
                {news.slice(1).map((article, index) => (
                  <ArticleCard
                    key={index + 1}
                    article={article}
                    index={index + 1}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
