import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isLoadingSubreddits, failedToLoadSubreddits, listOfSubreddits, loadSubreddits } from "./SidebarSlice";
import OneBar from "./onebar";
import styles from "../../Features/App.module.css"
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