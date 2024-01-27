/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import { useEffect, useState } from 'react';

import { FilterShopsListResponse } from 'api/shop/entity';
import { ClickedMarkerHtml, MarkerHtml } from 'pages/Home/components/Map/components/MarkerHtml/index';
import { useSelected } from 'store/placeId';

interface MarkerProps {
  map: naver.maps.Map | null;
  filterShops: FilterShopsListResponse | undefined;
}

function useMarker({ map, filterShops }: MarkerProps) {
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
          content: MarkerHtml(shop.photo, shop.name),
          anchor: new naver.maps.Point(30, 62),
        },
      });

      naver.maps.Event.addListener(marker, 'click', () => {
        const clickedPlaceId = shop.placeId;
        newMarkers.forEach((m, idx) => {
          m?.setIcon({
            content: MarkerHtml(m.getTitle(), m.getTitle()),
            anchor: new naver.maps.Point(30, 62),
          });
          m?.setZIndex(filterShops.length - idx);
        });

        marker.setIcon({
          content: ClickedMarkerHtml(shop.photo, shop.name, shop.placeId),
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
