import { Coords } from 'api/search/entity';
import { useEffect, useState } from 'react';

interface Position {
  coords: Coords
}

export default function useGeolocation(options = {}) {
  const [location, setLocation] = useState<Coords>();
  const onGeoSuccess = (geolocation: Position) => {
    setLocation(geolocation.coords);
  };
  const onGeoError = () => {};

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError, options);
  }, [options]);

  return { location };
}
