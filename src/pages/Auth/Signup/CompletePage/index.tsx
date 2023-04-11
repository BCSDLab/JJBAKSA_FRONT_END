import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AuthTopNavigation from 'components/Auth/AuthTopNavigation';
import Copyright from 'components/Auth/Copyright';
import { NICKNAME_REGEXP } from 'components/Auth/static/Regexp';
import AuthDetail from 'components/Auth/AuthDetail';
import { ReactComponent as Progress } from 'assets/svg/auth/third-progress.svg';
import styles from './Complete.module.scss';
import useRouteCheck from '../hooks/useRouteCheck';
import { ERROR_MESSAGE } from '../static/signUp';
import { ReactComponent as Complete } from '../../../../assets/svg/auth/complete.svg';
import CompleteModal from './components/CompleteModal';

export default function CompleteForm() {
  useRouteCheck('signUpCheck', '/signup');
  const { register, handleSubmit, watch } = useForm();
  // nickname api 연결
  const onSubmit = (data: any) => data;
  const navigate = useNavigate();
  const nicknameValue = watch('nickname');
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <div className={styles.template}>
      <AuthTopNavigation />
      {modalOpen && <CompleteModal setModalOpen={setModalOpen} />}
      <div className={styles.container}>
        <AuthDetail name="닉네임 설정" first="쩝쩝박사의 서비스를 이용하려면" second="로그인하세요." />
        <div className={styles.progress}>
          <Progress />
        </div>
        <div className={styles.logo}>
          <Complete className={styles.logo__image} />
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
