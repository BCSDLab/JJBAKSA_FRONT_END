import {
  checkSendedFollow, followList, checkReceivedFollow, searchUsers, recentlyActiveFollow,
} from 'api/follow';
import search from 'assets/svg/search/lens.svg';
import { useState, useEffect } from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';
import { GetFollowListResponse, SearchUsersResponse, SendedOrReceivedFollowResponse } from 'api/follow/entity';
import { AxiosResponse } from 'axios';
import PreviousButton from 'components/PreviousButton/PreviousButton';
import cn from 'utils/ts/classNames';
import style from './index.module.scss';
import FailToSearch from './components/FailToSearch';
import SearchPage from './components/SearchPage';
import FollowList from './components/FollowList';
import { FollowerInfo } from './static/entity';
import EmptyFriend from './components/EmptyFriend';

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

// useInfinitieQuery로 무한 스크롤 구현, pageParam의 기본값은 undefined
const useSendedOrReceivedFollow = (
  key: string,
  queryFn: (param: number) => Promise<AxiosResponse<SendedOrReceivedFollowResponse, any>>,
) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(key, ({ pageParam = 0 }) => queryFn(pageParam), {
    // getNextPageParam은 다음 api를 요청할 때 사용될 pageParam값을 정할 수 있다.
    getNextPageParam: (lastPage) => {
      if (lastPage.data.empty || lastPage.data.last) return null;
      return lastPage.data.number + 1;
    },
  });
  // 이차원 배열을 일차원 배열로 변경 및 반환 타입 일치
  const flatData: SendedOrReceivedFollowResponse = {
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

// 친구 목록 가져오기
const useGetFollowList = () => {
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    'follower',
    ({ pageParam = '' }) => followList(pageParam),
    {
      getNextPageParam: (last) => {
        const len = last.data.content.length;
        if (last.data.empty || last.data.last) return null;
        return `cursor=${last.data.content[len - 1].id}`;
      },
    },
  );
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

// user : 팔로우 요청을 받은 사람
// follower : 팔로우를 요청한 사람
// requestId : 팔로우 수락 혹은 거절을 할 때 사용됨, 유저의 id가 아닌 받은 요청이나 보낸 요청의 id값
const filterSendOrReceiveInfo = (
  data: SendedOrReceivedFollowResponse,
  isReceive: boolean,
): FollowerInfo[] => {
  const filteredData: FollowerInfo[] = data.content.map((item) => ({
    account: isReceive ? item.user.account : item.follower.account,
    id: isReceive ? item.user.id : item.follower.id,
    key: isReceive ? item.user.id : item.follower.id,
    followedType: isReceive ? 'REQUEST_RECEIVE' : 'REQUEST_SENT',
    nickname: isReceive ? item.user.nickname : item.follower.nickname,
    userType: isReceive ? item.user.userType : item.follower.userType,
    requestId: item.id,
  }));
  return filteredData;
};

const filterFollowInfo = (data: GetFollowListResponse): FollowerInfo[] => {
  const filteredData: FollowerInfo[] = data.content.map((item) => ({
    account: item.account,
    email: item.email,
    id: item.id,
    nickname: item.nickname,
    userType: item.userType,
    followedType: 'FOLLOWED',
  }));
  return filteredData;
};

// 최대 15명만 보임, 접속한지 24시가 지나면 사라짐
const useGetRecentlyActiveFollower = () => {
  const { data, isLoading } = useQuery('recent', () => recentlyActiveFollow());

  return { data, isLoading };
};

export default function FollowPage() {
  const { keyword, handleInputChange, user } = useSearchFriend();
  const { data: receive } = useSendedOrReceivedFollow('received', checkReceivedFollow);
  const { data: sended } = useSendedOrReceivedFollow('sended', checkSendedFollow);
  const { data: follower } = useGetFollowList();
  const { data: recent } = useGetRecentlyActiveFollower();
  console.log(follower);

  return (
    <div className={style.template}>
      <div className={style.top}>
        <div className={style.top__prev}>
          <PreviousButton />
          <p>친구 목록</p>
        </div>
        <div className={style.top__search}>
          <input
            type="text"
            className={cn({ [style['top__search--input']]: true })}
            placeholder="검색어를 입력해주세요."
            onChange={handleInputChange}
            value={keyword}
          />
          <img className={cn({ [style['top__search--img']]: true })} src={search} alt="search" />
        </div>
      </div>
      {keyword.length === 0
        && (
          follower?.content.length === 0
            && sended?.content.length === 0
            && receive?.content.length === 0 ? <EmptyFriend />
            : (
              <div className={style.container}>
                {recent && <FollowList title="최근 접속한 친구" data={filterFollowInfo(recent.data)} />}
                {follower && <FollowList title="모든 친구" data={filterFollowInfo(follower)} />}
                {receive && sended && <FollowList title="친구 신청" data={filterSendOrReceiveInfo(receive, true)} sended={filterSendOrReceiveInfo(sended, false)} />}
              </div>
            )
        )}
      {user && keyword.length > 0 && (user.content.length > 0
        ? <SearchPage data={user.content} /> : <FailToSearch />)}
    </div>
  );
}
