import styles from "./Favourites.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthenticationContext";
import Card from "./Card";

function Favourties() {
  const [newsData, setNewsData] = useState([]);
  const { getMyFavourites } = useAuth();
  const { deleteNews } = useAuth();

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
      } catch (error) {
        console.log("Error in fetching", error);
      }
    }
    getNewsData();
  }, [getMyFavourites]);

  return (
    <ul className={styles.newsList}>
      {newsData.map((news, index) => (
        <Card key={index} news={news} handleDelete={handleDelete} />
      ))}
    </ul>
  );
}

export default Favourties;
