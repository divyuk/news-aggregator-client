import { useState } from "react";
import styles from "./UserAccountInfo.module.css";
import { Link } from "react-router-dom";

function UserAccountInfo() {
  const [dropdown, setDropDown] = useState(false);

  const toggleDropdown = () => {
    setDropDown(!dropdown);
  };

  return (
    <>
      <div className={styles.container}>
        <img
          src="/userc.png"
          alt="user display profile"
          className={styles.dp}
          onClick={toggleDropdown}
        />
        {dropdown && (
          <div className={styles.dropdownContent}>
            <Link
              to="favourite"
              className={styles.link}
              onClick={toggleDropdown}
            >
              Favourite
            </Link>
            <Link to="read" className={styles.link} onClick={toggleDropdown}>
              Read
            </Link>
            <Link
              to="updatePreferences"
              className={styles.link}
              onClick={toggleDropdown}
            >
              Update Preferences
            </Link>
            <Link to="logout" className={styles.link} onClick={toggleDropdown}>
              Log Out
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default UserAccountInfo;
