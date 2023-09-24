import { getFollowerReviewCount } from 'api/follow';
import { useQuery } from 'react-query';

const useGetFollowerReviewCount = (followId: number) => {
  const { data } = useQuery('reviewCount', () => getFollowerReviewCount({ followId }));
  return data;
};

export default useGetFollowerReviewCount;
