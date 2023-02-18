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

// 네이버 지도
export const NAVER_MAPS_CLIENT_ID = checkEnvVar('REACT_APP_NAVER_MAPS_CLIENT_ID');

// 카카오 OAuth
export const KAKAO_JAVASCRIPT_KEY = checkEnvVar('REACT_APP_KAKAO_JAVASCRIPT_KEY');
export const KAKAO_INTEGRITY = checkEnvVar('REACT_APP_KAKAO_INTEGRITY');
export const KAKAO_CLIENT_ID = checkEnvVar('REACT_APP_KAKAO_CLIENT_ID');
export const KAKAO_CLIENT_SECRET = checkEnvVar('REACT_APP_KAKAO_CLIENT_SECRET');

// 네이버 OAuth
