import { useEffect, useState } from 'react';

interface GeolocationPosition {
  latitude: number;
  longitude: number;
}

export default function useGeolocation(options = {}) {
  const [location, setLocation] = useState<GeolocationPosition>();
  const onGeoSuccess: PositionCallback = (position) => {
    setLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  };
  const onGeoError = () => {};

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError, options);
  }, [options]);

  return { location };
}
