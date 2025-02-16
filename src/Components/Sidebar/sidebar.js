import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isLoadingSubreddits, failedToLoadSubreddits, listOfSubreddits, loadSubreddits } from "./SidebarSlice";
import { loadPosts } from "../panel/panelSlice";
import OneBar from "./onebar";
import styles from "../../Features/App.module.css"
export default function SideBar() {

    const subreddits = useSelector(listOfSubreddits);
    const dispatch = useDispatch();
   
    useEffect (() => {
        dispatch(loadSubreddits());
    } , [dispatch])

    const getUrl = (arg) => {
        dispatch(loadPosts(arg));
    }

    return (
        <div className={styles.sideBarContainer}>
            <h2>Most Popular SubReddits</h2>
            <div className={styles.sideBar}>
                 {
                    (subreddits.length === 0)? "" : subreddits.map((child, index) => 
                        <OneBar getUrl={getUrl} data={child.data} key={index}/>       
                    ) 
                    }
            </div>
        </div>
    )
}