import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listOfPosts,
  isLoadingPosts,
  failedToLoadPosts,
  loadPosts,
} from "./panelSlice";
import Panel from "./panel";
import { loadComments } from "../Comments/commentsSlice";
import styles from "../../Features/App.module.css";

//Start of Panels function displaying 25 posts
export default function Panels() {
  const loading = useSelector(isLoadingPosts);
  const failed = useSelector(failedToLoadPosts);
  const posts = useSelector(listOfPosts);
  const dispatch = useDispatch();
  const loadingText = <p className={styles.loadingText}>Loading Posts...</p>;
  const failedText = <p className={styles.failedText}>Failed to load Posts!</p>;

  //Laod posts function taking the data from panelSlice
  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  //Function to get the comments data for each post
  const getCommentsData = (url, id) => {
    try {
      dispatch(loadComments({ url, id }));
    } catch (err) {
      console.log(`Failed to load Comments: ${err}`);
    }
  };

  //Return Section mapping the 25 panels from the slice state
  return (
    <div className={styles.panelsContainer}>
      {loading ? (
        <h2 className={styles.loadingText}>{loadingText}</h2>
      ) : failed ? (
        <h2 className={styles.failedText}>{failedText}</h2>
      ) : posts && posts.length > 0 ? (
        posts.map((child) => (
          <div key={child.data.id}>
            <Panel getCommentsData={getCommentsData} data={child.data} />
          </div>
        ))
      ) : (
        "No posts available"
      )}
    </div>
  );
}
