import { api } from './api';
export const statApi = api.injectEndpoints({
  endpoints: build => ({
    getProductStats: build.query({
      query: ({ fromDate, toDate, parentId }) => ({
        url: '/dashboard/products/stats',
        method: 'GET',
        params: {
          from: fromDate,
          to: toDate,
          ParentId: parentId,
        },
      }),
      transformResponse: res => res.data,
      providesTags: ['Stat'],
    }),
    getOrderStats: build.query({
      query: ({ params }) => ({
        url: '/dashboard/orders/stats',
        method: 'GET',
        params: params,
      }),
      transformResponse: res => res.data,
      providesTags: ['Stat'],
    }),
    getCustomerStats: build.query({
      query: ({ fromDate, toDate }) => ({
        url: '/dashboard/customers/stats',
        method: 'GET',
        params: {
          From: fromDate,
          To: toDate,
        },
      }),
      transformResponse: res => res.data,
      providesTags: ['Stat'],
    }),
  }),
});
export const {
  useGetProductStatsQuery,
  useGetOrderStatsQuery,
  useGetCustomerStatsQuery,
} = statApi;
