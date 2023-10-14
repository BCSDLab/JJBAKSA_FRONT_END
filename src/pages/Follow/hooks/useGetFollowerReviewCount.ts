import { getFollowerReviewCount } from 'api/follow';
import { useQuery } from 'react-query';

const useGetFollowerReviewCount = (followId: number) => {
  const { data } = useQuery(['reviewCount', followId], () => getFollowerReviewCount({ followId }));
  return data;
};

export default useGetFollowerReviewCount;
