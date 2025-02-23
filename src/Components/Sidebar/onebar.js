import React from "react";
import styles from "../../Features/App.module.css"

//Start of One Bar function Displays a button with a subretting as the title
export default function OneBar(props) {
    const {data, getUrl}= props;  

    //Handle Click function which gets url from subreddit
    const handleClick = (e) => {
        e.preventDefault();
        getUrl(data.url);
    };

    //Return Section
    return (
        <div className={styles.oneBarContainer}>
            <button className={styles.oneBar}
                    onClick={handleClick}
            >
                <h3>{data.title}</h3>
            </button>
        </div>
    )
};