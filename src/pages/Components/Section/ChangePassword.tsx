import { useState, useEffect } from 'react';
import { ReactComponent as Prev } from 'assets/svg/prev-icon.svg';
import warning from 'assets/svg/warning.svg';
import style from './SearchPage.module.scss';
import Modal from './Modal';

const pattern = /^.*(?=^.{2,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/; // 비밀번호 형식 패턴

export default function ChangePassword(): JSX.Element {
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordcheck] = useState<string>('');
  const [valid, setValid] = useState<string>('initial');
  const [isEmpty, setIsEmpty] = useState<boolean>();
  const [isSuccess, setIsSuccess] = useState<boolean>();
  const checkEmpty = () => {
    if (password !== '' && passwordCheck !== '') setIsEmpty(false);
    else if (password === '' || passwordCheck === '') setIsEmpty(true);
  };
  const passwordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    checkEmpty();
  };
  const passwordCheckInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordcheck(e.target.value);
    checkEmpty();
  };
  const checking = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (password === '' || passwordCheck === '') {
      e.preventDefault();
      setIsEmpty(true);
    } else if (password !== '' && passwordCheck !== '') {
      if (password === passwordCheck && !pattern.test(password)) {
        e.preventDefault();
        setValid('patternError');
      } else if (password !== passwordCheck) {
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
        {valid === 'initial' && <div className={style.make_space} />}
        {valid === 'patternError' && (
        <div className={style.error_message}>
          <img src={warning} alt="warning" className={style.warning} />
          비밀번호는 문자, 숫자, 특수문자를 포함한
          <br />
          2~16자리로 이루어져야 합니다.
        </div>
        )}
        {valid === 'different' && (
        <div className={style.error_message}>
          <img src={warning} alt="warning" className={style.warning} />
          비밀번호가 일치하지 않습니다.
        </div>
        )}
        <form>
          <div className={style.input_label}>
            <div className={style.email}>새 비밀번호</div>
            <input type="password" placeholder="비밀번호를 입력하세요" className={style.input_style} onChange={passwordInput} value={password} />
            <div className={style.email}>비밀번호 확인</div>
            <input type="password" placeholder="비밀번호를 입력하세요" className={style.input_style} onChange={passwordCheckInput} value={passwordCheck} />
          </div>
          <button type="submit" className={isEmpty ? style.inactive : style.active} onClick={checking}>완료</button>
        </form>
      </div>
      {isSuccess && <Modal modal="passwordModal" />}
    </div>

  );
}
