import { useQuery } from '@tanstack/react-query';

import { fetchAutoComplete } from 'api/search';
import { FetchAutoCompleteParams } from 'api/search/entity';
import useGeolocation from 'utils/hooks/useGeolocation';

const OPTIONS = { maximumAge: 1000 };

const useFetchAutocomplete = (query: string) => {
  const { location } = useGeolocation(OPTIONS);
  const params: FetchAutoCompleteParams = { query };
  params.location = location && location;

  const {
    isLoading, isError, data, refetch,
  } = useQuery({ queryKey: ['shop', query], queryFn: () => fetchAutoComplete(params), enabled: !!query });

  const isFetching = isLoading || !(params.location);
  const shop = data?.data;

  return {
    isFetching, isError, shop, refetch,
  };
};

export default useFetchAutocomplete;
