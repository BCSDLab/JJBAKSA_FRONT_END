import React from 'react';
import { FormProvider, UseFormSetError, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AuthTitle from 'components/Auth/AuthTitle';
import Copyright from 'components/Auth/Copyright';
import { register, sendRegisterEmail } from 'api/user';
import checkAxiosErrorMessage from 'utils/ts/checkAxiosError';
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
      email: `${form.email}@${form.emailDomain}`,
      password: form.password,
    }).then(() => {
      sendRegisterEmail({ email: `${form.email}@${form.emailDomain}` });
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
      emailDomain: '',
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
      <div className={styles.container}>
        <AuthTitle />
        <FormProvider {...methods}>
          <form
            className={styles.form}
            onSubmit={handleSubmit(signup)}
          >
            <div className={styles.form__title}>회원가입</div>

            <IdInput />
            <EmailInput />
            <PasswordInput />
            <PasswordCheckInput />

            <button
              type="submit"
              className={styles.form__button}
              disabled={!isDirty || !isValid}
            >
              완료
            </button>
          </form>
        </FormProvider>
        <Copyright />
      </div>
    </div>
  );
}
