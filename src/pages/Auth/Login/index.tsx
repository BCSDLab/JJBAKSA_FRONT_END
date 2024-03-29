/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ReactComponent as ErrorIcon } from 'assets/svg/auth/error.svg';
import { ReactComponent as GoogleIcon } from 'assets/svg/auth/google.svg';
import { ReactComponent as KakaoIcon } from 'assets/svg/auth/kakao.svg';
import AuthDetail from 'components/Auth/AuthDetail';
import AuthTitle from 'components/Auth/AuthTitle';
import Copyright from 'components/Auth/Copyright';
import { GOOGLE_REDIRECT_URL, KAKAO_REDIRECT_URL } from 'config/constants';
import { LoginFormInput } from 'pages/Auth/Login/hooks/entity';
import useLoginRequest from 'pages/Auth/Login/hooks/useLoginRequest';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import cn from 'utils/ts/classNames';

import styles from './Login.module.scss';

export default function Login(): JSX.Element {
  const { isMobile } = useMediaQuery();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginFormInput>({
    mode: 'onChange',
    defaultValues: {
      id: '',
      password: '',
      isAutoLoginChecked: false,
    },
  });

  const [errorMsg, setErrorMsg] = useState<string>('');
  const submitLogin = useLoginRequest({ onError: setErrorMsg });

  return (
    <div className={styles.template}>
      <div className={styles.content}>
        <div className={styles.form}>
          <form
            className={styles.loginform}
            onSubmit={handleSubmit(submitLogin)}
          >
            <div className={styles.error}>
              {errorMsg && <ErrorIcon aria-hidden />}
              {errorMsg}
            </div>
            {!isMobile ? <AuthDetail name="로그인하기" first="쩝쩝박사의 서비스를 이용하려면" second="로그인하세요." /> : <div className={styles.loginform__logo}><AuthTitle /></div>}
            <input
              className={styles.loginform__input}
              type="text"
              id="id"
              placeholder="아이디"
              {...register('id', { required: true })}
              autoComplete="username"
            />
            <input
              className={styles.loginform__input}
              type="password"
              id="password"
              placeholder="비밀번호"
              autoComplete="current-password"
              {...register('password', {
                required: true,
              })}
            />
            <div className={styles.middle}>
              <span className={styles.signup}>
                계정이 없으신가요?&nbsp;
                <Link className={styles.signup__link} to="/terms-of-service">
                  회원가입
                </Link>
              </span>
              <div className={styles.autologin}>
                <label htmlFor="checkbox">
                  <span className={styles.autologin__text}>자동 로그인</span>
                  <input
                    type="checkbox"
                    id="checkbox"
                    {...register('isAutoLoginChecked')}
                    className={styles.autologin_checkbox}
                  />
                </label>
              </div>
            </div>
            <button
              type="submit"
              disabled={!isValid}
              className={styles.loginform__button}
            >
              로그인
            </button>
          </form>
          <div className={styles.help}>
            <Link className={styles.help__link} to="/find-id">
              아이디 찾기
            </Link>
            <Link className={styles.help__link} to="/find-password">
              비밀번호 찾기
            </Link>
          </div>
          <div className={styles.divide}>
            또는
          </div>
          <div className={styles.social}>
            <div className={styles.social__title}>SNS 계정으로 로그인하기</div>
            <div className={styles.social__link}>
              <a
                className={cn({
                  [styles.social__icon]: true,
                  [styles['social__icon--google']]: true,
                })}
                href={GOOGLE_REDIRECT_URL}
              >
                <GoogleIcon title="구글 계정 연동" />
              </a>
              <a
                className={cn({
                  [styles.social__icon]: true,
                  [styles['social__icon--kakao']]: true,
                })}
                href={KAKAO_REDIRECT_URL}
              >
                <KakaoIcon title="카카오 계정 연동" />
              </a>
            </div>
          </div>
        </div>
        <Copyright />
      </div>
    </div>
  );
}
