import { useEffect, useRef } from 'react';
import useGeolocation from 'utils/hooks/useGeolocation';
import marker from 'pages/Home/static/marker';
import styles from './Map.module.scss';

interface Props {
  latitude: number;
  longitude: number;
  placeName: string;
}
const options = {
  maximumAge: 1000,
};
export default function Map(): JSX.Element {
  const { location } = useGeolocation(options);
  const mapRef = useRef<HTMLElement | null | any>(null);
  const markerRef = useRef<any | null>(null);

  // 지도 생성
  useEffect(() => {
    if (typeof location !== 'undefined') {
      mapRef.current = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(location.latitude, location.longitude),
        zoomControl: true,
        zoom: 10,
      });
    }
  }, [location]);

  useEffect(() => {
    const markerClickEvent = (markerCur:any, item:Props) => {
      naver.maps.Event.addListener(markerCur, 'click', () => {
        const mapLatLng = new naver.maps.LatLng(item.latitude, item.longitude);
        mapRef.current.panTo(mapLatLng, 'easeInOutCubic');
      });
    };
    for (let i = 0; i < marker.length; i += 1) {
      markerRef.current = new naver.maps.Marker({
        position: new naver.maps.LatLng(marker[i].latitude, marker[i].longitude),
        title: marker[i].placeName,
        map: mapRef.current,
      });
      markerClickEvent(markerRef.current, marker[i]);
    }
  }, [location]);
  return (
    <div>
      <div id="map" className={styles.map} />
    </div>
  );
}
