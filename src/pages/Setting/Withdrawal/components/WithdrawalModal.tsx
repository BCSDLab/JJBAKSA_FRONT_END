import AuthTitle from 'components/Auth/AuthTitle';
import AuthDetail from 'components/Auth/AuthDetail';
import { Link } from 'react-router-dom';
import styles from './WithdrawalModal.module.scss';

export default function WithdrawalModalModal() {
  return (
    <div className={styles.modal}>
      <div className={styles.modal__popup}>
        <div className={styles.modal__message}>
          <button className={styles.modal__close} type="button">X</button>
        </div>
        <AuthTitle />
        <AuthDetail name="탈퇴를 완료했습니다." first="다음에 또 봐요! 재가입은 탈퇴 후" second="일주일 후 부터 가능합니다." />
        <Link to="/">
          <button className={styles.modal__button} type="submit">
            닫기
          </button>
        </Link>
      </div>
    </div>
  );
}
