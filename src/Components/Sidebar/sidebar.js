import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isLoadingSubreddits, failedToLoadSubreddits, listOfSubreddits, loadSubreddits } from "./SidebarSlice";
import { loadPosts } from "../panel/panelSlice";
import OneBar from "./onebar";
import styles from "../../Features/App.module.css"

//Start of Side Bar function displays a list of most popular subreddits
export default function SideBar() {

    //Main Variables
    const loading = useSelector(isLoadingSubreddits);
    const failed = useSelector(failedToLoadSubreddits);
    const subreddits = useSelector(listOfSubreddits);
    const dispatch = useDispatch();
    const loadingText = <p className={styles.loadingText}>Loading Posts...</p>;
    const failedText = <p className={styles.failedText}>Failed to load Posts!</p>

    //Function to load subreddits
    useEffect (() => {
        dispatch(loadSubreddits());
    } , [dispatch])

    //Function to load posts from url of subreddit clicked
    const getUrl = (arg) => {
        dispatch(loadPosts(arg));
    }

    //Return Section Mapping the subreddits to sidebar section
    return (
        <div className={styles.sideBarContainer}>
            <h2>Most Popular SubReddits</h2>
            <div className={styles.sideBar}>
                    {loading ? (
                        `${loadingText}`
                    )   : failed ? (
                        `${failedText}`
                    ) :
                    (subreddits.length === 0)? "" : subreddits.map((child, index) => 
                        <OneBar getUrl={getUrl} data={child.data} key={index}/>       
                    ) 
                    }
            </div>
        </div>
    )
}