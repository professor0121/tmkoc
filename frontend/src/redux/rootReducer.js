import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import packageReducer from './packages/packageSlice';
import destinationReducer from './destinations/destinationSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  packages: packageReducer,
  destinations: destinationReducer,
  // add more reducers here later (e.g., user, posts, chat)
});

export default rootReducer;
