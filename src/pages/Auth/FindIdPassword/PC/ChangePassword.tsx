import { ReactComponent as SecondProgress } from 'assets/svg/auth/two-step-second-progress.svg';
import Copyright from 'components/Auth/Copyright';
import { ReactComponent as ErrorIcon } from 'assets/svg/auth/error.svg';
import { useForm } from 'react-hook-form';
import cn from 'utils/ts/classNames';
import { modify } from 'api/user';
import Modal from 'pages/Auth/FindIdPassword/mobile/Modal';
import { ReactComponent as ShowIcon } from 'assets/svg/auth/pw-show.svg';
import { ReactComponent as BlindIcon } from 'assets/svg/auth/pw-blind.svg';
import useBooleanState from 'utils/hooks/useBooleanState';
import { useState } from 'react';
import { PasswordInfo } from '../entity';
import style from './index.module.scss';

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
      <div className={style.page}>
        <div className={style.page__container}>
          <div className={style.page__title}>
            새 비밀번호 입력하기
          </div>
          <p className={style.page__quote}>
            새 비밀번호를 입력해주세요.
          </p>
          <div className={style.page__progress}>
            <SecondProgress />
          </div>
        </div>
        <form className={style.form}>
          <div className={style.form__box}>
            <label className={style.form__label} htmlFor="password">
              새 비밀번호
              <input
                type={isNewBlind ? 'text' : 'password'}
                id="password"
                placeholder="비밀번호를 입력해주세요."
                className={style.form__input}
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => changeNewBlind()}
                className={style.form__blindbox}
              >
                {isNewBlind ? (
                  <ShowIcon aria-hidden />
                ) : (
                  <BlindIcon aria-hidden />
                )}
              </button>
            </label>
          </div>
          <div className={style.form__box}>
            <label className={style.form__label} htmlFor="password-check">
              <div className={cn({ [style['form__label--box']]: true })}>
                새 비밀번호 확인
                {errors.passwordCheck && (
                  <span className={style.form__message}>
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
                  [style['form__input--active']]: !isValid,
                  [style.form__input]: true,
                })}
                {...register('passwordCheck')}
              />
              <button
                type="button"
                onClick={() => changeNewCheckBlind()}
                className={style.form__blindbox}
              >
                {isNewCheckBlind ? (
                  !errors.passwordCheck && <ShowIcon aria-hidden />
                ) : (
                  !errors.passwordCheck && <BlindIcon aria-hidden />
                )}
              </button>
            </label>
            {errors.passwordCheck && <ErrorIcon className={style.form__error} />}
          </div>
          <button
            type="button"
            disabled={isSubmitting || !isValid}
            className={cn({
              [style['form__submit--active']]: isValid,
              [style.form__submit]: true,
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
        <div className={style.copyright}>
          <Copyright />
        </div>
      </div>
    </div>
  );
}
