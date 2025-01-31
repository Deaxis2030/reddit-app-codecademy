import React, { useState, useEffect } from 'react';
import Panels from './Components/panel/panels';
import SideBar from './Components/Sidebar/sidebar';
import styles from "../src/Features/App.module.css";
import Banner from './Features/Banner/Banner';

function App() {

  return (
    <div className={styles.appContainer}>
      <Banner></Banner>
      < div className={styles.App}>
        <SideBar /> 
        <Panels />
      </div>
    </div>
  );
}

export default App;
