import axios from 'axios';
import store from '@/configs/store';
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT + '/api',
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  config => {
    const token = store.getState().auth?.userToken?.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  response => {
    // if (response && response.data) {
    //   return response.data;
    // }

    return response;
  },
  async error => {
    // const originalRequest = error.config;

    // if (error.response.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true;

    //   try {
    //     const refreshToken = localStorage.getItem('refreshToken');
    //     const response = await axios.post('/api/refresh-token', {
    //       refreshToken,
    //     });
    //     const { token } = response.data;

    //     localStorage.setItem('token', token);

    //     // Retry the original request with the new token
    //     originalRequest.headers.Authorization = `Bearer ${token}`;
    //     return axios(originalRequest);
    //   } catch (error) {
    //     // Handle refresh token error or redirect to login
    //   }
    // }

    error.serverMessage =
      error?.response?.data?.message || error?.response?.data?.title;

    return Promise.reject(error);
  }
);

export default axiosInstance;
