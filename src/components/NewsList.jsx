import { useEffect, useState } from "react";

import { useAuth } from "../contexts/AuthenticationContext";

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
  return (
    <ul>
      {newsData.map((news) => (
        <p key={news.article_id}>{news.title}</p>
      ))}
    </ul>
  );
}

export default NewsList;
