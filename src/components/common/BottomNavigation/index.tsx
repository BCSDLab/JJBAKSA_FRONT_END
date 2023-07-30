import { ReactComponent as HomeIcon } from 'assets/svg/common/home.svg';
import { ReactComponent as WriteIcon } from 'assets/svg/common/write.svg';
import { ReactComponent as MyPageIcon } from 'assets/svg/common/my-page.svg';
import { Link, useLocation } from 'react-router-dom';
import cn from 'utils/ts/classNames';
import { useAuth } from 'store/auth';
import styles from './BottomNavigation.module.scss';

export default function BottomNavigation(): JSX.Element {
  const { pathname } = useLocation();
  const auth = useAuth();

  const NAV_TABS = [
    {
      pathname: '/',
      icon: HomeIcon,
      text: '홈',
    },
    {
      pathname: '/post',
      icon: WriteIcon,
      text: '글쓰기',
    },
    {
      pathname: auth ? '/profile' : '/login',
      icon: MyPageIcon,
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
              <tab.icon className={styles.tab__icon} aria-hidden />
              <div className={styles.tab__text}>{tab.text}</div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
