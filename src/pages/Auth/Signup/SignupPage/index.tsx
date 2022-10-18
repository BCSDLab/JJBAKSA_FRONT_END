import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AuthTitle from 'components/Auth/AuthTitle';
import Copyright from 'components/Auth/Copyright';
import styles from './SignUp.module.scss';
import useRouteCheck from '../hooks/useRouteCheck';
import { SignUpFormData } from './entity';
import IdInput from './components/IdInput';
import EmailInput from './components/EmailInput';
import PasswordInput from './components/PasswordInput';
import PasswordCheckInput from './components/PasswordCheckInput';

export default function SignUpForm() {
  useRouteCheck('termsCheck', '/terms-of-service');
  const navigate = useNavigate();

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
  } = methods;

  const clickSubmit = () => {
    if (isDirty && isValid) {
      navigate('/signup/complete', { state: { signUpCheck: true }, replace: true });
    } else {
      navigate('');
    }
  };

  return (
    <div className={styles.template}>
      <div className={styles.container}>
        <AuthTitle />
        <FormProvider {...methods}>
          <form
            className={styles.form}
            // form 제출 api 호출
            onSubmit={handleSubmit((res) => res)}
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
              onClick={clickSubmit}
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
