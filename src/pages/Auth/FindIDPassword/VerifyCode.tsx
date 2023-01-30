import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import cn from 'utils/ts/classNames';
import { sendFindEmail, getAccount, findPassowrd } from 'api/user';
import Modal from './component/Modal';
import useInputCheck from './hook/useInputCheck';
import style from './VerifyCode.module.scss';
import { RegisterProp, CodeInfo } from './entity';
import Input from './component/Input';

const CODE = ['first', 'second', 'third', 'fourth'] as const;

export default function VerifyCode({
  register, handleSubmit, setError, email, account,
}: RegisterProp): JSX.Element {
  const {
    isDone, inputRef, buttonRef, preventOverLength, user, setUser,
  } = useInputCheck();
  const [openModal, setOpenModal] = useState<boolean>();
  const param = useParams();
  const navigate = useNavigate();
  const nextStep = () => {
    if (isDone) {
      if (param.id === 'id') setOpenModal(true);
      else if (param.id === 'password') navigate('/find-password/change');
    }
  };
  const findUserInfo = async (parameter: CodeInfo) => {
    const code = parameter.first + parameter.second + parameter.third + parameter.fourth;
    try {
      if (param.id === 'id') {
        const result = await getAccount({ email, code });
        if (result.status === 200) {
          setUser({
            email,
            id: result.data.account,
          });
        }
      } else if (param.id === 'password' && account) {
        const result = await findPassowrd({ account, email, code });
        if (result.status === 200) {
          sessionStorage.setItem('accessToken', result.data);
        }
      }
      nextStep();
    } catch {
      setError('first', { type: 'value' });
    }
  };
  return (
    <div className={style.container}>
      <form
        onSubmit={
          handleSubmit(findUserInfo)
        }
        className={style.form}
      >
        <div className={style.form__container}>
          <div className={style.form__input}>
            {CODE.map((data, idx) => (
              <Input
                register={register}
                inputRef={inputRef}
                preventOverLength={preventOverLength}
                name={data}
                number={idx + 1}
                index={idx}
                key={data}
              />
            ))}
          </div>
          <button
            type="button"
            className={style.form__resend}
            onClick={() => sendFindEmail({ email })}
          >
            인증번호 재발송
          </button>
        </div>
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
      {openModal && (
        <Modal>
          {user.email}
          으로 가입된 아이디는
          {' '}
          {user.id}
          입니다
        </Modal>
      )}
    </div>
  );
}
