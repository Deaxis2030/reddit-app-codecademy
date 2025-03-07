import Panels from "./Components/panel/panels";
import SideBar from "./Components/Sidebar/sidebar";
import styles from "../src/Features/App.module.css";
import Banner from "./Features/Banner/Banner";
import Search from "./Components/Search/search";
import { useState } from "react";

//Start of App function
function App() {

  // Toggle variable and handleClick function for toggling darkmode
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setToggle(!toggle);
  };

  //Return Section
  return (
    <div className={styles[`appContainer${toggle?"DarkMode":""}`]}>
      <div className={styles.bannerDiv}>
        <Banner handleClick={handleClick} toggle={toggle} /><Search />
      </div>
      <main className={styles.mainContainer}>
        <div>
          <SideBar />
        </div>
        <div className={styles.panelsMain}>
          <div className={styles.searchBar}>
            
          </div>
          <Panels />
        </div>
      </main>
    </div>
  );
}

//
export default App;
