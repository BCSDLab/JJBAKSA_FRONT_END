import AuthDetail from 'components/Auth/AuthDetail';
import AuthTitle from 'components/Auth/AuthTitle';
import { useClearAuth } from 'store/auth';

import styles from './WithdrawalModal.module.scss';

export default function WithdrawalModalModal() {
  const clearAuth = useClearAuth();

  return (
    <div className={styles.modal}>
      <div className={styles.modal__popup}>
        <div className={styles.modal__message}>
          <button className={styles.modal__close} type="button" onClick={clearAuth}>X</button>
        </div>
        <AuthTitle />
        <AuthDetail name="탈퇴를 완료했습니다." first="다음에 또 봐요! 재가입은 탈퇴 후" second="일주일 후 부터 가능합니다." />
        <button
          className={styles.modal__button}
          type="button"
          onClick={clearAuth}
        >
          닫기
        </button>
      </div>
    </div>
  );
}
