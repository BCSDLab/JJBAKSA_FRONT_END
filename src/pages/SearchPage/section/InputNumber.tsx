import { UseFormRegister, UseFormHandleSubmit } from 'react-hook-form';
import cn from 'utils/ts/classNames';
import useInputCheck from '../hook/useInputCheck';
import style from './InputNumber.module.scss';

interface IType {
  register: UseFormRegister<FormData>,
  handleSubmit: UseFormHandleSubmit<FormData>,
}

export interface FormData {
  first: string,
  second: string,
  third: string,
  fourth: string
}

export default function InputNumber({ register, handleSubmit }: IType): JSX.Element {
  const {
    isDone, inputRef, buttonRef, preventOverLength,
  } = useInputCheck();

  return (
    <div className={style.container}>
      <form
        onSubmit={
        handleSubmit((data: FormData) => data)
      }
        className={style.form}
      >
        <input
          type="number"
          className={style.form__input}
          {...register('first', {
            required: true,
            maxLength: 1,
          })}
          ref={(e) => { register('first').ref(e); inputRef.current[0] = e; }}
          onChange={(e) => preventOverLength(e, 1)}
        />
        <input
          type="number"
          className={style.form__input}
          {...register('second', {
            required: true,
            maxLength: 1,
          })}
          ref={(e) => { register('second').ref(e); inputRef.current[1] = e; }}
          onChange={(e) => preventOverLength(e, 2)}
        />
        <input
          type="number"
          className={style.form__input}
          {...register('third', {
            required: true,
            maxLength: 1,
          })}
          ref={(e) => { register('third').ref(e); inputRef.current[2] = e; }}
          onChange={(e) => preventOverLength(e, 3)}
        />
        <input
          type="number"
          className={style.form__input}
          {...register('fourth', {
            required: true,
            maxLength: 1,
          })}
          ref={(e) => { register('fourth').ref(e); inputRef.current[3] = e; }}
          onChange={(e) => preventOverLength(e, 4)}
        />
        <button type="submit" ref={buttonRef} className={isDone ? style.active : style.inactive}>완료</button>
        <button
          type="submit"
          ref={buttonRef}
          className={cn({
            [style.active]: isDone,
            [style.inactive]: true,
          })}
        >
          완료
        </button>
      </form>
      <span className={style.resend}>인증번호 재발송</span>
    </div>
  );
}
