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
    getShippingDetail: build.query({
      query: id => ({
        url: `/shipping/order/detail/${id}`,
        method: 'GET',
      }),
      transformResponse: res => res.data,
      providesTags: ['Order'],
    }),
    cancelOrder: build.mutation({
      query: id => ({
        url: `/dashboard/orders/cancel/${id}`,
        method: 'PATCH',
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Order'],
    }),
    cancelGHNOrder: build.mutation({
      query: id => ({
        url: `/shipping/order/cancel/${id}`,
        method: 'POST',
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Order'],
    }),
    changeOrderStatus: build.mutation({
      query: ({ id, statusId }) => ({
        url: `/dashboard/orders/${id}/status`,
        method: 'PATCH',
        body: {
          statusId,
        },
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Order'],
    }),
    setOrderToDelivered: build.mutation({
      query: id => ({
        url: `/dashboard/orders/${id}/status/delivered`,
        method: 'PATCH',
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Order'],
    }),
  }),
});

export const {
  useGetOrderListQuery,
  useGetOrderDetailQuery,
  useCancelOrderMutation,
  useChangeOrderStatusMutation,
  useCancelGHNOrderMutation,
  useGetShippingDetailQuery,
  useSetOrderToDeliveredMutation,
} = orderApi;
