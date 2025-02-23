import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPopular } from "../API-Call/api-call";

// Async thunk to load subreddits
export const loadSubreddits = createAsyncThunk("subreddits/loadSubreddits",
  async () => {
    const data = await getPopular();
    return data;
  }
);

// Slice for managing subreddit state
export const SidebarSlice = createSlice({
  name: "subreddits",
  initialState: {
    subreddits: [],
    isLoadingSubreddits: false,
    failedToLoadSubreddits: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSubreddits.pending, (state) => {
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
      });
  },
});

// Selectors for accessing subreddit state
export const listOfSubreddits = (state) => state.subreddits.subreddits;
export const isLoadingSubreddits = (state) => state.subreddits.isLoadingSubreddits;
export const failedToLoadSubreddits = (state) => state.subreddits.failedToLoadSubreddits;

// Export the reducer
export default SidebarSlice.reducer;
