import { getFollowerReviewCount } from 'api/follow';
import { useQuery } from '@tanstack/react-query';

const useGetFollowerReviewCount = (followId: number) => {
  const { data } = useQuery({ queryKey: ['reviewCount'], queryFn: () => getFollowerReviewCount({ followId }) });

  return data;
};

export default useGetFollowerReviewCount;
