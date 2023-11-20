import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import error from 'assets/svg/auth/error.svg';
import PreviousButton from 'components/PreviousButton/PreviousButton';
import cn from 'utils/ts/classNames';
import { EMAIL_REGEXP } from 'components/Auth/static/Regexp';
import { sendFindEmail, checkIdDuplicate } from 'api/user';
import { FindProp, EmailParams } from 'pages/Auth/FindIdPassword/entity';
import style from './index.module.scss';

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
    <div className={style.layout}>
      <div className={style.back}>
        <PreviousButton />
      </div>
      <div className={style.page}>
        <div>
          {type === 'id' && (
            <p className={style.page__quote}>
              아이디를 찾을 때
              <br />
              사용할 이메일을 입력해 주세요.
            </p>
          )}
          {type === 'password' && (
            <p className={style.page__quote}>
              비밀번호를 찾을 때 사용할
              <br />
              이메일과 아이디를 입력해 주세요.
            </p>
          )}
        </div>
        <div className={style.page__error}>
          {errors.email && (
            <span className={style.page__caution}>
              <img src={error} alt="warning" className={style.page__image} />
              {errors.email?.message}
            </span>
          )}
        </div>
        <form className={style.form} onSubmit={handleSubmit(checkUserInfo)}>
          <div className={style.form__center}>
            <div className={style.form__label}>이메일</div>
            <input
              type="email"
              placeholder="이메일을 입력하세요"
              className={style.form__input}
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
                <div className={style.form__label}>아이디</div>
                <input
                  placeholder="아이디를 입력하세요"
                  className={style.form__input}
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
              [style['form__submit--active']]: isValid,
              [style.form__submit]: true,
            })}
          >
            인증번호 보내기
          </button>
        </form>
      </div>
    </div>

  );
}
