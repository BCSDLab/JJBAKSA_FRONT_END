import useGeolocation from 'utils/hooks/useGeolocation';
import { useQuery } from 'react-query';
import { fetchAutoComplete } from 'api/search';
import { FetchAutoCompleteParams } from 'api/search/entity';

const useFetchAutoComplete = (query: string) => {
  const options = {
    maximumAge: 1000,
  };
  const { location } = useGeolocation(options);

  const params: FetchAutoCompleteParams = { query };
  if (location) {
    params.location = location;
  }

  const {
    isLoading, isError, data, refetch,
  } = useQuery(['shop', query], () => fetchAutoComplete(params), { enabled: !!query });

  const isFetching = isLoading || !(location);
  const shop = data?.data;

  return {
    isFetching, isError, query: shop, refetch,
  };
};

export default useFetchAutoComplete;
