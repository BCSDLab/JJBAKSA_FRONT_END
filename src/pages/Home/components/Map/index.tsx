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
  const selectedMarker = useRef<any | null>(null);

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
    const markerClickEvent = (markerCur:any, item:Props) => {
      naver.maps.Event.addListener(markerCur, 'click', () => {
        if (selectedMarker.current) {
          selectedMarker.current.setOptions({
            icon: {
              content: [
                '<div style="display:flex;justify-content:center;text-align:center;border:1px solid #FF7F23;background-color:white;border-radius:32.5px;min-width:205px;height:65px;">',
                '<div style="display:flex;flex-direction:row;align-items:center;">',
                '<img src="" style="width:68px;height:68px;border-radius:89.5px;"slt="음식점 사진"/>',
                '<span style="padding-left:10px;font-size:20px;font-weigth:500;text-overflow:ellipsis">', `${selectedMarker.current.title}`, '</span>',
                '</div>',
                '<div style="position:relative;left:-125px;top:65px;">',
                '<div style="border-color:#FF7F23 transparent transparent;border-style:solid;border-width:12px 15px 0;">', '</div>',
                '<div style="border-color:white transparent transparent;border-style:solid;border-width:12px 15px;position:absolute;top:-1px;">', '</div>',
                '</div>',
                '</div>',
              ].join(''),
              size: new naver.maps.Size(50, 52),
              anchor: new naver.maps.Point(25, 26),
            },
          });
        }
        markerCur.setOptions({
          icon: {
            content: [
              '<div style="display:flex;justify-content:center;text-align:center;border:1px solid #FF7F23;background-color:#FF7F23;border-radius:32.5px;min-width:205px;height:65px;">',
              '<div style="display:flex;flex-direction:row;align-items:center;">',
              '<img src="" style="width:68px;height:68px;border-radius:89.5px;"slt="음식점 사진"/>',
              '<span style="padding-left:10px;font-size:20px;font-weigth:500;text-overflow:ellipsis">', `${item.placeName}`, '</span>',
              '</div>',
              '<div style="position:relative;left:-125px;top:65px;">',
              '<div style="border-color:#FF7F23 transparent transparent;border-style:solid;border-width:12px 15px 0;">', '</div>',
              '<div style="border-color:#FF7F23 transparent transparent;border-style:solid;border-width:12px 15px;position:absolute;top:-1px;">', '</div>',
              '</div>',
              '</div>',
            ].join(''),
            size: new naver.maps.Size(50, 52),
            anchor: new naver.maps.Point(25, 26),
          },
        });
        selectedMarker.current = markerCur;
        const mapLatLng = new naver.maps.LatLng(item.latitude, item.longitude);
        mapRef.current.panTo(mapLatLng, 'easeInOutCubic');
      });
    };
    for (let i = 0; i < marker.length; i += 1) {
      markerRef.current = new naver.maps.Marker({
        position: new naver.maps.LatLng(marker[i].latitude, marker[i].longitude),
        title: marker[i].placeName,
        map: mapRef.current,
        icon: {
          content: [
            '<div style="display:flex;justify-content:center;text-align:center;border:1px solid #FF7F23;background-color:white;border-radius:32.5px;min-width:205px;height:65px;">',
            '<div style="display:flex;flex-direction:row;align-items:center;">',
            '<img src={FoodIcon} style="width:68px;height:68px;border-radius:89.5px;"slt="음식점 사진"/>',
            '<span style="padding-left:10px;font-size:20px;font-weigth:500;text-overflow:ellipsis">', `${marker[i].placeName}`, '</span>',
            '</div>',
            '<div style="position:relative;left:-125px;top:65px;">',
            '<div style="border-color:#FF7F23 transparent transparent;border-style:solid;border-width:12px 15px 0;">', '</div>',
            '<div style="border-color:white transparent transparent;border-style:solid;border-width:12px 15px;position:absolute;top:-1px;">', '</div>',
            '</div>',
            '</div>',
          ].join(''),
          size: new naver.maps.Size(50, 52),
          anchor: new naver.maps.Point(25, 26),
        },
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
