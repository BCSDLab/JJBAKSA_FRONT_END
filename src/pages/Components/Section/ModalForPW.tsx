import style from './Modal.module.scss';

export default function ModalForPW() {
  return (
    <div className={style.container}>
      <div className={style.overay} />
      <div className={style.modal}>
        <div>재로그인</div>
        <div>재설정된 비밀번호로 다시 로그인 해주세요.</div>
        <button type="button" className={style.button}>로그인</button>
      </div>
    </div>
  );
}
