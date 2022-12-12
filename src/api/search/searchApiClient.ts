import axios from 'axios';

const API_PATH = process.env.REACT_APP_API_PATH!;

const searchApi = axios.create({
  baseURL: `${API_PATH}`,
  timeout: 2000,
});

searchApi.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem('accessToken');
    // eslint-disable-next-line no-param-reassign
    if (config.headers && accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
);

export default searchApi;
