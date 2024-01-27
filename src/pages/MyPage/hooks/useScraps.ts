import { useInfiniteQuery } from '@tanstack/react-query';

import { getScraps } from 'api/mypage';

const useScraps = () => {
  const { data, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: ['scraps'],
    queryFn: ({ pageParam = '' }) => getScraps(pageParam),
    initialPageParam: '',
    // eslint-disable-next-line consistent-return
    getNextPageParam: (last) => {
      const len = last.data.content.length;
      if (last.data.empty || last.data.last) return null;
      return `cursor=${last.data.content[len - 1].placeId}`;
    },
    select: (response) => ({
      pages: response.pages.flatMap((page) => [page.data]),
      pageParams: response.pageParams,
    }),
  });
  const scraps = data?.pages.flatMap((page) => page.content);
  const total = data?.pages[0].totalElements;
  return {
    scraps, isLoading, fetchNextPage, data, total,
  };
};

export default useScraps;
