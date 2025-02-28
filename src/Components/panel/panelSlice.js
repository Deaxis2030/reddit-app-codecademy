import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getAll, { getSubreddit, searchReddit } from "../API-Call/api-call";

// Async thunk to load posts
export const loadPosts = createAsyncThunk("posts/getPosts", async (arg) => {
  let data;
  if (!arg) {
    data = await getAll();
  } else if (!arg.includes("r/")) {
    data = await searchReddit(arg);
  } else if (arg.includes("r/")) {
    data = await getSubreddit(arg);
  }
  return data;
});

// Slice for managing posts state
export const panelSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    isLoadingPosts: false,
    failedToLoadPosts: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
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
        console.log("checking", action.payload);
      });
  },
});

// Selectors for accessing post state
export const listOfPosts = (state) => state.posts.posts;
export const isLoadingPosts = (state) => state.posts.isLoadingPosts;
export const failedToLoadPosts = (state) => state.posts.failedToLoadPosts;

// Export the reducer
export default panelSlice.reducer;
