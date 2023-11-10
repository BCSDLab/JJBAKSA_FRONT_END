import getPost from 'api/Post';
import { useQuery } from '@tanstack/react-query';

const usePostList = (page: number) => {
  const {
    isLoading, isError, data,
  } = useQuery({ queryKey: ['Post', page], queryFn: () => getPost(page) });

  return {
    isLoading, isError, data,
  };
};

export default usePostList;
