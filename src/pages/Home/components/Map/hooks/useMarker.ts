/* eslint-disable consistent-return */
import { useEffect, useState } from 'react';
import { FilterShopsListResponse } from 'api/shop/entity';
import { MarkerHtml } from '../components/MarkerHtml';

interface MarkerProps {
  map: naver.maps.Map | null;
  filterShops: FilterShopsListResponse | undefined;
}

function useMarker({ map, filterShops }: MarkerProps) {
  const [markerArray, setMarkerArray] = useState<naver.maps.Marker[]>([]);

  useEffect(() => {
    if (!map || !filterShops) return;
    const newMarkers = (filterShops.content ?? []).map((shop) => {
      const lat = shop?.geometry?.location?.lat;
      const lng = shop?.geometry?.location?.lng;

      if (!lat || !lng) return;
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(lat, lng),
        title: shop.name,
        map,
        icon: {
          content: MarkerHtml(shop.photo, shop.name),
        },
      });
      return marker;
    }).filter((marker) => marker !== undefined) as naver.maps.Marker[];
    setMarkerArray(newMarkers);
  }, [map, filterShops]);

  return { markerArray };
}

export default useMarker;
