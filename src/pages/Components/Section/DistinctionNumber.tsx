import { useForm } from 'react-hook-form';
import { ReactComponent as Prev } from 'assets/svg/prev-icon.svg';
import warningImage from 'assets/svg/warning.svg';
import style from './SearchPage.module.scss';
import InputNumber, { FormData } from './InputNumber';

export default function DistinctionNumber():JSX.Element {
  const {
    register, handleSubmit, formState: { errors }, getValues,
  } = useForm<FormData>({
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
            이메일로 발송된
            <br />
            인증번호를 입력해 주세요
          </p>
        </div>
        <div className={style.error_message}>
          {(errors.first || errors.second || errors.third || errors.fourth) && (
          <span>
            <img src={warningImage} alt="warning" className={style.warning} />
            인증번호가 올바르지 않습니다.
          </span>
          )}
        </div>
        <InputNumber register={register} handleSubmit={handleSubmit} getValues={getValues} />
      </div>
    </div>
  );
}
