import { ReactComponent as Empty } from 'assets/svg/follow/no-friend.svg';
import styles from './FailToSearch.module.scss';

export default function EmptyFriend() {
  return (
    <div className={styles.template}>
      <div className={styles.content}>
        <p>팔로우한 친구가 없어요.</p>
        <p>새로운 친구를 찾아보세요!</p>
        <Empty className={styles.content__svg} />
      </div>
    </div>
  );
}
