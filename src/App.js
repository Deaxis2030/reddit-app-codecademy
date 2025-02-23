import Panels from './Components/panel/panels';
import SideBar from './Components/Sidebar/sidebar';
import styles from "../src/Features/App.module.css";
import Banner from './Features/Banner/Banner';
import Search from './Components/Search/search';

//Start of App function 
function App() {

  //Return Section
  return (
    <div className={styles.appContainer}>
        <div className={styles.bannerDiv}><Banner/></div>
      < main className={styles.mainContainer}>
        <div>
          <SideBar /> 
        </div>
        <div className={styles.panelsMain}>
       <div className={styles.searchBar}>
          <Search/>
        </div>
          <Panels /> 
        </div>
       
      </main>
    </div>
  );
}

//
export default App;
