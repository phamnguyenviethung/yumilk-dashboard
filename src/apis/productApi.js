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
      query: data => ({
        url: `/products/${data.id}`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Product'],
    }),
    deleteProduct: build.mutation({
      query: id => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Product'],
    }),
    updatePreOrderProduct: build.mutation({
      query: data => ({
        url: `/products/${data.id}/preorder`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Product'],
    }),
    addProduct: build.mutation({
      query: body => ({
        url: `/products`,
        method: 'POST',
        body,
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
    addCategory: build.mutation({
      query: body => ({
        url: `/products/categories/`,
        method: 'POST',
        body,
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Product', 'Category'],
    }),
    updateCategoryByID: build.mutation({
      query: ({ id, body }) => ({
        url: `/products/categories/${id}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Product', 'Category'],
    }),
    deleteCategory: build.mutation({
      query: id => ({
        url: `/products/categories/${id}`,
        method: 'DELETE',
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Product', 'Category'],
    }),
    getAllUnit: build.query({
      query: params => ({
        url: '/products/units',
        method: 'GET',
        params,
      }),
      transformResponse: res => res.data,
      providesTags: ['Product', 'Units'],
    }),
    getUnitByID: build.query({
      query: id => ({
        url: `/products/units/${id}`,
        method: 'GET',
      }),
      transformResponse: res => res.data,
      providesTags: ['Product', 'Units'],
    }),
    addUnit: build.mutation({
      query: body => ({
        url: `/products/units`,
        method: 'POST',
        body,
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Product', 'Units'],
    }),
    updateUnit: build.mutation({
      query: ({ id, body }) => ({
        url: `/products/units/${id}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Product', 'Units'],
    }),
    deleteUnit: build.mutation({
      query: id => ({
        url: `/products/units/${id}`,
        method: 'DELETE',
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Product', 'Units'],
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
  useGetCategoryByIDQuery,
  useChangeStatusProductImageMutation,
  useDeleteProductImagesMutation,
  useUpdateCategoryByIDMutation,
  useAddCategoryMutation,
  useAddProductMutation,
  useUpdatePreOrderProductMutation,
  useAddUnitMutation,
  useUpdateUnitMutation,
  useGetAllUnitQuery,
  useGetUnitByIDQuery,
  useDeleteProductMutation,
  useDeleteUnitMutation,
  useDeleteCategoryMutation,
} = productApi;
