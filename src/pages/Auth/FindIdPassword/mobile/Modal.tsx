import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Favicon } from 'assets/svg/common/favicon.svg';
import style from './Modal.module.scss';

interface ModalProp {
  children: React.ReactNode
  type: string
}

export default function Modal({ children, type }: ModalProp): JSX.Element {
  const root = document.body;
  const nav = useNavigate();
  return createPortal(
    <div className={style.container}>
      <div className={style.overay} />
      <div className={style.modal}>
        <Favicon />
        <button className={style.modal__close} type="button" onClick={() => nav('/login')}>X</button>
        <div>
          <div className={style.modal__title}>
            {type === '아이디' && `${type}를 성공적으로 찾았습니다!`}
            {type === '비밀번호' && `${type} 변경을 완료했습니다.`}
          </div>
          <div className={style.modal__content}>{children}</div>
        </div>
        <Link to="/login"><button type="button" className={style.modal__button}>로그인</button></Link>
      </div>
    </div>,
    root,
  );
}
