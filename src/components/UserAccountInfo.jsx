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
          src="/user2.png"
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
            <Link to="read" className={styles.link}>
              Read
            </Link>
            <Link to="settings" className={styles.link}>
              Settings
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default UserAccountInfo;
