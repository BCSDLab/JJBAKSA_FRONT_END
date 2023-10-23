import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { useClearAuth } from 'store/auth';
import { ReactComponent as Favicon } from 'assets/svg/common/favicon.svg';
import style from 'pages/Setting/PC/PasswordSuccessModal.module.scss';
import cn from 'utils/ts/classNames';

interface Props {
  children: React.ReactNode;
  setIsShowModal: (value: boolean) => void;
}
export default function MobileLogoutModal({ children, setIsShowModal }: Props) {
  const root = document.body;
  const clearAuth = useClearAuth();
  return createPortal(
    <div className={style.container}>
      <div className={style.overay} />
      <div className={style.modal}>
        <Favicon />
        <div className={style.modal__title}>
          로그아웃을 진행하실건가요?
        </div>
        <div className={style.modal__content}>{children}</div>
        <div className={style.modal__container}>
          <button
            type="button"
            className={cn({
              [style['modal__button--cancel']]: true,
            })}
            onClick={() => setIsShowModal(false)}
          >
            취소
          </button>
          <Link to="/login" onClick={clearAuth}><button type="button" className={style.modal__button}>확인</button></Link>
        </div>

      </div>
    </div>,
    root,
  );
}
