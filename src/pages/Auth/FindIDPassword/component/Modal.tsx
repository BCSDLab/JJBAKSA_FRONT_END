import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import style from './Modal.module.scss';

interface ModalProp {
  children: React.ReactNode
  type: string
}

export default function Modal({ children, type }: ModalProp): JSX.Element {
  const root = document.body;
  return createPortal(
    <div className={style.container}>
      <div className={style.overay} />
      <div className={style.modal}>
        <div className={style.modal__title}>
          {`${type} 찾기 완료`}
        </div>
        <div className={style.modal__content}>{children}</div>
        <Link to="/login"><button type="button" className={style.modal__button}>확인</button></Link>
      </div>
    </div>,
    root,
  );
}
