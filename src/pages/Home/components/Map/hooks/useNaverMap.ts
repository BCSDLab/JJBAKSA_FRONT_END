/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

function useNaverMap(latitude: number | undefined, longitude: number | undefined) {
  const [map, setMap] = useState<naver.maps.Map | null>(null);

  useEffect(() => {
    if (!map && latitude && longitude) {
      const newMaps = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(latitude, longitude),
        zoomControl: false,
        zoom: 10,
        scaleControl: false,
        logoControl: false,
        mapDataControl: false,
      });
      setMap(newMaps);

      return () => {
        newMaps.destroy();
      };
    }

    return () => {};
  }, [latitude, longitude]);

  return map;
}

export default useNaverMap;
