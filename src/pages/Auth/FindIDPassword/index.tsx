import { useForm } from 'react-hook-form';
import error from 'assets/svg/login-error.svg';
import { useNavigate } from 'react-router-dom';
import PreviousButton from 'components/PreviousButton/PreviousButton';
import cn from 'utils/ts/classNames';
import style from './index.module.scss';

const EMAILPATTERN = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; // 이메일 형식 유효성 검사 패턴
interface FindProp {
  find: string
}
interface FormData {
  email: string
}

export default function FindIdPassword({ find }: FindProp): JSX.Element {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
  });
  return (
    <div className={style.layout}>
      <div className={style.back}>
        <PreviousButton />
      </div>
      <div className={style.page}>
        <div>
          {find === 'id' && (
          <p className={style.page__quote}>
            아이디 찾을 때
            <br />
            사용할 이메일을 입력해주세요.
          </p>
          )}
          {find === 'password' && (
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
        <form className={style.form} onSubmit={handleSubmit((data) => data)}>
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
                  value: EMAILPATTERN,
                  message: '올바른 email 형식이 아닙니다.',
                },
              })}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn({
              [style.active]: isValid,
              [style.inactive]: true,
            })}
            onClick={() => isValid && navigate(`/find/verify/${find}`)}
          >
            인증번호 보내기
          </button>
        </form>
      </div>
    </div>

  );
}
