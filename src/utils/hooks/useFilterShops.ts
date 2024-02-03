import { useQuery } from '@tanstack/react-query';

import { getFilterShops } from 'api/shop';
import { FilterShopsParams } from 'api/shop/entity';
import { useAuth } from 'store/auth';
import useGeolocation from 'utils/hooks/useGeolocation';

const OPTIONS = { maximumAge: 1000 };

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
  } = useQuery({
    queryKey: ['filterShops', params, location?.lat, location?.lng],
    queryFn: () => getFilterShops(params, {
      lat: location?.lat,
      lng: location?.lng,
    }),
    enabled,
  });

  const isFetching = isLoading || !(location);
  const filterShops = data?.data;

  return {
    isLoading, isFetching, isError, data: filterShops, refetch,
  };
};

export default useFilterShops;
