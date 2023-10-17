import styles from "./NewsList.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthenticationContext";
import NewsCard from "./NewsCard";

function NewsList() {
  const [newsData, setNewsData] = useState([]);
  const { user, fetchNews } = useAuth();
  useEffect(() => {
    async function getNewsData() {
      try {
        const data = await fetchNews(user.category);
        setNewsData(data);
      } catch (error) {
        console.log("Error in fetching", error);
      }
    }
    getNewsData();
  }, [fetchNews]);
  return (
    <ul className={styles.newsList}>
      {newsData.map((news, index) => (
        <NewsCard key={index} news={news} />
      ))}
    </ul>
  );
}

export default NewsList;
