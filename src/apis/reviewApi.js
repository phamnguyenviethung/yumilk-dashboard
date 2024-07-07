import { api } from './api';
export const reviewAPI = api.injectEndpoints({
  endpoints: build => ({
    getAllReviews: build.query({
      query: params => ({
        url: `/products/reviews`,
        params,
      }),
      transformResponse: res => res.data,
      providesTags: ['Reviews', 'Product'],
    }),
    getProductReviews: build.query({
      query: ({ id, params }) => ({
        url: `/products/${id}/reviews`,
        params,
      }),
      transformResponse: res => res.data,
      providesTags: ['Reviews', 'Product'],
    }),
  }),
});

export const { useGetAllReviewsQuery, useGetProductReviewsQuery } = reviewAPI;
