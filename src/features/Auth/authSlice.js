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
      state.userData = action.payload;
      const { accessToken, refreshToken } = action.payload;
      state.userToken = {
        accessToken,
        refreshToken,
      };
      state.isAuthenticated = true;
      localStorage.setItem('userData', JSON.stringify(action.payload));
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
  },
});

export const { login, logout } = auth.actions;
export default auth.reducer;
