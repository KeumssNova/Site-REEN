export default function ArticleCard({ article, index }) {
  const isFirst = index === 0;
  return (
    <a
      href={article.source}
      target="_blank"
      rel="noopener noreferrer"
      className={`article-card ${
        isFirst
          ? "col-span-2 row-span-1 h-full "        
          : ""
      }`}
    >
      <img
        src={article.image}
        alt={article.title}
        className="article-image relative bg-white border-0 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      />
      <div className="article-content">
        <h3>{article.title}</h3>
        <p>{new Date(article.timestamp).toLocaleDateString()}</p>
      </div>
    </a>
  );
}
