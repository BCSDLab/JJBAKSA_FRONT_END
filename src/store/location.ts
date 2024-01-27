import { atom, useAtom } from 'jotai';

import { Coords } from 'api/search/entity';

export const locationAtom = atom<Coords | undefined>(undefined);

export const useLocation = () => {
  const [location, setLocation] = useAtom(locationAtom);

  return {
    location,
    setLocation,
  };
};
