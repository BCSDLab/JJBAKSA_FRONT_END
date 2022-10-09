import React from 'react';
import cn from 'utils/ts/classNames';
import { ReactComponent as ErrorIcon } from 'assets/svg/error.svg';
import { useFormContext } from 'react-hook-form';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import { ERROR_MESSAGE } from '../../static/signUp';
import styles from '../SignUp.module.scss';
import { SignUpFormData } from '../entity';
import DomainDropdown from './DomainDropdown';
import { EMAIL_MOBILE_REGEXP, EMAIL_REGEXP } from '../../static/Regexp';

export default function EmailInput() {
  const { register, formState: { errors } } = useFormContext<SignUpFormData>();

  const { isMobile } = useMediaQuery();
  const emailReg = isMobile ? EMAIL_MOBILE_REGEXP : EMAIL_REGEXP;

  return (
    <div className={styles.form__form}>
      <label className={styles.form__label} htmlFor="email-input">
        이메일
        <div className={styles.form__error} role="alert">
          <ErrorIcon
            className={cn({
              [styles['form__error-icon']]: true,
              [styles['form__error-icon--active']]:
                errors?.emailDomain !== undefined
                || errors?.email !== undefined,
            })}
            aria-hidden
          />
          {errors.email?.message}
        </div>
      </label>
      <input
        placeholder="이메일을 입력하세요"
        id="email-input"
        className={cn({
          [styles.form__input]: true,
          [styles['form__input--email']]: true,
          [styles['form__input--error']]:
            errors?.emailDomain !== undefined || errors?.email !== undefined,
        })}
        {...register('email', {
          required: ERROR_MESSAGE.email,
          pattern: {
            value: emailReg,
            message: ERROR_MESSAGE.email,
          },
        })}
      />
      <div className={styles['form__email-sign']}>@</div>
      <DomainDropdown />
    </div>
  );
}
