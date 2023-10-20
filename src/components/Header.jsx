import Heading from "./Heading";
import Logo from "./Logo";
import styles from "./Header.module.css";
import { Outlet } from "react-router-dom";
import UserAccountInfo from "./UserAccountInfo";
function Header() {
  return (
    <>
      <div className={styles.header}>
        <Logo />
        <Heading />
        <UserAccountInfo />
      </div>
      {/* <Preferences /> */}
      <Outlet />
    </>
  );
}

export default Header;
