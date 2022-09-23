import axios from 'axios';

const API_PATH = process.env.REACT_APP_API_PATH!;

const searchApi = axios.create({
  baseURL: `${API_PATH}/search`,
});

export default searchApi;
