import { useAuth } from 'store/auth';
import AuthTitle from 'components/Auth/AuthTitle';
import styles from './Withdrawal.module.scss';

export default function Withdrawal() {
  const auth = useAuth();
  return (
    <div className={styles.template}>
      <div className={styles.navbar}>
        <AuthTitle />
      </div>
      <div className={styles.container}>
        <div className={styles.detail}>
          <div className={styles.detail__title}>회원 탈퇴</div>
          <span className={styles.detail__nickname}>{auth?.nickname}</span>
          {' '}
          님,
          <div className={styles.detail__text}>쩝쩝박사 학위를 포기하시겠어요..?</div>
        </div>
        <form>
          <div className={styles.checkbox}>
            <div className={styles.checkbox__title}>계정을 삭제하시려는 이유가 궁금해요.</div>
            <label htmlFor="information" className={styles.checkbox__input}>
              <input type="checkbox" name="information" />
              가계 정보가 부족해요
            </label>
            <label htmlFor="discomport" className={styles.checkbox__input}>
              <input type="checkbox" name="discomport" />
              사용이 불편해요
            </label>
            <label htmlFor="usage" className={styles.checkbox__input}>
              <input type="checkbox" name="usage" />
              다른 앱을 더 많이 사용해요
            </label>
            <label htmlFor="account" className={styles.checkbox__input}>
              <input type="checkbox" name="account" />
              새 계정을 만들고 싶어요
            </label>
            <label htmlFor="other" className={styles.checkbox__input}>
              <input type="checkbox" name="other" />
              기타
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}
