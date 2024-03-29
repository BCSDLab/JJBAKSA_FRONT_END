/* eslint-disable no-console */
const checkEnvVar = (name: string) => {
  const envVar = process.env[name];
  if (!envVar) {
    console.error(`환경변수 파일에 ${name}가 존재하지 않습니다!`);
    return '';
  }
  return envVar;
};

// API 공통
export const API_PATH = checkEnvVar('REACT_APP_API_PATH');
export const SERVER_LOGIN_REDIRECT_URL = checkEnvVar('REACT_APP_SERVER_LOGIN_REDIRECT_URL');

// 네이버 지도
export const NAVER_MAPS_CLIENT_ID = checkEnvVar('REACT_APP_NAVER_MAPS_CLIENT_ID');
export const NAVER_MAP_CLOUD_SECRET_ID = checkEnvVar('REACT_APP_NAVER_CLOUD_MAPS_CLIENT_SECRET_ID');

// 구글 OAuth
export const GOOGLE_CLIENT_ID = checkEnvVar('REACT_APP_GOOGLE_CLIENT_ID');
export const GOOGLE_REDIRECT_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${SERVER_LOGIN_REDIRECT_URL}/google&response_type=code&scope=email%20profile`;

// 카카오 OAuth
export const KAKAO_CLIENT_ID = checkEnvVar('REACT_APP_KAKAO_CLIENT_ID');
export const KAKAO_REDIRECT_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${SERVER_LOGIN_REDIRECT_URL}/kakao&response_type=code&prompt=login&scope=profile_nickname,account_email,profile_image`;

// 네이버 OAuth
export const NAVER_CLIENT_ID = checkEnvVar('REACT_APP_NAVER_CLIENT_ID');
export const NAVER_REDIRECT_URL = `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_CLIENT_ID}&redirect_uri=${SERVER_LOGIN_REDIRECT_URL}/naver&response_type=code&state=1`;
