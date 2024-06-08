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
    updateProduct: build.mutation({
      query: ({ id, data }) => ({
        url: `/products/products/${id}`,
        method: 'patch',
        body: data,
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Product'],
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
