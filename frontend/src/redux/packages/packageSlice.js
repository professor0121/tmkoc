// src/redux/packages/packageSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createPackageAPI,
  fetchPackagesAPI,
  fetchPackageByIdAPI,
  updatePackageAPI,
  deletePackageAPI,
} from './packagesApi';

export const fetchPackages = createAsyncThunk('packages/fetchAll', async (_, thunkAPI) => {
  try {
    return await fetchPackagesAPI();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const createPackage = createAsyncThunk('packages/create', async (data, thunkAPI) => {
  try {
    console.log("data in createPackage",data)
    return await createPackageAPI(data);
  } catch (err) {
    console.log(err)
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const fetchPackageById = createAsyncThunk('packages/fetchById', async (id, thunkAPI) => {
  try {
    return await fetchPackageByIdAPI(id);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const updatePackage = createAsyncThunk('packages/update', async ({ id, data }, thunkAPI) => {
  try {
    return await updatePackageAPI({ id, data });
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const deletePackage = createAsyncThunk('packages/delete', async (id, thunkAPI) => {
  try {
    return await deletePackageAPI(id);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

const packageSlice = createSlice({
  name: 'packages',
  initialState: {
    packages: [],
    selectedPackage: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedPackage: (state) => {
      state.selectedPackage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.packages = action.payload;
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createPackage.fulfilled, (state, action) => {
        state.packages.push(action.payload);
      })

      // FETCH ONE
      .addCase(fetchPackageById.fulfilled, (state, action) => {
        state.selectedPackage = action.payload;
      })

      // UPDATE
      .addCase(updatePackage.fulfilled, (state, action) => {
        const index = state.packages.findIndex(pkg => pkg._id === action.payload._id);
        if (index !== -1) state.packages[index] = action.payload;
      })

      // DELETE
      .addCase(deletePackage.fulfilled, (state, action) => {
        state.packages = state.packages.filter(pkg => pkg._id !== action.payload._id);
      });
  },
});

export const { clearSelectedPackage } = packageSlice.actions;

// Alias exports for consistency with other slices
export const getPackageById = fetchPackageById;
export const getAllPackages = fetchPackages;

export default packageSlice.reducer;
