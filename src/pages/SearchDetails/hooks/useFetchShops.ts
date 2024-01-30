import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import { fetchShops } from 'api/shop';
import { ShopsParams } from 'api/shop/entity';
import useDebounce from 'utils/hooks/useDebounce';
import useGeolocation from 'utils/hooks/useGeolocation';

const OPTIONS = { maximumAge: 1000 };

const useFetchShops = (text: string) => {
  const { location } = useGeolocation(OPTIONS);
  const debouncedText = useDebounce(text, 500);

  const params: ShopsParams = { keyword: debouncedText, location };

  const {
    isLoading, isError, data, refetch,
  } = useQuery({
    queryKey: ['shop', location, debouncedText],
    queryFn: () => fetchShops(params),
    enabled: !!location,
  });

  const isFetching = isLoading || !(location);
  const shops = useMemo(() => data?.data.shopQueryResponseList, [data]);
  const shopCount = useMemo(() => {
    if (shops) {
      return shops.filter((shop) => shop.name && shop.name.trim() !== '').length;
    }
    return 0;
  }, [shops]);

  return {
    isFetching, isError, data: shops, refetch, shopCount,
  };
};

export default useFetchShops;
