import { useQuery } from '@tanstack/react-query';

import { getShopRate } from 'api/shop';

const useRate = (placeId: string) => {
  const {
    isLoading, isError, data, refetch,
  } = useQuery({
    queryKey: ['rate', placeId],
    queryFn: () => getShopRate(placeId),
  });

  return {
    isLoading, isError, rate: data?.data, refetch,
  };
};

export default useRate;
