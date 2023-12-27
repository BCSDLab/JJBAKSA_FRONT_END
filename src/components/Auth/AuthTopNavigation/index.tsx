import { Link } from 'react-router-dom';

import AuthTitle from 'components/Auth/AuthTitle';

import styles from './AuthTopNavigation.module.scss';

export default function AuthTopNavigation() {
  return (
    <div className={styles.navbar}>
      <AuthTitle />
      <div>
        <Link to="/login" className={styles.navbar__link}><button className={styles.navbar__login} type="button">로그인</button></Link>
        <Link to="/terms-of-service" className={styles.navbar__link}><button className={styles.navbar__signup} type="button">회원가입</button></Link>
      </div>
    </div>
  );
}
