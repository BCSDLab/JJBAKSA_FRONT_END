import { UseFormRegister, UseFormHandleSubmit } from 'react-hook-form';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import cn from 'utils/ts/classNames';
import Modal from '../component/Modal';
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
  const [openModal, setOpenModal] = useState<boolean>();
  const param = useParams();
  const navigate = useNavigate();
  const NextStep = () => {
    if (isDone) {
      if (param.id === 'id') setOpenModal(true);
      else if (param.id === 'password') navigate('/find-password/change');
    }
  };
  return (
    <div className={style.container}>
      <form
        onSubmit={
        handleSubmit((data: FormData) => data)
      }
        className={style.form}
      >
        <div className={style.form__container}>
          <div className={style.form__input}>
            {NAME.map((data, idx) => (
              <Input
                register={register}
                inputRef={inputRef}
                preventOverLength={preventOverLength}
                name={data}
                n={idx + 1}
                index={idx}
                key={data}
              />
            ))}
          </div>
          <span className={style.form__resend}>인증번호 재발송</span>
        </div>
        <button
          type="submit"
          ref={buttonRef}
          onClick={NextStep}
          className={cn({
            [style.active]: isDone,
            [style.inactive]: true,
          })}
        >
          완료
        </button>
      </form>
      {openModal && <Modal>새로운 아이디로 로그인 해주세요</Modal>}
    </div>
  );
}
