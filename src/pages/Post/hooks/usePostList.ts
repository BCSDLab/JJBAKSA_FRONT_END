import getPost from 'api/Post';
import { useSuspenseQuery } from '@tanstack/react-query';

const usePostList = (page: number) => {
  const {
    isLoading, isError, data,
  } = useSuspenseQuery({ queryKey: ['Post', page], queryFn: () => getPost(page) });

  return {
    isLoading, isError, data,
  };
};

export default usePostList;
