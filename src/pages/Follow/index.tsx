import { getFollowList, searchUsers } from 'api/follow';
import search from 'assets/svg/search/lens.svg';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { GetFollowListResponse } from 'api/follow/entity';
import style from './index.module.scss';
import FailToSearch from './components/FailToSearch';
import SearchPage from './components/SearchPage';
import FollowList from './components/FollowList';
import { FollowerInfo } from './static/entity';

const useSearchFriend = () => {
  const [keyword, setKeyword] = useState<string>('');
  const { data: user } = useQuery({
    queryKey: ['search', keyword],
    queryFn: ({ queryKey: [, target] }) => searchUsers({ keyword: target }),
    enabled: keyword !== '',
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  return { user, keyword, handleInputChange };
};

const useRecievedFollow = () => {
  const [page, setPage] = useState<number>(0);
  const { data } = useQuery(['received', page], () => getFollowList({ page, pageSize: 10 }));

  return { data, page, setPage };
};

const filterFollowerInfo = (data: GetFollowListResponse): FollowerInfo[] => {
  const filteredData: FollowerInfo[] = data.content.map((item) => ({
    account: item.user.account,
    id: item.user.id,
    key: item.user.id,
    followedType: 'RECEIVED',
    nickname: item.user.nickname,
    userType: item.user.userType,
  }));
  return filteredData;
};

export default function FollowPage() {
  const { keyword, handleInputChange, user } = useSearchFriend();
  const { data: receive } = useRecievedFollow();

  return (
    <div className={style.template}>
      <div className={style.search}>
        <input
          type="text"
          className={style.search__input}
          placeholder="닉네임 또는 아이디로 친구를 찾아보세요!"
          onChange={handleInputChange}
          value={keyword}
        />
        <img className={style.search__image} src={search} alt="search" />
      </div>
      {keyword.length === 0
        && (
          <div className={style.container}>
            <div>
              팔로우 목록이 표시될 위치
            </div>
            {receive && <FollowList title="받은 요청" data={filterFollowerInfo(receive.data)} />}
          </div>
        )}
      {user && (user.data.content.length > 0
        ? <SearchPage data={user.data.content} /> : <FailToSearch />)}
    </div>
  );
}
