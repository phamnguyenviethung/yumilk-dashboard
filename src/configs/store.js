import { api } from '@/apis/api';
import auth from '@/features/Auth/authSlice';
import { configureStore } from '@reduxjs/toolkit';
const rootReducer = {
  auth,
};
const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,

    ...rootReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
