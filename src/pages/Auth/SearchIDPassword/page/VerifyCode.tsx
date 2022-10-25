import { UseFormRegister, UseFormHandleSubmit } from 'react-hook-form';
import cn from 'utils/ts/classNames';
import useInputCheck from '../hook/useInputCheck';
import style from './VerifyCode.module.scss';

interface PropData {
  register: UseFormRegister<FormData>,
  handleSubmit: UseFormHandleSubmit<FormData>,
}

interface InputInfo {
  register: UseFormRegister<FormData>,
  name: 'first' | 'second' | 'third' | 'fourth',
  inputRef: React.MutableRefObject<HTMLInputElement[] | null[]>,
  preventOverLength: (e: React.ChangeEvent<HTMLInputElement>, next: number) => void,
  n: number,
  index: number,
}

export interface FormData {
  first: string,
  second: string,
  third: string,
  fourth: string
}

function Input({
  register, name, inputRef, preventOverLength, n, index,
}: InputInfo) {
  const inputRefCopy = inputRef;
  return (
    <input
      type="number"
      className={cn({ [style['form__input--block']]: true })}
      {...register(name, {
        required: true,
        maxLength: 1,
      })}
      ref={(e) => { register(name).ref(e); inputRefCopy.current[index] = e; }}
      onChange={(e) => preventOverLength(e, n)}
    />
  );
}

const NAME: ['first', 'second', 'third', 'fourth'] = ['first', 'second', 'third', 'fourth'];

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
          {NAME.map((data, idx) => (
            <Input
              register={register}
              inputRef={inputRef}
              preventOverLength={preventOverLength}
              name={data}
              n={idx + 1}
              index={idx}
            />
          ))}
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
