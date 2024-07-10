import { api } from './api';
export const brandApi = api.injectEndpoints({
  endpoints: build => ({
    getAllBrand: build.query({
      query: params => ({
        url: '/products/brands',
        method: 'GET',
        params,
      }),
      transformResponse: res => res.data,
      providesTags: ['Brand'],
    }),
    getBrandByID: build.query({
      query: id => ({
        url: `/products/brands/${id}`,
        method: 'GET',
      }),
      transformResponse: res => res.data,
      providesTags: ['Brand'],
    }),
    addNewBrand: build.mutation({
      query: data => ({
        url: '/products/brands',
        method: 'post',
        body: data,
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Brand'],
    }),
    updateBrand: build.mutation({
      query: ({ id, data }) => ({
        url: `/products/brands/${id}`,
        method: 'patch',
        body: data,
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Brand'],
    }),
    deleteBrand: build.mutation({
      query: id => ({
        url: `/products/brands/${id}`,
        method: 'delete',
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Brand'],
    }),
  }),
});

export const {
  useGetAllBrandQuery,
  useAddNewBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
  useGetBrandByIDQuery,
} = brandApi;
