/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const userData = JSON.parse(localStorage.getItem('userData')) || null;
const userToken = JSON.parse(localStorage.getItem('userToken')) || null;

const initialState = {
  userData,
  userToken,
  isAuthenticated: !!userData,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { accessToken, refreshToken, ...rest } = action.payload;
      state.userToken = {
        accessToken,
        refreshToken,
      };
      state.userData = rest;
      state.isAuthenticated = true;
      localStorage.setItem('userData', JSON.stringify(rest));
      localStorage.setItem(
        'userToken',
        JSON.stringify({
          accessToken,
          refreshToken,
        })
      );
    },
    logout: (state, action) => {
      state.userData = null;
      state.userToken = null;
      state.isAuthenticated = false;
      localStorage.setItem('userData', null);
      localStorage.setItem('userToken', null);
    },
    refreshToken: (state, action) => {
      state.userToken.accessToken = action.payload;
      localStorage.setItem('userData', JSON.stringify(state.userData));
      localStorage.setItem(
        'userToken',
        JSON.stringify({
          accessToken: state.userToken.accessToken,
          refreshToken: state.userToken.refreshToken,
        })
      );
    },
  },
});

export const { login, logout, refreshToken } = auth.actions;
export default auth.reducer;
