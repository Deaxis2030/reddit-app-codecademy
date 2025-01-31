import {React, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { listOfPosts, isLoadingPosts, failedToLoadPosts, loadPosts } from "./panelSlice";
import Panel from "./panel";
import styles from "../../Features/App.module.css"


export default function Panels () {

    const posts = useSelector(listOfPosts);
    const dispatch = useDispatch();

    useEffect (() => {
        dispatch(loadPosts());
    } , [])
    
    return (
        <div className={styles.panelsContainer}>
                {
                (posts.data === null)? "" : posts.map((child, index) => 
                  <Panel data={child.data} key={index}/>       
                ) 
                }
        </div>
    );

}