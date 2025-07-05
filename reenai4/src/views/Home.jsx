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

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch("http://localhost:5000/api/articles");
      const data = await response.json();
      setNews(data);
    };

    fetchArticles();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {user ? <HeaderConnexion /> : <Header />}
      <div className="main flex flex-grow">
        <div className="BarreLateral flex flex-col items-center w-64 pt-[80px] bg-[#C3E8BD] h-screen sticky top-0">
          <BarreLateral />
        </div>
        <div className="main-content flex flex-col w-full h-full p-10 gap-20">
          <div className="ia h-full max-h-[900px] mt-[150px] flex justify-center items-center">
            <ChatIa />
          </div>
          <section className="newsContainer h-auto flex flex-col justify-center items-center bg-cover pb-10">
            <h1 className="section-title text-left text-3xl w-full pl-[10%] text-black mb-3 ">
              Articles Récents
            </h1>
            <div className="News max-w-[1200px] w-full grid grid-cols-3 gap-4 p-4">
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
