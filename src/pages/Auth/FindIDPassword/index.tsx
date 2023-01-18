import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import error from 'assets/svg/auth/error.svg';
import PreviousButton from 'components/PreviousButton/PreviousButton';
import cn from 'utils/ts/classNames';
import { EMAIL_REGEXP } from 'components/Auth/static/Regexp';
import { sendFindEmail } from 'api/user';
import { FindProp, EmailInParams } from './entity';
import style from './index.module.scss';

export default function FindIdPassword({ type }: FindProp): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
    setError,
  } = useForm<EmailInParams>({
    mode: 'onChange',
  });
  const navigate = useNavigate();
  const checkEmail = async (param: EmailInParams) => {
    try {
      const res = await sendFindEmail(param);
      if (res.status === 200) {
        navigate(`/find/verify/${type}`, {
          state: {
            email: param.email,
          },
        });
      }
    } catch {
      setError('email', { message: '존재하지 않는 이메일입니다.' });
    }
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
              사용할 이메일을 입력해주세요.
            </p>
          )}
          {type === 'password' && (
            <p className={style.page__quote}>
              비밀번호를 찾을 때
              <br />
              사용할 이메일을 입력해주세요.
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
        <form className={style.form} onSubmit={handleSubmit(checkEmail)}>
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
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className={cn({
              [style.active]: isValid,
              [style.inactive]: true,
            })}
          >
            인증번호 보내기
          </button>
        </form>
      </div>
    </div>

  );
}
