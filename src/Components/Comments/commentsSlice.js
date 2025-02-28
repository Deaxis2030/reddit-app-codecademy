import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getComments } from "../API-Call/api-call";

// Async thunk to load comments
export const loadComments = createAsyncThunk(
  "comments/getComments",
  async ({ url, id }) => {
    const data = await getComments(url, id);
    return data;
  }
);

// Slice for managing comment state
export const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: {},
    isLoadingComments: false,
    failedToLoadComments: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadComments.pending, (state) => {
        state.isLoadingComments = true;
        state.failedToLoadComments = false;
      })
      .addCase(loadComments.rejected, (state) => {
        state.isLoadingComments = false;
        state.failedToLoadComments = true;
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.isLoadingComments = false;
        state.failedToLoadComments = false;
        const { post_id, commentsData } = action.payload || {};
        if (post_id && commentsData) {
          state.comments[post_id] = commentsData.map((child) => child.data);
        } else {
          console.error("Invalid payload structure:", action.payload);
        }
      });
  },
});

// Selectors for accessing comment state
export const listOfComments = (state, post_id) =>
  state.comments.comments[post_id];
export const isLoadingComments = (state) => state.comments.isLoadingComments;
export const failedToLoadComments = (state) =>
  state.comments.failedToLoadComments;

// Export the reducer
export default commentsSlice.reducer;
