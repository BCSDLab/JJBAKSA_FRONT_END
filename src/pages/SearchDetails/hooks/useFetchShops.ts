import useGeolocation from 'utils/hooks/useGeolocation';
import useDebounce from 'utils/hooks/useDebounce';
import { useQuery } from 'react-query';
import { fetchShops } from 'api/shop';
import { ShopsParams } from 'api/shop/entity';
import { useEffect, useMemo } from 'react';

const useFetchShops = (text: string) => {
  const OPTIONS = {
    maximumAge: 1000,
  };
  const { location } = useGeolocation(OPTIONS);
  const debouncedText = useDebounce(text, 500);

  const params: ShopsParams = { keyword: debouncedText, location };

  const {
    isLoading, isError, data, refetch,
  } = useQuery(['shop', location], () => fetchShops(params), {
    enabled: !!location,
  });

  useEffect(() => {
    refetch();
  }, [debouncedText, refetch]);

  const isFetching = isLoading || !(location);
  const shops = useMemo(() => data?.data.shopQueryResponseList, [data]);
  const count = useMemo(() => {
    if (shops) {
      return shops.filter((shop) => shop.name && shop.name.trim() !== '').length;
    }
    return 0;
  }, [shops]);

  return {
    isFetching, isError, data: shops, refetch, count,
  };
};

export default useFetchShops;
