import { useForm } from 'react-hook-form';
import PreviousButton from 'components/PreviousButton/PreviousButton';
import error from 'assets/svg/login-error.svg';
import style from 'pages/Auth/SearchIDPassword/index.module.scss';
import InputNumber, { FormData } from './InputNumber';

export default function DistinctionNumber():JSX.Element {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
  });

  return (
    <div className={style.layout}>
      <div className={style.page}>
        <div>
          <div className={style.page__back}>
            <PreviousButton />
          </div>
          <p className={style.page__quote}>
            이메일로 발송된
            <br />
            인증번호를 입력해 주세요
          </p>
        </div>
        <div className={style.page__error}>
          {(errors.first || errors.second || errors.third || errors.fourth) && (
          <span>
            <img src={error} alt="warning" className={style.page__caution} />
            인증번호가 올바르지 않습니다.
          </span>
          )}
        </div>
        <InputNumber register={register} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}
