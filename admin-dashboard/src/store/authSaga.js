import { call, put, takeLatest, delay, select } from 'redux-saga/effects';
import { 
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
} from './authSlice';

// Helper to simulate API call
const mockApiCall = (time = 800) => new Promise(resolve => setTimeout(resolve, time));

// Generate mock tokens
const generateTokens = () => {
  const accessToken = `mock_access_token_${Math.random().toString(36).substr(2, 9)}`;
  const refreshToken = `mock_refresh_token_${Math.random().toString(36).substr(2, 9)}`;
  // Set expiration to 60 seconds from now
  const expiresAt = new Date().getTime() + 60 * 1000;
  
  return { accessToken, refreshToken, expiresAt };
};

// Registration Saga
function* handleRegister(action) {
  try {
    const { email, password, fullName } = action.payload;
    yield call(mockApiCall, 1000); // Simulate API

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      throw new Error("User with this email already exists");
    }

    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      password, // Storing password in plain text for mock purposes only
      name: fullName,
      role: 'Administrator'
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // For this mock, we just yield success, the component can handle redirect
    yield put(registerSuccess());

  } catch (error) {
    yield put(registerFailure(error.message));
  }
}

// Login Saga
function* handleLogin(action) {
  try {
    const { email, password } = action.payload;
    
    // Simulate API delay
    yield call(mockApiCall, 1000);
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      throw new Error("Invalid email or password");
    }
    
    // Remove password from the user object we store in state
    const mockUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    };
    
    const { accessToken, refreshToken, expiresAt } = generateTokens();
    
    // Persist to localStorage
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('expiresAt', expiresAt.toString());
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    yield put(loginSuccess({
      user: mockUser,
      accessToken,
      refreshToken
    }));
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

// Logout Saga
function* handleLogout() {
  try {
    yield call(mockApiCall, 400); // Simulate api delay
    // Clear localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('user');
    
    yield put(logoutSuccess());
  } catch (error) {
    console.error("Logout failed", error);
    // Even if api fails, force clear local state
    localStorage.clear();
    yield put(logoutSuccess());
  }
}

// Refresh Token Saga
function* handleRefreshToken() {
  try {
    const currentRefreshToken = localStorage.getItem('refreshToken');
    
    if (!currentRefreshToken) {
      throw new Error("No refresh token available");
    }
    
    // Simulate API request to swap token
    yield call(mockApiCall, 500);
    
    // Generate new access token
    const newAccessToken = `mock_new_access_token_${Math.random().toString(36).substr(2, 9)}`;
    // Extend expiry by another 60 seconds
    const newExpiresAt = new Date().getTime() + 60 * 1000;
    
    // Update local storage
    localStorage.setItem('accessToken', newAccessToken);
    localStorage.setItem('expiresAt', newExpiresAt.toString());
    
    yield put(refreshTokenSuccess({ accessToken: newAccessToken }));
    return newAccessToken;
  } catch (error) {
    yield put(refreshTokenFailure(error.message));
    yield put(logoutRequest()); // Force logout if refresh fails
    throw error;
  }
}

// Interceptor Simulation "Watchdog"
// Wrap your API calls in sagas with this generator
export function* apiWithAuth(apiCallFunc, ...args) {
  const expiresAt = parseInt(localStorage.getItem('expiresAt') || '0', 10);
  const currentTime = new Date().getTime();
  
  // If token is expired or about to expire in the next 2 seconds
  if (currentTime >= expiresAt - 2000) {
    console.log("Token expired! Triggering refresh flow before executing API call...");
    yield put(refreshTokenRequest());
    
    // Wait for the token refresh to succeed or fail
    try {
      yield call(handleRefreshToken);
    } catch (error) {
      console.error("Refresh token failed, aborting original request");
      throw new Error("Authentication failed");
    }
  }
  
  // Execute the original API call once token is valid
  return yield call(apiCallFunc, ...args);
}

export function* authSaga() {
  yield takeLatest(registerRequest.type, handleRegister);
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(logoutRequest.type, handleLogout);
  yield takeLatest(refreshTokenRequest.type, handleRefreshToken);
}
