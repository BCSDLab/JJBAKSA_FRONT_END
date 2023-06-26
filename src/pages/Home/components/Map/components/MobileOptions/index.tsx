import { ReactComponent as LensIcon } from 'assets/svg/home/lens.svg';
import { ReactComponent as GroupIcon } from 'assets/svg/home/group.svg';
import { ReactComponent as BookMarkIcon } from 'assets/svg/home/bookmark.svg';
import { ReactComponent as VerticalDot } from 'assets/svg/home/verticalDot.svg';
import { Link } from 'react-router-dom';
import cn from 'utils/ts/classNames';
import { useState } from 'react';
import useBooleanState from 'utils/hooks/useBooleanState';
import styles from './MobileOptions.module.scss';

export default function MobileOptions(): JSX.Element {
  const [filter, , ,toggle] = useBooleanState(false);
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
        <button
          type="button"
          className={cn({
            [styles['top-options__filter']]: true,
            [styles['top-options__filter--clicked']]: selected !== '',
          })}
          onClick={toggle}
        >
          <VerticalDot />
        </button>
        {filter && (
        <div className={styles['top-options__list']}>
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
        </div>
        )}
      </div>
    </div>
  );
}
