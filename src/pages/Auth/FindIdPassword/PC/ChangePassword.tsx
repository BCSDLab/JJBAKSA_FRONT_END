import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { modify } from 'api/user';
import { ReactComponent as ErrorIcon } from 'assets/svg/auth/error.svg';
import { ReactComponent as BlindIcon } from 'assets/svg/auth/pw-blind.svg';
import { ReactComponent as ShowIcon } from 'assets/svg/auth/pw-show.svg';
import { ReactComponent as SecondProgress } from 'assets/svg/auth/two-step-second-progress.svg';
import Copyright from 'components/Auth/Copyright';
import { PasswordInfo } from 'pages/Auth/FindIdPassword/entity';
import Modal from 'pages/Auth/FindIdPassword/mobile/Modal';
import useBooleanState from 'utils/hooks/useBooleanState';
import cn from 'utils/ts/classNames';

import styles from './index.module.scss';

export default function ChangePasswordPC(): JSX.Element {
  const [isNewBlind, , , changeNewBlind] = useBooleanState(false);
  const [isNewCheckBlind, , , changeNewCheckBlind] = useBooleanState(false);
  const {
    register,
    formState: { isSubmitting, errors, isValid },
    getValues,
    setError,
    handleSubmit,
  } = useForm<PasswordInfo>({
    mode: 'onChange',
  });
  const [openModal, setOpenModal] = useState(false);

  const modifyPassword = async (params: PasswordInfo) => {
    try {
      if (getValues('password') === getValues('passwordCheck')) {
        await modify({
          password: params.password,
        });
        sessionStorage.removeItem('accessToken');
        setOpenModal(true);
      } else {
        setError('passwordCheck', { message: '비밀번호가 일치하지 않습니다.' });
      }
    } catch {
      //
    }
  };

  return (
    <div>
      <div className={styles.page}>
        <div className={styles.page__container}>
          <div className={styles.page__title}>
            새 비밀번호 입력하기
          </div>
          <p className={styles.page__quote}>
            새 비밀번호를 입력해주세요.
          </p>
          <div className={styles.page__progress}>
            <SecondProgress />
          </div>
        </div>
        <form className={styles.form}>
          <div className={styles.form__box}>
            <label className={styles.form__label} htmlFor="password">
              새 비밀번호
              <input
                type={isNewBlind ? 'text' : 'password'}
                id="password"
                placeholder="비밀번호를 입력해주세요."
                className={styles.form__input}
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => changeNewBlind()}
                className={styles.form__blindbox}
              >
                {isNewBlind ? (
                  <ShowIcon aria-hidden />
                ) : (
                  <BlindIcon aria-hidden />
                )}
              </button>
            </label>
          </div>
          <div className={styles.form__box}>
            <label className={styles.form__label} htmlFor="password-check">
              <div className={cn({ [styles['form__label--box']]: true })}>
                새 비밀번호 확인
                {errors.passwordCheck && (
                  <span className={styles.form__message}>
                    <ErrorIcon />
                    {errors.passwordCheck.message}
                  </span>
                )}
              </div>
              <input
                id="password-check"
                type={isNewCheckBlind ? 'text' : 'password'}
                placeholder="비밀번호를 입력해주세요."
                className={cn({
                  [styles['form__input--active']]: !isValid,
                  [styles.form__input]: true,
                })}
                {...register('passwordCheck')}
              />
              <button
                type="button"
                onClick={() => changeNewCheckBlind()}
                className={styles.form__blindbox}
              >
                {isNewCheckBlind ? (
                  !errors.passwordCheck && <ShowIcon aria-hidden />
                ) : (
                  !errors.passwordCheck && <BlindIcon aria-hidden />
                )}
              </button>
            </label>
            {errors.passwordCheck && <ErrorIcon className={styles.form__error} />}
          </div>
          <button
            type="button"
            disabled={isSubmitting || !isValid}
            className={cn({
              [styles['form__submit--active']]: isValid,
              [styles.form__submit]: true,
            })}
            onClick={handleSubmit(modifyPassword)}
          >
            완료
          </button>
        </form>
        {openModal && (
          <Modal type="비밀번호">
            변경된 비밀번호로 로그인 해 주세요.
          </Modal>
        )}
        <div className={styles.copyright}>
          <Copyright />
        </div>
      </div>
    </div>
  );
}
