import { createSlice } from '@reduxjs/toolkit';

import { fetchUserData, getIsAuth, PostUserData } from '../actions';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authData: null,
    isLoading: false,
  },
  reducers: {
    logout: (state) => {
      state.authData = null;
    },
  },
  extraReducers: {
    [fetchUserData.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchUserData.fulfilled]: (state, action) => {
      state.authData = {
        ...action.payload,
        isLoggedin: action.payload.message === 'success' ? true : false,
      };
      state.isLoading = false;
    },
    [fetchUserData.rejected]: (state) => {
      state.authData = null;
      state.isLoading = false;
    },
    [PostUserData.rejected]: (state) => {
      state.authData = null;
      state.isLoading = false;
    },
    [PostUserData.pending]: (state) => {
      state.isLoading = true;
    },
    [PostUserData.fulfilled]: (state, action) => {
      state.authData = {
        ...action.payload,
        isLoggedin: action.payload.message === 'success' ? true : false,
      };
      state.isLoading = false;
    },

    [getIsAuth.rejected]: (state) => {
      state.authData = null;
      state.isLoading = false;
    },
    [getIsAuth.pending]: (state) => {
      state.isLoading = true;
    },
    [getIsAuth.fulfilled]: (state, action) => {
      state.authData = action.payload;
      state.isLoading = false;
    },
  },
});

const authReducer = authSlice.reducer;
export { authReducer };
export const { logout } = authSlice.actions;
