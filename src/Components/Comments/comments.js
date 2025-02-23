import React from "react";
import { useSelector } from "react-redux";
import styles from "../../Features/App.module.css";
import { isLoadingComments, failedToLoadComments } from "./commentsSlice";

//Start of Comment Panel Function which displays the comments of a post
export default function CommentPanel(props) {
  
  //Main Variables
  const { comments } = props;
  const loading = useSelector(isLoadingComments);
  const failed = useSelector(failedToLoadComments);
  const loadingText = <p className={styles.loadingText}>Loading Posts...</p>;
  const failedText = <p className={styles.failedText}>Failed to load Posts!</p>

  //Return Section mapping each comment made on the post  
  return (
    <div className={styles.commentsContainer}>
      <div className={styles.commentPanel}>
        <h3>
          {loading
            ? `${loadingText}`
            : failed
            ? `${failedText}`
            : `Comments: ${comments.length}`}
        </h3>
        <ul>
          {comments && Array.isArray(comments) ? (
            comments.map((comment) => (
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
