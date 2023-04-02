import { API_PATH } from 'config/constants';
import axios from 'axios';

const commonApi = axios.create({
  baseURL: `${API_PATH}/users`,
  timeout: 2000,
});

commonApi.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem('accessToken');
    // eslint-disable-next-line no-param-reassign
    if (config.headers && accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
);

export default commonApi;
