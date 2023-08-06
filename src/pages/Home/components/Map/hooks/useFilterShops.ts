import useGeolocation from 'utils/hooks/useGeolocation';
import { useQuery } from 'react-query';
import { getfilterShops } from 'api/shop';
import { FilterShopsParams } from 'api/shop/entity';

const OPTIONS = {
  maximumAge: 1000,
};
const useFilterShops = ({
  options_friend, options_nearby, options_scrap,
}: FilterShopsParams) => {
  const { location } = useGeolocation(OPTIONS);
  const params: FilterShopsParams = {
    options_friend, options_nearby, options_scrap,
  };
  const {
    isLoading, isError, data, refetch,
  } = useQuery('filterShops', () => getfilterShops(params, {
    latitude: location?.latitude,
    longitude: location?.longitude,
  }), {
    enabled: !!(location),
  });

  const isFetching = isLoading || !(location);
  const filterShops = data?.data;

  return {
    isFetching, isError, data: filterShops, refetch,
  };
};

export default useFilterShops;
