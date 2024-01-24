import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import defaultImage from 'assets/images/follow/default-image.png';
import { ReactComponent as BookMarkIcon } from 'assets/svg/home/bookmark.svg';
import { ReactComponent as GroupIcon } from 'assets/svg/home/group.svg';
import { ReactComponent as NearbyIcon } from 'assets/svg/home/nearby.svg';
import { ReactComponent as SearchIcon } from 'assets/svg/search/lens.svg';
import Pin from 'components/common/SideNavigation/Pin/index';
import SpriteSvg from 'components/common/SpriteSvg';
import { useAuth, useClearAuth } from 'store/auth';
import { useFilterFriend, useFilterNearby, useFilterScrap } from 'store/filter';
import useLocationActive from 'store/locationActive';
import { useSelected } from 'store/placeId';
import useBooleanState from 'utils/hooks/useBooleanState';
import cn from 'utils/ts/classNames';

import styles from './SideNavigation.module.scss';

export default function SideNavigation(): JSX.Element {
  const auth = useAuth();
  const clearAuth = useClearAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [visible, , , toggle, setVisible] = useBooleanState(false);
  const { filterFriendState, setFilterFriend } = useFilterFriend();
  const { filterScrapState, setFilterScrap } = useFilterScrap();
  const { filterNearbyState, setFilterNearby } = useFilterNearby();
  const {
    state: isActive,
  } = useLocationActive();
  const { selected } = useSelected();

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
      link: '/post',
    },
    {
      name: '마이페이지',
      icon: <SpriteSvg id="my-page" height="24" width="24" />,
      link: auth ? '/profile' : '/login',
    },
    {
      name: '설정',
      icon: <SpriteSvg id="setting" height="24" width="24" />,
      link: '/setting',
    },
  ];

  const clickSearchButton = () => {
    setVisible(true);
    navigate('/');
  };

  useEffect(() => {
    if (isActive) {
      setVisible(false);
    }
  }, [isActive, setVisible]);

  return (
    <div>
      <nav className={styles['side-navigation']}>
        <ul className={styles['side-navigation__lists']}>
          {TABS.map((tab, index) => (
            <li
              key={tab.name}
              className={cn({
                [styles['side-navigation__list']]: true,
              })}
            >
              {tab.name === '검색' ? (
                <button
                  type="button"
                  className={cn({
                    [styles['side-navigation__button']]: true,
                    [styles['side-navigation__button--clicked']]: (visible && tab.link === location.pathname) || location.pathname === '/shop',
                  })}
                  onClick={() => clickSearchButton()}
                  tabIndex={0}
                >
                  <div>{tab.icon}</div>
                  <div>{tab.name}</div>
                </button>
              ) : (
                <Link
                  to={tab.link}
                  className={cn({
                    [styles['side-navigation__link']]: true,
                    [styles['side-navigation__link--clicked']]: index >= 2 && tab.link === location.pathname,
                  })}
                  onClick={() => setVisible(false)}
                >
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
              <img
                src={auth?.profileImage?.url || defaultImage}
                alt="프로필 이미지"
                className={styles['bottom-navigation__profile-image']}
              />
              <Link to="/" onClick={clearAuth}>
                <div className={styles['bottom-navigation__logout']}>로그아웃</div>
              </Link>
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
          [styles['side-pannel--invisible']]: location.pathname !== '/',
        })}
      >
        <div className={styles['side-pannel__search']}>
          <div className={styles['side-pannel__search-bar']}>
            <Link to="/shop" className={styles['side-pannel__search-link']}>
              검색어를 입력해주세요.
              <SearchIcon className={styles['side-pannel__search-icon']} />
            </Link>
          </div>
          <div className={styles['side-pannel__search-buttons']}>
            <button
              type="button"
              className={cn({
                [styles['side-pannel__search-button']]: true,
                [styles['side-pannel__search-button--clicked']]: filterNearbyState === true,
              })}
              onClick={() => { setFilterNearby(!filterNearbyState); }}
            >
              가까운 음식점
              <NearbyIcon />
            </button>
            <button
              type="button"
              className={cn({
                [styles['side-pannel__search-button']]: true,
                [styles['side-pannel__search-button--clicked']]: filterScrapState === true,
              })}
              onClick={() => { setFilterScrap(!filterScrapState); }}
            >
              북마크 음식점
              <BookMarkIcon />
            </button>
            <button
              type="button"
              className={cn({
                [styles['side-pannel__search-button']]: true,
                [styles['side-pannel__search-button--clicked']]: filterFriendState === true,
              })}
              onClick={() => { setFilterFriend(!filterFriendState); }}
            >
              친구 음식점
              <GroupIcon />
            </button>
          </div>
        </div>
        {(filterNearbyState || filterScrapState || filterFriendState)
        && selected && <Pin placeId={selected} />}
      </div>
    </div>
  );
}
