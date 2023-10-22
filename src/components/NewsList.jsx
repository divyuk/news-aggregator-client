import styles from "./NewsList.module.css";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthenticationContext";
import NewsCard from "./NewsCard";

function NewsList() {
  const [newsData, setNewsData] = useState([]);
  const [page, setPage] = useState(null);
  const { fetchNews } = useAuth();
  const dataRef = useRef(null);
  useEffect(() => {
    async function getNewsData() {
      try {
        const data = await fetchNews(page);
        dataRef.current = data;
        setNewsData(data.results);
      } catch (error) {
        console.log("Error in fetching", error);
      }
    }
    getNewsData();
  }, [fetchNews, page]);

  const handleInfiniteScroll = () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 3 >=
        document.documentElement.scrollHeight
      )
        setPage(dataRef.current.nextPage);
    } catch (error) {
      console.log("Error while scrolling", error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => {
      window.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, []);

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
