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
      <div className={styles.info}>
        {auth ? (
          <>
            <div className={styles.info__nickname}>{auth.nickname}님</div>
            <Link
              to="/"
              onClick={() => {
                clearAuth(); setSelected('');
                setFilterFriend(true);
                setFilterNearby(true);
                setFilterScrap(true);
              }}
              className={styles.info__logout}
            >
              로그아웃
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.info__login}>로그인</Link>
            <Link to="/terms-of-service" className={styles.info__signup}>회원가입</Link>
          </>
        )}
      </div>
    </div>
  );
}
