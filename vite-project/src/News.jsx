import { useEffect, useState } from "react";
import axios from "axios";

function News() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const res = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_API_KEY`,
      );
      setArticles(res.data.articles);
    };
    fetchNews();
  }, []);

  return (
    <div className="news-list">
      {articles.map((a, i) => (
        <div key={i}>
          <h3>{a.title}</h3>
          <p>{a.description}</p>
        </div>
      ))}
    </div>
  );
}

export default News;
