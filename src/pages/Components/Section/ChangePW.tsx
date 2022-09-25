import { useState, useEffect } from 'react';
import { ReactComponent as Prev } from 'assets/svg/prev-icon.svg';
import warning from 'assets/svg/warning.svg';
import style from './SearchId.module.scss';
import ModalForPW from './ModalForPW';

export default function ChangePW() {
  const pattern = /^.*(?=^.{2,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
  const [pw, setPw] = useState<string>('');
  const [pwch, setPwch] = useState<string>('');
  const [Valid, setValid] = useState<string>('initial');
  const [isEmpty, setIsEmpty] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const checkEmpty = () => {
    if (pw !== '' && pwch !== '') setIsEmpty(false);
    else if (pw === '' || pwch === '') setIsEmpty(true);
  };
  const setPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
    checkEmpty();
  };
  const setPasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwch(e.target.value);
    checkEmpty();
  };
  const checking = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (pw === '' || pwch === '') {
      e.preventDefault();
      setIsEmpty(true);
    } else if (pw !== '' && pwch !== '') {
      if (pw === pwch && !pattern.test(pw)) {
        e.preventDefault();
        setValid('patternError');
      } else if (pw !== pwch) {
        e.preventDefault();
        setValid('different');
      } else {
        e.preventDefault();
        setValid('initial');
        setIsSuccess(true);
      }
    }
  };
  useEffect(() => checkEmpty());
  return (
    <div className={style.layout}>
      <div className={style.container}>
        <div>
          <div className={style.back_icon}>
            <Prev />
          </div>
          <p>
            새 비밀번호를 설정해 주세요.
          </p>
        </div>
        {Valid === 'initial' && <div className={style.make_space} />}
        {Valid === 'patternError' && (
        <div className={style.error_message}>
          <img src={warning} alt="warning" className={style.warning} />
          비밀번호는 문자, 숫자, 특수문자를 포함한
          <br />
          2~16자리로 이루어져야 합니다.
        </div>
        )}
        {Valid === 'different' && (
        <div className={style.error_message}>
          <img src={warning} alt="warning" className={style.warning} />
          비밀번호가 일치하지 않습니다.
        </div>
        )}
        <form>
          <div className={style.input_label}>
            <div className={style.email}>새 비밀번호</div>
            <input type="password" placeholder="비밀번호를 입력하세요" className={style.input_style} onChange={setPassword} value={pw} />
            <div className={style.email}>비밀번호 확인</div>
            <input type="password" placeholder="비밀번호를 입력하세요" className={style.input_style} onChange={setPasswordCheck} value={pwch} />
          </div>
          <button type="submit" className={isEmpty ? style.inactive : style.active} onClick={checking}>완료</button>
        </form>
      </div>
      {isSuccess && <ModalForPW />}
    </div>

  );
}
