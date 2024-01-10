import { useEffect, useRef, useState } from 'react';

import getAddress from 'api/location';
import useLocationActive from 'store/locationActive';
import makeToast from 'utils/ts/makeToast';

export default function useHome() {
  const {
    state: isClickLocation, setFalse: setActiveFalse, setTrue: setActive,
  } = useLocationActive();
  const locationRef = useRef<HTMLDivElement | null>(null);
  const [userLocation, setUserLocation] = useState({
    latitude: null as number | null,
    longitude: null as number | null,
    address: null as string | null,
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setActiveFalse();
      }
    }

    document.addEventListener('mouseup', handleClickOutside);

    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, [setActiveFalse]);

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
    setActive,
    locationRef,
    userLocation,
  };
}
