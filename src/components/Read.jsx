import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthenticationContext";
import Card from "./Card";
import styles from "./Read.module.css";
import Loading from "./Loading";

function Read() {
  const [newsData, setNewsData] = useState([]);
  const { getMyRead } = useAuth();
  const { deleteNews } = useAuth();
  const [loading, setLoading] = useState(true);

  const handleDelete = async (article_id) => {
    await deleteNews(article_id, "read");
    const data = await getMyRead();
    setNewsData(data);
  };
  useEffect(() => {
    async function getNewsData() {
      try {
        const data = await getMyRead();
        setNewsData(data);
        setLoading(false);
      } catch (error) {
        console.log("Error in fetching", error);
      }
    }
    getNewsData();
  }, [getMyRead]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        newsData.length === 0 && (
          <h2 className={styles.title}>
            Reads are Empty!! Click the check to save in Reads!
          </h2>
        )
      )}

      <ul className={styles.newsList}>
        {newsData.map((news, index) => (
          <Card
            key={index}
            news={news}
            className={styles.newscard}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
      {newsData.length > 0 && loading && <Loading />}
    </>
  );
}

export default Read;
