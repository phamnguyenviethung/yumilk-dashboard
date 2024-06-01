import { logout, refreshToken } from '@/features/Auth/authSlice';
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_ENDPOINT + '/api',
  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = getState().auth?.userToken?.accessToken;
    headers.set('content-type', `application/json`);

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// create a new mutex
const mutex = new Mutex();
const baseQueryWithReauth = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const rfToken = api.getState().auth.userToken?.refreshToken;

    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          {
            url: `/authentication/refresh-token?token=${rfToken}`,
            method: 'POST',
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          api.dispatch(refreshToken(refreshResult.data.data));
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

const baseQueryWithRetry = retry(baseQueryWithReauth, { maxRetries: 1 });

export const api = createApi({
  reducerPath: 'yumilkAPI',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Customer', 'Auth', 'User'],
  endpoints: () => ({}),
});
