import { api } from './api';
export const userApi = api.injectEndpoints({
  endpoints: build => ({
    getAllUsers: build.query({
      query: params => ({
        url: `/users`,
        params,
      }),
      transformResponse: res => res.data,
      providesTags: ['User'],
    }),
    addNewUser: build.mutation({
      query: data => ({
        url: '/users/',
        method: 'post',
        body: data,
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['User'],
    }),
    updateUser: build.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useAddNewUserMutation,
} = userApi;
