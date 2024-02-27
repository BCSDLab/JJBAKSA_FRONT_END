import { useQuery } from '@tanstack/react-query';

import { getShopRate } from 'api/shop';

const useShopRate = (placeId: string) => {
  const {
    isLoading, isError, data, refetch,
  } = useQuery({
    queryKey: ['rate', placeId],
    queryFn: () => getShopRate(placeId),
    select: (response) => ({
      rate: response.data.ratingCount !== 0
        ? (response.data.totalRating / response.data.ratingCount).toFixed(1)
        : '0.0',
    }),
  });

  if (isError) {
    throw new Error('Shop rate 정보를 불러오는 데 실패했습니다.');
  }

  const rate = !isLoading && data ? data?.rate : '정보 없음';

  return {
    isLoading, isError, rate, refetch,
  };
};

export default useShopRate;
