/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import { useEffect, useState } from 'react';
import { FilterShopsListResponse } from 'api/shop/entity';
import MARKER from 'pages/Home/static/marker';
import { ClickedMarkerHtml, MarkerHtml } from '../components/MarkerHtml';

interface MarkerProps {
  map: naver.maps.Map | null;
  filterShops: FilterShopsListResponse | undefined;
}

function useMarker({ map, filterShops }: MarkerProps) {
  const [markerArray, setMarkerArray] = useState<(naver.maps.Marker | undefined)[]>([]);
  const [selected, setSelected] = useState<naver.maps.Marker | undefined>();

  useEffect(() => {
    if (!map || !filterShops) return;
    // 사용량 제한으로, 현재는 목업 데이터로 마커를 찍고 있음
    const newMarkers = (filterShops ?? []).map((shop, index) => {
    // const newMarkers = (MARKER ?? []).map((shop, index) => {
      const lat = shop?.geometry?.location?.lat;
      const lng = shop?.geometry?.location?.lng;
      if (!lat || !lng) return;

      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(lat, lng),
        title: shop.name,
        map,
        zIndex: MARKER.length - index,
        icon: {
          content: MarkerHtml(shop.name, shop.name),
        },
      });

      naver.maps.Event.addListener(marker, 'click', () => {
        newMarkers.forEach((m) => {
          m?.setIcon({
            content: MarkerHtml(m.getTitle(), m.getTitle()),
          });
        });

        marker.setIcon({
          content: ClickedMarkerHtml(shop.name, shop.name),
        });
        setSelected(marker);
        if (map) {
          map.panTo(marker.getPosition());
        }
      });
      return marker;
    });
    setMarkerArray(newMarkers);

    return () => {
      newMarkers.forEach((marker) => {
        marker?.setMap(null);
      });
    };
  }, [map, filterShops]);

  return { markerArray, selected };
}

export default useMarker;
