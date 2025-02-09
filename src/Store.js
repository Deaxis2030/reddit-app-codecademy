import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './Components/panel/panelSlice';
import subredditsReducer from "./Components/Sidebar/SidebarSlice"
import commentsReducer from "./Components/Comments/commentsSlice"

export default configureStore({
    reducer: {
        posts: postsReducer,
        subreddits: subredditsReducer,
        comments: commentsReducer,
    }
})
