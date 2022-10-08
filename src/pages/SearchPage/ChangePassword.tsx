import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { ReactComponent as Prev } from 'assets/svg/prev-icon.svg';
import error from 'assets/svg/login-error.svg';
import style from './SearchPage.module.scss';
import Modal from './Modal';

const pattern = /^.*(?=^.{2,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/; // 비밀번호 형식 패턴

interface FormData {
  password: string,
  passwordCheck: string,
}
export default function ChangePassword(): JSX.Element {
  const [isComplete, setIsComplete] = useState<boolean>();

  const {
    register, handleSubmit, formState: { errors, isValid }, setError,
  } = useForm<FormData>({
    mode: 'onChange',
  });

  const passwordConfirm = (data: FormData) => {
    if (data.password !== data.passwordCheck) {
      setError('password', {
        message: '비밀번호가 일치하지 않습니다.',
      }, { shouldFocus: true });
    } else {
      console.log(data);
      setIsComplete(true);
    }
  };

  return (
    <div className={style.layout}>
      <div className={style.page}>
        <div>
          <div className={style.page__back}>
            <Prev />
          </div>
          <p className={style.page__quote}>
            새 비밀번호를 설정해 주세요.
          </p>
        </div>
        <div className={style.page__error}>
          {(errors.password || errors.passwordCheck) && (
            <div style={{ display: 'flex' }}>
              <img src={error} alt="warning" className={style.warning} />
              <span>
                {errors.password?.message || errors.passwordCheck?.message}
              </span>
            </div>
          )}
        </div>
        <form className={style.form} onSubmit={handleSubmit((data) => passwordConfirm(data))}>
          <div className={style.form__center}>
            <div className={style.form__label}>새 비밀번호</div>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              className={style.form__input}
              {...register('password', {
                required: '비밀번호를 입력하세요',
                pattern: {
                  value: pattern,
                  message: '비밀번호는 문자, 숫자, 특수문자를 포함한\n2~16자리로 이루어져야 합니다.',
                },
              })}
            />
            <div className={style.form__label}>비밀번호 확인</div>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              className={style.form__input}
              {...register('passwordCheck', {
                required: '비밀번호 확인을 입력하세요',
              })}
            />
          </div>
          <button type="submit" className={isValid ? style.active : style.inactive}>완료</button>
        </form>
      </div>
      {isComplete && <Modal modal="passwordModal" />}
    </div>
  );
}
