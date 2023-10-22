import styles from "./NewsList.module.css";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthenticationContext";
import NewsCard from "./NewsCard";
import Loading from "./Loading";

function NewsList() {
  const [newsData, setNewsData] = useState([]);
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const { fetchNews } = useAuth();
  const dataRef = useRef(null);

  useEffect(() => {
    // let isMounted = true;
    async function getNewsData() {
      try {
        const data = await fetchNews(page);
        dataRef.current = data;

        // if (isMounted) {
        setNewsData((prev) => [...prev, ...data.results]);
        setLoading(false);
        // }
      } catch (error) {
        console.log("Error in fetching", error);
      }
    }
    getNewsData();
    // return () => {
    //   isMounted = false;
    // };
  }, [page]);

  const handleInfiniteScroll = () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 3 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setPage(dataRef.current?.nextPage);
      }
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

  return (
    <>
      {loading ? (
        <Loading />
      ) : newsData.length === 0 ? (
        <h2>Nothing with these Preferences</h2>
      ) : (
        <ul className={styles.newsList}>
          {newsData.map((news, index) => (
            <NewsCard key={index} news={news} className={styles.newscard} />
          ))}
        </ul>
      )}

      {/* <ul className={styles.newsList}>
        {newsData.map((news, index) => (
          <NewsCard key={index} news={news} className={styles.newscard} />
        ))}
      </ul>
      {loading && <Loading />} */}
    </>
  );
}

export default NewsList;
