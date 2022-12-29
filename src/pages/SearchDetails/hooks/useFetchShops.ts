import useGeolocation from 'utils/hooks/useGeolocation';
import { useQuery } from 'react-query';
import { fetchShops } from 'api/search';
import { ShopsParams } from 'api/search/entity';

const useFetchShops = (keyword: string) => {
  const options = {
    maximumAge: 1000,
  };
  const { location } = useGeolocation(options);
  const params = { keyword, location };
  const {
    isLoading, isError, data, refetch,
  } = useQuery('shop', () => fetchShops(params as ShopsParams), { enabled: !!location });

  const isFetching = isLoading || !(location);
  const shops = data?.data.content;

  return {
    isFetching, isError, data: shops, refetch,
  };
};

export default useFetchShops;
