import { createSlice } from '@reduxjs/toolkit';

// Helper to safely parse JSON from localStorage
const getLocalData = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    return null;
  }
};

const initialState = {
  loading: false,
  isAuthenticated: !!localStorage.getItem('accessToken'),
  user: getLocalData('user'),
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      // Depending on requirements, we can log them in automatically or not. Note says: "Upon successful login, generate fakeAccessToken..." so maybe register doesn't auto-login, or it does. Let's redirect to login instead.
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    loginRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
    },
    refreshTokenRequest: (state) => {
      // Don't show global loading for background refresh, but we might want a flag if needed
      state.error = null;
    },
    refreshTokenSuccess: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    refreshTokenFailure: (state, action) => {
      // If refresh fails, usually we log them out. Handled in saga.
      state.error = action.payload;
    }
  },
});

export const { 
  registerRequest,
  registerSuccess,
  registerFailure,
  loginRequest, 
  loginSuccess, 
  loginFailure, 
  logoutRequest, 
  logoutSuccess,
  refreshTokenRequest,
  refreshTokenSuccess,
  refreshTokenFailure
} = authSlice.actions;

export default authSlice.reducer;
