import { ReactComponent as LensIcon } from 'assets/svg/home/lens.svg';
import { ReactComponent as StoreFrontIcon } from 'assets/svg/home/storefront.svg';
import { ReactComponent as GroupIcon } from 'assets/svg/home/group.svg';
import { ReactComponent as BookMarkIcon } from 'assets/svg/home/bookmark.svg';
import { Link } from 'react-router-dom';
import styles from '../Map.module.scss';

export default function MobileOptions(): JSX.Element {
  return (
    <div className={styles.options}>
      <div className={styles['top-options']}>
        <ul>
          <li>
            <Link to="/search" className={styles['top-options__search']}>
              검색어를 입력해주세요.
              <LensIcon />
            </Link>
          </li>
        </ul>
        <ul className={styles['top-options__list']}>
          <li className={styles['top-options__text']}>
            <StoreFrontIcon />
            가까운 음식점
          </li>
          <li className={styles['top-options__text']}>
            <GroupIcon />
            친구 음식점
          </li>
          <li className={styles['top-options__text']}>
            <BookMarkIcon />
            북마크 음식점
          </li>
        </ul>
      </div>
    </div>
  );
}
