import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { changePassword } from 'api/user';
import cn from 'utils/ts/classNames';
import PreviousButton from 'components/PreviousButton/PreviousButton';
import error from 'assets/svg/auth/error.svg';
import style from 'pages/Auth/FindIDPassword/index.module.scss';
import { PasswordInfo } from './entity';
import Modal from './component/Modal';

const PATTERN = /^.*(?=^.{2,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/; // 비밀번호 형식 패턴

export default function ChangePassword(): JSX.Element {
  const [isComplete, setIsComplete] = useState<boolean>();

  const {
    register, handleSubmit, formState: { errors, isValid }, getValues, setError,
  } = useForm<PasswordInfo>({
    mode: 'onChange',
  });

  const changeUserPassword = async (param: PasswordInfo) => {
    try {
      const result = await changePassword(param);
      if (result.status === 200) {
        sessionStorage.removeItem('accessToken');
        setIsComplete(true);
      }
    } catch (e) {
      setError('password', { type: 'value' });
    }
  };

  return (
    <div className={style.layout}>
      <div className={style.back}>
        <PreviousButton />
      </div>
      <div className={style.page}>
        <div>
          <p className={style.page__quote}>
            새 비밀번호를 설정해 주세요.
          </p>
        </div>
        <div className={style.page__error}>
          {(errors.password || errors.passwordCheck) && (
            <span className={style.page__caution}>
              <img src={error} alt="warning" className={style.page__image} />
              {errors.password?.message || errors.passwordCheck?.message}
            </span>
          )}
        </div>
        <form
          className={cn({
            [style.form]: true,
            [style.form__space]: true,
          })}
          onSubmit={handleSubmit(changeUserPassword)}
        >
          <div className={style.form__center}>
            <div className={style.form__label}>새 비밀번호</div>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              className={style.form__input}
              {...register('password', {
                required: '비밀번호를 입력하세요',
                pattern: {
                  value: PATTERN,
                  message: '비밀번호는 문자, 숫자, 특수문자를 포함한\n2~16자리로 이루어져야 합니다.',
                },
              })}
            />
            <div className={cn({ [style['form__label--paddingTop']]: true })}>비밀번호 확인</div>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              className={style.form__input}
              {...register('passwordCheck', {
                required: '비밀번호 확인을 입력하세요',
                validate: (value) => value === getValues('password') || '비밀번호가 일치하지 않습니다.',
              })}
            />
          </div>
          <button
            type="submit"
            className={cn({
              [style.active]: isValid,
              [style.inactive]: true,
            })}
          >
            인증번호 보내기
          </button>
        </form>
      </div>
      {isComplete
        && <Modal type="비밀번호">재설정된 비밀번호로 다시 로그인해 주세요</Modal>}
    </div>
  );
}
