import styles from "./Favourites.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthenticationContext";
import NewsCard from "./NewsCard";

function Favourties() {
  const [newsData, setNewsData] = useState([]);
  const { getMyFavourites } = useAuth();

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
        <NewsCard key={index} news={news} />
      ))}
    </ul>
  );
}

export default Favourties;
