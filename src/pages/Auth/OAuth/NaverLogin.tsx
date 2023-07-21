import axios from 'axios';
import { API_PATH } from 'config/constants';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUpdateAuth } from 'store/auth';

export default function NaverLogin() {
  const location = useLocation();
  const updateAuth = useUpdateAuth();
  const navigate = useNavigate();
  const clientId = process.env.REACT_APP_NAVER_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_NAVER_CLIENT_SECRET;
  const snsLogin = async () => {
    try {
      const naverResponse = await axios.post(`/oauth2.0/token?grant_type=authorization_code&client_secret=${clientSecret}&client_id=${clientId}&code=${location.search.split('&')[0].slice(6)}&state=1`);
      const headers = {
        authorization: naverResponse.data.access_token,
      };
      const result = await axios.post(`${API_PATH}/login/NAVER`, {}, {
        headers,
      });
      sessionStorage.setItem('accessToken', result.data.accessToken);
      localStorage.setItem('refreshToken', result.data.refreshToken);
      await updateAuth();
    } catch (e) {
      //
    }
  };
  useEffect(() => {
    if (location !== undefined) {
      snsLogin();
    } else {
      // url 오류로 인한 콜백
      navigate('/login');
    }
  });
  return (
    <div />
  );
}
