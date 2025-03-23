import NewsItem from './NewsItem';


export default function NewsList({ news }) {
  return (
    <div>
      <h2>Actualités récentes</h2>
      {news.map((item, index) => (
        <NewsItem key={index} title={item.title} date={item.date} />
      ))}
    </div>
  );
}