import React from "react";

export default function Panel (props){

    const {data} = props;

    let thing;
    if(data.post_hint === "image") {
        thing = <img src={data.url}></img>;
    }   else if (data.post_hint === "hosted:video") {
        const videoUrl = data.media?.reddit_video?.fallback_url;
        thing = <video width="600" controls > <source src={videoUrl} type="video/mp4"/> Browser does not support video </video>
    } else if (data.thumbnail === "self") {
        thing = <p> {data.selftext}</p>
    } else if (data.post_hint === "link") {
        thing = <a href={data.url} target="_blank">{data.url}</a>
    } else {
        thing = <a href={data.url} target="_blank">{data.url}</a>
    }


    return ( 

        <div>
            <div key={data.id}>
                <h1>{data.title}</h1>
                {thing}
            </div> 
        </div>
    )
}