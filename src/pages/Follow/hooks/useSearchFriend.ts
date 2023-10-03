import { searchUsers } from 'api/follow';
import { SearchUsersResponse } from 'api/follow/entity';
import { useState, useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';

// useInfinitieQuery로 무한 스크롤 구현, pageParam의 기본값은 undefined
const useSearchFriend = () => {
  const [keyword, setKeyword] = useState<string>('');
  const { data: user, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['search', keyword],
    queryFn: ({ queryKey: [, target], pageParam = '' }) => searchUsers(target, pageParam),
    enabled: keyword !== '',
    getNextPageParam: (lastPage) => {
      const len = lastPage.data.content.length;
      if (lastPage.data.empty || lastPage.data.last) return null;
      // cursor: 마지막으로 조회한 유저의 id
      return `cursor=${lastPage.data.content[len - 1].id}`;
    },
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  const flatData: SearchUsersResponse = {
    content: user ? user.pages.flatMap((page) => page.data.content) : [],
    empty: !user || user.pages.every((page) => page.data.empty),
    last: !user || user.pages.every((page) => page.data.last),
    number: user ? user.pages.reduce((acc, page) => acc + page.data.number, 0) : 0,
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
  return {
    user: flatData, keyword, handleInputChange,
  };
};

export default useSearchFriend;
