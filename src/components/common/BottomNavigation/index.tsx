import { Link, useLocation } from 'react-router-dom';
import cn from 'utils/ts/classNames';
import { useAuth } from 'store/auth';
import styles from './BottomNavigation.module.scss';
import SpriteSvg from '../SpriteSvg';

export default function BottomNavigation(): JSX.Element {
  const { pathname } = useLocation();
  const auth = useAuth();

  const NAV_TABS = [
    {
      pathname: '/',
      icon: 'home',
      text: '홈',
    },
    {
      pathname: '/post',
      icon: 'write',
      text: '글쓰기',
    },
    {
      pathname: auth ? '/profile' : '/login',
      icon: 'my-page',
      text: '마이페이지',
    },
  ];

  return (
    <nav className={styles['bottom-navigation']}>
      <ul className={styles.tab}>
        {NAV_TABS.map((tab) => (
          <li
            key={tab.text}
            className={cn({
              [styles.tab__item]: true,
              [styles['tab__item--matched']]: pathname === tab.pathname,
            })}
          >
            <Link className={styles.tab__link} to={tab.pathname}>
              <div className={styles.tab__icon}>
                <SpriteSvg id={`${tab.icon}`} />
              </div>
              <div className={styles.tab__text}>{tab.text}</div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
