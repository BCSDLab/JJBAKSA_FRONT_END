import { useEffect } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { getPost } from 'api/Post';
import { GetPostResponse } from 'api/Post/entity';

interface PostListParams {
  id?: string,
  createAt?: string,
  size: number
}

const usePostList = (param: PostListParams) => {
  const {
    isLoading, isError, data, fetchNextPage, hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['Post', param.id],
    queryFn: ({ pageParam }) => getPost(pageParam),
    initialPageParam: '',
    getNextPageParam: (last) => {
      const len = last.content.length;
      if (last.empty) return null;
      // cursor: 마지막으로 조회한 상점 id
      return `idCursor=${last.content[len - 1].id}&dateCursor=${last.content[len - 1].createdAt}`;
    },
  });

  const flatData: GetPostResponse = {
    content: data ? data.pages.flatMap((page) => page.content) : [],
    empty: !data || data.pages.every((page) => page.empty),
    last: !data || data.pages.every((page) => page.last),
    number: data ? data.pages.reduce((acc, page) => acc + page.number, 0) : 0,
  };

  useEffect(() => {
    const handleScroll = () => {
      if (hasNextPage) fetchNextPage();
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchNextPage, hasNextPage]);

  return {
    isLoading, isError, flatData, fetchNextPage,
  };
};

export default usePostList;
