import { useQuery } from '@tanstack/react-query';

import { getScrapId } from 'api/scrap';

const useScrapId = (placeId: string) => {
  const {
    isLoading, isError, data, refetch,
  } = useQuery({
    queryKey: ['scrapId'],
    queryFn: () => getScrapId(placeId),
  });

  return {
    isLoading, isError, scrapId: data?.data, refetch,
  };
};

export default useScrapId;
