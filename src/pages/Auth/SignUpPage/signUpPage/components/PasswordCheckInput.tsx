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

export default function PasswordCheckInput() {
  const { register, watch, formState: { errors } } = useFormContext<SignUpFormData>();

  const {
    isBlind, changeBlind,
  } = useBlindCheck();

  return (
    <div className={styles.form__form}>
      <div className={styles.form__label}>
        비밀번호 확인
        <div className={styles.form__error} role="alert">
          <ErrorIcon
            className={cn({
              [styles['form__error-icon']]: true,
              [styles['form__error-icon--active']]:
                errors?.passwordCheck !== undefined,
            })}
            aria-hidden
          />
          {errors.passwordCheck?.message}
        </div>
      </div>
      <input
        placeholder="비밀번호를 다시 입력하세요"
        type={isBlind ? 'text' : 'password'}
        className={cn({
          [styles.form__input]: true,
          [styles['form__input--error']]: errors?.passwordCheck !== undefined,
        })}
        {...register('passwordCheck', {
          required: ERROR_MESSAGE.passwordCheck,
          validate: {
            checkPw: (v) => v === watch('password') || ERROR_MESSAGE.passwordCheck,
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
