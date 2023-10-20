import PageNav from "../components/PageNav";
import styles from "./HomePage.module.css";

function HomePage() {
  return (
    <main className={styles.homepage}>
      <section className={styles.pageNav}>
        <PageNav />
      </section>
      <section className={styles.content}>
        <h1 className={styles.title}>Welcome to News App</h1>
        <p className={styles.description}>
          This is where you discover Gossips of the World 📃
        </p>
      </section>
    </main>
  );
}

export default HomePage;
