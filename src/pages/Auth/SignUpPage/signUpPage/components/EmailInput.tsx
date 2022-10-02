import React from 'react';
import cn from 'utils/ts/classNames';
import { ReactComponent as ErrorIcon } from 'assets/svg/error.svg';
import { ReactComponent as ArrowIcon } from 'assets/svg/arrow.svg';
import { useFormContext } from 'react-hook-form';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import { DOMAIN, ERROR_MESSAGE } from '../../static/signUp';
import styles from '../SignUp.module.scss';
import { SignUpFormData } from '../entity';

export default function EmailInput() {
  const { register, formState: { errors } } = useFormContext<SignUpFormData>();

  const { isMobile } = useMediaQuery();
  const Reg = isMobile ? /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i : /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])/i;

  return (
    <div className={styles.form__form}>
      <div className={styles.form__label}>
        이메일
        <div className={styles.form__error}>
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
        {...register('email', {
          required: ERROR_MESSAGE.email,
          pattern: {
            value: Reg,
            message: ERROR_MESSAGE.email,
          },
        })}
      />
      <div className={styles['form__email-sign']}>@</div>
      <select
        className={cn({
          [styles.form__select]: true,
          [styles['form__select--error']]: errors?.email !== undefined,
        })}
        placeholder="직접 입력"
      >
        {DOMAIN.map((res) => (
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
  );
}
