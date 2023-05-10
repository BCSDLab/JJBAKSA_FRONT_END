import getPost from 'api/Post';
import { useQuery } from 'react-query';

const usePostList = (page: number) => {
  const {
    isLoading, isError, data,
  } = useQuery(['Post', page], () => getPost(page));

  return {
    isLoading, isError, data,
  };
};

export default usePostList;
