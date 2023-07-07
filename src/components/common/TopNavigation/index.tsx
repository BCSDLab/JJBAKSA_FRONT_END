import { Link } from 'react-router-dom';
import { ReactComponent as LogoIcon } from 'assets/svg/common/favicon.svg';
import { ReactComponent as ArrowIcon } from 'assets/svg/common/arrow.svg';
import { ReactComponent as SettingIcon } from 'assets/svg/common/setting.svg';
import { ReactComponent as WriteIcon } from 'assets/svg/common/write.svg';
import { ReactComponent as MyPageIcon } from 'assets/svg/common/my-page.svg';
import { useAuth } from 'store/auth';
import styles from './TopNavigation.module.scss';

export default function TopNavigation(): JSX.Element {
  const auth = useAuth();

  const tabs = [
    {
      name: '설정',
      icon: <SettingIcon />,
      link: '/setting',
    },
    {
      name: '글쓰기',
      icon: <WriteIcon />,
      link: '/search',
    },
    {
      name: auth ? '마이페이지' : '로그인',
      icon: <MyPageIcon />,
      link: auth ? '/profile' : '/login',
    },
  ];

  return (
    <nav className={styles['top-navigation']}>
      <div className={styles['top-navigation__logo']}>
        <Link to="/" className={styles['top-navigation__logo-link']}>
          <LogoIcon />
        </Link>
      </div>

      <div className={styles['top-navigation__address']}>
        <span>충청북도 천안시 병천면 충절로 1600</span>
        <ArrowIcon aria-hidden />
      </div>

      <ul className={styles['top-navigation__links']}>
        {tabs.map((tab) => (
          <li key={tab.name}>
            <Link to={tab.link} className={styles['top-navigation__link']}>
              {tab.icon}
              {tab.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
