import { useQuery } from '@tanstack/react-query';

import { getShopRate } from 'api/shop';

const useShopRate = (placeId: string) => {
  const {
    isLoading, isError, data, refetch,
  } = useQuery({
    queryKey: ['rate', placeId],
    queryFn: () => getShopRate(placeId),
  });

  const rate = data && data.data.ratingCount !== 0
    ? (data.data.totalRating / data.data.ratingCount).toFixed(1) : '0.0';

  return {
    isLoading, isError, rate, refetch,
  };
};

export default useShopRate;
