import { getFollowReview } from 'api/follow';
import { useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';

const useGetFollowerReview = (id: number) => {
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ['review', id],
    ({ pageParam = '' }) => getFollowReview(id, pageParam),
    {
      getNextPageParam: (last) => {
        const len = last.data.content.length;
        if (last.data.empty) return null;
        // cursor: 마지막으로 조회한 상점 id
        return `cursor=${last.data.content[len - 1].shopId}`;
      },
    },
  );
  const flatData = {
    content: data ? data.pages.flatMap((page) => page.data.content) : [],
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop
        > document.body.scrollHeight - 2) {
        if (hasNextPage) fetchNextPage();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchNextPage, hasNextPage]);
  return { data: flatData };
};

export default useGetFollowerReview;
