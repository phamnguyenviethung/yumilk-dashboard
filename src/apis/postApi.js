import { api } from './api';
export const postApi = api.injectEndpoints({
  endpoints: build => ({
    getPostList: build.query({
      query: params => ({
        url: '/posts',
        method: 'GET',
        params,
      }),
      transformResponse: res => res.data,
      providesTags: ['Post'],
    }),
    getPostDetail: build.query({
      query: id => ({
        url: `/posts/${id}`,
        method: 'GET',
      }),
      transformResponse: res => res.data,
      providesTags: ['Post'],
    }),
    createPost: build.mutation({
      query: data => ({
        url: '/posts',
        method: 'POST',
        body: data,
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Post'],
    }),
    updatePost: build.mutation({
      query: data => ({
        url: `/posts/${data.id}`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Post'],
    }),
    deletePost: build.mutation({
      query: postId => ({
        url: `/posts/${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});
export const {
  useGetPostListQuery,
  useGetPostDetailQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;
