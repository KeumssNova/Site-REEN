import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BarreLateral from "../components/BarreLateral";
import { useAuth } from "../context/AuthContext";
import HeaderConnexion from "../components/HeaderConnexion";

const NewsList = () => {
  const [articles, setArticles] = useState([]);
  const {user} = useAuth();

  useEffect(() => {
    // Récupérer tous les articles
    fetch("http://localhost:5000/api/all-articles")
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des articles:", error)
      );
  }, []);

  return (
    <div>
      {user ? <HeaderConnexion /> : <Header />}
      <div className="flex flex-col md:flex-row md:flex-grow lg:flex-grow">
        <div className="BarreLateral flex flex-col w-screen items-start pl-5 pb-5 md:items-center md:pl-0 md:pb-0 md:w-64 pt-[80px] bg-[#C3E8BD] md:h-screen md:sticky md:top-0">
          <BarreLateral />
        </div>
        <div className="flex flex-col items-center w-full my-5">
          <h1 className="article-title ml-[13%] self-start text-3xl font-bold mb-6 text-left p-4 ">
            Actualités
          </h1>
          <div className="max-w-7xl mx-auto px-4 mb-9">
            {/* Conteneur haut : 2 colonnes (1er article à gauche, 2e + 3e au milieu) */}
            <div className="flex flex-col md:grid md:grid-cols-[2fr_1fr] gap-6 mb-6">
              {/* 1er article */}
              {articles[0] && (
                <a
                  href={articles[0].source}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={0}
                  className="block rounded-lg"
                >
                  <div className="article-card-all h-full flex flex-col rounded-lg overflow-hidden">
                    <img
                      src={articles[0].image}
                      alt={articles[0].title}
                      className="w-full h-full object-cover rounded-lg hover:scale-105 transition-all duration-300 ease-in-out "
                    />
                    <div className=" bg-inherit p-4 flex flex-col flex-grow">
                      <h4
                        className="text-xl font-semibold mb-2 line-clamp-2"
                      >
                        {articles[0].title}
                      </h4>
                      <p className="text-sm text-gray-500 mt-auto">
                        {new Date(articles[0].timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </a>
              )}

              {/* Colonne du milieu : 2 petits articles */}
              <div className="flex flex-col gap-6">
                {articles.slice(1, 4).map((article, index) => (
                  <a
                    href={article.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={index + 1}
                    className="block"
                  >
                    <div className="article-card-All  flex flex-col h-[180px]">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-28 object-cover shadow-md rounded-lg hover:scale-105 transition-all duration-300 ease-in-out"
                      />
                      <div className="p-3 flex flex-col flex-grow">
                        <h3 className="text-sm font-semibold">
                          {article.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-auto">
                          {new Date(article.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* En dessous, la 3e colonne avec le reste des articles */}
            <div className="flex flex-col  md:grid md:grid-cols-3 gap-6">
              {articles.slice(3).map((article, index) => (
                <a
                  href={article.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={index + 3}
                  className="block col-span-1"
                >
                  <div className="article-card-All flex flex-col h-[150px]">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-24 object-cover rounded-lg shadow-sm hover:scale-105 transition-all duration-300 ease-in-out"
                    />
                    <div className="p-2 flex flex-col flex-grow">
                      <h3 className="text-sm font-medium">{article.title}</h3>
                      <p className="text-xs text-gray-400 mt-auto">
                        {new Date(article.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NewsList;
