import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import cn from 'utils/ts/classNames';
import { useNavigate } from 'react-router-dom';
import styles from './SignUpForm.module.scss';
import domain from './static/domain';
import { ReactComponent as ArrowIcon } from '../../../assets/svg/arrow.svg';
import { ReactComponent as ErrorIcon } from '../../../assets/svg/error.svg';
import { ReactComponent as ShowIcon } from '../../../assets/svg/pw-show.svg';
import { ReactComponent as BlindIcon } from '../../../assets/svg/pw-blind.svg';

interface ISignUpValue {
  id: string | number;
  email: string | number;
  password: string | number;
  ['passwordCheck']: string | number;
}

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISignUpValue>({
    defaultValues: {
      id: '',
      email: '',
      password: '',
      passwordCheck: '',
    },
  });

  const navigate = useNavigate();
  const [isPwBlind, setIsPwBlind] = useState(false);
  const [isPwchBlind, setIsPwchBlind] = useState(false);

  // eslint-disable-next-line prefer-regex-literals, no-useless-escape
  const Reg = new RegExp('^(?=.*[0-9])(?=.*[a-zA-z])(?=.*[!@#$%^&*+=]).{2,16}$');

  return (
    <div className={styles.template}>
      <div className={styles.container}>
        {/* header */}
        <div>쩝쩝박사</div>

        <form
          className={styles['sign-up-form']}
          onSubmit={handleSubmit((data) => {
            // api 호출
            console.log(data);
          })}
        >
          <div className={styles['sign-up-form__title']}>
            회원가입
          </div>

          {/* ID */}
          <div className={styles['sign-up-form__form']}>
            <div className={styles['sign-up-form__label']}>
              아이디
              <div className={styles['sign-up-form__error-text']}>
                <ErrorIcon
                  className={cn({
                    [styles['sign-up-form__error-icon']]: true,
                    [styles['sign-up-form__error-icon--active']]: errors?.id?.ref?.value !== undefined,
                  })}
                  aria-hidden
                />
                {errors.id?.message}
              </div>
            </div>
            <input
              placeholder="아이디를 입력하세요"
              className={cn({
                [styles['sign-up-form__input']]: true,
                [styles['sign-up-form__input--id']]: true,
                [styles['sign-up-form__input--error']]: errors?.id?.ref?.value !== undefined,
              })}
        // TODO: 아이디 중복확인 기능
        // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('id', { required: '아이디 중복확인을 해주세요.' })}
            />
            <button
              type="button"
              className={cn({
                [styles['sign-up-form__id-check-button']]: true,
                [styles['sign-up-form__id-check-button--active']]: watch('id') !== '',
                [styles['sign-up-form__id-check-button--error']]: errors?.id?.ref?.value !== undefined,
              })}
              disabled={errors?.id?.ref?.value !== undefined}
            >
              중복 확인
            </button>
          </div>

          {/* EMAIL */}
          <div className={styles['sign-up-form__form']}>
            <div className={styles['sign-up-form__label']}>
              이메일
              <div className={styles['sign-up-form__error-text']}>
                <ErrorIcon
                  className={cn({
                    [styles['sign-up-form__error-icon']]: true,
                    [styles['sign-up-form__error-icon--active']]: errors?.email?.ref?.value === '',
                  })}
                  aria-hidden
                />
                {errors.email?.message}
              </div>
            </div>
            <input
              placeholder="이메일을 입력하세요"
              className={cn({
                [styles['sign-up-form__input']]: true,
                [styles['sign-up-form__input--email']]: true,
                [styles['sign-up-form__input--error']]: errors?.email?.ref?.value === '',
              })}
        // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('email', { required: '존재하지 않는 도메인입니다.' })}
            />
            <div className={styles['sign-up-form__email-sign']}>@</div>
            <select
              className={cn({
                [styles['sign-up-form__select']]: true,
                [styles['sign-up-form__select--error']]: errors?.email?.ref?.value === '',
              })}
              placeholder="직접 입력"
            >
              {domain.map((res) => (
                <option key={res.key} className={styles['sign-up-form__option']} value={res.name}>{res.address}</option>
              ))}
            </select>
            <ArrowIcon className={styles['sign-up-form__arrow-icon']} aria-hidden />
          </div>

          {/* PASSWORD */}
          <div className={styles['sign-up-form__form']}>
            <div className={styles['sign-up-form__label']}>
              비밀번호
              <div className={styles['sign-up-form__error-text']}>
                <ErrorIcon
                  className={cn({
                    [styles['sign-up-form__error-icon']]: true,
                    [styles['sign-up-form__error-icon--active']]: errors?.password?.type !== undefined,
                  })}
                  aria-hidden
                />
                {errors.password?.message}
              </div>
            </div>
            <input
              placeholder="비밀번호를 입력하세요"
              type={isPwBlind ? 'text' : 'password'}
              className={cn({
                [styles['sign-up-form__input']]: true,
                [styles['sign-up-form__input--error']]: errors?.password?.type !== undefined,
              })}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('password', {
                required: '비밀번호는 문자, 숫자, 특수문자를 포함한 2~16자리로 이루어져야합니다.',
                minLength: {
                  value: 2,
                  message: '비밀번호는 문자, 숫자, 특수문자를 포함한 2~16자리로 이루어져야합니다.',
                },
                maxLength: {
                  value: 16,
                  message: '비밀번호는 문자, 숫자, 특수문자를 포함한 2~16자리로 이루어져야합니다.',
                },
                pattern: {
                  // eslint-disable-next-line prefer-regex-literals, no-useless-escape
                  value: Reg,
                  message: '비밀번호는 문자, 숫자, 특수문자를 포함한 2~16자리로 이루어져야합니다.',
                },
              })}
            />
            {isPwBlind ? <ShowIcon className={styles['sign-up-form__blind-icon']} onClick={() => setIsPwBlind(false)} aria-hidden />
              : <BlindIcon className={styles['sign-up-form__blind-icon']} onClick={() => setIsPwBlind(true)} aria-hidden /> }
          </div>

          {/* PASSWORD-CHECK */}
          <div className={styles['sign-up-form__form']}>
            <div className={styles['sign-up-form__label']}>
              비밀번호 확인
              <div className={styles['sign-up-form__error-text']}>
                <ErrorIcon
                  className={cn({
                    [styles['sign-up-form__error-icon']]: true,
                    [styles['sign-up-form__error-icon--active']]: errors?.passwordCheck !== undefined,
                  })}
                  aria-hidden
                />
                {errors.passwordCheck?.message}
              </div>
            </div>
            <input
              placeholder="비밀번호를 다시 입력하세요"
              type={isPwchBlind ? 'text' : 'password'}
              className={cn({
                [styles['sign-up-form__input']]: true,
                [styles['sign-up-form__input--error']]: errors?.passwordCheck !== undefined,
              })}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('passwordCheck', {
                required: '비밀번호가 일치하지 않습니다.',
                validate: {
                  checkPw: (v) => v === watch('password') || '비밀번호가 일치하지 않습니다.',
                },
              })}
            />
            {isPwchBlind ? <ShowIcon className={styles['sign-up-form__blind-icon']} onClick={() => setIsPwchBlind(false)} aria-hidden />
              : <BlindIcon className={styles['sign-up-form__blind-icon']} onClick={() => setIsPwchBlind(true)} aria-hidden /> }
          </div>
          <button
            type="submit"
            className={cn({
              [styles['sign-up-form__button']]: true,
              [styles['sign-up-form__button--active']]: watch('id') !== '' || errors?.id === undefined || errors?.email === undefined || errors?.password === undefined || errors?.passwordCheck === undefined,
            })}
            onClick={() => (errors?.id === undefined || errors?.email === undefined || errors?.password === undefined || errors?.passwordCheck === undefined ? navigate('/SignUp/Complete') : navigate(''))}
          >
            완료
          </button>
        </form>

        {/* footer */}
      </div>
    </div>
  );
}
