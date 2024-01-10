/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import { useEffect, useState } from 'react';

import { FilterShopsListResponse } from 'api/shop/entity';
import { ClickedMarkerHtml, MarkerHtml } from 'pages/Home/components/Map/components/MarkerHtml/index';
import MARKER from 'pages/Home/static/marker';
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
    const newMarkers = (filterShops ?? []).map((shop, index) => {
      const lat = shop?.geometry?.location?.lat;
      const lng = shop?.geometry?.location?.lng;
      if (!lat || !lng) return;

      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(lat, lng),
        title: shop.name,
        map,
        zIndex: MARKER.length - index,
        icon: {
          content: MarkerHtml(shop.photo, shop.name),
        },
      });

      naver.maps.Event.addListener(marker, 'click', () => {
        const clickedPlaceId = shop.placeId;
        newMarkers.forEach((m) => {
          m?.setIcon({
            content: MarkerHtml(m.getTitle(), m.getTitle()),
          });
        });

        marker.setIcon({
          content: ClickedMarkerHtml(shop.photo, shop.name, shop.placeId),
        });
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
