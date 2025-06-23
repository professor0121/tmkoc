// src/redux/destinations/destinationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllDestinationsAPI,
  getDestinationByIdAPI,
  getDestinationsByCategoryAPI,
  getFeaturedDestinationsAPI,
  getPopularDestinationsAPI,
  searchDestinationsAPI,
  getDestinationsByLocationAPI,
  getNearbyDestinationsAPI,
  getDestinationStatisticsAPI,
  createDestinationAPI,
  updateDestinationAPI,
  deleteDestinationAPI,
  addDestinationReviewAPI,
  toggleFeaturedStatusAPI
} from './destinationApi';

// Async thunks
export const getAllDestinations = createAsyncThunk(
  'destinations/getAllDestinations',
  async (params, thunkAPI) => {
    try {
      return await getAllDestinationsAPI(params);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const getDestinationById = createAsyncThunk(
  'destinations/getDestinationById',
  async (id, thunkAPI) => {
    try {
      const res = await getDestinationByIdAPI(id);
      console.log(res.data)
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const getDestinationsByCategory = createAsyncThunk(
  'destinations/getDestinationsByCategory',
  async (category, thunkAPI) => {
    try {
      return await getDestinationsByCategoryAPI(category);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const getFeaturedDestinations = createAsyncThunk(
  'destinations/getFeaturedDestinations',
  async (_, thunkAPI) => {
    try {
      return await getFeaturedDestinationsAPI();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const getPopularDestinations = createAsyncThunk(
  'destinations/getPopularDestinations',
  async (_, thunkAPI) => {
    try {
      return await getPopularDestinationsAPI();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const searchDestinations = createAsyncThunk(
  'destinations/searchDestinations',
  async (searchText, thunkAPI) => {
    try {
      return await searchDestinationsAPI(searchText);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const getDestinationsByLocation = createAsyncThunk(
  'destinations/getDestinationsByLocation',
  async (locationParams, thunkAPI) => {
    try {
      return await getDestinationsByLocationAPI(locationParams);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const getNearbyDestinations = createAsyncThunk(
  'destinations/getNearbyDestinations',
  async ({ destinationId, maxDistance }, thunkAPI) => {
    try {
      return await getNearbyDestinationsAPI(destinationId, maxDistance);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const getDestinationStatistics = createAsyncThunk(
  'destinations/getDestinationStatistics',
  async (_, thunkAPI) => {
    try {
      return await getDestinationStatisticsAPI();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const createDestination = createAsyncThunk(
  'destinations/createDestination',
  async (destinationData, thunkAPI) => {
    try {
      return await createDestinationAPI(destinationData);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateDestination = createAsyncThunk(
  'destinations/updateDestination',
  async ({ id, destinationData }, thunkAPI) => {
    try {
      return await updateDestinationAPI(id, destinationData);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const deleteDestination = createAsyncThunk(
  'destinations/deleteDestination',
  async (id, thunkAPI) => {
    try {
      return await deleteDestinationAPI(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const addDestinationReview = createAsyncThunk(
  'destinations/addDestinationReview',
  async ({ destinationId, reviewData }, thunkAPI) => {
    try {
      
      const res=await addDestinationReviewAPI(destinationId, reviewData);
      console.log(res)
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const toggleFeaturedStatus = createAsyncThunk(
  'destinations/toggleFeaturedStatus',
  async ({ id, featured }, thunkAPI) => {
    try {
      return await toggleFeaturedStatusAPI(id, featured);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Initial state
const initialState = {
  destinations: [],
  currentDestination: null,
  featuredDestinations: [],
  popularDestinations: [],
  searchResults: [],
  nearbyDestinations: [],
  statistics: null,
  loading: false,
  error: null,
  filters: {
    category: '',
    location: '',
    searchText: ''
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  }
};

// Destination slice
const destinationSlice = createSlice({
  name: 'destinations',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentDestination: (state) => {
      state.currentDestination = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: '',
        location: '',
        searchText: ''
      };
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      // Get all destinations
      .addCase(getAllDestinations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDestinations.fulfilled, (state, action) => {
        state.loading = false;
        state.destinations = action.payload.destinations || action.payload;
        if (action.payload.pagination) {
          state.pagination = action.payload.pagination;
        }
      })
      .addCase(getAllDestinations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get destination by ID
      .addCase(getDestinationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDestinationById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentDestination = action.payload;
      })
      .addCase(getDestinationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get destinations by category
      .addCase(getDestinationsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDestinationsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.destinations = action.payload;
      })
      .addCase(getDestinationsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get featured destinations
      .addCase(getFeaturedDestinations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeaturedDestinations.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredDestinations = action.payload;
      })
      .addCase(getFeaturedDestinations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get popular destinations
      .addCase(getPopularDestinations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPopularDestinations.fulfilled, (state, action) => {
        state.loading = false;
        state.popularDestinations = action.payload;
      })
      .addCase(getPopularDestinations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Search destinations
      .addCase(searchDestinations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchDestinations.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchDestinations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get destinations by location
      .addCase(getDestinationsByLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDestinationsByLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.destinations = action.payload;
      })
      .addCase(getDestinationsByLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get nearby destinations
      .addCase(getNearbyDestinations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNearbyDestinations.fulfilled, (state, action) => {
        state.loading = false;
        state.nearbyDestinations = action.payload;
      })
      .addCase(getNearbyDestinations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get destination statistics
      .addCase(getDestinationStatistics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDestinationStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.statistics = action.payload;
      })
      .addCase(getDestinationStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create destination
      .addCase(createDestination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDestination.fulfilled, (state, action) => {
        state.loading = false;
        state.destinations.push(action.payload);
      })
      .addCase(createDestination.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update destination
      .addCase(updateDestination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDestination.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.destinations.findIndex(dest => dest._id === action.payload._id);
        if (index !== -1) {
          state.destinations[index] = action.payload;
        }
        if (state.currentDestination && state.currentDestination._id === action.payload._id) {
          state.currentDestination = action.payload;
        }
      })
      .addCase(updateDestination.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete destination
      .addCase(deleteDestination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDestination.fulfilled, (state, action) => {
        state.loading = false;
        state.destinations = state.destinations.filter(dest => dest._id !== action.payload._id);
      })
      .addCase(deleteDestination.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add destination review
      .addCase(addDestinationReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDestinationReview.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentDestination && state.currentDestination._id === action.payload._id) {
          state.currentDestination = action.payload;
        }
        const index = state.destinations.findIndex(dest => dest._id === action.payload._id);
        if (index !== -1) {
          state.destinations[index] = action.payload;
        }
      })
      .addCase(addDestinationReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Toggle featured status
      .addCase(toggleFeaturedStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleFeaturedStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.destinations.findIndex(dest => dest._id === action.payload._id);
        if (index !== -1) {
          state.destinations[index] = action.payload;
        }
        if (state.currentDestination && state.currentDestination._id === action.payload._id) {
          state.currentDestination = action.payload;
        }
      })
      .addCase(toggleFeaturedStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Export actions
export const {
  clearError,
  clearCurrentDestination,
  clearSearchResults,
  setFilters,
  clearFilters,
  setPagination
} = destinationSlice.actions;

// Export reducer
export default destinationSlice.reducer;