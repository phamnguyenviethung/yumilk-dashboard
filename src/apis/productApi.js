import { api } from './api';
export const productApi = api.injectEndpoints({
  endpoints: build => ({
    getProductList: build.query({
      query: params => ({
        url: '/products',
        method: 'GET',
        params,
      }),
      transformResponse: res => res.data,
      providesTags: ['Product'],
    }),
    getCategory: build.query({
      query: params => ({
        url: '/products/categories',
        method: 'GET',
        params,
      }),
      transformResponse: res => res.data,
      providesTags: ['Product', 'Category'],
    }),
    getCategoryByID: build.query({
      query: id => ({
        url: `/products/categories/${id}`,
        method: 'GET',
      }),
      transformResponse: res => res.data,
      providesTags: ['Product', 'Category'],
    }),
  }),
});

export const { useGetProductListQuery, useGetCategoryQuery } = productApi;
