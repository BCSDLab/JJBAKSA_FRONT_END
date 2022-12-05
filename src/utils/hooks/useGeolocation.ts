import { useEffect, useState } from 'react';

interface Coords {
  latitude: number,
  longitude: number
}

interface Position {
  coords: Coords
}

export default function useGeolocation(options = {}) {
  const [location, setLocation] = useState<Position>();
  const onGeoError = (err: any) => console.log(`[ERROR]: ${err}`);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(setLocation, onGeoError, options);
  }, [options]);

  return { location };
}
