import { useState } from "react";
import styles from "./Card.module.css";

import { RiDeleteBin6Line } from "react-icons/ri";

function Card({ news, handleDelete }) {
  const { article_id, title, link, description, content } = news;

  const [read, setRead] = useState(false);

  return (
    <>
      <li className={styles.card}>
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
      <section className={styles.container}>
        <RiDeleteBin6Line
          className={styles.delete}
          onClick={() => handleDelete(article_id)}
        />
      </section>
    </>
  );
}

export default Card;
