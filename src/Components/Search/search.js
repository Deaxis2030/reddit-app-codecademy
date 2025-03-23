import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loadPosts } from "../panel/panelSlice";
import styles from "../../Features/App.module.css";

//Start of search function
export default function Search() {
  
  //Main variables
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  // Text change function
  const handleTextChange = ({ target }) => {
    setText(target.value);
  };

  //On submit function
  const onSubmitfunc = (event) => {
    event.preventDefault();
    dispatch(loadPosts(text));
  };

  //Return Section displays both input bar and a button with a magnifying glass 
  return (
    <div className={styles.SearchBarContainer}>
      <form data-testid="search-form" className={styles.form} onSubmit={onSubmitfunc}>
        <input
          type="text"
          value={text}
          placeholder="Search..."
          name="search"
          onChange={handleTextChange}
          aria-label="search"
        />
        <button aria-label="search-button" type="submit">
          <i className="fa fa-search"></i>
        </button>
      </form>
    </div>
  );
}
