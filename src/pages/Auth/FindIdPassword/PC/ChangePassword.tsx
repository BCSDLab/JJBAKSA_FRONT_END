import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { checkPassword, modify } from 'api/user';
import { ReactComponent as ErrorIcon } from 'assets/svg/auth/error.svg';
import { ReactComponent as BlindIcon } from 'assets/svg/auth/pw-blind.svg';
import { ReactComponent as ShowIcon } from 'assets/svg/auth/pw-show.svg';
import { ReactComponent as SecondProgress } from 'assets/svg/auth/two-step-second-progress.svg';
import Copyright from 'components/Auth/Copyright';
import { PasswordInfo } from 'pages/Auth/FindIdPassword/entity';
import Modal from 'pages/Auth/FindIdPassword/mobile/Modal';
import useBooleanState from 'utils/hooks/useBooleanState';
import cn from 'utils/ts/classNames';
import makeToast from 'utils/ts/makeToast';

import styles from './index.module.scss';
import { PATTERN } from '../mobile/ChangePassword';

export default function ChangePasswordPC(): JSX.Element {
  const [isNewBlind, , , toggleNewBlind] = useBooleanState(false);
  const [isNewCheckBlind, , , toggleNewCheckBlind] = useBooleanState(false);
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
      if (getValues('password') && getValues('passwordCheck')) {
        await checkPassword(params);
        makeToast('error', '새 비밀번호와 현재 비밀번호가 일치합니다.');
      } else {
        setError('passwordCheck', { message: '비밀번호를 입력해주세요.' });
      }
    } catch {
      if (getValues('password') === getValues('passwordCheck')) {
        await modify({
          password: params.password,
        });
        sessionStorage.removeItem('accessToken');
        setOpenModal(true);
      } else {
        setError('passwordCheck', { message: '비밀번호가 일치하지 않습니다.' });
      }
    }
  };

  // 새로고침 막기 변수
  const preventClose = (e: BeforeUnloadEvent) => {
    sessionStorage.removeItem('accessToken');
    e.preventDefault();
    e.returnValue = ''; // chrome에서는 설정이 필요해서 넣은 코드
  };

  // 브라우저에 렌더링 시 한 번만 실행하는 코드
  useEffect(() => {
    if (sessionStorage.getItem('accessToken') === null) makeToast('warning', '잘못된 접근입니다.');

    (() => {
      window.addEventListener('beforeunload', preventClose);
    })();

    return () => {
      window.removeEventListener('beforeunload', preventClose);
    };
  }, []);

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
              <div className={cn({ [styles['form__label--box']]: true })}>
                새 비밀번호
                {errors.password && (
                  <span className={styles.form__message}>
                    <ErrorIcon />
                    <span className={cn({ [styles['form__message--pattern']]: true })}>
                      {errors.password.message}
                    </span>
                  </span>
                )}
              </div>
              <input
                type={isNewBlind ? 'text' : 'password'}
                id="password"
                placeholder="비밀번호를 입력해주세요."
                className={cn({
                  [styles['form__input--active']]: !isValid,
                  [styles.form__input]: true,
                })}
                {...register('password', {
                  pattern: {
                    value: PATTERN,
                    message: '비밀번호는 문자, 숫자, 특수문자를 포함한 8~16 자리로 이루어져야 합니다.',
                  },
                })}
              />
              <button
                type="button"
                onClick={() => toggleNewBlind()}
                className={styles['form__blind-icon']}
              >
                {isNewBlind ? (
                  !errors.password && <ShowIcon aria-hidden />
                ) : (
                  !errors.password && <BlindIcon aria-hidden />
                )}
              </button>
            </label>
            {errors.password && <ErrorIcon className={styles.form__error} />}
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
                onClick={() => toggleNewCheckBlind()}
                className={styles['form__blind-icon']}
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
          <Modal setOpenModal={setOpenModal} type="비밀번호">
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
