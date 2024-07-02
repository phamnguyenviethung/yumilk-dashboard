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
    getProductByID: build.query({
      query: id => ({
        url: `/products/${id}`,
        method: 'GET',
      }),
      transformResponse: res => res.data,
      providesTags: ['Product'],
    }),
    updateProduct: build.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Product'],
    }),
    getAllCategory: build.query({
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
    getProductImages: build.query({
      query: id => ({
        url: `/products/${id}/images`,
        method: 'GET',
      }),
      transformResponse: res => res.data,
      providesTags: ['Product'],
    }),

    changeStatusProductImage: build.mutation({
      query: ({ id, body }) => ({
        url: `/products/images/${id}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Product'],
    }),
    deleteProductImages: build.mutation({
      query: imageID => ({
        url: `/products/images/${imageID}`,
        method: 'DELETE',
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useGetProductListQuery,
  useGetAllCategoryQuery,
  useGetProductByIDQuery,
  useUpdateProductMutation,
  useGetProductImagesQuery,
  useChangeStatusProductImageMutation,
  useDeleteProductImagesMutation,
} = productApi;
