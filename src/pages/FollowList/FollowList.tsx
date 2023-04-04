import { useQuery } from 'react-query';
import { getMe } from 'api/user';
import { FollowListInfo } from './entity';
import Follower from './Follower';
import style from './FollowList.module.scss';

// 유저 검색 시 자신의 정보는 안보이도록 자신의 정보를 받아서 비교, 자신과의 followedType은 NONE
const useGetMe = () => {
  const { data } = useQuery('me', getMe);

  return { data };
};

export default function FollowList({ title, data, user }: FollowListInfo) {
  const me = useGetMe();

  return (
    <div>
      <div className={style.title}>{title}</div>
      {title === '나의 친구'
      && data && data.filter((e) => e.followedType === 'FOLLOWED').map((item) => (
        <Follower
          key={item.id}
          nickname={item.nickname}
          account={item.account}
          followedType={item.followedType}
          // 팔로우된 친구만 보여줌
        />
      ))}
      {title === '새 친구'
      && data && data.filter((e) => e.followedType !== 'FOLLOWED').filter((e) => e.account !== me.data?.data.account).map((item) => (
        <Follower
          key={item.id}
          nickname={item.nickname}
          account={item.account}
          followedType={item.followedType}
          // 팔로우가 안되어 있거나 내가 팔로우 요청 중인 친구, 나에게 팔로우 요청한 친구를 보여줌
        />
      ))}
      {title === '받은 요청'
      && user && user.map((item) => (
        <Follower
          key={item.user.id}
          nickname={item.user.nickname}
          account={item.user.account}
          id={item.id}
          followedType="RECEIVED"
          // RECEIVED는 임의로 준 값, 받은 요청은 checkReceiveFollow를 통해서만 알 수 있음
        />
      ))}
    </div>
  );
}
