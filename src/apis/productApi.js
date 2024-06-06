import { api } from './api';
export const productApi = api.injectEndpoints({
  endpoints: build => ({
    getProductList: build.query({
      query: params => ({
        url: '/products',
        method: 'get',
        params,
      }),
      transformResponse: res => res.data,
      providesTags: ['Product'],
    }),
  }),
});

export const { useGetProductListQuery } = productApi;
