import { ReactComponent as MenuIcon } from 'assets/svg/home/mobile-menu.svg';
import { ReactComponent as MapIcon } from 'assets/svg/home/mobile-map.svg';
import { ReactComponent as FriendIcon } from 'assets/svg/home/mobile-friends.svg';
import { ReactComponent as BookMarkIcon } from 'assets/svg/home/mobile-bookmark.svg';
import useBoolean from 'utils/hooks/useBoolean';
import cn from 'utils/ts/classNames';
import styles from './OptionButtons.module.scss';

export default function FilterMenu(): JSX.Element {
  const isShow = useBoolean(false);
  return (
    <div
      className={cn({
        [styles['filter__menu-list']]: true,
        [styles['filter__menu-list--show']]: isShow.value,
      })}
    >
      <div>
        <button
          type="button"
          className={cn({
            [styles.filter__button]: true,
            [styles['filter__button--list']]: true,
          })}
          onClick={isShow.toggle}
        >
          <MenuIcon />
        </button>
      </div>
      <div className={styles['slide-filter-list']}>
        <ul>
          <li>
            <button
              type="button"
              className={cn({
                [styles['slide-filter-list__button']]: true,
              })}
            >
              가까운 음식점 찾기
            </button>
            <span><MapIcon /></span>
          </li>
          <li>
            <button
              type="button"
              className={cn({
                [styles['slide-filter-list__button']]: true,
              })}
            >
              친구 음식점 찾기
            </button>
            <span><FriendIcon /></span>
          </li>
          <li>
            <button
              type="button"
              className={cn({
                [styles['slide-filter-list__button']]: true,
              })}
            >
              북마크 음식점 찾기
            </button>
            <span><BookMarkIcon /></span>
          </li>
        </ul>
      </div>
    </div>
  );
}
