import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  // add more reducers here later (e.g., user, posts, chat)
});

export default rootReducer;
