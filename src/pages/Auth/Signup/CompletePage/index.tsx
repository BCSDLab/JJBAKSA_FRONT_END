import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AuthTitle from 'components/Auth/AuthTitle';
import Copyright from 'components/Auth/Copyright';
import { NICKNAME_REGEXP } from 'components/Auth/static/Regexp';
import styles from './Complete.module.scss';
import useRouteCheck from '../hooks/useRouteCheck';
import { ERROR_MESSAGE } from '../static/signUp';

export default function CompleteForm() {
  useRouteCheck('signUpCheck', '/signup');

  const { register, handleSubmit, watch } = useForm();
  // nickname api 연결
  const onSubmit = (data: any) => data;
  const navigate = useNavigate();
  const nicknameValue = watch('nickname');

  return (
    <div className={styles.template}>
      <div className={styles.container}>
        <AuthTitle />
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.form__icon}>🎉</div>
          <div className={styles.form__text}>
            {'회원가입을 축하합니다!\n당신을 어떻게 부르면 좋을까요?'}
          </div>
          <input
            className={styles.form__input}
            placeholder="닉네임을 입력해주세요"
            {...register('nickname', {
              required: true,
              pattern: {
                value: NICKNAME_REGEXP,
                message: ERROR_MESSAGE.nickname,
              },
            })}
          />
          <button
            type="submit"
            className={
              styles.form__button
            }
            onClick={() => navigate('/login', { replace: true })}
            disabled={nicknameValue === undefined || nicknameValue === ''}
          >
            완료
          </button>
        </form>
        <Copyright />
      </div>
    </div>
  );
}
