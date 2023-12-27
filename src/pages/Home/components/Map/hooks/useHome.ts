import { useEffect, useRef, useState } from 'react';

import getAddress from 'api/location';
import useBooleanState from 'utils/hooks/useBooleanState';
import makeToast from 'utils/ts/makeToast';

export default function useHome() {
  const [isClickLocation, active, unactive] = useBooleanState(false);
  const locationRef = useRef<HTMLDivElement | null>(null);
  const [userLocation, setUserLocation] = useState({
    latitude: null as number | null,
    longitude: null as number | null,
    address: null as string | null,
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        unactive();
      }
    }
    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, [unactive]);

  const updateUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const addressData = await getAddress(
          position.coords.latitude,
          position.coords.longitude,
        );
        setUserLocation((prevUserLocation) => ({
          ...prevUserLocation,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          address: addressData,
        }));
      }, (error) => {
        makeToast('error', error.message);
      });
    }
  };

  useEffect(() => {
    updateUserLocation();
  }, []);

  return {
    isClickLocation,
    active,
    locationRef,
    userLocation,
  };
}
