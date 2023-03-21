import { ReactComponent as GoogleIcon } from 'assets/svg/auth/google.svg';
import { ReactComponent as NaverIcon } from 'assets/svg/auth/naver.svg';
import { ReactComponent as KakaoIcon } from 'assets/svg/auth/kakao.svg';
import { ReactComponent as ErrorIcon } from 'assets/svg/auth/error.svg';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import AuthTopNavigation from 'components/Auth/AuthTopNavigation';
import Copyright from 'components/Auth/Copyright';
import cn from 'utils/ts/classNames';
import { useState } from 'react';
import { login } from 'api/user';
import { useUpdateAuth } from 'store/auth';
import { PASSWORD_REGEXP } from 'components/Auth/static/Regexp';
import checkAxiosErrorMessage from 'utils/ts/checkAxiosError';
import { GOOGLE_REDIRECT_URL, KAKAO_REDIRECT_URL, NAVER_REDIRECT_URL } from 'config/constants';
import styles from './Login.module.scss';

interface LoginFormInput {
  id: string;
  password: string;
  isAutoLoginChecked: boolean;
}

const useLoginRequest = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (success: string) => void;
  onError?: (error: string) => void;
}) => {
  const navigate = useNavigate();
  const updateAuth = useUpdateAuth();

  const submitLogin = async ({
    id,
    password,
    isAutoLoginChecked,
  }: LoginFormInput) => {
    if (!PASSWORD_REGEXP.test(password)) {
      onError?.('비밀번호는 문자, 숫자, 특수문자를 포함한 8~16자리로 이루어져야 합니다.');
    } else {
      try {
        const { data } = await login({
          account: id,
          password,
        });

        sessionStorage.setItem('accessToken', data.accessToken);
        await updateAuth();

        // 자동로그인
        if (isAutoLoginChecked) {
          localStorage.setItem('refreshToken', data.refreshToken);
        }

        navigate('/');
        onSuccess?.('성공');
      } catch (error) {
        if (checkAxiosErrorMessage(error)) {
          onError?.(error.response?.data.errorMessage ?? '서버 통신 중 오류가 발생했습니다.');
        }
      }
    }
  };

  return submitLogin;
};

export default function Login(): JSX.Element {
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

  const [errorMsg, setErroMsg] = useState<string>('');
  const submitLogin = useLoginRequest({ onError: setErroMsg });

  return (
    <div>
      <div className={styles.template}>
        <AuthTopNavigation />
        <div className={styles.content}>
          <div className={styles.form}>
            <form
              className={styles.loginform}
              onSubmit={handleSubmit(submitLogin)}
            >
              <div className={styles.loginform__login}>로그인하기</div>
              <div className={styles.loginform__detail}>{'쩝쩝박사의 서비스를 이용하려면\n로그인하세요.'}</div>
              <div className={styles.error}>
                {errorMsg && <ErrorIcon aria-hidden />}
                {errorMsg}
              </div>
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
              <div className={styles.signup}>
                계정이 없으신가요?
                <Link className={styles.signup__link} to="/terms-of-service">
                  회원가입
                </Link>
              </div>
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
                <a
                  className={cn({
                    [styles.social__icon]: true,
                    [styles['social__icon--naver']]: true,
                  })}
                  href={NAVER_REDIRECT_URL}
                >
                  <NaverIcon title="네이버 계정 연동" />
                </a>
              </div>
            </div>
          </div>
          <Copyright />
        </div>
      </div>
    </div>
  );
}
