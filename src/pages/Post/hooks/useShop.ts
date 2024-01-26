import { useQuery } from '@tanstack/react-query';

import { fetchShop } from 'api/shop';

const useShop = (placeId: string) => {
  const { data } = useQuery({
    queryKey: ['shopDetail', placeId],
    queryFn: () => fetchShop(placeId),
  });

  const shopName = data?.name;

  return { shop: data, shopName };
};

export default useShop;
