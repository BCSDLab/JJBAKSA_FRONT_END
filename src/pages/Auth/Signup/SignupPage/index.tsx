import { FormProvider, useForm, UseFormSetError } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { register, sendRegisterEmail } from 'api/user';
import { ReactComponent as Progress } from 'assets/svg/auth/second-progress.svg';
import AuthDetail from 'components/Auth/AuthDetail';
import AuthTopNavigation from 'components/Auth/AuthTopNavigation';
import Copyright from 'components/Auth/Copyright';
import useRouteCheck from 'pages/Auth/Signup/hooks/useRouteCheck';
import EmailInput from 'pages/Auth/Signup/SignupPage/components/EmailInput';
import IdInput from 'pages/Auth/Signup/SignupPage/components/IdInput';
import PasswordCheckInput from 'pages/Auth/Signup/SignupPage/components/PasswordCheckInput';
import PasswordInput from 'pages/Auth/Signup/SignupPage/components/PasswordInput';
import { SignUpFormData } from 'pages/Auth/Signup/SignupPage/entity';
import checkAxiosErrorMessage from 'utils/ts/checkAxiosError';

import styles from './SignUp.module.scss';

const useSignUp = ({ onError }: { onError: UseFormSetError<SignUpFormData> }) => {
  const navigate = useNavigate();
  const signup = async (form: SignUpFormData) => {
    try {
      await register({
        account: form.id,
        email: `${form.email}`,
        password: form.password,
      });
      const tokens = await sendRegisterEmail({ email: `${form.email}` });
      sessionStorage.setItem('accessToken', tokens.data.accessToken);
      navigate('/signup/complete', { state: { signUpCheck: true }, replace: true });
    } catch (error) {
      if (checkAxiosErrorMessage(error)) {
        onError('email', { message: error.response?.data.errorMessage ?? '서버 통신 중 오류가 발생했습니다.' });
      }
    }
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
