import { Link } from 'react-router-dom';

import { ReactComponent as BookMarkIcon } from 'assets/svg/home/bookmark.svg';
import { ReactComponent as GroupIcon } from 'assets/svg/home/group.svg';
import { ReactComponent as LensIcon } from 'assets/svg/home/lens.svg';
import { ReactComponent as NearbyIcon } from 'assets/svg/home/nearby.svg';
import { ReactComponent as VerticalDot } from 'assets/svg/home/verticalDot.svg';
import { useFilterFriend, useFilterNearby, useFilterScrap } from 'store/filter';
import useBooleanState from 'utils/hooks/useBooleanState';
import cn from 'utils/ts/classNames';

import styles from './MobileOptions.module.scss';

export default function MobileOptions(): JSX.Element {
  const [visible, , , toggle] = useBooleanState(true);
  const { filterFriendState, setFilterFriend } = useFilterFriend();
  const { filterScrapState, setFilterScrap } = useFilterScrap();
  const { filterNearbyState, setFilterNearby } = useFilterNearby();

  return (
    <div className={styles.nav}>
      <Link to="/shop" className={styles.nav__search}>
        검색어를 입력해주세요.
        <LensIcon />
      </Link>
      <button
        type="button"
        className={cn({
          [styles.nav__icon]: true,
          [styles['nav__icon--changed']]: filterNearbyState || filterScrapState || filterFriendState,
        })}
        onClick={toggle}
        aria-label="펼치기"
      >
        <VerticalDot />
      </button>
      {visible && (
        <div className={styles.filter}>
          <button
            type="button"
            className={cn({
              [styles.filter__text]: true,
              [styles['filter__text--clicked']]: filterNearbyState === true,
            })}
            onClick={() => { setFilterNearby(!filterNearbyState); }}
          >
            <NearbyIcon />
            가까운 음식점
          </button>
          <button
            type="button"
            className={cn({
              [styles.filter__text]: true,
              [styles['filter__text--clicked']]: filterScrapState === true,
            })}
            onClick={() => { setFilterScrap(!filterScrapState); }}
          >
            <BookMarkIcon />
            북마크 음식점
          </button>
          <button
            type="button"
            className={cn({
              [styles.filter__text]: true,
              [styles['filter__text--clicked']]: filterFriendState === true,
            })}
            onClick={() => { setFilterFriend(!filterFriendState); }}
          >
            <GroupIcon />
            친구 음식점
          </button>
        </div>
      )}
    </div>
  );
}
