/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useLocation } from 'store/location';

export default function useGeolocation(options = {}) {
  const { location, setLocation } = useLocation();
  const onGeoSuccess: PositionCallback = (position) => {
    setLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  };
  const onGeoError = () => {};

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError, options);
  }, [options]);

  return { location };
}
