import React, { useState, useEffect } from 'react';
import Panels from './Components/panel/panels';
import SideBar from './Components/Sidebar/sidebar';
import styles from "../src/Features/App.module.css";
import Banner from './Features/Banner/Banner';
import Search from './Components/Search/search';

function App() {

  return (
    <div className={styles.appContainer}>
        <div className={styles.bannerDiv}><Banner/></div>
      < main className={styles.mainContainer}>
        <div>
          <SideBar /> 
        </div>
        <div className={styles.panelsMain}>
          <Panels /> <Search/>
        </div>
      </main>
    </div>
  );
}

export default App;
