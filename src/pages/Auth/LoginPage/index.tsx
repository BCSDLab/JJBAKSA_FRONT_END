/* eslint-disable react/jsx-props-no-spreading */
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import AuthTitle from 'components/common/AuthTitle';
import Copyright from 'components/common/Copyright';
import styles from './LoginPage.module.scss';

interface IFormInput {
  id: string;
  pw: string;
  checkbox:boolean;
}

function LoginPage(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<IFormInput>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <div className={styles.template}>
      <div className={styles.content}>
        <AuthTitle />
        <div className={styles.form}>
          <form className={styles.loginform} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.loginform__login}>로그인</div>
            <input className={styles['login-input']} type="text" id="id" placeholder="아이디" {...register('id', { required: true })} />
            <input className={styles['login-input']} type="password" id="pw" placeholder="비밀번호" {...register('pw', { required: true })} />
            <label htmlFor="checkbox" className={styles.autologin}>
              <div className={styles.autologin__text}>자동 로그인</div>
              <input type="checkbox" id="checkbox" {...register('checkbox')} className={styles.checkbox} />
              <div className={styles.dot} />
            </label>
            <button type="submit" disabled={!isValid || !isDirty} className={styles.loginform__button}>
              로그인
            </button>
          </form>
          <div className={styles.help}>
            <Link className={styles.help__link} to="/">아이디 찾기</Link>
            <Link className={styles.help__link} to="/">비밀번호 찾기</Link>
            <Link className={styles.help__link} to="/signup">회원가입</Link>
          </div>
          <div className={styles.social}>
            <div className={styles.social__title}>SNS계정으로 로그인하기</div>
            <div className={styles.social__link}>
              <Link to="/">구글</Link>
              <Link to="/">카카오</Link>
              <Link to="/">네이버</Link>
            </div>
          </div>
        </div>
        <Copyright />
      </div>
    </div>
  );
}

export default LoginPage;
