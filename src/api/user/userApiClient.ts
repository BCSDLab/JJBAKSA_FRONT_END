import axios from 'axios';
import { IRefreshResponse } from './entity';

const API_PATH = process.env.REACT_APP_API_PATH!;
const accessToken = sessionStorage.getItem('accessToken');

const userApi = axios.create({
  baseURL: `${API_PATH}/user`,
  headers: accessToken
    ? { authorization: accessToken }
    : { 'Content-type': 'application/json' },
  timeout: 2000,
});

// TODO: refreshToken을 담는 로직이 필요. 아직 API에 body인지 header인지 미정인 상태.
// 사이클 방지 및 refresh를 사용할 곳이 여기뿐이라 이곳에서 정의.
const refreshAccessToken = () => userApi.post<IRefreshResponse>('/refresh')
  .then((res) => {
    sessionStorage.setItem('accessToken', res.data.accessToken);
    localStorage.setItem('refreshToken', res.data.refreshToken);
  })
  .catch(() => {
    localStorage.removeItem('refreshToken');
    sessionStorage.removeItem('accessToken');
  });

// App단에서 'user/me' 호출할 때 accessToken을 갱신하므로 userApi에 종속.
userApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const errorCode = error.response.data.code;
    // TODO: 백엔드단에서 정확한 토큰 인증 오류 시 코드/메시지를 정해주면 수정 필요.
    if (errorCode > 400 && !originalRequest.retry) {
      originalRequest.retry = true;
      await refreshAccessToken();
      return userApi(originalRequest);
    }
    return Promise.reject(error);
  },
);

export default userApi;
