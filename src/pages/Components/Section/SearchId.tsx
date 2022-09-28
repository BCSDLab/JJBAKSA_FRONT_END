import { useForm } from 'react-hook-form';
import { ReactComponent as Prev } from 'assets/svg/prev-icon.svg';
import style from './SearchPage.module.scss';

const emailPattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; // 이메일 형식 유효성 검사 패턴

export default function SearchID(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: 'onChange',
  });
  console.log(errors);
  return (
    <div className={style.layout}>
      <div className={style.container}>
        <div>
          <div className={style.back_icon}>
            <Prev />
          </div>
          <p>
            아이디 찾을 때
            <br />
            사용할 이메일을 입력해주세요.
          </p>
        </div>
        <div
          className={[style.error_message, style.animation].join(' ')}
        >
          계정이 존재하지 않거나
          <br />
          올바르지 않은 이메일 형식입니다.
        </div>
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <div className={style.input_label}>
            <div className={style.email}>이메일</div>
            <input
              type="email"
              placeholder="이메일을 입력하세요"
              className={style.input_style_radius}
              id="email"
              {...register('email', {
                required: 'email은 필수값입니다.',
                pattern: {
                  value: emailPattern,
                  message: 'email 형식으로 작성해주세요.',
                },
              })}
            />
          </div>
          <button type="submit" disabled={isSubmitting} className={style.active}>인증번호 보내기</button>
        </form>
      </div>
    </div>

  );
}
