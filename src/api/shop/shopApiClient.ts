import axios from 'axios';
import { API_PATH } from 'config/constants';

const shopApi = axios.create({
  baseURL: `${API_PATH}`,
  timeout: 2000,
});

shopApi.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem('accessToken');
    // eslint-disable-next-line no-param-reassign
    if (config.headers && accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
);

export default shopApi;
