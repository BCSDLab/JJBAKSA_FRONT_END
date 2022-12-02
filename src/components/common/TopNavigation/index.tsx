import { Link } from 'react-router-dom';
import { ReactComponent as LogoIcon } from 'assets/svg/common/logo.svg';
import { ReactComponent as ArrowIcon } from 'assets/svg/common/arrow.svg';
import styles from './TopNavigation.module.scss';

function TopNavigation(): JSX.Element {
  return (
    <nav className={styles['top-navigation']}>
      <Link to="/" className={styles['top-navigation__logo']}>
        <LogoIcon />
        <span>쩝쩝박사</span>
      </Link>
      <div className={styles['top-navigation__address']}>
        <span>충청북도 천안시 병천면 충절로 1600</span>
        <ArrowIcon aria-hidden />
      </div>
      <div className={styles['top-navigation__links']}>
        <Link to="/search" className={styles['top-navigation__link']}>검색</Link>
        <Link to="/setting" className={styles['top-navigation__link']}>설정</Link>
        <Link to="/profile" className={styles['top-navigation__link']}>마이페이지</Link>
      </div>
    </nav>
  );
}

export default TopNavigation;
