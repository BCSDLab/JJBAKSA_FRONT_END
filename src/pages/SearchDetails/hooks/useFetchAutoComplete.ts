import { useQuery } from '@tanstack/react-query';

import { fetchAutocomplete } from 'api/search';
import { FetchAutocompleteParams } from 'api/search/entity';
import useGeolocation from 'utils/hooks/useGeolocation';

const useFetchAutocomplete = (query: string) => {
  const OPTIONS = {
    maximumAge: 1000,
  };
  const { location } = useGeolocation(OPTIONS);

  const params: FetchAutocompleteParams = { query };
  if (location) {
    params.location = location;
  }

  const {
    isLoading, isError, data, refetch,
  } = useQuery({ queryKey: ['shop', query], queryFn: () => fetchAutocomplete(params), enabled: !!query });

  const isFetching = isLoading || !(location);
  const shop = data?.data;

  return {
    isFetching, isError, shop, refetch,
  };
};

export default useFetchAutocomplete;
