import axios from 'axios';

const API_PATH = process.env.REACT_APP_API_PATH!;
const AUTH_TOKEN = sessionStorage.getItem('accessToken') || '';

const searchApi = axios.create({
  baseURL: `${API_PATH}:443`,
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
});
searchApi.defaults.headers.common.Authorization = `Bearer ${AUTH_TOKEN}`;

export default searchApi;
