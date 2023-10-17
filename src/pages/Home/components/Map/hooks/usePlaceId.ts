import { fetchShops } from 'api/shop';
import { useEffect, useState } from 'react';

interface PlaceIdParam {
  title: string | undefined;
  lat: number | undefined;
  lng: number | undefined;
}
const usePlaceId = ({ title, lat, lng }:PlaceIdParam) => {
  const [placeId, setPlaceId] = useState<string>('');

  useEffect(() => {
    const getPlceId = async () => {
      if (title && lat && lng) {
        const shops = await fetchShops(
          {
            keyword: title,
            location: { lat, lng },
          },
        );
        if (shops.data.shopQueryResponseList.length !== 0) {
          setPlaceId(shops.data?.shopQueryResponseList[0].placeId || '');
        }
      }
    };
    getPlceId();
  }, [lat, lng, title]);

  return { placeId };
};

export default usePlaceId;
