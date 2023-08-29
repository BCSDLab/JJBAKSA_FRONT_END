import { useEffect, useRef, useState } from 'react';
import useGeolocation from 'utils/hooks/useGeolocation';
import MARKER from 'pages/Home/static/marker';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import Pin from 'pages/Pin';
import styles from './Map.module.scss';
import OptionButtons from './components/OptionButtons';
import MobileOptions from './components/MobileOptions';
import { ClickedMarkerHtml, MarkerHtml } from './components/MarkerHtml';

interface MarkerType {
  latitude: number;
  longitude: number;
  placeName: string;
  index: number;
}
const options = {
  maximumAge: 1000,
};
export default function Map(): JSX.Element {
  const [, setSelect] = useState<naver.maps.Marker | null>(null);
  const { isMobile } = useMediaQuery();
  const { location } = useGeolocation(options);
  const mapRef = useRef<naver.maps.Map | null>(null);
  const selectedMarker = useRef<naver.maps.Marker | null>(null);

  const markerHighlightEvent = (markerCur:naver.maps.Marker, item:MarkerType) => {
    naver.maps.Event.addListener(markerCur, 'click', () => {
      setSelect(markerCur);
      if (selectedMarker.current) {
        selectedMarker.current.setIcon({
          content: MarkerHtml(
            '',
            selectedMarker.current.getTitle(),
            selectedMarker.current.getZIndex(),
          ),
          size: new naver.maps.Size(50, 52),
          anchor: new naver.maps.Point(25, 26),
        });
      }

      markerCur.setIcon({
        // 추후 각 마커벼로 이미지파일이 주어지면 첫번째 인자로 해당 이미지를 넘겨주도록 해야함
        content: ClickedMarkerHtml('', item.placeName, item.index),
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
    if (!mapRef.current && typeof location !== 'undefined') {
      mapRef.current = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(location.latitude, location.longitude),
        zoomControl: true,
        zoomControlOptions: {
          style: naver.maps.ZoomControlStyle.SMALL,
          position: naver.maps.Position.BOTTOM_LEFT,
        },
        zoom: 10,
        scaleControl: false,
        logoControl: false,
        mapDataControl: false,
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.destroy();
      }
    };
  }, [location]);

  useEffect(() => {
    MARKER.forEach((item:MarkerType) => {
      if (mapRef.current) {
        const markers = new naver.maps.Marker({
          position: new naver.maps.LatLng(item.latitude, item.longitude),
          title: item.placeName,
          map: mapRef.current,
          zIndex: item.index,
          icon: {
            content: MarkerHtml('', item.placeName, item.index),
            size: new naver.maps.Size(50, 52),
            anchor: new naver.maps.Point(25, 26),
          },
        });
        markerHighlightEvent(markers, item);
      }
    });
  }, [location]);
  return (
    <div>
      {isMobile && <MobileOptions />}
      <Pin placeId="a" />
      <div id="map" className={styles.map} />
      {!isMobile && <OptionButtons />}
    </div>
  );
}
