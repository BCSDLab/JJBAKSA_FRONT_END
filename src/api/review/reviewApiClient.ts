/* eslint-disable no-param-reassign */
import axios from 'axios';
import { API_PATH } from 'config/constants';

const reviewApi = axios.create({
  baseURL: `${API_PATH}/review`,
  timeout: 2000,
});

reviewApi.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (config.headers && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;

      config.headers['Content-Type'] = config.data instanceof FormData ? 'multipart/form-data' : 'applicatoin/json';
    }
    return config;
  },
);

export default reviewApi;
