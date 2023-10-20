import { useState } from "react";
import styles from "./Card.module.css";

import { RiDeleteBin6Line } from "react-icons/ri";

function Card({ news, handleDelete }) {
  const { article_id, title, link, description, content } = news;

  const [read, setRead] = useState(false);

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

      <RiDeleteBin6Line
        className={styles.delete}
        onClick={() => handleDelete(article_id)}
      />
    </>
  );
}

export default Card;
