import { useEffect } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { followList } from 'api/follow';
import { GetFollowListResponse } from 'api/follow/entity';

// 친구 목록 가져오기
const useGetFollowList = () => {
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['follower'],
    queryFn: ({ pageParam = '' }) => followList(pageParam),
    initialPageParam: 'cursor=0',
    getNextPageParam: (last) => {
      const len = last.data.content.length;
      if (last.data.empty || last.data.last) return null;
      return `cursor=${last.data.content[len - 1].id}`;
    },
  });
  const flatData: GetFollowListResponse = {
    content: data ? data.pages.flatMap((page) => page.data.content) : [],
    empty: !data || data.pages.every((page) => page.data.empty),
    last: !data || data.pages.every((page) => page.data.last),
    number: data ? data.pages.reduce((acc, page) => acc + page.data.number, 0) : 0,
  };
  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight; // 뷰포트의 높이
      const scrollPosition = window.scrollY; // 현재 스크롤 위치
      const middleViewport = viewportHeight / 2; // 뷰포트의 중간 지점

      if (scrollPosition > middleViewport) {
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

export default useGetFollowList;
