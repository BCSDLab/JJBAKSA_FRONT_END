import { getReviews } from 'api/mypage';
import { useQuery } from 'react-query';

const useReviwes = (placeId:string) => {
  const { isLoading, isError, data } = useQuery(['reviews', placeId], () => getReviews(placeId));
  const reviews = data ? data.data.content : [];
  return { isLoading, isError, reviews };
};

export default useReviwes;
