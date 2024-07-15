import { api } from './api';
export const reportApi = api.injectEndpoints({
  endpoints: build => ({
    getReportTypes: build.query({
      query: params => ({
        url: '/reports/report-types',
        method: 'GET',
        params: {
          pageSize: 1000000,
          ...params,
        },
      }),
      transformResponse: res => res.data,
      providesTags: ['Report'],
    }),
    getAllReport: build.query({
      query: params => ({
        url: '/reports',
        method: 'GET',
        params: {
          pageSize: 1000000,
          ...params,
        },
      }),
      transformResponse: res => res.data,
      providesTags: ['Report'],
    }),
    sendReport: build.mutation({
      query: data => ({
        url: '/reports',
        method: 'POST',
        body: data,
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Report'],
    }),
  }),
});

export const {
  useGetReportTypesQuery,
  useSendReportMutation,
  useGetAllReportQuery,
} = reportApi;
