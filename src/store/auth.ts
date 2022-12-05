import { getMe } from 'api/user';
import { refreshAccessToken } from 'api/user/userApiClient';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithDefault } from 'jotai/utils';

const getAuth = async () => {
  const token = {
    access: sessionStorage.getItem('accessToken'),
    refresh: localStorage.getItem('refreshToken'),
  };

  if (token.access) {
    const authResponse = await getMe();
    if (authResponse.data) return authResponse.data;
  }

  if (token.refresh) {
    const refreshResponse = await refreshAccessToken();
    if (refreshResponse.accessToken) {
      sessionStorage.setItem('accessToken', refreshResponse.accessToken);

      const authResponse = await getMe();
      if (authResponse.data) return authResponse.data;
    }
  }

  return null;
};

const authAtom = atomWithDefault(getAuth);

const updateAuthAtom = atom(null, async (get, set) => {
  set(authAtom, await getAuth());
});

export const useUpdateAuth = () => useSetAtom(updateAuthAtom);

export const useAuth = () => useAtomValue(authAtom);