import React from "react";
import { useSelector } from "react-redux";
import styles from "../../Features/App.module.css";
import { isLoadingComments, failedToLoadComments } from "./commentsSlice";

export default function CommentPanel(props) {
  const { comments, button } = props;
  const loading = useSelector(isLoadingComments);
  const failed = useSelector(failedToLoadComments);
  const loadingText = <p className={styles.loadingText}>Loading comments...</p>;
  const failedText = (
    <p className={styles.failedText}>Failed to load comments!</p>
  );

  const commentsArray = Array.isArray(comments) ? comments : [];

  return (
    <div className={styles.commentsContainer} data-testid="comment-panel">
      <div
        className={button ? styles.commentPanel : styles.noCommentPanel}
        data-testid="inner-comment-panel"
      >
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
                        alt="GIF in comment"
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