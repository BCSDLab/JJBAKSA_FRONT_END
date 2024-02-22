/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import { useEffect, useState } from 'react';

import { FilterShopsListResponse } from 'api/shop/entity';
import { ClickedMarkerHtml, MarkerHtml } from 'pages/Home/Map/components/MarkerHtml/index';
import { useSelected } from 'store/placeId';
import { useLocation } from 'store/location';
import useNaverMap from 'utils/hooks/useNaverMap';

interface MarkerProps {
  filterShops: FilterShopsListResponse | null;
}

function useMarker({ filterShops }: MarkerProps) {
  const { location } = useLocation();
  const map = useNaverMap(location?.lat, location?.lng);
  const [markerArray, setMarkerArray] = useState<(naver.maps.Marker | undefined)[]>([]);
  const { setSelected } = useSelected();
  useEffect(() => {
    if (!map || !filterShops) return;

    const newMarkers = filterShops.map((shop, index) => {
      const lat = shop?.coordinate?.lat;
      const lng = shop?.coordinate?.lng;
      if (!lat || !lng) return;

      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(lat, lng),
        title: shop.name,
        map,
        zIndex: filterShops.length - index,
        icon: {
          content: MarkerHtml(shop.name),
          anchor: new naver.maps.Point(30, 62),
        },
      });
      naver.maps.Event.addListener(marker, 'click', () => {
        const clickedPlaceId = shop.placeId;
        newMarkers?.forEach((m, idx) => {
          m?.setIcon({
            content: MarkerHtml(m.getTitle()),
            anchor: new naver.maps.Point(30, 62),
          });
          m?.setZIndex(filterShops.length - idx);
        });

        marker.setIcon({
          content: ClickedMarkerHtml(shop.name, shop.placeId),
          anchor: new naver.maps.Point(30, 62),
        });
        marker.setZIndex(10000);
        setSelected(clickedPlaceId);
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

  return { markerArray };
}

export default useMarker;
