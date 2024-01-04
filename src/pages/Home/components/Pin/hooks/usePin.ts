import { useQuery } from '@tanstack/react-query';

import { fetchPinShop } from 'api/shop';

const usePin = (placeId: string) => {
  const {
    isLoading, isError, data, refetch,
  } = useQuery({
    queryKey: ['pinShop', placeId],
    queryFn: () => fetchPinShop(placeId),
  });
  const pinShop = data?.data;

  return {
    isLoading, isError, data: pinShop, refetch,
  };
};

export default usePin;
