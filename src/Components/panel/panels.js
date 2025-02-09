import {React, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { listOfPosts, isLoadingPosts, failedToLoadPosts, loadPosts } from "./panelSlice";
import Panel from "./panel";
import { loadComments } from "../Comments/commentsSlice";
import styles from "../../Features/App.module.css"


export default function Panels () {

    const posts = useSelector(listOfPosts);
    const dispatch = useDispatch();

    useEffect (() => {
        dispatch(loadPosts());
        
    } , [])

    const getCommentsData = (url, id) => {
        try {
            dispatch(loadComments({url, id}));
        }
        catch (err){
            console.log(`Failed to load Comments: ${err}`);
        }
    }
    
    return (
        <div className={styles.panelsContainer}>
                {
                (posts.data === null)? "" : posts.map((child, index) => 
                    <div key ={index}>
                        <Panel getCommentsData={getCommentsData} data={child.data}/> 
                    </div>
                ) 
                }
        </div>
    );

}