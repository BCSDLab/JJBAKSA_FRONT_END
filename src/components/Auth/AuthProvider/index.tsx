import { getMe } from 'api/user';
import { User } from 'api/user/entity';
import { refreshAccessToken } from 'api/user/userApiClient';
import {
  ReactNode, useEffect, useMemo, useState,
} from 'react';
import AuthContext from './AuthContext';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    const token = sessionStorage.getItem('accessToken');
    if (token) return token;
    return null;
  });

  const login = async (token: string) => {
    setAccessToken(token);
    const authResponse = await getMe();
    if (authResponse.data) setAuth(authResponse.data);
  };

  const logout = () => {
    setAuth(null);
    setAccessToken(null);
    sessionStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  const value = useMemo(() => ({
    auth,
    accessToken,
    login,
    logout,
  }), [auth, accessToken]);

  useEffect(() => {
    // 최초 접근 시 자동로그인
    const token = {
      access: sessionStorage.getItem('accessToken'),
      refresh: localStorage.getItem('refreshToken'),
    };
    if (token.access) {
      login(token.access);
    } else if (token.refresh) {
      refreshAccessToken().then((res) => {
        login(res.accessToken);
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
