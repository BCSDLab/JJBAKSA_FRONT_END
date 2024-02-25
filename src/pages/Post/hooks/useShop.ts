import { useQuery } from '@tanstack/react-query';

import { fetchShop } from 'api/shop';

const useShop = (placeId: string) => {
  const { data } = useQuery({
    queryKey: ['shopDetail', placeId],
    queryFn: () => fetchShop(placeId),
  });

  const formattedPhoneNumber = data?.formattedPhoneNumber ?? '';
  const todayPeriod = data?.todayPeriod;

  return {
    shop: data, formattedPhoneNumber, todayPeriod,
  };
};

export default useShop;
