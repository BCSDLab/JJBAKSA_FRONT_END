import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

import { ReactComponent as Favicon } from 'assets/svg/common/favicon.svg';
import { useClearAuth } from 'store/auth';

import style from './PasswordSuccessModal.module.scss';

interface Props {
  children: React.ReactNode;
  setIsShowModal: (x: boolean) => void
}
export default function LogoutModal({ children, setIsShowModal }: Props) {
  const root = document.body;
  const clearAuth = useClearAuth();
  return createPortal(
    <div className={style.container}>
      <div className={style.overay} />
      <div className={style.modal}>
        <Favicon />
        <button className={style.modal__close} type="button" onClick={() => setIsShowModal(false)}>X</button>
        <div className={style.modal__title}>
          로그아웃을 진행하실건가요?
        </div>
        <div className={style.modal__content}>{children}</div>
        <Link to="/login" onClick={clearAuth}><button type="button" className={style.modal__button}>확인</button></Link>
      </div>
    </div>,
    root,
  );
}
