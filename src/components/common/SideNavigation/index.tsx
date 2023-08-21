import { ReactComponent as LogoIcon } from 'assets/svg/common/logo.svg';
import { ReactComponent as SettingIcon } from 'assets/svg/common/setting.svg';
import { ReactComponent as WriteIcon } from 'assets/svg/common/write.svg';
import { ReactComponent as MyPageIcon } from 'assets/svg/common/my-page.svg';
import { ReactComponent as SearchIcon } from 'assets/svg/search/lens.svg';
import { ReactComponent as StoreFrontIcon } from 'assets/svg/home/storefront.svg';
import { ReactComponent as BookMarkIcon } from 'assets/svg/home/bookmark.svg';
import { ReactComponent as GroupIcon } from 'assets/svg/home/group.svg';
import { ReactComponent as ExpandIcon } from 'assets/svg/common/expand.svg';
import { ReactComponent as FoldIcon } from 'assets/svg/common/fold.svg';
import { useAuth } from 'store/auth';
import cn from 'utils/ts/classNames';
import useBooleanState from 'utils/hooks/useBooleanState';
import { Link, useLocation } from 'react-router-dom';
import { useFilterFriend, useFilterNearby, useFilterScrap } from 'store/filter';
import styles from './SideNavigation.module.scss';

export default function TopNavigation(): JSX.Element {
  const auth = useAuth();
  const location = useLocation();
  const [visible, , , toggle, setValue] = useBooleanState(false);
  const { filterFriendState, setFilterFriend } = useFilterFriend();
  const { filterScrapState, setFilterScrap } = useFilterScrap();
  const { filterNearbyState, setFilterNearby } = useFilterNearby();

  const handleToggle = () => {
    if (location.pathname === '/') {
      setValue(!visible);
    }
  };

  const TABS = [
    {
      name: '',
      icon: <LogoIcon />,
      link: '/',

    },
    {
      name: '검색',
      icon: <SearchIcon />,
      link: '/',

    },
    {
      name: '글쓰기',
      icon: <WriteIcon />,
      link: '/search',
    },
    {
      name: '마이페이지',
      icon: <MyPageIcon />,
      link: auth ? '/profile' : '/login',
    },
    {
      name: '설정',
      icon: <SettingIcon />,
      link: '/setting',
    },
  ];

  return (
    <div>
      <nav className={styles['side-navigation']}>
        <ul className={styles['side-navigation__lists']}>
          {TABS.map((tab) => (
            <li
              key={tab.name}
              className={cn({
                [styles['side-navigation__list']]: true,
                [styles['side-navigation__list--clicked']]: tab.name === '검색' && visible,
              })}
            >
              {tab.name === '검색' ? (
                <button
                  type="button"
                  className={styles['side-navigation__button']}
                  onClick={handleToggle}
                  tabIndex={0}
                >
                  <div>{tab.icon}</div>
                  <div>{tab.name}</div>
                </button>
              ) : (
                <Link to={tab.link} className={styles['side-navigation__link']}>
                  <div>{tab.icon}</div>
                  <div>{tab.name}</div>
                </Link>
              )}
            </li>
          ))}
        </ul>
        <ul className={styles['bottom-navigation']}>
          {auth ? (
            <li className={styles['bottom-navigation__login']}>
              <div>사용자</div>
            </li>
          ) : (
            <li className={styles['bottom-navigation__login']}>
              <Link to="/login" className={styles['bottom-navigation__link']}>로그인</Link>
            </li>
          )}
        </ul>
        <button
          type="button"
          className={cn({
            [styles['side-navigation__arrow']]: true,
            [styles['side-navigation__arrow--expand']]: visible,
            [styles['side-navigation__arrow--invisible']]: location.pathname !== '/',
          })}
          onClick={toggle}
          aria-label="펼치기"
        >
          {visible ? <FoldIcon /> : <ExpandIcon />}
        </button>
      </nav>
      <div
        className={cn({
          [styles['side-pannel']]: true,
          [styles['side-pannel--expand']]: visible,
        })}
      >
        <div className={styles['side-pannel__search']}>
          <div className={styles['side-pannel__search-bar']}>
            <span>
              <input type="text" placeholder="검색어를 입력해주세요." className={styles['side-pannel__search-input']} />
              <SearchIcon className={styles['side-pannel__search-icon']} />
            </span>
          </div>
          <div className={styles['side-pannel__search-buttons']}>
            <button
              type="button"
              className={cn({
                [styles['side-pannel__search-button']]: true,
                [styles['side-pannel__search-button--clicked']]: filterNearbyState === 1,
              })}
              onClick={() => { setFilterNearby(filterNearbyState === 0 ? 1 : 0); }}
            >
              가까운 음식점
              <StoreFrontIcon />
            </button>
            <button
              type="button"
              className={cn({
                [styles['side-pannel__search-button']]: true,
                [styles['side-pannel__search-button--clicked']]: filterScrapState === 1,
              })}
              onClick={() => { setFilterScrap(filterScrapState === 0 ? 1 : 0); }}
            >
              북마크 음식점
              <BookMarkIcon />
            </button>
            <button
              type="button"
              className={cn({
                [styles['side-pannel__search-button']]: true,
                [styles['side-pannel__search-button--clicked']]: filterFriendState === 1,
              })}
              onClick={() => { setFilterFriend(filterFriendState === 0 ? 1 : 0); }}
            >
              친구 음식점
              <GroupIcon />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
