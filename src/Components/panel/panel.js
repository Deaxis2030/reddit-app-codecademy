import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import ReactMarkdown from "react-markdown"
import CommentPanel from "../Comments/comments";
import { listOfComments } from "../Comments/commentsSlice";
import styles from "../../Features/App.module.css"
import downArrow from "../../Features/Resources/Reddit App down Arrow.png"
import upArrow from "../../Features/Resources/Reddit App Up Arrow.png"
import kNumberFormatter from "../../Features/Converters/kNumberFormatter";
import dateFormatter from "../../Features/Converters/dateFormatter";
import VideoPlayer from "../../Features/VideoPlayer/VideoPlayer";

//Start of Panel Function whcih displays the data for a singular post
export default function Panel (props){

    //Main Variables
    const {data, getCommentsData} = props;
    const [button, setButton] = useState(false);
    const commentsData = useSelector(state => listOfComments(state, data.id));
    let panelData;
   
   //Try catch block for assigning the post data to panelData variable depending on the type of data being posted
   try {
    if(data.post_hint === "image") {
        panelData = <img className={styles.onePanelIMG} src={data.url}></img>;
    }   else if (data.post_hint === "hosted:video") {
        const videoUrl = data.media?.reddit_video?.dash_url;
        panelData = <VideoPlayer className={styles.onePanelVideo} url={videoUrl}/>
    } else if (data.thumbnail === "self") {
        panelData = <ReactMarkdown>{data.selftext}</ReactMarkdown>
    } else if (data.post_hint === "link") {
        panelData = <a className={styles.onePanelLink} href={data.url} target="_blank">{data.url}</a>
    } else {
        panelData = <a className={styles.onePanelLink} href={data.url} target="_blank">{data.url}</a>
    }
   } catch (err) {
    console.log(err);
   }

   //HandleClick function that displays the comment panel
   const handleClick = (e) => {
    e.preventDefault();
    setButton(!button);
    getCommentsData(data.subreddit_name_prefixed, data.id);
    
   };

   //Return section detailing each singular panel
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
                    {panelData}
                    <h6>{dateFormatter(data)}</h6> 
                </div> 
               
                <div className={styles.buttonContainer}>  
                    <button 
                        className={styles.commentsBTN}
                        onClick={handleClick}
                    >
                           {!button? "Comments": "Hide Comments"}
                    </button>
                </div>
            </div>
         
            <CommentPanel button={button} data={data} comments={commentsData} />
       
        </div>
    )
}

