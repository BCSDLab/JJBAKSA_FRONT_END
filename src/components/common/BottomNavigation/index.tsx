import { ReactComponent as HomeIcon } from 'assets/svg/home.svg';
import { ReactComponent as WriteIcon } from 'assets/svg/write.svg';
import { ReactComponent as MyPageIcon } from 'assets/svg/my-page.svg';
import { Link, useLocation } from 'react-router-dom';
import cn from 'utils/ts/classNames';
import styles from './BottomNavigation.module.scss';

const navTabs = [
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
    pathname: '/profile',
    icon: MyPageIcon,
    text: '마이페이지',
  },
];

function BottomNavigation(): JSX.Element {
  const { pathname } = useLocation();

  return (
    <nav className={styles['bottom-navigation']}>
      <ul className={styles.tab}>
        {navTabs.map((tab) => (
          <li
            key={tab.text}
            className={cn({
              [styles.tab__item]: true,
              [styles['tab__item--focused']]: pathname === tab.pathname,
            })}
          >
            <Link
              className={styles.tab__link}
              to={tab.pathname}
              aria-label={`${tab.text}으로 이동`}
            >
              <tab.icon className={styles.tab__icon} />
              <div className={styles.tab__text}>{tab.text}</div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default BottomNavigation;
