import { getScraps } from 'api/mypage';
import { useInfiniteQuery } from '@tanstack/react-query';

const useScraps = () => {
  const { data, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: ['scraps'],
    queryFn: ({ pageParam = 0 }) => getScraps(pageParam),
    initialPageParam: 0,
    // eslint-disable-next-line consistent-return
    getNextPageParam: (lastResponse, allResponse) => {
      const currentPage = allResponse.length - 1;
      if (lastResponse.data.totalPages > currentPage) return currentPage + 1;
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
