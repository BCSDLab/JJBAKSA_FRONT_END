import { useQuery } from '@tanstack/react-query';

import { fetchPinShop } from 'api/shop';

const usePin = (placeId: string) => {
  const {
    isLoading, isError, data, refetch,
  } = useQuery({
    queryKey: ['pinShop', placeId],
    queryFn: () => fetchPinShop(placeId),
  });

  return {
    isLoading, isError, data: data?.data, refetch,
  };
};

export default usePin;
