import { api } from './api';
export const customerApi = api.injectEndpoints({
  endpoints: build => ({
    getAllCustomers: build.query({
      query: params => ({
        url: `/customers`,
        method: 'GET',
        params,
      }),
      transformResponse: res => res.data,
      providesTags: ['Customer'],
    }),
    getCustomerByID: build.query({
      query: id => '/customers/' + id,
      transformResponse: res => res.data,
      providesTags: ['Customer'],
    }),
    getCustomerAddress: build.query({
      query: id => ({
        url: `/users/${id}/addresses`,
        method: 'GET',
      }),
      transformResponse: res => res.data,
      providesTags: ['Customer'],
    }),
    getCustomerOrderHistory: build.query({
      query: ({ id, params }) => ({
        url: `/users/${id}/orders`,
        method: 'GET',
        params,
      }),
      transformResponse: res => res.data,
      providesTags: ['Customer'],
    }),
  }),
});

export const {
  useGetAllCustomersQuery,
  useGetCustomerByIDQuery,
  useGetCustomerAddressQuery,
  useGetCustomerOrderHistoryQuery,
} = customerApi;
