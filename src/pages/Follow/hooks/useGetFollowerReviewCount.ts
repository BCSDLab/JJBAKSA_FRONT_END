import { useQuery } from '@tanstack/react-query';

import { getFollowerReviewCount } from 'api/follow';

const useGetFollowerReviewCount = (id: number) => {
  const { data } = useQuery({ queryKey: ['reviewCount', id], queryFn: () => getFollowerReviewCount({ id }) });
  return data;
};

export default useGetFollowerReviewCount;
