import React from "react";
import { getSubReddit } from "../API-Call/api-call";

export default function sideBar(props) {

    const {data}= props;

    const handleClick = (e) => {
        e.preventDefault();
        
    };

    return (
        <div className={styles.sideBar-container}>
            <div className={styles.sideBar}>
                {
                    (data === null)? "" : data.map((child) => 
                    <button aria-label={child.subreddit}
                            className={styles.sideBarBTN}
                            onClick={handleClick}
                            value={child.subreddit_id}
                    >
                        {child.subreddit_name_prefixed}
                    </button>
                    ) 
                }
            </div>
        </div>
    )
}