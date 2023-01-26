import { ReactComponent as LensIcon } from 'assets/svg/home/lens.svg';
import { ReactComponent as StoreFrontIcon } from 'assets/svg/home/storefront.svg';
import { ReactComponent as GroupIcon } from 'assets/svg/home/group.svg';
import { ReactComponent as BookMarkIcon } from 'assets/svg/home/bookmark.svg';
import { Link } from 'react-router-dom';
import cn from 'utils/ts/classNames';
import { useState } from 'react';
import styles from './MobileOptions.module.scss';

export default function MobileOptions(): JSX.Element {
  const [selected, setSelected] = useState('');
  const handleClick = (type: string) => {
    setSelected(type);
    // 각각의 함수 추가 필요
  };
  return (
    <div className={styles.options}>
      <div className={styles['top-options']}>
        <div>
          <Link to="/search" className={styles['top-options__search']}>
            검색어를 입력해주세요.
            <LensIcon />
          </Link>
        </div>
        <span className={styles['top-options__list']}>
          <button
            type="button"
            className={cn({
              [styles['top-options__text']]: true,
              [styles['top-options__text--clicked']]: selected === 'nearby',
            })}
            onClick={() => handleClick('nearby')}
          >
            <StoreFrontIcon />
            가까운 음식점
          </button>
          <button
            type="button"
            className={cn({
              [styles['top-options__text']]: true,
              [styles['top-options__text--clicked']]: selected === 'friend',
            })}
            onClick={() => handleClick('friend')}
          >
            <GroupIcon />
            친구 음식점
          </button>
          <button
            type="button"
            className={cn({
              [styles['top-options__text']]: true,
              [styles['top-options__text--clicked']]: selected === 'bookmark',
            })}
            onClick={() => handleClick('bookmark')}
          >
            <BookMarkIcon />
            북마크 음식점
          </button>
        </span>
      </div>
    </div>
  );
}
