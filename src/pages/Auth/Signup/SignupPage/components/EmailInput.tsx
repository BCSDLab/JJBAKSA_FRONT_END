import React from 'react';
import { useFormContext } from 'react-hook-form';

import { ReactComponent as ErrorIcon } from 'assets/svg/auth/error.svg';
import { EMAIL_REGEXP } from 'components/Auth/static/Regexp';
import { SignUpFormData } from 'pages/Auth/Signup/SignupPage/entity';
import { ERROR_MESSAGE } from 'pages/Auth/Signup/static/signUp';
import cn from 'utils/ts/classNames';

import styles from '../SignUp.module.scss';
// import DomainDropdown from './DomainDropdown';

export default function EmailInput() {
  const { register, formState: { errors } } = useFormContext<SignUpFormData>();

  const emailReg = EMAIL_REGEXP;

  return (
    <div className={styles.form__form}>
      <label className={styles.form__label} htmlFor="email-input">
        이메일
        <div className={styles.form__error} role="alert">
          <ErrorIcon
            className={cn({
              [styles['form__error-icon']]: true,
              [styles['form__error-icon--active']]:
              errors?.email !== undefined,
            })}
            aria-hidden
          />
          {errors.email && errors.email?.message}
        </div>
      </label>
      <input
        placeholder="이메일을 입력하세요"
        id="email-input"
        className={cn({
          [styles.form__input]: true,
          [styles['form__input--email']]: true,
          [styles['form__input--error']]:
            errors?.email !== undefined,
        })}
        {...register('email', {
          required: ERROR_MESSAGE.email,
          pattern: {
            value: emailReg,
            message: ERROR_MESSAGE.email,
          },
        })}
      />
    </div>
  );
}
