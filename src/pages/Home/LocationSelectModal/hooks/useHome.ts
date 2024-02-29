import { useEffect, useState } from 'react';

import getAddress from 'api/location';
import useLocationActive from 'store/locationActive';
import makeToast from 'utils/ts/makeToast';

export default function useHome() {
  const {
    state: isModalOpen, setTrue: setOpen, setFalse: setClose,
  } = useLocationActive();

  const [userLocation, setUserLocation] = useState({
    latitude: null as number | null,
    longitude: null as number | null,
    address: null as string | null,
  });

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
      }, () => {
        makeToast('error', '현재 위치를 설정해주세요.');
      });
    }
  };

  useEffect(() => {
    updateUserLocation();
  }, []);

  return {
    userLocation,
    isModalOpen,
    setOpen,
    setClose,
  };
}
