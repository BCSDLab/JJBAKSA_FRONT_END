import { FollowListInfo } from './entity';
import Follower from './Follower';
import style from './FollowList.module.scss';

export default function FollowList({ title, data, user }: FollowListInfo) {
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
        />
      ))}
      {title === '새 친구'
      && data && data.filter((e) => e.followedType !== 'FOLLOWED').map((item) => (
        <Follower
          key={item.id}
          nickname={item.nickname}
          account={item.account}
          followedType={item.followedType}
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
        />
      ))}
    </div>
  );
}
