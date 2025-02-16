import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadPosts } from "../panel/panelSlice";
import styles from "../../Features/App.module.css"

export default function Search() {

    const [text, setText] = useState("");
    const handleTextChange = ({target}) => {
        setText(target.value);
    };
    const dispatch = useDispatch();

    const onSubmitfunc = (event) => {
        event.preventDefault();
        dispatch(loadPosts(text));
    }
    

    return (
     
            <div className={styles.SearchBarContainer}>
                <form className={styles.form} action="action_page.php" onSubmit={onSubmitfunc}>
                    <input  type="text" 
                            value={text}
                            placeholder="Search..." 
                            name="search"
                            onChange={handleTextChange}
                            aria-label="search"
                    ></input>
                    <button aria-label="search-button" type="submit"><i className="fa fa-search"></i></button>
                </form>
            </div>
    )
}