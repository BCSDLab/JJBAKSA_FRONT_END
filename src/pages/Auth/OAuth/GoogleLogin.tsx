import axios from 'axios';
import { API_PATH } from 'config/constants';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUpdateAuth } from 'store/auth';

export default function GoogleLogin() {
  const location = useLocation();
  const updateAuth = useUpdateAuth();
  const navigate = useNavigate();
  const snsLogin = async () => {
    try {
      const code = location.search.slice(6, location.search.length).split('&')[0];
      const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
      const clientSecret = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
      const redirectUri = process.env.REACT_APP_SERVER_LOGIN_REDIRECT_URL;
      const requestBody = `code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}/google&grant_type=authorization_code`;

      const googleResponse = await axios.post('https://oauth2.googleapis.com/token', requestBody);
      const googleIdToken = googleResponse.data.id_token;
      const googleLogin = await axios.post(`${API_PATH}/login/GOOGLE`, {}, {
        headers: {
          Authorization: googleIdToken,
        },
      });
      sessionStorage.setItem('accessToken', googleLogin.data.accessToken);
      localStorage.setItem('refreshToken', googleLogin.data.refreshToken);
      updateAuth();
    } catch (e) {
      // console.log(e);
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
