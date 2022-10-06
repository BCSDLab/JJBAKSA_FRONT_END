import axios from 'axios';
import { RefreshResponse } from './entity';

const API_PATH = process.env.REACT_APP_API_PATH!;

const userApi = axios.create({
  baseURL: `${API_PATH}/user`,
  timeout: 2000,
});

// 사이클 방지 및 refresh를 사용할 곳이 여기뿐이라 이곳에서 정의.
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    return Promise.reject();
  }
  return userApi.post<RefreshResponse>('/refresh', null, {
    headers: {
      refreshToken: `Bearer ${refreshToken}`,
    },
  }).then(({ data }) => {
    sessionStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
  }).catch(() => {
    sessionStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  });
};

userApi.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem('accessToken');
    // eslint-disable-next-line no-param-reassign
    if (config.headers && accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
);

// App단에서 'user/me' 호출할 때 accessToken을 갱신하므로 userApi에 종속.
userApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const errorCode = error.response.data.code;
    // TODO: 백엔드단에서 정확한 토큰 인증 오류 시 코드/메시지를 정해주면 수정 필요.
    if (errorCode >= 400 && !originalRequest.retry) {
      originalRequest.retry = true;
      refreshAccessToken().then(() => userApi(originalRequest));
    }
    return Promise.reject(error);
  },
);

export default userApi;
