import { api } from './api';
export const orderApi = api.injectEndpoints({
  endpoints: build => ({
    getOrderList: build.query({
      query: params => ({
        url: '/dashboard/orders',
        method: 'GET',
        params,
      }),
      transformResponse: res => res.data,
      providesTags: ['Order'],
    }),
    getOrderDetail: build.query({
      query: id => ({
        url: `/dashboard/orders/${id}`,
        method: 'GET',
      }),
      transformResponse: res => res.data,
      providesTags: ['Order'],
    }),
  }),
});

export const { useGetOrderListQuery, useGetOrderDetailQuery } = orderApi;
