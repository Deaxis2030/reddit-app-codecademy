import React from "react";
import { useDispatch, useSelector, useEffect } from "react-redux";
import { isLoadingSubreddits, failedToLoadSubreddits, listOfSubreddits, loadSubreddits } from "./SidebarSlice";
import OneBar from "./onebar";
import styles from "../Styles/styles.module.css"

export default function SideBar() {

    const subreddits = useSelector(listOfSubreddits);
    const dispatch = useDispatch();
   
    useEffect (() => {
        dispatch(loadSubreddits());
    } , [])

    console.log("check check", subreddits);

    const handleClick = (e) => {
        e.preventDefault();
        
    };

    return (
        <div className={styles.sideBarContainer}>
            <div className={styles.sideBar}>
                 {
                    (subreddits.data === null)? "" : subreddits.map((child, index) => 
                        <OneBar data={child.data} key={index}/>       
                    ) 
                    }
            </div>
        </div>
    )
}