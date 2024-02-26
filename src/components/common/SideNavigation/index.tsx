import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import defaultImage from 'assets/images/follow/default-image.png';
import filterShopsEmpty from 'assets/images/search/not-found-img.jpeg';
import { ReactComponent as BookMarkIcon } from 'assets/svg/home/bookmark.svg';
import { ReactComponent as GroupIcon } from 'assets/svg/home/group.svg';
import { ReactComponent as NearbyIcon } from 'assets/svg/home/nearby.svg';
import { ReactComponent as SearchIcon } from 'assets/svg/search/lens.svg';
import LoadingSpinner from 'components/common/LoadingSpinner';
import Pin from 'components/common/SideNavigation/Pin/index';
import SpriteSvg from 'components/common/SpriteSvg';
import { useAuth, useClearAuth } from 'store/auth';
import { useFilterFriend, useFilterNearby, useFilterScrap } from 'store/filter';
import { useSelected } from 'store/placeId';
import useFilterShops from 'utils/hooks/useFilterShops';
import cn from 'utils/ts/classNames';

import styles from './SideNavigation.module.scss';

interface SideNavigationProps {
  visible: boolean;
  toggle: () => void;
  setVisible: (state: boolean) => void;
}

export default function SideNavigation({
  visible, toggle, setVisible,
}: SideNavigationProps): JSX.Element {
  const auth = useAuth();
  const clearAuth = useClearAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const { filterFriendState, setFilterFriend } = useFilterFriend();
  const { filterScrapState, setFilterScrap } = useFilterScrap();
  const { filterNearbyState, setFilterNearby } = useFilterNearby();
  const { setSelected } = useSelected();

  const { isPending, filterShops, filterButtons } = useFilterShops();

  useEffect(() => {
    filterButtons({
      options_nearby: filterNearbyState ? 1 : 0,
      options_friend: filterFriendState ? 1 : 0,
      options_scrap: filterScrapState ? 1 : 0,
    });
  }, [filterNearbyState, filterFriendState, filterScrapState, filterButtons]);

  const renderingPin = () => {
    if (isPending) {
      return (
        <div className={styles.loading}>
          <LoadingSpinner size={100} />
        </div>
      );
    }

    if (auth === null || (filterShops && filterShops.length === 0)
     || (!filterNearbyState && !filterScrapState && !filterFriendState)) {
      return (
        <div className={styles['filter-shops-empty']}>
          <div>아쉽게도 현재 관련 음식점이 없습니다.</div>
          <div>원하는 음식점을 북마크로 저장해보세요.</div>
          <img src={filterShopsEmpty} alt="음식점 없음" />
          <div>친구를 팔로우하면 친구가 북마크한 음식점을 볼 수 있어요!</div>
        </div>
      );
    }

    if (filterShops && filterShops.length > 0) {
      return <Pin filterShops={filterShops} />;
    }

    return null;
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

  return (
    <>
      <nav className={styles['side-navigation']}>
        <ul className={styles['side-navigation__lists']}>
          {TABS.map((tab, index) => (
            <li
              key={tab.name}
              className={styles['side-navigation__list']}
            >
              {tab.name === '검색' ? (
                <button
                  type="button"
                  className={cn({
                    [styles['side-navigation__button']]: true,
                    [styles['side-navigation__button--clicked']]: (visible && location.pathname === '/') || location.pathname === '/shop',
                  })}
                  onClick={() => { navigate('/shop'); }}
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
            <li className={styles['bottom-navigation__box']}>
              <img
                src={auth?.profileImage?.url || defaultImage}
                alt="프로필 이미지"
                className={styles['bottom-navigation__profile-image']}
              />
              <Link
                to="/"
                onClick={() => {
                  clearAuth(); setSelected('');
                  setFilterFriend(true);
                  setFilterNearby(true);
                  setFilterScrap(true);
                }}
              >
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
          {visible ? <SpriteSvg id="fold" width="12px" /> : <SpriteSvg id="expand" width="12px" />}
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
                [styles['side-pannel__search-button--clicked']]: filterNearbyState,
              })}
              onClick={() => {
                setFilterNearby(!filterNearbyState); setSelected('');
              }}
            >
              가까운 음식점
              <NearbyIcon />
            </button>
            <button
              type="button"
              className={cn({
                [styles['side-pannel__search-button']]: true,
                [styles['side-pannel__search-button--clicked']]: filterScrapState,
              })}
              onClick={() => {
                setFilterScrap(!filterScrapState); setSelected('');
              }}
            >
              북마크 음식점
              <BookMarkIcon />
            </button>
            <button
              type="button"
              className={cn({
                [styles['side-pannel__search-button']]: true,
                [styles['side-pannel__search-button--clicked']]: filterFriendState,
              })}
              onClick={() => {
                setFilterFriend(!filterFriendState); setSelected('');
              }}
            >
              친구 음식점
              <GroupIcon />
            </button>
          </div>
        </div>
        {renderingPin()}
      </div>
    </>
  );
}
