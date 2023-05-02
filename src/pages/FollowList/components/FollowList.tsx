import { ReactComponent as Arrow } from 'assets/svg/common/arrow.svg';
import cn from 'utils/ts/classNames';
import useBooleanState from 'utils/hooks/useBooleanState';
import { useAuth } from 'store/auth';
import { FollowListInfo } from '../static/entity';
import Follower from './Follower';
import style from './FollowList.module.scss';

// 유저 검색 시 자신의 정보는 안보이도록 자신의 정보를 받아서 비교, 자신과의 followedType은 NONE
export default function FollowList({ title, data, user }: FollowListInfo) {
  const auth = useAuth();
  const [value, , ,toggle] = useBooleanState(true);

  return (
    <div className={style.container}>
      <button onClick={toggle} type="button" className={style.title}>
        {title}
        <Arrow className={cn(
          {
            [style.title__arrow]: true,
            [style['title__arrow--up']]: value,
          },
        )}
        />
      </button>
      {title === '나의 친구'
       && value && data && data.filter((e) => e.followedType === 'FOLLOWED').map((item) => (
         <Follower
           key={item.id}
           nickname={item.nickname}
           account={item.account}
           followedType={item.followedType}
         />
      ))}
      {title === '새 친구'
      && value && data && auth && data.filter((e) => e.followedType !== 'FOLLOWED').filter((e) => e.account !== auth.account).map((item) => (
        <Follower
          key={item.id}
          nickname={item.nickname}
          account={item.account}
          followedType={item.followedType}
          // 팔로우가 안되어 있거나 내가 팔로우 요청 중인 친구, 나에게 팔로우 요청한 친구를 보여줌
        />
      ))}
      {title === '받은 요청'
      && value && user && user.map((item) => (
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
