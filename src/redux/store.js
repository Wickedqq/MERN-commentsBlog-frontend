import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { postsReducer } from './slices/postSlice';
import { authReducer } from './slices/authSlice';

const reducer = combineReducers({
  postsReducer,
  authReducer,
});

const store = configureStore({
  reducer,
});

export default store;
