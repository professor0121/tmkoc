import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import packageReducer from './packages/packageSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  packages: packageReducer,
  // add more reducers here later (e.g., user, posts, chat)
});

export default rootReducer;
