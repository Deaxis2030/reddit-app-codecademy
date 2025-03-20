import React from "react";
import styles from "../../Features/App.module.css";

// Banner function
export default function Banner({handleClick, toggle}) {
 

  return (
    <header className={styles.Banner}>
      <div className={styles.titleDiv}>
        <h2 className={styles.title}>Reddit App 2.0</h2>
      </div>
      <div className={styles.bannerBTNDiv}>
        <button
          aria-label="Toggle Dark Mode"
          className={styles[`bannerBTN${toggle ? "darkMode" : ""}`]}
          onClick={handleClick}
        >
          <div className={styles.innerToggleBTN}></div>
        </button>
      </div>
    </header>
  );
}


