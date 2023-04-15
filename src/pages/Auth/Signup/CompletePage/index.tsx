import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AuthTopNavigation from 'components/Auth/AuthTopNavigation';
import Copyright from 'components/Auth/Copyright';
import { NICKNAME_REGEXP } from 'components/Auth/static/Regexp';
import AuthDetail from 'components/Auth/AuthDetail';
import { ReactComponent as Progress } from 'assets/svg/auth/third-progress.svg';
import { ReactComponent as Complete } from 'assets/svg/auth/complete.svg';
import useBooleanState from 'utils/hooks/useBooleanState';
import styles from './Complete.module.scss';
import useRouteCheck from '../hooks/useRouteCheck';
import { ERROR_MESSAGE } from '../static/signUp';
import CompleteModal from './components/CompleteModal';

export default function CompleteForm() {
  useRouteCheck('signUpCheck', '/signup');
  const { register, handleSubmit, watch } = useForm();
  const onSubmit = (data: any) => data;
  const navigate = useNavigate();
  const nicknameValue = watch('nickname');
  const [modal,, close] = useBooleanState(true);

  return (
    <div className={styles.template}>
      <AuthTopNavigation />
      {modal && <CompleteModal setFalse={close} />}
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.form__nickname}>
            <AuthDetail name="닉네임 설정" first="쩝쩝박사의 서비스를 이용하려면" second="로그인하세요." />
            <Progress className={styles['form__nickname-Progress']} />
          </div>
          <Complete className={styles.form__logo} />
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
