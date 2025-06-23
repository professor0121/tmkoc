import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import packageReducer from './packages/packageSlice';
import destinationReducer from './destinations/destinationSlice';
import bookingReducer from './bookings/bookingSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  packages: packageReducer,
  destinations: destinationReducer,
  bookings: bookingReducer,
  // add more reducers here later (e.g., user, posts, chat)
});

export default rootReducer;
