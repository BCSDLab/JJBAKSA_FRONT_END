import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

import { ReactComponent as Favicon } from 'assets/svg/common/favicon.svg';
import { useClearAuth } from 'store/auth';

import styles from './PasswordSuccessModal.module.scss';

interface Props {
  children: React.ReactNode;
  closeModal: (x: boolean) => void
}
export default function LogoutModal({ children, closeModal }: Props) {
  const root = document.body;
  const clearAuth = useClearAuth();
  return createPortal(
    <div className={styles.container}>
      <div className={styles.overay} />
      <div className={styles.modal}>
        <Favicon />
        <button className={styles.modal__close} type="button" onClick={() => closeModal(false)}>X</button>
        <div className={styles.modal__title}>
          로그아웃을 진행하실건가요?
        </div>
        <div className={styles.modal__content}>{children}</div>
        <Link to="/login" onClick={clearAuth}><button type="button" className={styles.modal__button}>확인</button></Link>
      </div>
    </div>,
    root,
  );
}
