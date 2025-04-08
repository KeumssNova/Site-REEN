import "../assets/css/articleCard.css";
function ArticleCard({ article }) {
  return (
    <div className="article-card">
      <a href={article.source} target="_blank" rel="noopener noreferrer">
        <img
          src={article.image}
          // alt={article.title}
          className="article-image"
        />
      </a>

      <div className="article-content">
        <h3>{article.title}</h3>
        <p>{new Date(article.timestamp).toLocaleDateString()}</p>
        {/* <p>{article.summaryContent}</p> */}
      </div>
     </div>
  );
}

export default ArticleCard;
