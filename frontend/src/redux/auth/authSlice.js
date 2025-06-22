// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { loginAPI, registerAPI, meAPI } from './authAPI';

// const user = JSON.parse(localStorage.getItem('user'));

// export const loginUser = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
//     try {
//         return await loginAPI(credentials);
//     } catch (err) {
//         return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
//     }
// });

// export const registerUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
//     try {
//         return await registerAPI(userData);
//     } catch (err) {
//         return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
//     }
// });

// export const getUser = createAsyncThunk('auth/me', async (_, thunkAPI) => {
//     try {
//         return await meAPI();
//     } catch (err) {
//         return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
//     }
// });

// const authSlice = createSlice({
//     name: 'auth',
//     initialState: {
//         user: user || null,
//         loading: false,
//         error: null,
//     },
//     reducers: {
//         logout(state) {
//             localStorage.removeItem('user');
//             state.user = null;
//             state.error = null;
//             state.loading = false;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(loginUser.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(loginUser.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.user = action.payload;
//                 localStorage.setItem('user', JSON.stringify(action.payload));
//             })
//             .addCase(loginUser.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })
//             .addCase(registerUser.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(registerUser.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.user = action.payload;
//                 localStorage.setItem('user', JSON.stringify(action.payload));
//             })
//             .addCase(registerUser.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             });
//     },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI, registerAPI, meAPI } from './authAPI';

const user = JSON.parse(localStorage.getItem('user'));

export const loginUser = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    return await loginAPI(credentials);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const registerUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    return await registerAPI(userData);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const getUser = createAsyncThunk('auth/me', async (_, thunkAPI) => {
  try {
    return await meAPI();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: user|| null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      localStorage.removeItem('user');
      state.user = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Me (getUser)
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        localStorage.removeItem('user');
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
