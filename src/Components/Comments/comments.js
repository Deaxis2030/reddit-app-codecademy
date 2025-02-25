import React from "react";
import { useSelector } from "react-redux";
import styles from "../../Features/App.module.css";
import { isLoadingComments, failedToLoadComments } from "./commentsSlice";

//Start of Comment Panel Function which displays the comments of a post
export default function CommentPanel(props) {
  
  //Main Variables
  const { comments, button } = props;
  const loading = useSelector(isLoadingComments);
  const failed = useSelector(failedToLoadComments);
  const loadingText =(<p className={styles.loadingText}>Loading comments...</p>);
  const failedText = (<p className={styles.failedText}>Failed to load comments!</p>);

  //Return Section mapping each comment made on the post  
  if (loading) {
    console.log("checking text", loadingText)
  }

// Ensuring comments is always an array
const commentsArray = Array.isArray(comments) ? comments : [];

return (
  <div className={styles.commentsContainer}>
    <div className={button ? styles.commentPanel : styles.noCommentPanel}>
      <h3>
        {loading
          ? loadingText
          : failed
          ? failedText
          : `Comments: ${commentsArray.length}`}
      </h3>
      <ul>
        {commentsArray.length > 0 ? (
          commentsArray.map((comment) => (
            <li key={comment.id}>
              <p>
                <strong>{comment.author}</strong>: {comment.body}
              </p>
            </li>
          ))
        ) : (
          <li>No comments available</li>
        )}
      </ul>
    </div>
  </div>
);
}
