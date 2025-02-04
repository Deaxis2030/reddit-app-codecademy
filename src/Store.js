import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './Components/panel/panelSlice';
import subredditsReducer from "./Components/Sidebar/SidebarSlice"

export default configureStore({
    reducer: {
        posts: postsReducer,
        subreddits: subredditsReducer,
    }
})
