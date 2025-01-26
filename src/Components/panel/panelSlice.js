import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getAll from "../API-Call/api-call";

export const loadPosts = createAsyncThunk("posts/getPosts",

    
    async () => {
        const data = await getAll();
        return data;
    }

);

export const panelSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        isLoadingPosts: false,
        failedToLoadPosts: false,
    },

    extraReducers: (builder) => {
        builder.addCase(loadPosts.pending, (state) => {
            state.isLoadingPosts = true;
            state.failedToLoadPosts = false;
        })
        .addCase(loadPosts.rejected, (state) => {
            state.isLoadingPosts = false;
            state.failedToLoadPosts = true;
        })
        .addCase(loadPosts.fulfilled, (state, action) => {
            state.isLoadingPosts = false;
            state.failedToLoadPosts = false;
            state.posts = action.payload;
        })
    }
})

export const listOfPosts = (state) => state.posts.posts;
export const isLoadingPosts = (state) => state.posts.isLoadingPosts;
export const failedToLoadPosts = (state) => state.posts.failedToLoadPosts;
export default panelSlice.reducer;