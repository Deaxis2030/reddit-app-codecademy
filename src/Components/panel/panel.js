import React from "react";
import styles from "../../Features/App.module.css"

export default function Panel (props){

    const {data} = props;

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


    return ( 

        <div className={styles.onePanelContainer}>
            <div    className={styles.onePanel}
                    key={data.id}>
                <h3>{data.title}</h3>
                {thing}
            </div> 
        </div>
    )
}