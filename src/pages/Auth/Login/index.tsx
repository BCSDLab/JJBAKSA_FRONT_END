import { ReactComponent as GoogleIcon } from 'assets/svg/google.svg';
import { ReactComponent as NaverIcon } from 'assets/svg/naver.svg';
import { ReactComponent as KakaoIcon } from 'assets/svg/kakao.svg';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import AuthTitle from 'components/Auth/AuthTitle';
import Copyright from 'components/Auth/Copyright';
import cn from 'utils/ts/classNames';
import styles from './Login.module.scss';

interface IFormInput {
  id: string;
  pw: string;
  checkbox: boolean;
}

function Login(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<IFormInput>({
    mode: 'onChange',
    defaultValues: {
      id: '',
      pw: '',
      checkbox: false,
    },
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <div className={styles.template}>
      <div className={styles.content}>
        <AuthTitle />
        <div className={styles.form}>
          <form className={styles.loginform} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.loginform__login}>로그인</div>
            <input className={styles.loginform__input} type="text" id="id" placeholder="아이디" {...register('id', { required: true })} autoComplete="username" />
            <input className={styles.loginform__input} type="password" id="pw" placeholder="비밀번호" {...register('pw', { required: true })} autoComplete="current-password" />
            <div className={styles.autologin}>
              <label htmlFor="checkbox">
                <span className={styles.autologin__text}>자동 로그인</span>
                <input type="checkbox" id="checkbox" {...register('checkbox')} className={styles.checkbox} />
              </label>
            </div>
            <button type="submit" disabled={!isValid} className={styles.loginform__button}>
              로그인
            </button>
          </form>
          <div className={styles.help}>
            <Link className={styles.help__link} to="/">아이디 찾기</Link>
            <Link className={styles.help__link} to="/">비밀번호 찾기</Link>
            <Link className={styles.help__link} to="/terms-of-service">회원가입</Link>
          </div>
          <div className={styles.social}>
            <div className={styles.social__title}>SNS계정으로 로그인하기</div>
            <div className={styles.social__link}>
              <Link
                className={cn({
                  [styles.social__icon]: true,
                  [styles['social__icon--google']]: true,
                })}
                to="/"
              >
                <GoogleIcon title="구글 계정 연동" />
              </Link>
              <Link
                className={cn({
                  [styles.social__icon]: true,
                  [styles['social__icon--kakao']]: true,
                })}
                to="/"
              >
                <KakaoIcon title="카카오 계정 연동" />
              </Link>
              <Link
                className={cn({
                  [styles.social__icon]: true,
                  [styles['social__icon--naver']]: true,
                })}
                to="/"
              >
                <NaverIcon title="네이버 계정 연동" />
              </Link>
            </div>
          </div>
        </div>
        <Copyright />
      </div>
    </div>
  );
}

export default Login;
