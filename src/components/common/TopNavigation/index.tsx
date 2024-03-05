import { Link } from 'react-router-dom';

import AuthTitle from 'components/Auth/AuthTitle';
import { useAuth, useClearAuth } from 'store/auth';

import { useFilterFriend, useFilterNearby, useFilterScrap } from 'store/filter';
import { useSelected } from 'store/placeId';
import styles from './TopNavigation.module.scss';

export default function TopNavigation() {
  const auth = useAuth();
  const clearAuth = useClearAuth();
  const { setFilterFriend } = useFilterFriend();
  const { setFilterScrap } = useFilterScrap();
  const { setFilterNearby } = useFilterNearby();
  const { setSelected } = useSelected();
  return (
    <div className={styles.navbar}>
      <AuthTitle />
      <div>
        {auth ? (
          <li className={styles['bottom-navigation__box']}>
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
          <>
            <li>
              <Link to="/login" className={styles['bottom-navigation__login']}>로그인</Link>
            </li>
            <li>
              <Link to="/terms-of-service" className={styles.navbar__link}>
                <button className={styles.navbar__signup} type="button">회원가입</button>
              </Link>
            </li>
          </>
        )}
      </div>
    </div>
  );
}
