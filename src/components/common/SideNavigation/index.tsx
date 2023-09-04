import { ReactComponent as SearchIcon } from 'assets/svg/search/lens.svg';
import { ReactComponent as StoreFrontIcon } from 'assets/svg/home/storefront.svg';
import { ReactComponent as BookMarkIcon } from 'assets/svg/home/bookmark.svg';
import { ReactComponent as GroupIcon } from 'assets/svg/home/group.svg';
import { useAuth, useClearAuth } from 'store/auth';
import cn from 'utils/ts/classNames';
import useBooleanState from 'utils/hooks/useBooleanState';
import { Link, useLocation } from 'react-router-dom';
import { useFilterFriend, useFilterNearby, useFilterScrap } from 'store/filter';
import Pin from 'pages/Pin';
import { useEffect } from 'react';
import styles from './SideNavigation.module.scss';
import SpriteSvg from '../SpriteSvg';

interface Props {
  selected:naver.maps.Marker | undefined;
  placeId:string;
}
export default function TopNavigation({ selected, placeId }:Props): JSX.Element {
  const auth = useAuth();
  const clearAuth = useClearAuth();
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
      icon: <SpriteSvg id="logo" height="45" width="43" />,
      link: '/',

    },
    {
      name: '검색',
      icon: <SearchIcon />,
      link: '/',

    },
    {
      name: '글쓰기',
      icon: <SpriteSvg id="write" height="24" width="24" />,
      link: '/search',
    },
    {
      name: '마이페이지',
      icon: <SpriteSvg id="my-page" height="24" width="18" />,
      link: auth ? '/profile' : '/login',
    },
    {
      name: '설정',
      icon: <SpriteSvg id="setting" height="24" width="24" />,
      link: '/setting',
    },
  ];

  useEffect(() => {
    if (selected) setValue(true);
  }, [selected, setValue]);
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
            <li>
              <div>
                {/* 프로필 사진 추가 */}
                <Link to="/" onClick={clearAuth}>
                  <div className={styles['bottom-navigation__logout']}>로그아웃</div>
                </Link>
              </div>
            </li>
          ) : (
            <li>
              <Link to="/login" className={styles['bottom-navigation__login']}>로그인</Link>
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
          {visible ? <SpriteSvg id="fold" /> : <SpriteSvg id="expand" />}
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
        {selected && <Pin placeId={placeId} />}
      </div>

    </div>
  );
}
