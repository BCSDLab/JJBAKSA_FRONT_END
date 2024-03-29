import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  checkIdDuplicate, emailId, emailPassword, findId, findPassword,
} from 'api/user';
import { ReactComponent as ErrorIcon } from 'assets/svg/auth/error.svg';
import { ReactComponent as FirstProgress } from 'assets/svg/auth/two-step-first-progress.svg';
import Copyright from 'components/Auth/Copyright';
import { EMAIL_REGEXP } from 'components/Auth/static/Regexp';
import Modal from 'pages/Auth/FindIdPassword/mobile/Modal';
import Timer from 'pages/Auth/FindIdPassword/PC/Timer';
import { FindParams, FindProp } from 'pages/Auth/FindIdPassword/entity';
import cn from 'utils/ts/classNames';

import styles from './index.module.scss';

const useChangePage = () => {
  const nav = useNavigate();
  const changePage = () => {
    nav('/find-password/change-pc');
  };
  return changePage;
};

export default function FindIdPasswordPC({ type }: FindProp): JSX.Element {
  const [isClicked, setIsClicked] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>();
  const [user, setUser] = useState({
    email: null,
    id: null,
  });

  const {
    register,
    formState: { isSubmitting, errors, isValid },
    setError,
    handleSubmit,
  } = useForm<FindParams>({
    mode: 'onChange',
  });

  const changePage = useChangePage();
  const checkEmail = async (param: FindParams) => {
    try {
      if (type === 'password') {
        await emailPassword(param);
        setIsClicked(true);
      } else {
        await emailId(param);
        setIsClicked(true);
      }
    } catch {
      setError('email', { message: '이메일이 올바르지 않습니다.' });
    }
  };
  const checkId = async (param: FindParams) => {
    try {
      await checkIdDuplicate(param);
      setError('account', { message: '아이디가 올바르지 않습니다.' });
    } catch {
      checkEmail(param);
    }
  };

  const checkUser = (param: FindParams) => {
    if (type === 'password') {
      checkId(param);
    } else {
      checkEmail(param);
    }
  };

  const toNextPage = async (param: FindParams) => {
    try {
      if (type === 'password') {
        const result = await findPassword({
          account: param.account as string, // 비밀번호 찾기 페이지에서는 account가 필수임
          email: param.email,
          code: param.code,
        });
        const token = result.data;
        sessionStorage.setItem('accessToken', token);
        changePage();
      } else {
        const result = await findId({
          email: param.email,
          code: param.code,
        });
        setUser({
          id: result.data.account,
          email: result.data.email,
        });
        setOpenModal(true);
      }
    } catch (e) {
      setError('code', { message: '인증번호가 올바르지 않습니다.' });
      setIsClicked(false);
    }
  };
  return (
    <div className={styles.page}>
      <div className={styles.page__container}>
        {type === 'id' && (
        <div className={styles.page__title}>
          아이디 찾기
        </div>
        )}
        {type === 'password' && (
        <div className={styles.page__title}>
          비밀번호 찾기
        </div>
        )}
        <div>
          {type === 'id' && (
          <p className={styles.page__quote}>
            쩝쩝박사 가입 이메일을 통해
            <br />
            아이디를 찾을 수 있어요.
          </p>
          )}
          {type === 'password' && (
          <p className={styles.page__quote}>
            쩝쩝박사 가입 아이디를 통해
            <br />
            비밀번호를 찾을 수 있어요.
          </p>
          )}
        </div>
        <div className={styles.page__progress}>
          <FirstProgress />
        </div>
      </div>
      <form className={styles.form}>
        {type === 'password' && (
          <div className={styles.form__box}>
            <label className={styles.form__label} htmlFor="id">
              <div className={cn({ [styles['form__label--box']]: true })}>
                아이디
                {errors.account && (
                <span className={styles.form__message}>
                  <ErrorIcon />
                  {errors.account.message}
                </span>
                )}
              </div>
              <input
                id="id"
                placeholder="아이디를 입력하세요."
                className={cn({
                  [styles['form__input--active']]: !isValid,
                  [styles.form__input]: true,
                })}
                {...register('account')}
              />
              {errors.account && <ErrorIcon className={styles.form__error} />}
            </label>
          </div>
        )}
        <div className={styles.form__box}>
          <label className={styles.form__label} htmlFor="email">
            <div className={cn({ [styles['form__label--box']]: true })}>
              이메일
              {errors.email && (
              <span className={styles.form__message}>
                <ErrorIcon />
                {errors.email.message}
              </span>
              )}
            </div>
            <input
              id="email"
              placeholder="이메일을 입력하세요."
              className={cn({
                [styles['form__input--active']]: !isValid,
                [styles.form__input]: true,
              })}
              {...register('email', {
                pattern: {
                  value: EMAIL_REGEXP,
                  message: '이메일이 올바르지 않습니다.',
                },
              })}
            />
            {errors.email && <ErrorIcon className={styles.form__error} />}
          </label>
        </div>
        <div className={styles.form__box}>
          <label className={styles.form__label} htmlFor="verify">
            <div className={cn({ [styles['form__label--box']]: true })}>
              인증번호
              {errors.code && (
              <span className={styles.form__message}>
                <ErrorIcon />
                {errors.code.message}
              </span>
              )}
            </div>
            <div className={styles.form__box}>
              <input
                id="verify"
                placeholder="인증번호를 입력하세요."
                className={cn({
                  [styles['form__input--active']]: !!errors.code,
                  [styles.form__input]: true,
                })}
                {...register('code')}
              />
              <div className={styles.form__timer}>
                {isClicked && <Timer />}
              </div>
              <button
                type="button"
                disabled={isClicked || !isValid}
                className={cn({
                  [styles['form__button--active']]: !isClicked,
                  [styles.form__button]: isClicked,
                })}
                onClick={handleSubmit(checkUser)}
              >
                인증번호 발송
              </button>
            </div>
          </label>
        </div>
        <button
          type="button"
          disabled={isSubmitting || !isValid}
          className={cn({
            [styles['form__submit--active']]: isValid,
            [styles.form__submit]: true,
          })}
          onClick={handleSubmit(toNextPage)}
        >
          다음
        </button>
      </form>
      {openModal && (
        <Modal setOpenModal={setOpenModal} type="아이디">
          {user.email}
          으로
          <br />
          가입된 아이디는
          {' '}
          {user.id}
          입니다
        </Modal>
      )}
      <div className={styles.copyright}>
        <Copyright />
      </div>
    </div>
  );
}
