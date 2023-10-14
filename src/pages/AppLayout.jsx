import styles from "./AppLayout.module.css";
import Header from "../components/Header";

function AppLayout() {
  return (
    <div className={styles.app}>
      <Header />
    </div>
  );
}

export default AppLayout;
