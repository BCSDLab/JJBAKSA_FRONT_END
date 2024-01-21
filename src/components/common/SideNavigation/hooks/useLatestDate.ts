import { useQuery } from '@tanstack/react-query';

import { fetchMyLatestDate } from 'api/review';

const useLatestDate = (placeId: string) => {
  const { data } = useQuery({
    queryKey: ['latestMyDate', placeId],
    queryFn: () => fetchMyLatestDate(placeId),
  });

  if (data) return { latestDate: data?.data };
  return { latestDate: null };
};

export default useLatestDate;
