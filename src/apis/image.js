import { api } from './api';
export const userApi = api.injectEndpoints({
  endpoints: build => ({
    uploadImage: build.mutation({
      query: data => ({
        url: '/image',
        method: 'post',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Client-ID ${import.meta.env.VITE_IMGUR_CLIENTID}`,
        },
      }),
      transformResponse: res => res.data,
      invalidatesTags: ['Image'],
    }),
  }),
});

export const { useUploadImageMutation } = userApi;
