import { api } from './api';
export const attributeApi = api.injectEndpoints({
  endpoints: build => ({
    getAllAttribute: build.query({
      query: () => ({
        url: '/products/attributes',
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
      query: (id, data) => ({
        url: `/products/attributes/${id}`,
        method: 'patch',
        body: data,
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Attribute'],
    }),
    deleteAttribute: build.mutation({
      query: id => ({
        url: `/products/attributes/${id}`,
        method: 'delete',
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Attribute'],
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
      invalidatesTags: ['Attribute'],
    }),
    updateAttributeValueById: build.mutation({
      query: ({ id, attributeId, data }) => ({
        url: `/products/${id}/attributes/${attributeId}/values`,
        method: 'patch',
        body: data,
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Attribute'],
    }),
    deleteAttributeValueById: build.mutation({
      query: ({ id, attributeId }) => ({
        url: `/products/${id}/attributes/${attributeId}/values`,
        method: 'delete',
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Attribute'],
    }),
  }),
});

export const {
  useGetAllAttributeQuery,
  useAddNewAttributeMutation,
  useUpdateAttributeMutation,
  useDeleteAttributeMutation,
  useGetAttributeValueByIdQuery,
  useAddNewAttributeValueByIdMutation,
  useUpdateAttributeValueByIdMutation,
  useDeleteAttributeValueByIdMutation,
} = attributeApi;
