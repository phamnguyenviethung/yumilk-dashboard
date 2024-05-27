import auth from '@/features/Auth/authSlice';
import { configureStore } from '@reduxjs/toolkit';
const rootReducer = {
  auth,
};
const store = configureStore({
  reducer: rootReducer,
});

export default store;
