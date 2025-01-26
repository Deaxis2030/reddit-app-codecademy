import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './Components/panel/panelSlice';


export default configureStore({
    reducer: {
        posts: postsReducer
    }
})
