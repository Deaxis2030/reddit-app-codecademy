import React from "react";
import { useSelector } from "react-redux";
import styles from "../../Features/App.module.css";
import { isLoadingComments, failedToLoadComments } from "./commentsSlice";

// Start of CommentPanel function creatinga panel for comments below a post
export default function CommentPanel(props) {
  //Main Variables
  const { comments, button } = props;
  const loading = useSelector(isLoadingComments);
  const failed = useSelector(failedToLoadComments);
  const loadingText = <p className={styles.loadingText}>Loading comments...</p>;
  const failedText = (
    <p className={styles.failedText}>Failed to load comments!</p>
  );

  //Ensuring comments is an array to avoid error before comments have loaded
  const commentsArray = Array.isArray(comments) ? comments : [];

  // Return section mapping comments for a post
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
            commentsArray.map((comment) => {
              // Extract GIF URL from media_metadata
              const gifUrl = comment.media_metadata
                ? Object.values(comment.media_metadata)[0]?.s?.gif
                : null;

              return (
                <li key={comment.id}>
                  <p>
                    <strong>{comment.author}</strong>:{" "}
                    {gifUrl ? (
                      <img
                        src={gifUrl}
                        alt="Comment media"
                        className={styles.commentImage}
                      />
                    ) : (
                      comment.body
                    )}
                  </p>
                </li>
              );
            })
          ) : (
            <li>No comments available</li>
          )}
        </ul>
      </div>
    </div>
  );
}
