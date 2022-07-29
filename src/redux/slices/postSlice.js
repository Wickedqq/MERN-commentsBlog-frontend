import { createSlice } from '@reduxjs/toolkit';

import { fetchPosts, makePosting, editPost, deletePost } from '../actions.js';

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    isLoading: false,
    makePostErr: null,
    currentEditPost: null,
  },
  reducers: {
    clearErr(state) {
      state.makePostErr = null;
    },
    selectEditPost(state, action) {
      state.currentEditPost = action.payload;
    },
    removeEditSelection(state) {
      state.currentEditPost = null;
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
    },
    [fetchPosts.rejected]: (state) => {
      state.posts = [];
      state.isLoading = false;
    },
    [makePosting.fulfilled]: (state, action) => {
      state.posts = action.payload._id ? [...state.posts, action.payload] : state.posts;
      state.makePostErr = action.payload.isError ? action.payload : null;
    },
    [makePosting.rejected]: (state) => {
      state.posts = [...state.posts];
    },
    [editPost.fulfilled]: (state, action) => {
      state.posts = !action.payload.isError
        ? state.posts.map((item) => {
            if (item._id === action.payload._id) {
              return action.payload;
            }
            return item;
          })
        : state.posts;
      state.makePostErr = action.payload.isError ? action.payload : null;
    },
    [editPost.rejected]: (state) => {
      state.posts = [...state.posts];
    },
    [deletePost.fulfilled]: (state, action) => {
      state.posts = state.posts.filter((item) => item._id !== action.payload);
    },
  },
});

const postsReducer = postsSlice.reducer;
const { clearErr, selectEditPost, removeEditSelection } = postsSlice.actions;
export { postsReducer, clearErr, selectEditPost, removeEditSelection };
