import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import axios, { AxiosResponse } from 'axios';
import qs from 'qs';

import { API_PATH } from 'config/constants';
import { useUpdateAuth } from 'store/auth';

interface KakaoResponse {
  access_token: string,
  expires_in: number,
  refresh_token: string,
  refresh_token_expires_in: number,
  scope: string,
  token_type: string,
}

export default function KakaoLogin() {
  const location = useLocation();
  const updateAuth = useUpdateAuth();
  const navigate = useNavigate();
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  };
  const data = {
    grant_type: 'authorization_code',
    client_id: process.env.REACT_APP_KAKAO_CLIENT_ID,
    redirect_uri: `${process.env.REACT_APP_SERVER_LOGIN_REDIRECT_URL}/kakao`,
    code: location.search.slice(6, location.search.length),
  };
  const snsLogin = async () => {
    try {
      const response: AxiosResponse<KakaoResponse> = await axios.post('https://kauth.kakao.com/oauth/token', qs.stringify(data), { headers });
      const kakaoAccessToken = response.data.access_token;

      const kakaoLogin = await axios.post(`${API_PATH}/login/KAKAO`, {}, {
        headers: {
          Authorization: kakaoAccessToken,
        },
      });
      sessionStorage.setItem('accessToken', kakaoLogin.data.accessToken);
      localStorage.setItem('refreshToken', kakaoLogin.data.refreshToken);
      await updateAuth();
    } catch {
      //
    }
  };
  useEffect(() => {
    if (location !== undefined) {
      snsLogin();
    } else {
      navigate('/login');
    }
  });
  return (
    <div />
  );
}
