import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import PreviousButton from 'components/PreviousButton/PreviousButton';
import error from 'assets/svg/auth/error.svg';
import style from 'pages/Auth/FindIDPassword/index.module.scss';
import { CodeInfo } from '../entity';
import VerifyCode from './VerifyCode';

export default function VerifyField(): JSX.Element {
  const {
    register, handleSubmit, formState: { errors }, setError,
  } = useForm<CodeInfo>({
    mode: 'onChange',
  });
  const location = useLocation();
  const { email } = location.state as { email: string };
  return (
    <div className={style.layout}>
      <div className={style.back}>
        <PreviousButton />
      </div>
      <div className={style.page}>
        <div>
          <p className={style.page__quote}>
            이메일로 발송된
            <br />
            인증번호를 입력해 주세요
          </p>
        </div>
        <div className={style.page__error}>
          {(errors.first || errors.second || errors.third || errors.fourth) && (
            <span className={style.page__caution}>
              <img src={error} alt="warning" className={style.page__image} />
              <span>인증번호가 올바르지 않습니다.</span>
            </span>
          )}
        </div>
        <VerifyCode
          register={register}
          handleSubmit={handleSubmit}
          setError={setError}
          email={email}
        />
      </div>
    </div>
  );
}
