import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createBookingAPI,
  getAllBookingsAPI,
  getUserBookingsAPI,
  getBookingByIdAPI,
  updateBookingAPI,
  updateBookingStatusAPI,
  addPaymentAPI,
  cancelBookingAPI,
  addReviewAPI,
  deleteBookingAPI,
  getUpcomingBookingsAPI,
  getPastBookingsAPI,
  getBookingStatisticsAPI,
  generateBookingConfirmationAPI
} from './bookingAPI';

// Async thunks for booking operations
export const createBooking = createAsyncThunk(
  'bookings/create',
  async (bookingData, thunkAPI) => {
    try {
      return await createBookingAPI(bookingData);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const getAllBookings = createAsyncThunk(
  'bookings/getAll',
  async (filters = {}, thunkAPI) => {
    try {
      return await getAllBookingsAPI(filters);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const getUserBookings = createAsyncThunk(
  'bookings/getUserBookings',
  async (_, thunkAPI) => {
    try {
      return await getUserBookingsAPI();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const getBookingById = createAsyncThunk(
  'bookings/getById',
  async (bookingId, thunkAPI) => {
    try {
      return await getBookingByIdAPI(bookingId);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateBooking = createAsyncThunk(
  'bookings/update',
  async ({ bookingId, bookingData }, thunkAPI) => {
    try {
      return await updateBookingAPI(bookingId, bookingData);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateBookingStatus = createAsyncThunk(
  'bookings/updateStatus',
  async ({ bookingId, status }, thunkAPI) => {
    try {
      return await updateBookingStatusAPI(bookingId, status);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const addPayment = createAsyncThunk(
  'bookings/addPayment',
  async ({ bookingId, paymentData }, thunkAPI) => {
    try {
      return await addPaymentAPI(bookingId, paymentData);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const cancelBooking = createAsyncThunk(
  'bookings/cancel',
  async ({ bookingId, reason }, thunkAPI) => {
    try {
      return await cancelBookingAPI(bookingId, reason);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const addReview = createAsyncThunk(
  'bookings/addReview',
  async ({ bookingId, reviewData }, thunkAPI) => {
    try {
      return await addReviewAPI(bookingId, reviewData);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const deleteBooking = createAsyncThunk(
  'bookings/delete',
  async (bookingId, thunkAPI) => {
    try {
      await deleteBookingAPI(bookingId);
      return bookingId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const getUpcomingBookings = createAsyncThunk(
  'bookings/getUpcoming',
  async (_, thunkAPI) => {
    try {
      return await getUpcomingBookingsAPI();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const getPastBookings = createAsyncThunk(
  'bookings/getPast',
  async (_, thunkAPI) => {
    try {
      return await getPastBookingsAPI();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const getBookingStatistics = createAsyncThunk(
  'bookings/getStatistics',
  async (_, thunkAPI) => {
    try {
      return await getBookingStatisticsAPI();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const generateBookingConfirmation = createAsyncThunk(
  'bookings/generateConfirmation',
  async (bookingId, thunkAPI) => {
    try {
      return await generateBookingConfirmationAPI(bookingId);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const bookingSlice = createSlice({
  name: 'bookings',
  initialState: {
    bookings: [],
    userBookings: [],
    upcomingBookings: [],
    pastBookings: [],
    currentBooking: null,
    statistics: null,
    confirmation: null,
    loading: false,
    error: null,
    filters: {
      status: '',
      dateRange: { start: '', end: '' },
      destination: '',
      package: ''
    }
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        status: '',
        dateRange: { start: '', end: '' },
        destination: '',
        package: ''
      };
    }
  },
  extraReducers: (builder) => {
    builder
      // Create booking
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings.push(action.payload);
        state.userBookings.push(action.payload);
        state.currentBooking = action.payload;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get all bookings
      .addCase(getAllBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(getAllBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get user bookings
      .addCase(getUserBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.userBookings = action.payload;
      })
      .addCase(getUserBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get booking by ID
      .addCase(getBookingById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookingById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBooking = action.payload;
      })
      .addCase(getBookingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update booking
      .addCase(updateBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.bookings.findIndex(b => b._id === action.payload._id);
        if (index !== -1) {
          state.bookings[index] = action.payload;
        }
        const userIndex = state.userBookings.findIndex(b => b._id === action.payload._id);
        if (userIndex !== -1) {
          state.userBookings[userIndex] = action.payload;
        }
        state.currentBooking = action.payload;
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update booking status
      .addCase(updateBookingStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.bookings.findIndex(b => b._id === action.payload._id);
        if (index !== -1) {
          state.bookings[index] = action.payload;
        }
        const userIndex = state.userBookings.findIndex(b => b._id === action.payload._id);
        if (userIndex !== -1) {
          state.userBookings[userIndex] = action.payload;
        }
        if (state.currentBooking?._id === action.payload._id) {
          state.currentBooking = action.payload;
        }
      })
      .addCase(updateBookingStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add payment
      .addCase(addPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPayment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.bookings.findIndex(b => b._id === action.payload._id);
        if (index !== -1) {
          state.bookings[index] = action.payload;
        }
        const userIndex = state.userBookings.findIndex(b => b._id === action.payload._id);
        if (userIndex !== -1) {
          state.userBookings[userIndex] = action.payload;
        }
        if (state.currentBooking?._id === action.payload._id) {
          state.currentBooking = action.payload;
        }
      })
      .addCase(addPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Cancel booking
      .addCase(cancelBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.bookings.findIndex(b => b._id === action.payload._id);
        if (index !== -1) {
          state.bookings[index] = action.payload;
        }
        const userIndex = state.userBookings.findIndex(b => b._id === action.payload._id);
        if (userIndex !== -1) {
          state.userBookings[userIndex] = action.payload;
        }
        if (state.currentBooking?._id === action.payload._id) {
          state.currentBooking = action.payload;
        }
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add review
      .addCase(addReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.bookings.findIndex(b => b._id === action.payload._id);
        if (index !== -1) {
          state.bookings[index] = action.payload;
        }
        const userIndex = state.userBookings.findIndex(b => b._id === action.payload._id);
        if (userIndex !== -1) {
          state.userBookings[userIndex] = action.payload;
        }
        if (state.currentBooking?._id === action.payload._id) {
          state.currentBooking = action.payload;
        }
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get upcoming bookings
      .addCase(getUpcomingBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUpcomingBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.upcomingBookings = action.payload;
      })
      .addCase(getUpcomingBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get past bookings
      .addCase(getPastBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPastBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.pastBookings = action.payload;
      })
      .addCase(getPastBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get booking statistics
      .addCase(getBookingStatistics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookingStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.statistics = action.payload;
      })
      .addCase(getBookingStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Generate booking confirmation
      .addCase(generateBookingConfirmation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateBookingConfirmation.fulfilled, (state, action) => {
        state.loading = false;
        state.confirmation = action.payload;
      })
      .addCase(generateBookingConfirmation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete booking
      .addCase(deleteBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = state.bookings.filter(b => b._id !== action.payload);
        state.userBookings = state.userBookings.filter(b => b._id !== action.payload);
        if (state.currentBooking?._id === action.payload) {
          state.currentBooking = null;
        }
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, clearCurrentBooking, setFilters, clearFilters } = bookingSlice.actions;
export default bookingSlice.reducer;
