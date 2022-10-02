import React from 'react';
import cn from 'utils/ts/classNames';
import { ReactComponent as ErrorIcon } from 'assets/svg/error.svg';
import { useFormContext } from 'react-hook-form';
import { ERROR_MESSAGE } from '../../static/signUp';
import styles from '../SignUp.module.scss';
import { SignUpFormData } from '../entity';

export default function IdInput() {
  const { register, watch, formState: { errors } } = useFormContext<SignUpFormData>();

  return (
    <div className={styles.form__form}>
      <div className={styles.form__label}>
        아이디
        <div className={styles.form__error}>
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

  );
}
