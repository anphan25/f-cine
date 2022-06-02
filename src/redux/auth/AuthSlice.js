import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

const getAuthState = () => {
  const authTokens = localStorage.getItem('authTokens')
    ? JSON.parse(localStorage.getItem('authTokens'))
    : null;
  if (authTokens)
    return {
      ...authTokens,
      user: jwtDecode(authTokens.accessToken),
    };
  else return null;
};

const initialState = {
  isLoading: false,
  error: '',
  auth: getAuthState(),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authPending: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoading = false;
    },
    loginFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.auth = null;
      localStorage.removeItem('authTokens');
    },
    setToken: (state, action) => {
      state.auth.accessToken = action.payload;
      localStorage.setItem('authTokens', {
        accessToken: state.auth.accessToken,
        refreshToken: state.auth.refreshToken,
      });
    },
    setUserInfo: (state, action) => {
      state.auth.user = action.payload;
    },
    refreshFail: (state, action) => {
      state.error = action.payload;
      state.auth = null;
      localStorage.removeItem('authTokens');
    },
  },
});

export const {
  logoutSuccess,
  authPending,
  loginSuccess,
  loginFail,
  refreshFail,
  setToken,
  setUserInfo,
} = authSlice.actions;

export default authSlice.reducer;
