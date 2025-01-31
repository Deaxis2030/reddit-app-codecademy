import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPopular } from "../API-Call/api-call";

export const loadSubreddits = createAsyncThunk("posts/getPosts",
    
    async () => {
        const data = await getPopular();
        return data;
    }

);

export const SidebarSlice = createSlice({
    name: "subreddits",
    initialState: {
        subreddits: [],
        isLoadingSubreddits: false,
        failedToLoadSubreddits: false,
    },

    extraReducers: (builder) => {
        builder.addCase(loadSubreddits.pending, (state) => {
            state.isLoadingSubreddits = true;
            state.failedToLoadSubreddits = false;
        })
        .addCase(loadSubreddits.rejected, (state) => {
            state.isLoadingSubreddits = false;
            state.failedToLoadSubreddits = true;
        })
        .addCase(loadSubreddits.fulfilled, (state, action) => {
            state.isLoadingSubreddits = false;
            state.failedToLoadSubreddits = false;
            state.subreddits = action.payload;
        })
    }
})

export const listOfSubreddits = (state) => state.subreddits.subreddits;
export const isLoadingSubreddits = (state) => state.posts.isLoadingSubreddits;
export const failedToLoadSubreddits = (state) => state.posts.failedToLoadSubreddits;
export default SidebarSlice.reducer;