import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define a User interface
interface User {
  email: string;
  token: string;
}

// Define the initial state using that type
interface AuthState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
};

// Async thunk for user registration
export const registerUser = createAsyncThunk('auth/register', async (userData: { email: string; password: string; firstName: string; lastName: string }) => {
  const response = await axios.post('/api/auth/Register', userData);
  return response.data;
});

// Async thunk for user login
export const loginUser = createAsyncThunk('auth/login', async (credentials: { email: string; password: string }) => {
  const response = await axios.post('/api/auth/Login', credentials);
  return response.data;
});

// Async thunk for user logout
export const logoutUser = createAsyncThunk('auth/logout', async () => {
  const response = await axios.post('/api/auth/Logout');
  return response.data;
});

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Register user
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to register';
      })
      // Login user
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to login';
      })
      // Logout user
      .addCase(logoutUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to logout';
      });
  },
});

export default authSlice.reducer;