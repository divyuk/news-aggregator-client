import { useEffect, useState } from "react";
import styles from "./NewsCard.module.css";
import { useAuth } from "../contexts/AuthenticationContext";
function NewsCard({ news }) {
  const { article_id, title, link, description, content, pubDate } = news;

  const [read, setRead] = useState(false);
  const [isAnimatingFav, setIsAnimatingFav] = useState(false);
  const [isAnimatingCheck, setIsAnimatingCheck] = useState(false);

  const { sendFavourite, deleteNews } = useAuth();

  const heartAnimationClass = styles.HeartAnimation;
  const animateClass = isAnimatingFav ? styles.animate : "";
  const checkAnimationClass = styles.CheckAnimation;
  const checkAnimateClass = isAnimatingCheck ? styles.animateCheck : "";

  const handleFav = async () => {
    if (!isAnimatingFav) {
      await sendFavourite(article_id, news);
    } else {
      await deleteNews(article_id, "favourite");
    }
    setIsAnimatingFav(!isAnimatingFav);
  };

  const handleCheck = () => {
    setIsAnimatingCheck(!isAnimatingCheck);
  };
  return (
    <>
      <li className={styles.card}>
        <h2>{title}</h2>
        <a href={link} rel="noopener noreferrer" target="_blank">
          News Link
        </a>
        <p>{description}</p>
        {read && <p>{content}</p>}
      </li>

      <button onClick={() => setRead(!read)}>
        {read ? "Read Less" : "Read More"}
      </button>

      <span
        className={`${heartAnimationClass} ${animateClass}`}
        onClick={handleFav}
      ></span>

      <div
        className={`${checkAnimationClass} ${checkAnimateClass}`}
        onClick={handleCheck}
      ></div>
    </>
  );
}

export default NewsCard;
