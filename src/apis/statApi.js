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
    getOrderStatsByDate: build.query({
      query: params => ({
        url: '/dashboard/orders/stats/orders-by-date',
        method: 'GET',
        params: params,
      }),
      transformResponse: res => res.data,
      providesTags: ['Stat'],
    }),
    getRevenueStatsByMonth: build.query({
      query: (year = 2024) => ({
        url: `/dashboard/orders/stats/${year}/revenue-by-month`,
        method: 'GET',
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
    getPaymentStats: build.query({
      query: params => ({
        url: '/dashboard/payment/stats/payment-methods',
        method: 'GET',
        params,
      }),
      transformResponse: res => res.data,
      providesTags: ['Stat'],
    }),
    getCustomerTotalPurchase: build.query({
      query: params => ({
        url: '/dashboard/customers/stats/total-purchase',
        method: 'GET',
        params,
      }),
      transformResponse: res => res.data,
      providesTags: ['Stat'],
    }),
    getReturnCustomerStat: build.query({
      query: params => ({
        url: 'dashboard/customers/stats/2024/returning-customers',
        method: 'GET',
        params,
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
  useGetPaymentStatsQuery,
  useGetOrderStatsByDateQuery,
  useGetRevenueStatsByMonthQuery,
  useGetReturnCustomerStatQuery,
  useGetCustomerTotalPurchaseQuery,
} = statApi;
