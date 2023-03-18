import { searchUsers } from 'api/user';
import search from 'assets/svg/search/lens.svg';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { checkReceivedFollow, checkSendedFollow } from 'api/follow';
import Follower from './Follower';
import style from './index.module.scss';
import { Item } from './entity';
import FailToSearch from './FailToSearch';

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

const useCheckReceicedFollow = () => {
  const { data: received } = useQuery({
    queryKey: 'received',
    queryFn: () => checkReceivedFollow({ page: 10, pageSize: 1 }),
  });
  const { data: sended } = useQuery({
    queryKey: 'sended',
    queryFn: () => checkSendedFollow({ page: 10, pageSize: 1 }),
  });
  return { received, sended };
};

export default function FollowList() {
  const { keyword, handleInputChange, user } = useSearchFriend();
  const { received } = useCheckReceicedFollow();

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
          <div>
            <div>
              팔로우 목록이 표시될 위치
            </div>
            <div>
              받은 요청
            </div>
            {received && received.data.content.map((item: Item) => (
              <Follower
                key={item.id}
                account={item.account}
                nickname={item.nickname}
              />
            ))}
          </div>
        )}
      {user && (user.data.content.length > 0 ? user.data.content.map((item: Item) => (
        <Follower
          key={item.id}
          account={item.account}
          nickname={item.nickname}
        />
      )) : <FailToSearch />)}
    </div>
  );
}
