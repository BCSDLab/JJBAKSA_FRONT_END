import { createPortal } from 'react-dom';
import style from './Modal.module.scss';

interface ModalProp {
  children: React.ReactNode
}

export default function Modal({ children }: ModalProp): JSX.Element {
  return createPortal(
    <div className={style.container}>
      <div className={style.overay} />
      <div className={style.modal}>
        <div>재로그인</div>
        {children}
        <button type="button" className={style.modal__button}>로그인</button>
      </div>
    </div>,
    document.getElementById('portal')!,
  );
}
