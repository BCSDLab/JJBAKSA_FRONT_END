import { createPortal } from 'react-dom';
import style from './MobileCommonModal.module.scss';

interface Props {
  children: React.ReactNode;
  setIsShowError: (value: boolean) => void
}

export default function MobileCommonModal({ children, setIsShowError }: Props) {
  const root = document.body;
  return createPortal(
    <div className={style.container}>
      <div className={style.overay} />
      <div className={style.modal}>
        <div className={style.modal__content}>{children}</div>
        <button
          type="button"
          className={style.modal__close}
          onClick={() => setIsShowError(false)}
        >
          닫기
        </button>
      </div>
    </div>,
    root,
  );
}
