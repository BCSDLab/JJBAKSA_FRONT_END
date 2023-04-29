import React from 'react';
import { FormProvider, UseFormSetError, useForm } from 'react-hook-form';
import AuthTopNavigation from 'components/Auth/AuthTopNavigation';
import { useNavigate } from 'react-router-dom';
import Copyright from 'components/Auth/Copyright';
import { register, sendRegisterEmail } from 'api/user';
import checkAxiosErrorMessage from 'utils/ts/checkAxiosError';
import AuthDetail from 'components/Auth/AuthDetail';
import { ReactComponent as Progress } from 'assets/svg/auth/second-progress.svg';
import styles from './SignUp.module.scss';
import useRouteCheck from '../hooks/useRouteCheck';
import { SignUpFormData } from './entity';
import IdInput from './components/IdInput';
import EmailInput from './components/EmailInput';
import PasswordInput from './components/PasswordInput';
import PasswordCheckInput from './components/PasswordCheckInput';

const useSignUp = ({ onError }: { onError: UseFormSetError<SignUpFormData> }) => {
  const navigate = useNavigate();
  const signup = (form: SignUpFormData) => {
    register({
      account: form.id,
      email: `${form.email}`,
      password: form.password,
    }).then(() => {
      sendRegisterEmail({ email: `${form.email}` });
      navigate('/signup/complete', { state: { signUpCheck: true }, replace: true });
    }).catch((error) => {
      // 아이디, 닉네임, 비밀번호 등은 폼 단에서 에러핸들링이 되어서 회원가입 요청에서 발생하는 에러는 서버 문제거나, 중복 이메일인 경우 뿐입니다.
      if (checkAxiosErrorMessage(error)) {
        onError('email', { message: error.response?.data.errorMessage ?? '서버 통신 중 오류가 발생했습니다.' });
      }
    });
  };

  return signup;
};

export default function SignUpForm() {
  useRouteCheck('termsCheck', '/terms-of-service');
  const methods = useForm<SignUpFormData>({
    mode: 'onChange',
    defaultValues: {
      id: '',
      email: '',
      password: '',
      passwordCheck: '',
    },
  });

  const {
    handleSubmit,
    formState: { isDirty, isValid },
    setError,
  } = methods;

  const signup = useSignUp({ onError: setError });

  return (
    <div className={styles.template}>
      <AuthTopNavigation />
      <div className={styles.container}>
        <FormProvider {...methods}>
          <form
            className={styles.form}
            onSubmit={handleSubmit(signup)}
          >
            <AuthDetail name="회원가입하기" first="쩝쩝박사의 서비스를 이용하려면" second="회원가입하세요." />
            <div className={styles.progress}>
              <Progress />
            </div>

            <IdInput />
            <EmailInput />
            <PasswordInput />
            <PasswordCheckInput />

            <button
              type="submit"
              className={styles.form__button}
              disabled={!isDirty || !isValid}
            >
              다음
            </button>
          </form>
        </FormProvider>
        <Copyright />
      </div>
    </div>
  );
}
