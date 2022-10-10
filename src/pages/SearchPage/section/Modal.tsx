import style from './Modal.module.scss';

interface IModal {
  modal: string
}
export default function Modal({ modal }: IModal): JSX.Element {
  return (
    <div className={style.container}>
      <div className={style.overay} />
      <div className={style.modal}>
        <div>재로그인</div>
        {modal === 'idModal' && <div>이메일로 아이디를 보냈습니다.</div>}
        {modal === 'passwordModal' && <div>재설정된 비밀번호로 다시 로그인해주세요.</div>}
        <button type="button" className={style.modal__button}>로그인</button>
      </div>
    </div>
  );
}
