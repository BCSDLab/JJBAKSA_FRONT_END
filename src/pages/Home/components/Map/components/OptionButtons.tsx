import { ReactComponent as MenuIcon } from 'assets/svg/home/menu.svg';
import { ReactComponent as PencilIcon } from 'assets/svg/home/pencil.svg';
import { Link } from 'react-router-dom';
import cn from 'utils/ts/classNames';
import useBooleanState from 'utils/hooks/useBooleanState';
import styles from '../Map.module.scss';

export default function OptionButtons() {
  const [visible,,, toggle] = useBooleanState(false);
  return (
    <div className={styles.button}>
      <div
        className={cn({
          [styles['filter__menu-list']]: true,
          [styles['filter__menu-list--show']]: visible,
        })}
      >
        <div className={styles.filter}>
          <button
            type="button"
            className={cn({
              [styles.filter__button]: true,
              [styles['filter__button--clicked']]: visible,
            })}
            onClick={toggle}
          >
            <MenuIcon />
            <span>필터</span>
          </button>
          <Link to="/post" className={styles.filter__button}>
            <PencilIcon />
            <span>글쓰기</span>
          </Link>
        </div>
        <div className={styles['slide-filter-list']}>
          <button
            type="button"
            className={styles['slide-filter-list__button']}
          >
            가까운 음식점
          </button>
          <button
            type="button"
            className={styles['slide-filter-list__button']}
          >
            친구 음식점
          </button>
          <button
            type="button"
            className={styles['slide-filter-list__button']}
          >
            북마크 음식점
          </button>
        </div>
      </div>
    </div>
  );
}
