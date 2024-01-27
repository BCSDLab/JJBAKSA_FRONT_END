import { useEffect } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { SentOrReceivedFollowResponse } from 'api/follow/entity';

const useSentOrReceivedFollow = (
  key: string,
  queryFn: (param: number) => Promise<AxiosResponse<SentOrReceivedFollowResponse, any>>,
) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [key],
    queryFn: ({ pageParam = 0 }) => queryFn(pageParam),
    initialPageParam: 0,
    // getNextPageParam은 다음 api를 요청할 때 사용될 pageParam값을 정할 수 있다.
    getNextPageParam: (lastPage) => {
      if (lastPage.data.empty || lastPage.data.last) return null;
      return lastPage.data.number + 1;
    },
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
  // 이차원 배열을 일차원 배열로 변경 및 반환 타입 일치
  const flatData: SentOrReceivedFollowResponse = {
    content: data ? data.pages.flatMap((page) => page.data.content) : [],
    empty: !data || data.pages.every((page) => page.data.empty),
    last: !data || data.pages.every((page) => page.data.last),
    number: data ? data.pages.reduce((acc, page) => acc + page.data.number, 0) : 0,
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop
        > document.body.scrollHeight - 1) {
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

export default useSentOrReceivedFollow;
