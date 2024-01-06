import { useQuery } from '@tanstack/react-query';

import { fetchAutoComplete } from 'api/search';
import { FetchAutoCompleteParams } from 'api/search/entity';
import useGeolocation from 'utils/hooks/useGeolocation';

const useFetchAutoComplete = (query: string) => {
  const OPTIONS = {
    maximumAge: 1000,
  };
  const { location } = useGeolocation(OPTIONS);

  const params: FetchAutoCompleteParams = { query };
  if (location) {
    params.location = location;
  }

  const {
    isLoading, isError, data, refetch,
  } = useQuery({ queryKey: ['shop', query], queryFn: () => fetchAutoComplete(params), enabled: !!query });

  const isFetching = isLoading || !(location);
  const shop = data?.data;

  return {
    isFetching, isError, query: shop, refetch,
  };
};

export default useFetchAutoComplete;
