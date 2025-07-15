import Panels from "./Components/panel/panels";
import SideBar from "./Components/Sidebar/sidebar";
import styles from "./Features/App.module.css";
import Banner from "./Features/Banner/Banner";
import Search from "./Components/Search/search";
import { useState } from "react";
import { Provider } from "react-redux";
import store from "./store"; // Adjust path if needed

function App() {
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setToggle(!toggle);
  };

  return (
    <Provider store={store}>
      <div className={styles[`appContainer${toggle ? "DarkMode" : ""}`]} data-testid="app-container">
        <div className={styles.bannerDiv}>
          <Banner handleClick={handleClick} toggle={toggle} />
          <Search />
        </div>
        <main className={styles.mainContainer}>
          <div>
            <SideBar />
          </div>
          <div className={styles.panelsMain}>
            <div className={styles.searchBar}></div>
            <Panels />
          </div>
        </main>
      </div>
    </Provider>
  );
}

export default App;