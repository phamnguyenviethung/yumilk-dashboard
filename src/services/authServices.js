import axiosInstance from '@/utils/axiosInstance';

const authServices = {
  login: data => {
    const url = '/authentication/dashboard/login';
    return axiosInstance.post(url, data);
  },
  register: data => {
    const url = '/authentication/sign-up';
    return axiosInstance.post(url, data);
  },
};

export default authServices;
