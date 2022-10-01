import { UseFormRegister, UseFormHandleSubmit, UseFormGetValues } from 'react-hook-form';
import { useRef, useEffect } from 'react';
import style from './InputNumber.module.scss';

interface Itype {
  register: UseFormRegister<FormData>,
  handleSubmit: UseFormHandleSubmit<FormData>,
  getValues: UseFormGetValues<FormData>
}
export interface FormData {
  first: string,
  second: string,
  third: string,
  fourth: string
}
export default function InputNumber({ register, handleSubmit }: Itype): JSX.Element {
  const inputRef = useRef<HTMLInputElement[] | null[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const preventOverLength = (e: React.ChangeEvent<HTMLInputElement>, next: number) => {
    if (e.target.value.length > e.target.maxLength) {
      e.target.value = e.target.value.charAt(0);
      if (next <= 3) {
        inputRef.current[next]?.focus();
      } else {
        buttonRef.current?.focus();
      }
    }
  };

  useEffect(() => inputRef.current[0]?.focus(), []);

  return (
    <div className={style.container}>
      <form
        onSubmit={
        handleSubmit((data: FormData) => console.log(data))
      }
        className={style.input__layout}
      >
        <input
          type="number"
          className={style.input_style}
          {...register('first', {
            required: true,
            maxLength: 1,
          })}
          ref={(e) => { register('first').ref(e); inputRef.current[0] = e; }}
          onChange={(e) => preventOverLength(e, 1)}
        />
        <input
          type="number"
          className={style.input_style}
          {...register('second', {
            required: true,
            maxLength: 1,
          })}
          ref={(e) => { register('second').ref(e); inputRef.current[1] = e; }}
          onChange={(e) => preventOverLength(e, 2)}
        />
        <input
          type="number"
          className={style.input_style}
          {...register('third', {
            required: true,
            maxLength: 1,
          })}
          ref={(e) => { register('third').ref(e); inputRef.current[2] = e; }}
          onChange={(e) => preventOverLength(e, 3)}
        />
        <input
          type="number"
          className={style.input_style}
          {...register('fourth', {
            required: true,
            maxLength: 1,
          })}
          ref={(e) => { register('fourth').ref(e); inputRef.current[3] = e; }}
          onChange={(e) => preventOverLength(e, 4)}
        />
        <button type="submit" ref={buttonRef} className={inputRef.current[0]?.value !== undefined ? style.active : style.inactive}>완료</button>
      </form>
      <span className={style.resend}>인증번호 재발송</span>
    </div>
  );
}
