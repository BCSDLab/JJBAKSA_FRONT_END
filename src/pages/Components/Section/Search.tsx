import { useForm } from 'react-hook-form';
import { ReactComponent as Prev } from 'assets/svg/prev-icon.svg';
import { ReactComponent as Caution } from 'assets/svg/warning.svg';
import style from './SearchPage.module.scss';

const emailPattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; // 이메일 형식 유효성 검사 패턴
interface Isearch {
  search: string
}
export default function Search({ search }: Isearch): JSX.Element {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: 'onChange',
  });
  return (
    <div className={style.layout}>
      <div className={style.container}>
        <div>
          <div className={style.back_icon}>
            <Prev />
          </div>
          {search === 'id' && (
          <p>
            아이디 찾을 때
            <br />
            사용할 이메일을 입력해주세요.
          </p>
          )}
          {search === 'password' && (
          <p>
            비밀번호를 찾을 때
            <br />
            사용할 이메일을 입력해주세요.
          </p>
          )}
        </div>
        <div className={style.error_message}>
          {errors.email && (
          <span className={style.caution}>
            <Caution />
            올바르지 않은 이메일 형식입니다.
          </span>
          )}
        </div>
        <form onSubmit={handleSubmit((data) => (data))}>
          <div className={style.input_label}>
            <div className={style.email}>이메일</div>
            <input
              type="email"
              placeholder="이메일을 입력하세요"
              className={style.input_style_radius}
              id="email"
              {...register('email', {
                required: true,
                pattern: {
                  value: emailPattern,
                  message: '올바른 email 형식이 아닙니다.',
                },
              })}
            />
          </div>
          <button type="submit" disabled={isSubmitting} className={getValues('email') !== undefined && errors.email?.message === undefined ? style.active : style.inactive}>인증번호 보내기</button>
        </form>
      </div>
    </div>

  );
}
