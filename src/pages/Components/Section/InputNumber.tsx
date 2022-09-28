import { useRef, useEffect } from 'react';
import style from './InputNumber.module.scss';

export interface Distinct {
  distinct: {
    first: string,
    second: string,
    third: string,
    fourth: string, },
  setInput: (e: React.ChangeEvent<HTMLInputElement>) => void,
  setIsEmpty: (arg0: boolean) => void
}

export default function InputNumber({ distinct, setInput, setIsEmpty }: Distinct): JSX.Element {
  const {
    first, second, third, fourth,
  } = distinct;
  const inputRef = useRef<HTMLInputElement[] | null[]>([]);

  const autoFocus = (index: number) => {
    inputRef.current[index]?.focus();
    if (inputRef.current[index]?.value !== '') {
      inputRef.current[index + 1]?.focus();
    }
    if (index === 3 && inputRef.current[index]?.value !== '') {
      inputRef.current[index]?.blur();
    }
  };

  const checkInput = () => {
    if (first !== '' && second !== '' && third !== '' && fourth !== '') {
      setIsEmpty(false);
    } else setIsEmpty(true);
  };
  useEffect(() => inputRef.current[0]?.focus(), []);
  useEffect(() => checkInput());
  return (
    <div>
      <div className={style.container}>
        <form className={style.input_align}>
          <input type="number" name="first" maxLength={1} className={style.input_style} value={first} onChange={(e) => { autoFocus(0); setInput(e); }} ref={(elem) => { inputRef.current[0] = elem; }} />
          <input type="number" name="second" maxLength={1} className={style.input_style} value={second} onChange={(e) => { autoFocus(1); setInput(e); }} ref={(elem) => { inputRef.current[1] = elem; }} />
          <input type="number" name="third" maxLength={1} className={style.input_style} value={third} onChange={(e) => { autoFocus(2); setInput(e); }} ref={(elem) => { inputRef.current[2] = elem; }} />
          <input type="number" name="fourth" maxLength={1} className={style.input_style} value={fourth} onChange={(e) => { autoFocus(3); setInput(e); }} ref={(elem) => { inputRef.current[3] = elem; }} />
        </form>
        <span className={style.resend}>인증번호 재발송</span>
      </div>
    </div>
  );
}
