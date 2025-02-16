import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import CommentPannel from "../Comments/comments";
import { listOfComments } from "../Comments/commentsSlice";
import styles from "../../Features/App.module.css"
import downArrow from "../../Features/Resources/Reddit App down Arrow.png"
import upArrow from "../../Features/Resources/Reddit App Up Arrow.png"
import kNumberFormatter from "../../Features/Converters/kNumberFormatter";
import dateFormatter from "../../Features/Converters/dateFormatter";


export default function Panel (props){

    const {data, getCommentsData} = props;
    const [button, setButton] = useState(false);
    const commentsData = useSelector(state => listOfComments(state, data.id));


let thing;
   try {
    if(data.post_hint === "image") {
        thing = <img className={styles.onePanelIMG} src={data.url}></img>;
    }   else if (data.post_hint === "hosted:video") {
        const videoUrl = data.media?.reddit_video?.fallback_url;
        thing = <video className={styles.onePanelVideo} width="600" controls > <source src={videoUrl} type="video/mp4"/> Browser does not support video </video>
    } else if (data.thumbnail === "self") {
        thing = <p className={styles.onePanelP}> {data.selftext}</p>
    } else if (data.post_hint === "link") {
        thing = <a className={styles.onePanelLink} href={data.url} target="_blank">{data.url}</a>
    } else {
        thing = <a className={styles.onePanelLink} href={data.url} target="_blank">{data.url}</a>
    }
   } catch (err) {
    console.log(err);
   }

   const handleClick = (e) => {
    e.preventDefault();
    setButton(!button);
    getCommentsData(data.subreddit_name_prefixed, data.id);
    
   };


    return ( 
        <div>
            <div className={styles.onePanelContainer}>  
               <div className={styles.panelInfoContainer}>
                    <div className={styles.subredditNameContainer}>
                        <p>{data.subreddit_name_prefixed}</p>
                    </div>
                    <div className={styles.arrowContainer} >   
                        <img className={styles.upArrow} src={upArrow}></img>
                        <p>{kNumberFormatter(data.ups)}</p>
                        <img className={styles.downArrow} src={downArrow} /> 
                    </div>
                    <div className={styles.authorContainer}>
                        <p>by: {data.author}</p>
                    </div>
               </div>
                
                <div    
                    className={styles.onePanel}
                    key={data.id}
                >
                    <h3>{data.title}</h3>
                    {thing}
                    <h6>{dateFormatter(data)}</h6>
                </div> 
               
                <div className={styles.buttonContainer}>  
                    <button 
                        className={styles.commentsBTN}
                        onClick={handleClick}
                    >
                            Comments
                    </button>
                </div>
            </div>
          
          { button && (<div >
            <CommentPannel data={data} comments={commentsData} />
           </div>)}
        </div>
    )
}