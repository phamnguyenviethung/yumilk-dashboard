import { api } from './api';
export const customerAPI = api.injectEndpoints({
  endpoints: build => ({
    getAllCustomers: build.query({
      query: () => '/customers',
      transformResponse: res => res.data,
      providesTags: ['Counter'],
    }),
  }),
});

export const { useGetAllCustomersQuery } = customerAPI;
