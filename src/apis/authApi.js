import { api } from './api';
export const authApi = api.injectEndpoints({
  endpoints: build => ({
    login: build.mutation({
      query: data => ({
        url: '/authentication/dashboard/login',
        method: 'POST',
        body: data,
      }),
      transformResponse: res => res.data,
      invalidateTags: ['Auth'],
    }),
  }),
});

export const { useLoginMutation } = authApi;
