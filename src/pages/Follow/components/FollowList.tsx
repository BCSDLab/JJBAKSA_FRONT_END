import { ReactComponent as Arrow } from 'assets/svg/common/arrow.svg';
import cn from 'utils/ts/classNames';
import useBooleanState from 'utils/hooks/useBooleanState';
import Follower from './Follower';
import style from './FollowList.module.scss';
import { FollowerInfo } from '../static/entity';

export interface Props {
  title: string;
  data: FollowerInfo[];
}

// 유저 검색 시 자신의 정보는 안보이도록 자신의 정보를 받아서 비교, 자신과의 followedType은 NONE
export default function FollowList({ title, data }: Props) {
  const [isShow, , ,toggle] = useBooleanState(true);

  return (
    <div className={style.container}>
      <button onClick={toggle} type="button" className={style.title}>
        {title}
        <Arrow className={cn(
          {
            [style.title__arrow]: true,
            [style['title__arrow--up']]: isShow,
          },
        )}
        />
      </button>
      {isShow && data.map((item) => (
        <Follower
          id={item.id}
          key={item.id}
          nickname={item.nickname}
          account={item.account}
          followedType={item.followedType}
        />
      ))}
    </div>
  );
}
