import { ReactComponent as FirstProgress } from 'assets/svg/auth/two-step-first-progress.svg';
import Copyright from 'components/Auth/Copyright';
import cn from 'utils/ts/classNames';
import { useForm } from 'react-hook-form';
import { ReactComponent as ErrorIcon } from 'assets/svg/auth/error.svg';
import { useNavigate } from 'react-router-dom';
import style from './index.module.scss';
import { EmailParams, FindProp } from '../entity';

const useChangePage = () => {
  const nav = useNavigate();
  const changePage = () => {
    nav('/find-password/change-pc');
  };
  return changePage;
};

export default function FindIdPasswordPC({ type }: FindProp): JSX.Element {
  const {
    formState: { isSubmitting, isValid },
  } = useForm<EmailParams>({
    mode: 'onChange',
  });
  const chagnePage = useChangePage();
  return (
    <div>
      <div className={style.page}>
        <div className={style.page__container}>
          {type === 'id' && (
            <div className={style.page__title}>
              아이디 찾기
            </div>
          )}
          {type === 'password' && (
            <div className={style.page__title}>
              비밀번호 찾기
            </div>
          )}
          <div>
            {type === 'id' && (
              <p className={style.page__quote}>
                쩝쩝박사 가입 이메일을 통해
                <br />
                아이디를 찾을 수 있어요.
              </p>
            )}
            {type === 'password' && (
              <p className={style.page__quote}>
                쩝쩝박사 가입 아이디를 통해
                <br />
                비밀번호를 찾을 수 있어요.
              </p>
            )}
          </div>
          <div className={style.page__progress}>
            <FirstProgress />
          </div>
        </div>
        <form className={style.form}>
          {type === 'password' && (
            <div className={style.form__box}>
              <label className={style.form__label} htmlFor="id">
                <div className={cn({ [style['form__label--box']]: true })}>
                  아이디
                  <ErrorIcon />
                </div>
                <input
                  id="id"
                  placeholder="아이디를 입력하세요."
                  className={style.form__input}
                />
                <ErrorIcon className={style.form__error} />
              </label>

            </div>
          )}
          <div className={style.form__box}>
            <label className={style.form__label} htmlFor="email">
              <div className={cn({ [style['form__label--box']]: true })}>
                이메일
                <ErrorIcon />
              </div>
              <input
                id="email"
                placeholder="이메일을 입력하세요."
                className={style.form__input}
              />
              <ErrorIcon className={style.form__error} />
            </label>
          </div>
          <div className={style.form__box}>
            <label className={style.form__label} htmlFor="verify">
              <div className={cn({ [style['form__label--box']]: true })}>
                인증번호
                <ErrorIcon />
              </div>
              <div>
                <input
                  id="verify"
                  placeholder="인증번호를 입력하세요."
                  className={style.form__input}
                />
                <button
                  type="button"
                  className={cn({
                    [style.form__button]: true,
                  })}
                >
                  인증번호 발송
                </button>
              </div>
            </label>

          </div>
          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className={cn({
              [style['form__submit--active']]: isValid,
              [style.form__submit]: true,
            })}
            onClick={chagnePage}
          >
            다음
          </button>
        </form>
        <div className={style.copyright}>
          <Copyright />
        </div>
      </div>
    </div>
  );
}