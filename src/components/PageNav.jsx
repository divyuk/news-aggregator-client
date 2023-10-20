import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
function PageNav() {
  return (
    <nav className={styles.pagenav}>
      <ul>
        <li>
          <NavLink to="/login" className={styles.navlink}>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/register" className={styles.navlink}>
            Register
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
