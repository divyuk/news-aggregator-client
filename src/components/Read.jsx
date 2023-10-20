import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthenticationContext";
import Card from "./Card";
import styles from "./Read.module.css";

function Read() {
  const [newsData, setNewsData] = useState([]);
  const { getMyRead } = useAuth();
  const { deleteNews } = useAuth();

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
      } catch (error) {
        console.log("Error in fetching", error);
      }
    }
    getNewsData();
  }, [getMyRead]);

  return (
    <>
      {newsData.length == 0 && <h1>Nothing In Read</h1>}
      <ul className={styles.newsList}>
        {newsData.map((news, index) => (
          <Card key={index} news={news} handleDelete={handleDelete} />
        ))}
      </ul>
    </>
  );
}

export default Read;
