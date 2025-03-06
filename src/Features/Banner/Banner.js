import React from "react";
import styles from "../../Features/App.module.css";
import { useState } from "react";

// Banner function
export default function Banner() {
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setToggle(!toggle);
  };

  return (
    <header className={styles.Banner}>
      <div className={styles.titleDiv}>
        <h2 className={styles.title}>Reddit App 2.0</h2>
      </div>
      <div className={styles.bannerBTNDiv}>
        <button
          className={toggle ? styles.darkMode : styles.lightMode}
          onClick={handleClick}
        >
          <div className={styles.innerToggleBTN}></div>
        </button>
      </div>
    </header>
  );
}
