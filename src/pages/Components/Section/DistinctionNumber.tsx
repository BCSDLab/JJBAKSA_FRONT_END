import { useState } from 'react';
import { ReactComponent as Prev } from 'assets/svg/prev-icon.svg';
import warningImage from 'assets/svg/warning.svg';
import InputNumber, { Distinct } from './InputNumber';
import style from './SearchPage.module.scss';
import Modal from './Modal';

const CORRECT = {
  first: '9',
  second: '9',
  third: '9',
  fourth: '9',
};
export default function DistinctionNumber():JSX.Element {
  const [isEmpty, setIsEmpty] = useState<boolean>();
  const [isCorrect, setIsCorrect] = useState<boolean>();
  const [isRepeat, setIsRepeat] = useState<boolean>();
  const [success, setSuccess] = useState<boolean>();
  const [numbers, setNumbers] = useState<Distinct['distinct']>({
    first: '',
    second: '',
    third: '',
    fourth: '',
  });
  const setInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value.length <= e.target.maxLength) {
      setNumbers({
        ...numbers,
        [name]: value,
      });
    }
  };
  const checkIsCorrect = (e: React.MouseEvent<HTMLElement>) => {
    if (numbers.first === '' || numbers.second === '' || numbers.third === '' || numbers.fourth === '') {
      e.preventDefault();
    } else if (numbers.first === CORRECT.first && numbers.second === CORRECT.second
      && numbers.third === CORRECT.third && numbers.fourth === CORRECT.fourth) {
      setIsCorrect(true);
      setSuccess(true);
    } else {
      setIsCorrect(false);
      setIsRepeat(false);
    }
  };
  const removeAnimation = () => {
    setIsRepeat(true);
  };
  return (
    <div className={style.layout}>
      <div className={style.container}>
        <div>
          <div className={style.back_icon}>
            <Prev />
          </div>
          <p>
            이메일로 발송된
            <br />
            인증번호를 입력해 주세요
          </p>
        </div>
        {isCorrect ? <div className={style.make_space}>{' '}</div> : (
          <div className={isRepeat ? style.error_message : [style.error_message, style.animation].join(' ')} onAnimationEnd={removeAnimation}>
            <img src={warningImage} alt="warning" className={style.warning} />
            인증번호가 올바르지 않습니다.
          </div>
        )}
        <InputNumber distinct={numbers} setInput={setInput} setIsEmpty={setIsEmpty} />
        <button type="button" className={isEmpty ? style.inactive : style.active} onClick={checkIsCorrect}>완료</button>
      </div>
      {success && isCorrect && <Modal modal="idModal" />}
    </div>
  );
}
