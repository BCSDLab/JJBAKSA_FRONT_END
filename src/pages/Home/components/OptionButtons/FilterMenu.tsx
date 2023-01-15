import { ReactComponent as MenuIcon } from 'assets/svg/home/menu.svg';
import { ReactComponent as MapIcon } from 'assets/svg/home/mobile-map.svg';
import { ReactComponent as FriendIcon } from 'assets/svg/home/mobile-friends.svg';
import { ReactComponent as BookMarkIcon } from 'assets/svg/home/mobile-bookmark.svg';
import { ReactComponent as PencilIcon } from 'assets/svg/home/pencil.svg';
import useBooleanState from 'utils/hooks/useBooleanState';
import cn from 'utils/ts/classNames';
import { Link } from 'react-router-dom';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import styles from './OptionButtons.module.scss';

export default function FilterMenu(): JSX.Element {
  const [visible,,, toggle] = useBooleanState(false);
  const { isMobile } = useMediaQuery();
  return (
    <div
      className={cn({
        [styles['filter__menu-list']]: true,
        [styles['filter__menu-list--show']]: visible,
      })}
    >
      <div>
        <ul className={styles.filter}>
          <li>
            <button
              type="button"
              className={styles.filter__button}
              onClick={toggle}
            >
              <MenuIcon />
              <span>필터</span>
            </button>
          </li>
          {!isMobile && (
            <li>
              <Link to="/post" className={styles.filter__button}>
                <PencilIcon />
                <span>글쓰기</span>
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className={styles['slide-filter-list']}>
        <ul>
          <li>
            <button
              type="button"
              className={styles['slide-filter-list__button']}
            >
              가까운 음식점 찾기
            </button>
            <span className={styles['slide-filter-list__icon']}><MapIcon /></span>
          </li>
          <li>
            <button
              type="button"
              className={styles['slide-filter-list__button']}
            >
              친구 음식점 찾기
            </button>
            <span className={styles['slide-filter-list__icon']}><FriendIcon /></span>
          </li>
          <li>
            <button
              type="button"
              className={styles['slide-filter-list__button']}
            >
              북마크 음식점 찾기
            </button>
            <span className={styles['slide-filter-list__icon']}><BookMarkIcon /></span>
          </li>
        </ul>
      </div>
    </div>
  );
}
