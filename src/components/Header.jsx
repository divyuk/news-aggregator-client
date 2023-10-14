import Heading from "./Heading";
import Logo from "./Logo";
import styles from "./Header.module.css";
import { Outlet } from "react-router-dom";
function Header() {
  return (
    <div className={styles.header}>
      <Logo />
      <Heading />
      <Outlet />
    </div>
  );
}

export default Header;
