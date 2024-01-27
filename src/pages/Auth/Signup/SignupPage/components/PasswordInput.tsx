import React from 'react';
import { useFormContext } from 'react-hook-form';

import { ReactComponent as ErrorIcon } from 'assets/svg/auth/error.svg';
import { ReactComponent as BlindIcon } from 'assets/svg/auth/pw-blind.svg';
import { ReactComponent as ShowIcon } from 'assets/svg/auth/pw-show.svg';
import { PASSWORD_REGEXP } from 'components/Auth/static/Regexp';
import useBlindCheck from 'pages/Auth/Signup/hooks/useBlindCheck';
import { SignUpFormData } from 'pages/Auth/Signup/SignupPage/entity';
import { ERROR_MESSAGE } from 'pages/Auth/Signup/static/signUp';
import cn from 'utils/ts/classNames';

import styles from '../SignUp.module.scss';

export default function PasswordInput() {
  const { register, formState: { errors } } = useFormContext<SignUpFormData>();

  const {
    isBlind, changeBlind,
  } = useBlindCheck();

  return (
    <div className={styles.form__form}>
      <label className={styles.form__label} htmlFor="password-input">
        비밀번호
        <div className={styles.form__error} role="alert">
          <ErrorIcon
            className={cn({
              [styles['form__error-icon']]: true,
              [styles['form__error-icon--active']]:
                errors?.password !== undefined,
            })}
            aria-hidden
          />
          {errors.password?.message}
        </div>
      </label>
      <input
        placeholder="비밀번호를 입력하세요"
        id="password-input"
        type={isBlind ? 'text' : 'password'}
        autoComplete="new-password"
        className={cn({
          [styles.form__input]: true,
          [styles['form__input--error']]: errors?.password !== undefined,
        })}
        {...register('password', {
          required: ERROR_MESSAGE.password,
          minLength: {
            value: 8,
            message: ERROR_MESSAGE.password,
          },
          maxLength: {
            value: 16,
            message: ERROR_MESSAGE.password,
          },
          pattern: {
            value: PASSWORD_REGEXP,
            message: ERROR_MESSAGE.password,
          },
        })}
      />
      <button
        type="button"
        className={styles['form__blind-icon']}
        onClick={changeBlind}
      >
        {isBlind ? (
          <ShowIcon aria-hidden />
        ) : (
          <BlindIcon aria-hidden />
        )}
      </button>
    </div>
  );
}
