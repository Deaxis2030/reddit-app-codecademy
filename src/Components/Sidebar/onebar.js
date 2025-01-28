import React from "react";
import styles from "../Styles/styles.module.css"

export default function OneBar(props) {

    const {data}= props;  

    return (
        <div className={styles.oneBarContainer}>
            <div className={styles.oneBar}>
                <h3>{data.subreddit}</h3>
            </div>
        </div>
    )
};