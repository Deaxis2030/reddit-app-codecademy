import React from "react";
import styles from "../../Features/App.module.css"


export default function  CommentPannel (props){

    const {comments} = props;
    console.log("checking in coment.js", comments)
  
    return ( 

        <div className={styles.commentsContainer}>
            <div    className={styles.commentPanel}>
                <h3>Comments</h3>
                <ul>
                    { comments && Array.isArray(comments)? (comments.map(comment => (
                    <li key={comment.id}>
                        <p><strong>{comment.author}</strong>: {comment.body}</p>
                    </li>
                    ))):""}
                </ul>
            </div> 
        </div>
    )
}