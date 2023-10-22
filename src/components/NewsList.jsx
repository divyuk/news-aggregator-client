import styles from "./NewsList.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthenticationContext";
import NewsCard from "./NewsCard";

function NewsList() {
  const [newsData, setNewsData] = useState([]);
  const { fetchNews } = useAuth();
  useEffect(() => {
    async function getNewsData() {
      try {
        const data = await fetchNews();
        setNewsData(data);
      } catch (error) {
        console.log("Error in fetching", error);
      }
    }
    getNewsData();
  }, [fetchNews]);
  if (newsData.length == 0) {
    return <h1>Nothing Found</h1>;
  }
  return (
    <ul className={styles.newsList}>
      {newsData.map((news, index) => (
        <NewsCard key={index} news={news} className={styles.newscard} />
      ))}
    </ul>
  );
}

export default NewsList;
