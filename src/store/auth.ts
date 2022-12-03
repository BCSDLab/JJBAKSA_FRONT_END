import { getMe } from 'api/user';
import { User } from 'api/user/entity';
import { refreshAccessToken } from 'api/user/userApiClient';
import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

const authAtom = atom<User | null>(null);

const initAuthAtom = atom(null, async (get, set) => {
  const token = {
    access: sessionStorage.getItem('accessToken'),
    refresh: localStorage.getItem('refreshToken'),
  };

  if (token.access) {
    const authResponse = await getMe();
    if (authResponse.data) return set(authAtom, authResponse.data);
  }

  if (token.refresh) {
    const refreshResponse = await refreshAccessToken();
    if (refreshResponse.accessToken) {
      sessionStorage.setItem('accessToken', refreshResponse.accessToken);

      const authResponse = await getMe();
      if (authResponse.data) return set(authAtom, authResponse.data);
    }
  }

  return set(authAtom, null);
});

export const useAuthAtom = () => {
  const [auth] = useAtom(authAtom);
  const [, initAuth] = useAtom(initAuthAtom);

  return { auth, initAuth };
};

export const useAuthInit = () => {
  const { auth, initAuth } = useAuthAtom();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return auth;
};
