import { UseFormRegister, UseFormHandleSubmit } from 'react-hook-form';
import cn from 'utils/ts/classNames';
import useInputCheck from '../hook/useInputCheck';
import style from './VerifyCode.module.scss';

interface PropData {
  register: UseFormRegister<FormData>,
  handleSubmit: UseFormHandleSubmit<FormData>,
}

export interface FormData {
  first: string,
  second: string,
  third: string,
  fourth: string
}

export default function VerifyCode({ register, handleSubmit }: PropData): JSX.Element {
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
        <div className={style.form__input}>
          <input
            type="number"
            className={cn({ [style['form__input--block']]: true })}
            {...register('first', {
              required: true,
              maxLength: 1,
            })}
            ref={(e) => { register('first').ref(e); inputRef.current[0] = e; }}
            onChange={(e) => preventOverLength(e, 1)}
          />
          <input
            type="number"
            className={cn({ [style['form__input--block']]: true })}
            {...register('second', {
              required: true,
              maxLength: 1,
            })}
            ref={(e) => { register('second').ref(e); inputRef.current[1] = e; }}
            onChange={(e) => preventOverLength(e, 2)}
          />
          <input
            type="number"
            className={cn({ [style['form__input--block']]: true })}
            {...register('third', {
              required: true,
              maxLength: 1,
            })}
            ref={(e) => { register('third').ref(e); inputRef.current[2] = e; }}
            onChange={(e) => preventOverLength(e, 3)}
          />
          <input
            type="number"
            className={cn({ [style['form__input--block']]: true })}
            {...register('fourth', {
              required: true,
              maxLength: 1,
            })}
            ref={(e) => { register('fourth').ref(e); inputRef.current[3] = e; }}
            onChange={(e) => preventOverLength(e, 4)}
          />
        </div>
        <span className={style.resend}>인증번호 재발송</span>
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
    </div>
  );
}
