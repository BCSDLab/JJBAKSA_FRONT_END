import { Link } from 'react-router-dom';
import { ReactComponent as LogoIcon } from 'assets/svg/common/logo.svg';
import { ReactComponent as ArrowIcon } from 'assets/svg/common/arrow.svg';
import { useAuth } from 'store/auth';
import styles from './TopNavigation.module.scss';

function TopNavigation(): JSX.Element {
  const auth = useAuth();

  return (
    <nav className={styles['top-navigation']}>
      <div className={styles['top-navigation__logo']}>
        <Link to="/" className={styles['top-navigation__logo-link']}>
          <LogoIcon />
          <span>쩝쩝박사</span>
        </Link>
      </div>

      <div className={styles['top-navigation__address']}>
        <span>충청북도 천안시 병천면 충절로 1600</span>
        <ArrowIcon aria-hidden />
      </div>

      <ul className={styles['top-navigation__links']}>
        <li><Link to="/search" className={styles['top-navigation__link']}>검색</Link></li>
        <li><Link to="/setting" className={styles['top-navigation__link']}>설정</Link></li>
        {auth
          ? <li><Link to="/profile" className={styles['top-navigation__link']}>마이페이지</Link></li>
          : <li><Link to="/login" className={styles['top-navigation__link']}>로그인</Link></li>}
      </ul>
    </nav>
  );
}

export default TopNavigation;
