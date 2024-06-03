import { api } from './api';
export const customerApi = api.injectEndpoints({
  endpoints: build => ({
    getAllCustomers: build.query({
      query: () => '/customers',
      transformResponse: res => res.data,
      providesTags: ['Customer'],
    }),
    getCustomerByID: build.query({
      query: id => '/customers/' + id,
      transformResponse: res => res.data,
      providesTags: ['Customer'],
    }),
  }),
});

export const { useGetAllCustomersQuery, useGetCustomerByIDQuery } = customerApi;
