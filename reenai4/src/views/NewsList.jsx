import { useEffect, useState } from 'react';
import '../assets/css/NewsList.css'
import Header from '../components/Header';
import Footer from '../components/Footer';

const NewsList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Récupérer tous les articles
    fetch('http://localhost:5000/api/all-articles')
      .then(response => response.json())
      .then(data => setArticles(data))
      .catch(error => console.error('Erreur lors de la récupération des articles:', error));
  }, []);

  return (
    <div>
        <Header/>
      <h1>Tous les Articles</h1>
      <div className='NewsList'>
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <a href={article.source} key={index}>
                <img href={article.image}/>
                <div href={article.source}  className="article-card-All">
                <h3>{article.title}</h3>
                <p>{new Date(article.timestamp).toLocaleDateString()}</p>
                </div>
            </a>

          ))
        ) : (
          <p>Chargement des articles...</p>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default NewsList;
