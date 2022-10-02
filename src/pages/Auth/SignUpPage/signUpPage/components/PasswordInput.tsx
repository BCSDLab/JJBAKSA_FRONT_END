import React from 'react';
import cn from 'utils/ts/classNames';
import { ReactComponent as ErrorIcon } from 'assets/svg/error.svg';
import { ReactComponent as ShowIcon } from 'assets/svg/pw-show.svg';
import { ReactComponent as BlindIcon } from 'assets/svg/pw-blind.svg';
import { useFormContext } from 'react-hook-form';
import { ERROR_MESSAGE } from '../../static/signUp';
import styles from '../SignUp.module.scss';
import useBlindCheck from '../../hooks/useBlindCheck';
import { SignUpFormData } from '../entity';

const Reg = /^(?=.*[0-9])(?=.*[a-zA-z])(?=.*[!@#$%^&*+=()]).{2,16}$/;

export default function PasswordInput() {
  const { register, formState: { errors } } = useFormContext<SignUpFormData>();

  const {
    isBlind, changeBlind,
  } = useBlindCheck();

  return (
    <div className={styles.form__form}>
      <div className={styles.form__label}>
        비밀번호
        <div className={styles.form__error}>
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
        type={isBlind ? 'text' : 'password'}
        autoComplete="new-password"
        aria-invalid={errors?.password !== undefined}
        aria-errormessage={ERROR_MESSAGE.password}
        className={cn({
          [styles.form__input]: true,
          [styles['form__input--error']]: errors?.password !== undefined,
        })}
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
      {isBlind ? <ShowIcon className={styles['form__blind-icon']} onClick={changeBlind} aria-hidden />
        : <BlindIcon className={styles['form__blind-icon']} onClick={changeBlind} aria-hidden /> }
    </div>
  );
}
