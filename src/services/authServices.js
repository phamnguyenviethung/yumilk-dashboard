import axiosInstance from '@/utils/axiosInstance';

const authServices = {
  login: data => {
    const url = '/authentication/login';
    return axiosInstance.post(url, data);
  },
  register: data => {
    const url = '/authentication/sign-up';
    return axiosInstance.post(url, data);
  },
  activeAccount: data => {
    const url = `/authentication/verify?token=${data}`;
    return axiosInstance.post(url);
  },
};

export default authServices;
