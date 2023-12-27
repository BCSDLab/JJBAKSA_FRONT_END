import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { modify } from 'api/user';
import { ReactComponent as Complete } from 'assets/svg/auth/complete.svg';
import { ReactComponent as Progress } from 'assets/svg/auth/third-progress.svg';
import AuthDetail from 'components/Auth/AuthDetail';
import AuthTopNavigation from 'components/Auth/AuthTopNavigation';
import Copyright from 'components/Auth/Copyright';
import { NICKNAME_REGEXP } from 'components/Auth/static/Regexp';
import CompleteModal from 'pages/Auth/Signup/CompletePage/components/CompleteModal';
import useRouteCheck from 'pages/Auth/Signup/hooks/useRouteCheck';
import { ERROR_MESSAGE } from 'pages/Auth/Signup/static/signUp';
import useBooleanState from 'utils/hooks/useBooleanState';
import makeToast from 'utils/ts/makeToast';

import styles from './Complete.module.scss';

interface CompleteFormData {
  nickname: string;
}

export default function CompleteForm() {
  useRouteCheck('signUpCheck', '/signup');
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm<CompleteFormData>();

  const onSubmit = async ({ nickname }: CompleteFormData) => {
    modify({ nickname }).then(() => {
      navigate('/login', { replace: true });
    }).catch(() => {
      makeToast('error', '닉네임 설정에 실패했습니다.');
    });
  };
  const nicknameValue = watch('nickname');
  const [modal,, close] = useBooleanState(true);

  return (
    <div className={styles.template}>
      <AuthTopNavigation />
      {modal && <CompleteModal closeModal={close} />}
      <div className={styles.container}>
        <div className={styles.nickname}>
          <AuthDetail name="닉네임 설정" first="쩝쩝박사의 서비스를 이용하려면" second="로그인하세요." />
          <Progress className={styles['nickname-progress']} />
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
            className={styles.form__button}
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
