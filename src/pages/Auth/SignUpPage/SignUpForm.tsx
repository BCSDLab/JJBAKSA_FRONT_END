import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import cn from 'utils/ts/classNames';
import { useNavigate } from 'react-router-dom';
import styles from './SignUpForm.module.scss';
import domain from './static/domain';
import { ReactComponent as ErrorIcon } from '../../../assets/svg/error.svg';
import { ReactComponent as ShowIcon } from '../../../assets/svg/show-icon.svg';
import { ReactComponent as BlindIcon } from '../../../assets/svg/blind-icon.svg';

/* interface ISignUpValue {
  id: string | number;
  email: string | number;
  password: string | number;
  ['passwordCheck']: string | number;
} */

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      id: '',
      email: '',
      password: '',
      passwordCheck: '',
    },
  });
  const navigate = useNavigate();
  const [isPwCheck, setIsPwCheck] = useState(false);
  const [isPwBlind, setIsPwBlind] = useState(false);
  const [isPwchBlind, setIsPwchBlind] = useState(false);

  useEffect(() => {
    if (watch('passwordCheck') === watch('password')) {
      setIsPwCheck(true);
    } else { setIsPwCheck(false); }
  }, [watch, errors]);

  console.log(errors);

  return (
    <div className={styles.template}>
      <div className={styles.content}>
        {/* 헤더 */}
        <div>쩝쩝박사</div>

        <form
          className={styles['sign-up-form']}
          onSubmit={handleSubmit(async (data) => {
            await new Promise((r) => { setTimeout(r, 1000); });
            console.log(JSON.stringify(data));
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
                <ErrorIcon className={cn({
                  [styles['sign-up-form__error-icon']]: errors?.id?.ref?.value !== '',
                  [styles['sign-up-form__error-icon--active']]: errors?.id?.ref?.value === '',
                })}
                />
                {errors.id?.message}
              </div>
            </div>
            <input
              placeholder="아이디를 입력하세요"
              className={cn({
                [styles['sign-up-form__input']]: true,
                [styles['sign-up-form__input--id']]: true,
              })}
        // 추후 아이디 중복 에러 메시지 추가
        // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('id', { required: '아이디 중복확인을 해주세요.' })}
            />
            <button type="button" className={styles['sign-up-form__button']}>중복 확인</button>
          </div>

          {/* EMAIL */}
          <div className={styles['sign-up-form__form']}>
            <div className={styles['sign-up-form__label']}>
              이메일
              <div className={styles['sign-up-form__error-text']}>
                <ErrorIcon className={cn({
                  [styles['sign-up-form__error-icon']]: errors?.email?.ref?.value !== '',
                  [styles['sign-up-form__error-icon--active']]: errors?.email?.ref?.value === '',
                })}
                />
                {errors.email?.message}
              </div>
            </div>
            <input
              placeholder="이메일을 입력하세요"
              className={cn({
                [styles['sign-up-form__input']]: true,
                [styles['sign-up-form__input--email']]: true,
              })}
        // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('email', { required: '존재하지 않는 도메인입니다.' })}
            />
            <div className={styles['sign-up-form__email-sign']}>@</div>
            <select className={styles['sign-up-form__select']}>
              {domain.map((res) => (
                <option key={res.key} className={styles['sign-up-form__option']} value={res.name}>{res.address}</option>
              ))}
            </select>
          </div>

          {/* PASSWORD */}
          <div className={styles['sign-up-form__form']}>
            <div className={styles['sign-up-form__label']}>
              비밀번호
              <div className={styles['sign-up-form__error-text']}>
                <ErrorIcon className={cn({
                  [styles['sign-up-form__error-icon']]: errors?.password?.ref?.value !== '',
                  [styles['sign-up-form__error-icon--active']]: errors?.password?.ref?.value === '',
                })}
                />
                {errors.password?.message}
              </div>
            </div>
            <input
              placeholder="비밀번호를 입력하세요"
              type="password"
              className={cn({
                [styles['sign-up-form__input']]: true,
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
              })}
            />
            {isPwBlind ? <ShowIcon className={styles['sign-up-form__blind-icon']} onClick={() => setIsPwBlind(false)} />
              : <BlindIcon className={styles['sign-up-form__blind-icon']} onClick={() => setIsPwBlind(true)} /> }
          </div>

          {/* PASSWORD-CHECK */}
          <div className={styles['sign-up-form__form']}>
            <div className={styles['sign-up-form__label']}>
              비밀번호 확인
              <div className={styles['sign-up-form__error-text']}>
                <ErrorIcon className={cn({
                  [styles['sign-up-form__error-icon']]: errors?.passwordCheck?.ref?.value !== '',
                  [styles['sign-up-form__error-icon--active']]: errors?.passwordCheck?.ref?.value === '' || !isPwCheck,
                })}
                />
                {isPwCheck && errors?.passwordCheck?.ref?.value !== '' ? null : errors.passwordCheck?.message}
              </div>
            </div>
            <input
              placeholder="비밀번호를 다시 입력하세요"
              type="password"
              className={cn({
                [styles['sign-up-form__input']]: true,
              })}
        // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('passwordCheck', { required: '비밀번호가 일치하지 않습니다.' })}
            />
            {isPwchBlind ? <ShowIcon className={styles['sign-up-form__blind-icon']} onClick={() => setIsPwchBlind(false)} />
              : <BlindIcon className={styles['sign-up-form__blind-icon']} onClick={() => setIsPwchBlind(true)} /> }
          </div>
          <button
            type="submit"
            className={cn({
              [styles.content__button]: true,
              [styles['content__button--active']]: isSubmitting === false,
            })}
            onClick={() => navigate('')}
            disabled={isSubmitting}
          >
            완료
          </button>
        </form>
      </div>
    </div>
  );
}
