import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import { fetchShops } from 'api/shop';
import { ShopsParams } from 'api/shop/entity';
import useDebounce from 'utils/hooks/useDebounce';
import useGeolocation from 'utils/hooks/useGeolocation';

type Props = {
  keyword: string;
  category: 'cafe' | 'restaurant';
};

const OPTIONS = { maximumAge: 1000 };

const useFetchShops = ({ keyword: text, category }: Props) => {
  const { location } = useGeolocation(OPTIONS);
  const keyword = useDebounce(text, 500);

  const params: ShopsParams = { keyword, category, location };

  const {
    isLoading, isError, data, refetch,
  } = useQuery({
    queryKey: ['shop', keyword, category, location],
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
