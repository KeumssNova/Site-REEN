import '../assets/css/NewsItem.css';
export default function NewsItem({ title, date }) {
    return (
      <div>
        <h3>{title}</h3>
        <p>{date}</p>
      </div>
    );
  }