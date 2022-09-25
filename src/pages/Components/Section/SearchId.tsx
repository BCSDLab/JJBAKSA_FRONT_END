import React, { useEffect, useState } from 'react';
import { ReactComponent as Prev } from 'assets/svg/prev-icon.svg';
import style from './SearchId.module.scss';

export default function SearchId() {
  const [inputValue, setInputValue] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState(true);
  const [isInput, setIsInput] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const getInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; // 이메일 형식 유효성 검사 패턴
  const checkEmail = (e: React.MouseEvent<HTMLElement>) => {
    if (inputValue !== '') {
      if (!pattern.test(inputValue)) {
        e.preventDefault();
        setIsCorrect(false);
        setIsRepeat(false);
      } else {
        setIsCorrect(true);
      }
    } else {
      e.preventDefault();
    }
  };
  const removeAnimation = () => {
    setIsRepeat(true);
  };
  useEffect(() => {
    if (inputValue !== '') {
      setIsInput(true);
      setIsCorrect(true);
    } else {
      setIsInput(false);
      setIsCorrect(true);
    }
  }, [inputValue]);
  return (
    <div className={style.layout}>
      <div className={style.container}>
        <div>
          <div className={style.back_icon}>
            <Prev />
          </div>
          <p>
            아이디 찾을 때
            <br />
            사용할 이메일을 입력해주세요.
          </p>
        </div>
        {isCorrect ? <div className={style.make_space}>{' '}</div> : (
          <div
            className={isRepeat ? style.error_message : [style.error_message, style.animation].join(' ')}
            onAnimationEnd={removeAnimation}
          >
            계정이 존재하지 않거나
            <br />
            올바르지 않은 이메일 형식입니다.
          </div>
        )}
        <form action="">
          <div className={style.input_label}>
            <div className={style.email}>이메일</div>
            <input type="text" placeholder="이메일을 입력하세요" onChange={getInputValue} className={isCorrect ? style.input_style : style.input_style_radius} id="email" />
          </div>
          <button type="submit" onClick={checkEmail} className={isInput ? style.active : style.inactive}>인증번호 보내기</button>
        </form>
      </div>
    </div>

  );
}
