import React from "react";
import styles from "../../Features/App.module.css"
import { loadPosts } from "../panel/panelSlice";
import { useDispatch } from "react-redux";

export default function OneBar(props) {

    const dispatch = useDispatch();
    const {data, getUrl}= props;  

    const handleClick = (e) => {
        e.preventDefault();
        getUrl(data.url);
    };

    //console.log("Check", name);

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