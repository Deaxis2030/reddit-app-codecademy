import {React, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { listOfPosts, isLoadingPosts, failedToLoadPosts, loadPosts } from "./panelSlice";
import Panel from "./panel";

export default function Panels () {

    const posts = useSelector(listOfPosts);
    const dispatch = useDispatch();

    useEffect (() => {
        dispatch(loadPosts());
    } , [])
    
    console.log("check", posts)
    
   
    return (
        <div className="panel-container">
                {
                (posts.data === null)? "" : posts.map((child, index) => 
                  <Panel data={child.data} key={index}/>       
                ) 
                }
        </div>
    );

}