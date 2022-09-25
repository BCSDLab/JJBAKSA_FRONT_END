import style from './Modal.module.scss';

export default function ModalForID() {
  return (
    <div className={style.container}>
      <div className={style.overay} />
      <div className={style.modal}>
        <div>재로그인</div>
        <div>이메일로 아이디를 보냈습니다.</div>
        <button type="button" className={style.button}>로그인</button>
      </div>
    </div>
  );
}
