import { ReactComponent as Arrow } from 'assets/svg/common/arrow.svg';
import { ReactComponent as Ellipse } from 'assets/svg/follow/Ellipse.svg';
import Follower from 'pages/Follow/components/Follower';
import Recent from 'pages/Follow/components/Recent';
import { FollowerInfo } from 'pages/Follow/static/entity';
import useBooleanState from 'utils/hooks/useBooleanState';
import cn from 'utils/ts/classNames';

import styles from './FollowList.module.scss';

export interface Props {
  title: string;
  data: FollowerInfo[];
  sent?: FollowerInfo[];
}

// 유저 검색 시 자신의 정보는 안보이도록 자신의 정보를 받아서 비교, 자신과의 followedType은 NONE
export default function FollowList({
  title, data, sent,
}: Props) {
  const [isShow, , , toggle] = useBooleanState(true);
  return (
    <div className={styles.container}>
      <button onClick={toggle} type="button" className={styles.title}>
        <span>
          {title}
          {' '}
          {title === '친구 신청' && data.length !== 0 ? <Ellipse /> : null}
        </span>
        <Arrow className={cn(
          {
            [styles.title__arrow]: true,
            [styles['title__arrow--up']]: isShow,
          },
        )}
        />
      </button>
      <div className={styles.recent}>
        {isShow && title === '최근 접속한 친구' && data.map((item) => (
          <Recent
            key={item.id}
            nickname={item.nickname}
            profileImage={item.profileImage}
          />
        ))}
      </div>
      {isShow && title !== '최근 접속한 친구' && data.map((item) => (
        <Follower
          id={item.id}
          key={item.nickname}
          nickname={item.nickname}
          account={item.account}
          followedType={item.followedType}
          requestId={item.requestId}
          userCountResponse={item.userCountResponse}
          profileImage={item.profileImage}
        />
      ))}
      {isShow && sent && sent.map((item) => (
        <Follower
          id={item.id}
          key={item.id}
          nickname={item.nickname}
          account={item.account}
          followedType={item.followedType}
          requestId={item.requestId}
          profileImage={item.profileImage}
        />
      ))}
    </div>
  );
}
