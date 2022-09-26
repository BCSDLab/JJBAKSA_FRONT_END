import React from 'react';
import { useForm } from 'react-hook-form';
import cn from 'utils/ts/classNames';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowIcon } from 'assets/svg/arrow.svg';
import { ReactComponent as ErrorIcon } from 'assets/svg/error.svg';
import { ReactComponent as ShowIcon } from 'assets/svg/pw-show.svg';
import { ReactComponent as BlindIcon } from 'assets/svg/pw-blind.svg';
import { domain, ERROR_MESSAGE } from './static/signUp';
import styles from './SignUp.module.scss';
import useRouteCheck from './hooks/useRouteCheck';
import useBlindCheck from './hooks/useBlindCheck';

export default function SignUpForm() {
  useRouteCheck('termsCheck', '/termsofservice');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { isDirty, isValid, errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      id: '',
      email: '',
      password: '',
      passwordCheck: '',
    },
  });

  const clickSubmit = () => {
    if (isDirty && isValid) {
      navigate('/signup/complete', { state: { signUpCheck: true }, replace: true });
    } else {
      navigate('');
    }
  };

  const {
    isPwBlind, isPwchBlind, setIsPwBlind, setIsPwchBlind,
  } = useBlindCheck();

  const Reg = /^(?=.*[0-9])(?=.*[a-zA-z])(?=.*[!@#$%^&*+=]).{2,16}$/;

  return (
    <div className={styles.template}>
      <div className={styles.container}>
        {/* header */}
        <div>쩝쩝박사</div>

        <form
          className={styles.form}
          // form 제출 api 호출
          onSubmit={handleSubmit((res) => res)}
        >
          <div className={styles.form__title}>
            회원가입
          </div>

          {/* ID */}
          <div className={styles.form__form}>
            <div className={styles.form__label}>
              아이디
              <div className={styles['form__error-text']}>
                <ErrorIcon
                  className={cn({
                    [styles['form__error-icon']]: true,
                    [styles['form__error-icon--active']]: errors?.id !== undefined,
                  })}
                  aria-hidden
                />
                {errors.id?.message}
              </div>
            </div>
            <input
              placeholder="아이디를 입력하세요"
              // eslint-disable-next-line jsx-a11y/aria-props
              aria-invaild={errors?.id !== undefined}
              aria-errormessage={ERROR_MESSAGE.id}
              className={cn({
                [styles.form__input]: true,
                [styles['form__input--id']]: true,
                [styles['form__input--error']]: errors?.id !== undefined,
              })}
        // TODO: 아이디 중복확인 기능
        // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('id', { required: ERROR_MESSAGE.id })}
            />
            <button
              type="button"
              className={cn({
                [styles['form__id-check-button']]: true,
                [styles['form__id-check-button--active']]: watch('id') !== '',
                [styles['form__id-check-button--error']]: errors?.id !== undefined,
              })}
              disabled={errors?.id !== undefined}
            >
              중복 확인
            </button>
          </div>

          {/* EMAIL */}
          <div className={styles.form__form}>
            <div className={styles.form__label}>
              이메일
              <div className={styles['form__error-text']}>
                <ErrorIcon
                  className={cn({
                    [styles['form__error-icon']]: true,
                    [styles['form__error-icon--active']]: errors?.email !== undefined,
                  })}
                  aria-hidden
                />
                {errors.email?.message}
              </div>
            </div>
            <input
              placeholder="이메일을 입력하세요"
              // eslint-disable-next-line jsx-a11y/aria-props
              aria-invaild={errors?.email !== undefined}
              aria-errormessage={ERROR_MESSAGE.email}
              className={cn({
                [styles.form__input]: true,
                [styles['form__input--email']]: true,
                [styles['form__input--error']]: errors?.email !== undefined,
              })}
            // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('email', { required: ERROR_MESSAGE.email })}
            />
            <div className={styles['form__email-sign']}>@</div>
            <select
              className={cn({
                [styles.form__select]: true,
                [styles['form__select--error']]: errors?.email !== undefined,
              })}
              placeholder="직접 입력"
            >
              {domain.map((res) => (
                <option
                  key={res.key}
                  className={styles.form__option}
                  value={res.name}
                >
                  {res.address}

                </option>
              ))}
            </select>
            <ArrowIcon className={styles['form__arrow-icon']} aria-hidden />
          </div>

          {/* PASSWORD */}
          <div className={styles.form__form}>
            <div className={styles.form__label}>
              비밀번호
              <div className={styles['form__error-text']}>
                <ErrorIcon
                  className={cn({
                    [styles['form__error-icon']]: true,
                    [styles['form__error-icon--active']]: errors?.password !== undefined,
                  })}
                  aria-hidden
                />
                {errors.password?.message}
              </div>
            </div>
            <input
              placeholder="비밀번호를 입력하세요"
              type={isPwBlind ? 'text' : 'password'}
              autoComplete="new-password"
              // eslint-disable-next-line jsx-a11y/aria-props
              aria-invaild={errors?.password !== undefined}
              aria-errormessage={ERROR_MESSAGE.password}
              className={cn({
                [styles.form__input]: true,
                [styles['form__input--error']]: errors?.password !== undefined,
              })}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('password', {
                required: ERROR_MESSAGE.password,
                minLength: {
                  value: 2,
                  message: ERROR_MESSAGE.password,
                },
                maxLength: {
                  value: 16,
                  message: ERROR_MESSAGE.password,
                },
                pattern: {
                  value: Reg,
                  message: ERROR_MESSAGE.password,
                },
              })}
            />
            {isPwBlind ? <ShowIcon className={styles['form__blind-icon']} onClick={() => setIsPwBlind(false)} aria-hidden />
              : <BlindIcon className={styles['form__blind-icon']} onClick={() => setIsPwBlind(true)} aria-hidden /> }
          </div>

          {/* PASSWORD-CHECK */}
          <div className={styles.form__form}>
            <div className={styles.form__label}>
              비밀번호 확인
              <div className={styles['form__error-text']}>
                <ErrorIcon
                  className={cn({
                    [styles['form__error-icon']]: true,
                    [styles['form__error-icon--active']]: errors?.passwordCheck !== undefined,
                  })}
                  aria-hidden
                />
                {errors.passwordCheck?.message}
              </div>
            </div>
            <input
              placeholder="비밀번호를 다시 입력하세요"
              type={isPwchBlind ? 'text' : 'password'}
              // eslint-disable-next-line jsx-a11y/aria-props
              aria-invaild={errors?.passwordCheck !== undefined}
              aria-errormessage={ERROR_MESSAGE.passwordCheck}
              className={cn({
                [styles.form__input]: true,
                [styles['form__input--error']]: errors?.passwordCheck !== undefined,
              })}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('passwordCheck', {
                required: ERROR_MESSAGE.passwordCheck,
                validate: {
                  checkPw: (v) => v === watch('password') || ERROR_MESSAGE.passwordCheck,
                },
              })}
            />
            {isPwchBlind ? <ShowIcon className={styles['form__blind-icon']} onClick={() => setIsPwchBlind(false)} aria-hidden />
              : <BlindIcon className={styles['form__blind-icon']} onClick={() => setIsPwchBlind(true)} aria-hidden /> }
          </div>
          <button
            type="submit"
            className={
              styles.form__button
            }
            disabled={!isDirty || !isValid}
            onClick={clickSubmit}
          >
            완료
          </button>
        </form>

        {/* footer */}
      </div>
    </div>
  );
}
