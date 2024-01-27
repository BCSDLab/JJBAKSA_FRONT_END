import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

import { ReactComponent as Favicon } from 'assets/svg/common/favicon.svg';
import { useClearAuth } from 'store/auth';

import styles from './PasswordSuccessModal.module.scss';

interface Props {
  children: React.ReactNode;
}
export default function PasswordSuccessModal({ children }: Props) {
  const root = document.body;
  const clearAuth = useClearAuth();
  return createPortal(
    <div className={styles.container}>
      <div className={styles.overay} />
      <div className={styles.modal}>
        <Favicon />
        <button className={styles.modal__close} type="button" onClick={clearAuth}>X</button>
        <div className={styles.modal__title}>
          비밀번호 변경을 완료했습니다.
        </div>
        <div className={styles.modal__content}>{children}</div>
        <Link to="/login" onClick={clearAuth}><button type="button" className={styles.modal__button}>로그인</button></Link>
      </div>
    </div>,
    root,
  );
}
