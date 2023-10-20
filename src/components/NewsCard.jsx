import { useState } from "react";
import styles from "./NewsCard.module.css";
import { useAuth } from "../contexts/AuthenticationContext";
function NewsCard({ news }) {
  const { article_id, title, link, description, content } = news;

  const [read, setRead] = useState(false);
  const [isAnimatingFav, setIsAnimatingFav] = useState(false);
  const [isAnimatingCheck, setIsAnimatingCheck] = useState(false);

  const { sendFavourite, deleteNews, sendRead } = useAuth();

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

  const handleCheck = async () => {
    if (!isAnimatingCheck) {
      await sendRead(article_id, news);
    } else {
      await deleteNews(article_id, "read");
    }
    setIsAnimatingCheck(!isAnimatingCheck);
  };

  return (
    <>
      <li>
        <h2 className={styles.title}>{title}</h2>
        <a
          className={styles.link}
          href={link}
          rel="noopener noreferrer"
          target="_blank"
        >
          News Link
        </a>
        <p className={styles.description}>{description}</p>
        {read && <p className={styles.content}>{content}</p>}
      </li>

      <button className={styles.button} onClick={() => setRead(!read)}>
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
