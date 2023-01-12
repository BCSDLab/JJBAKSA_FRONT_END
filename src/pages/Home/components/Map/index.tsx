import { useEffect, useRef } from 'react';
import useGeolocation from 'utils/hooks/useGeolocation';
import marker from 'pages/Home/static/marker';
import defaultImage from 'assets/images/search/default-image.png';
import styles from './Map.module.scss';
import { markerHtml, clickedMarkerHtml } from './components/markerHtml';

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
  const mapRef = useRef<naver.maps.Map | null>(null);
  const markerRef = useRef<naver.maps.Marker | null>(null);
  const selectedMarker = useRef<naver.maps.Marker | null>(null);

  const markerHighlightEvent = (markerCur:any, item:Props) => {
    naver.maps.Event.addListener(markerCur, 'click', () => {
      if (selectedMarker.current) {
        selectedMarker.current.setIcon({
          content: markerHtml(defaultImage, selectedMarker.current.getTitle()),
          size: new naver.maps.Size(50, 52),
          anchor: new naver.maps.Point(25, 26),
        });
      }

      markerCur.setIcon({
        content: clickedMarkerHtml(defaultImage, item.placeName),
        size: new naver.maps.Size(50, 52),
        anchor: new naver.maps.Point(25, 26),
      });

      selectedMarker.current = markerCur;

      if (mapRef.current) {
        const mapLatLng = new naver.maps.LatLng(item.latitude, item.longitude);
        mapRef.current.panTo(mapLatLng);
      }
    });
  };

  useEffect(() => {
    if (typeof location !== 'undefined') {
      mapRef.current = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(location.latitude, location.longitude),
        zoomControl: true,
        zoom: 10,
        scaleControl: false,
        logoControl: false,
        mapDataControl: false,
      });
    }
  }, [location]);

  useEffect(() => {
    marker.forEach((item:Props) => {
      if (mapRef.current) {
        markerRef.current = new naver.maps.Marker({
          position: new naver.maps.LatLng(item.latitude, item.longitude),
          title: item.placeName,
          map: mapRef.current,
          icon: {
            content: markerHtml(defaultImage, item.placeName),
            size: new naver.maps.Size(50, 52),
            anchor: new naver.maps.Point(25, 26),
          },
        });
        markerHighlightEvent(markerRef.current, item);
      }
    });
  }, [location]);
  return (
    <div>
      <div id="map" className={styles.map} />
    </div>
  );
}
