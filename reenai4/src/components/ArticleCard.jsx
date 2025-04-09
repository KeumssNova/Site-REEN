import "../assets/css/articleCard.css";
function ArticleCard({ article }) {
  return (
    <a href={article.source} target="_blank" rel="noopener noreferrer" className="article-card">
        <img
          src={article.image}
          // alt={article.title}
          className="article-image"
        />
      <div className="article-content">
        <h3>{article.title}</h3>
        <p>{new Date(article.timestamp).toLocaleDateString()}</p>
        {/* <p>{article.summaryContent}</p> */}
      </div>
     </a>
  );
}

export default ArticleCard;
