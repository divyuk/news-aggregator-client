import Heading from "./Heading";
import Logo from "./Logo";
import styles from "./Header.module.css";
import { Outlet } from "react-router-dom";
import Preferences from "./Preferences";
function Header() {
  return (
    <>
      <div className={styles.header}>
        <Logo />
        <Heading />
      </div>
      {/* <Preferences /> */}
      <Outlet />
    </>
  );
}

export default Header;
