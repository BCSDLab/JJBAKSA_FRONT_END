import { getReviews } from 'api/mypage';
import { useQuery } from '@tanstack/react-query';

const useReviwes = (placeId:string) => {
  const { isLoading, isError, data } = useQuery({ queryKey: ['reviews', placeId], queryFn: () => getReviews(placeId) });
  const reviews = data ? data.data.content : [];
  return { isLoading, isError, reviews };
};

export default useReviwes;
