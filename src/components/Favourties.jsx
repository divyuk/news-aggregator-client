import styles from "./Favourites.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthenticationContext";
import Card from "./Card";
import Loading from "./Loading";

function Favourties() {
  const [newsData, setNewsData] = useState([]);
  const { getMyFavourites } = useAuth();
  const { deleteNews } = useAuth();
  const [loading, setLoading] = useState(true);

  const handleDelete = async (article_id) => {
    await deleteNews(article_id, "favourite");
    const data = await getMyFavourites();
    setNewsData(data);
  };
  useEffect(() => {
    async function getNewsData() {
      try {
        const data = await getMyFavourites();
        setNewsData(data);
        setLoading(false);
      } catch (error) {
        console.log("Error in fetching", error);
      }
    }
    getNewsData();
  }, [getMyFavourites]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : newsData.length === 0 ? (
        <h2 className={styles.title}>
          Favourites are Empty!! Click the heart to save in Favourites!
        </h2>
      ) : (
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
      )}
    </>
  );
}

export default Favourties;
