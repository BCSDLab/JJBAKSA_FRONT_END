import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import AuthTitle from 'components/Auth/AuthTitle';
import Copyright from 'components/Auth/Copyright';
import styles from './SignUp.module.scss';
import useRouteCheck from '../hooks/useRouteCheck';
import { SignUpFormData } from './entity';
import TopErrorMessage from './components/TopErrorMessage';
import IdInput from './components/IdInput';
import EmailInput from './components/EmailInput';
import PasswordInput from './components/PasswordInput';
import PasswordCheckInput from './components/PasswordCheckInput';

export default function SignupForm() {
  useRouteCheck('termsCheck', '/termsofservice');
  const navigate = useNavigate();

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
  } = methods;

  const clickSubmit = () => {
    if (isDirty && isValid) {
      navigate('/signup/complete', { state: { signUpCheck: true }, replace: true });
    } else {
      navigate('');
    }
  };

  const { isMobile } = useMediaQuery();

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
            <div className={styles.form__title}>
              회원가입
            </div>

            {isMobile && <TopErrorMessage />}

            <IdInput />
            <EmailInput />
            <PasswordInput />
            <PasswordCheckInput />

            <button
              type="submit"
              className={
              styles.form__button
            }
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
