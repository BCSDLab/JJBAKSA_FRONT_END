import useGeolocation from 'utils/hooks/useGeolocation';
import { useQuery } from 'react-query';
import { getfilterShops } from 'api/shop';
import { FilterShopsParams } from 'api/shop/entity';
import { useAuth } from 'store/auth';

const OPTIONS = {
  maximumAge: 1000,
};
const useFilterShops = ({
  options_friend, options_nearby, options_scrap,
}: FilterShopsParams) => {
  const { location } = useGeolocation(OPTIONS);
  const auth = useAuth();
  const enabled = !!(location) && !!auth;

  const params: FilterShopsParams = {
    options_friend, options_nearby, options_scrap,
  };
  const {
    isLoading, isError, data, refetch,
  } = useQuery('filterShops', () => getfilterShops(params, {
    lat: location?.lat,
    lng: location?.lng,
  }), {
    enabled,
  });

  const isFetching = isLoading || !(location);
  const filterShops = data?.data;

  return {
    isFetching, isError, data: filterShops, refetch,
  };
};

export default useFilterShops;
