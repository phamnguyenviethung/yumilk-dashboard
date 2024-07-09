import { api } from './api';
export const attributeApi = api.injectEndpoints({
  endpoints: build => ({
    getAllAttribute: build.query({
      query: params => ({
        url: '/products/attributes',
        method: 'GET',
        params: {
          pageSize: 1000000,
          ...params,
        },
      }),
      transformResponse: res => res.data,
      providesTags: ['Attribute'],
    }),
    getAttributeByID: build.query({
      query: id => ({
        url: `/products/attributes/${id}`,
        method: 'GET',
      }),
      transformResponse: res => res.data,
      providesTags: ['Attribute'],
    }),
    addNewAttribute: build.mutation({
      query: data => ({
        url: '/products/attributes',
        method: 'post',
        body: data,
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Attribute'],
    }),
    updateAttribute: build.mutation({
      query: ({ id, body }) => ({
        url: `/products/attributes/${id}`,
        method: 'patch',
        body,
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Attribute', 'Product'],
    }),
    deleteAttribute: build.mutation({
      query: id => ({
        url: `/products/attributes/${id}`,
        method: 'delete',
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Attribute', 'Product'],
    }),
    getAttributeValueById: build.query({
      query: id => ({
        url: `/products/${id}/attributes/values`,
        method: 'GET',
      }),
      transformResponse: res => res.data,
      providesTags: ['Attribute'],
    }),
    addNewAttributeValueById: build.mutation({
      query: ({ id, attributeId, data }) => ({
        url: `/products/${id}/attributes/${attributeId}/values`,
        method: 'post',
        body: data,
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Attribute', 'Product'],
    }),
    updateAttributeValueById: build.mutation({
      query: ({ id, attributeId, data }) => ({
        url: `/products/${id}/attributes/${attributeId}/values`,
        method: 'patch',
        body: data,
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Attribute', 'Product'],
    }),
    deleteAttributeValueById: build.mutation({
      query: ({ id, attributeId }) => ({
        url: `/products/${id}/attributes/${attributeId}/values`,
        method: 'delete',
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Attribute', 'Product'],
    }),
  }),
});

export const {
  useGetAllAttributeQuery,
  useAddNewAttributeMutation,
  useUpdateAttributeMutation,
  useDeleteAttributeMutation,
  useGetAttributeByIDQuery,
  useGetAttributeValueByIdQuery,
  useAddNewAttributeValueByIdMutation,
  useUpdateAttributeValueByIdMutation,
  useDeleteAttributeValueByIdMutation,
} = attributeApi;
