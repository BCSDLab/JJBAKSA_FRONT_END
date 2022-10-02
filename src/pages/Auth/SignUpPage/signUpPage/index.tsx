import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from './SignUp.module.scss';
import useRouteCheck from '../hooks/useRouteCheck';
import IdInput from './IdInput';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import PasswordCheckInput from './PasswordCheckInput';
import { SignUpFormData } from './entity';
// import useErrorMessage from './hooks/useErrorMessage';

export default function SignUpForm() {
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
    formState: { isDirty, isValid, errors },
  } = methods;

  const clickSubmit = () => {
    if (isDirty && isValid) {
      navigate('/signup/complete', { state: { signUpCheck: true }, replace: true });
    } else {
      navigate('');
    }
  };

  // const { errorArr } = useErrorMessage(errors);
  if (errors !== undefined || null) {
    // const errorArray = Object.entries(errors);
    // console.log(errorArr);
    // console.log(errorArray);
  }

  return (
    <div className={styles.template}>
      <div className={styles.container}>
        {/* header */}
        <div>쩝쩝박사</div>
        <FormProvider {...methods}>
          <form
            className={styles.form}
          // form 제출 api 호출
            onSubmit={handleSubmit((res) => res)}
          >
            <div className={styles.form__title}>
              회원가입
            </div>

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

        {/* footer */}
      </div>
    </div>
  );
}
