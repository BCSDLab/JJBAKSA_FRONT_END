import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { checkIdDuplicate, sendFindEmail } from 'api/user';
import { ReactComponent as ErrorIcon } from 'assets/svg/auth/error.svg';
import { EMAIL_REGEXP } from 'components/Auth/static/Regexp';
import PreviousButton from 'components/PreviousButton/PreviousButton';
import { EmailParams, FindProp } from 'pages/Auth/FindIdPassword/entity';
import cn from 'utils/ts/classNames';

import styles from './index.module.scss';

export default function FindIdPasswordMobile({ type }: FindProp): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
    setError,
  } = useForm<EmailParams>({
    mode: 'onChange',
  });
  const navigate = useNavigate();
  const checkEmail = async (param: EmailParams) => {
    try {
      const res = await sendFindEmail(param);
      if (res.status === 200) {
        navigate(`/find/verify/${type}`, {
          state: {
            email: param.email,
            account: param.account,
          },
        });
      }
    } catch {
      setError('email', { message: '존재하지 않는 이메일입니다.' });
    }
  };
  const checkId = async (param: EmailParams) => {
    try {
      const result = await checkIdDuplicate(param);
      if (result.status === 200) {
        setError('email', { message: '존재하지 않는 아이디입니다.' });
      }
    } catch {
      checkEmail(param);
    }
  };
  const checkUserInfo = (param: EmailParams) => {
    if (type === 'password') {
      checkId(param);
    } else checkEmail(param);
  };
  return (
    <div className={styles.layout}>
      <div className={styles.back}>
        <PreviousButton />
      </div>
      <div className={styles.page}>
        <div>
          {type === 'id' && (
            <p className={styles.page__quote}>
              아이디를 찾을 때
              <br />
              사용할 이메일을 입력해 주세요.
            </p>
          )}
          {type === 'password' && (
            <p className={styles.page__quote}>
              비밀번호를 찾을 때 사용할
              <br />
              이메일과 아이디를 입력해 주세요.
            </p>
          )}
        </div>
        <div className={styles.page__error}>
          {errors.email && (
            <span className={styles.page__caution}>
              <span className={styles.page__image}>
                <ErrorIcon />
                {errors.email?.message}
              </span>
            </span>
          )}
        </div>
        <form className={styles.form} onSubmit={handleSubmit(checkUserInfo)}>
          <div className={styles.form__center}>
            <div className={styles.form__label}>이메일</div>
            <input
              type="email"
              placeholder="이메일을 입력하세요"
              className={styles.form__input}
              id="email"
              {...register('email', {
                required: 'email을 입력해주세요',
                pattern: {
                  value: EMAIL_REGEXP,
                  message: '올바른 email 형식이 아닙니다.',
                },
              })}
            />
            {type === 'password' && (
              <>
                <div className={styles.form__label}>아이디</div>
                <input
                  placeholder="아이디를 입력하세요"
                  className={styles.form__input}
                  id="account"
                  {...register('account', {
                    required: 'id를 입력해주세요',
                  })}
                />
              </>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className={cn({
              [styles['form__submit--active']]: isValid,
              [styles.form__submit]: true,
            })}
          >
            인증번호 보내기
          </button>
        </form>
      </div>
    </div>

  );
}
