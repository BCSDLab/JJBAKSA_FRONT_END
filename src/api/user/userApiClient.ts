import axios from 'axios';
import makeToast from 'utils/ts/makeToast';
import { RefreshResponse } from './entity';

const API_PATH = process.env.REACT_APP_API_PATH!;

const userApi = axios.create({
  baseURL: `${API_PATH}/user`,
  timeout: 2000,
});

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    return Promise.reject();
  }
  try {
    const { data } = await userApi.get<RefreshResponse>('/refresh', {
      headers: { RefreshToken: `Bearer ${refreshToken}` },
    });
    sessionStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  } catch {
    sessionStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return Promise.reject();
  }
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
  // 성공시
  (response) => response,

  // 실패시
  (error) => {
    try {
      const originalRequest = error.config;
      // TODO: 백엔드단에서 정확한 토큰 인증 오류 시 코드/메시지를 정해주면 수정 필요.
      // 현재 로그인 실패시 data가 undefined.
      if (!originalRequest.retry) {
        originalRequest.retry = true;
        return refreshAccessToken().then(() => userApi(originalRequest));
      }
      return Promise.reject();
    } catch {
      makeToast('error', '네트워크 오류가 발생했습니다.');
      return Promise.reject();
    }
  },
);

export default userApi;
