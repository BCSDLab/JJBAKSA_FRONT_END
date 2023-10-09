import { ReactComponent as LensIcon } from 'assets/svg/home/lens.svg';
import { ReactComponent as StoreFrontIcon } from 'assets/svg/home/storefront.svg';
import { ReactComponent as BookMarkIcon } from 'assets/svg/home/bookmark.svg';
import { ReactComponent as GroupIcon } from 'assets/svg/home/group.svg';
import { ReactComponent as VerticalDot } from 'assets/svg/home/verticaldot.svg';
import { Link } from 'react-router-dom';
import useBooleanState from 'utils/hooks/useBooleanState';
import { useFilterFriend, useFilterNearby, useFilterScrap } from 'store/filter';
import cn from 'utils/ts/classNames';
import styles from './MobileOptions.module.scss';

export default function MobileOptions(): JSX.Element {
  const [visible, , , toggle] = useBooleanState(true);
  const { filterFriendState, setFilterFriend } = useFilterFriend();
  const { filterScrapState, setFilterScrap } = useFilterScrap();
  const { filterNearbyState, setFilterNearby } = useFilterNearby();

  return (
    <div className={styles.nav}>
      <Link to="/search" className={styles.nav__search}>
        검색어를 입력해주세요.
        <LensIcon />
      </Link>
      <button
        type="button"
        className={cn({
          [styles.nav__icon]: true,
          [styles['nav__icon--changed']]: filterNearbyState === 1 || filterScrapState === 1 || filterFriendState === 1,
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
              [styles['filter__text--clicked']]: filterNearbyState === 1,
            })}
            onClick={() => { setFilterNearby(filterNearbyState === 0 ? 1 : 0); }}
          >
            <StoreFrontIcon />
            가까운 음식점
          </button>
          <button
            type="button"
            className={cn({
              [styles.filter__text]: true,
              [styles['filter__text--clicked']]: filterScrapState === 1,
            })}
            onClick={() => { setFilterScrap(filterScrapState === 0 ? 1 : 0); }}
          >
            <BookMarkIcon />
            북마크 음식점
          </button>
          <button
            type="button"
            className={cn({
              [styles.filter__text]: true,
              [styles['filter__text--clicked']]: filterFriendState === 1,
            })}
            onClick={() => { setFilterFriend(filterFriendState === 0 ? 1 : 0); }}
          >
            <GroupIcon />
            친구 음식점
          </button>
        </div>
      )}
    </div>
  );
}
