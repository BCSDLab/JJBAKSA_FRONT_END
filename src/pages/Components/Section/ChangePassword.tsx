import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { ReactComponent as Prev } from 'assets/svg/prev-icon.svg';
import warning from 'assets/svg/warning.svg';
import style from './SearchPage.module.scss';
import Modal from './Modal';

const pattern = /^.*(?=^.{2,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/; // 비밀번호 형식 패턴

interface FormData {
  password: string,
  passwordCheck: string,
}
export default function ChangePassword(): JSX.Element {
  const [done, setDone] = useState<boolean>();

  const {
    register, handleSubmit, formState: { errors }, setError,
  } = useForm<FormData>({
    mode: 'onSubmit',
  });

  const passwordConfirm = (data: FormData) => {
    if (data.password !== data.passwordCheck) {
      setError('password', {
        message: '비밀번호가 일치하지 않습니다.',
      }, { shouldFocus: true });
    } else {
      console.log(data);
      setDone(true);
    }
  };

  return (
    <div className={style.layout}>
      <div className={style.container}>
        <div>
          <div className={style.back_icon}>
            <Prev />
          </div>
          <p>
            새 비밀번호를 설정해 주세요.
          </p>
        </div>
        <div className={style.error_message}>
          {(errors.password || errors.passwordCheck) && (
            <div style={{ display: 'flex' }}>
              <img src={warning} alt="warning" className={style.warning} />
              <span>
                {errors.password?.message || errors.passwordCheck?.message}
              </span>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit((data) => passwordConfirm(data))}>
          <div className={style.input_label}>
            <div className={style.email}>새 비밀번호</div>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              className={style.input_style}
              {...register('password', {
                required: '비밀번호를 입력하세요',
                pattern: {
                  value: pattern,
                  message: '비밀번호는 문자, 숫자, 특수문자를 포함한\n2~16자리로 이루어져야 합니다.',
                },
              })}
            />
            <div className={style.email}>비밀번호 확인</div>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              className={style.input_style}
              {...register('passwordCheck', {
                required: '비밀번호 확인을 입력하세요',
              })}
            />
          </div>
          <button type="submit" className={style.active}>완료</button>
        </form>
      </div>
      {done && <Modal modal="passwordModal" />}
    </div>
  );
}
