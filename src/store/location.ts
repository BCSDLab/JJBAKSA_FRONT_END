import { atom, useAtom } from 'jotai';

import { Coords } from 'api/search/entity';

export const locationAtom = atom<Coords | undefined>(undefined);
export const loadingAtom = atom<boolean>(true);

export const useLocation = () => {
  const [location, setLocation] = useAtom(locationAtom);
  const [loading, setLoading] = useAtom(loadingAtom);

  return {
    location,
    setLocation,
    loading,
    setLoading,
  };
};
