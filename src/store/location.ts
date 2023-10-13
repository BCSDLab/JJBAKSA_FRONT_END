import { atom, useAtom } from 'jotai';

export interface GeolocationPosition {
  latitude: number;
  longitude: number;
}

export const locationAtom = atom<GeolocationPosition | undefined>(undefined);

export const useLocation = () => {
  const [location, setLocation] = useAtom(locationAtom);

  return {
    location,
    setLocation,
  };
};
