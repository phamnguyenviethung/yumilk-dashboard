import { api } from './api';
export const voucherApi = api.injectEndpoints({
  endpoints: build => ({
    getAllVouchers: build.query({
      query: params => ({
        url: '/vouchers',
        method: 'GET',
        params: {
          pageSize: 1000000,
          ...params,
        },
      }),
      transformResponse: res => res.data,
      providesTags: ['Voucher'],
    }),
    getVoucherByID: build.query({
      query: id => ({
        url: `/vouchers/${id}`,
        method: 'GET',
      }),
      transformResponse: res => res.data,
      providesTags: ['Voucher'],
    }),
    addNewVoucher: build.mutation({
      query: data => ({
        url: '/vouchers',
        method: 'POST',
        body: data,
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Voucher'],
    }),
    updateVoucher: build.mutation({
      query: ({ id, body }) => ({
        url: `/vouchers/${id}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Voucher'],
    }),
    deleteVoucher: build.mutation({
      query: id => ({
        url: `/vouchers/${id}`,
        method: 'DELETE',
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Voucher'],
    }),
    getVoucherByCode: build.query({
      query: code => ({
        url: `/vouchers/code/${code}`,
        method: 'GET',
      }),
      transformResponse: res => res.data,
      providesTags: ['Voucher'],
    }),
  }),
});

export const {
  useGetAllVouchersQuery,
  useGetVoucherByIDQuery,
  useAddNewVoucherMutation,
  useUpdateVoucherMutation,
  useDeleteVoucherMutation,
  useGetVoucherByCodeQuery,
} = voucherApi;
