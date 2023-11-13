import { ReactComponent as SecondProgress } from 'assets/svg/auth/two-step-second-progress.svg';
import Copyright from 'components/Auth/Copyright';
import { ReactComponent as Error } from 'assets/svg/auth/error.svg';
import { useForm } from 'react-hook-form';
import cn from 'utils/ts/classNames';
import style from './index.module.scss';
import { EmailParams } from '../entity';

export default function ChangePasswordPC(): JSX.Element {
  const {
    formState: { isSubmitting, isValid },
  } = useForm<EmailParams>({
    mode: 'onChange',
  });
  return (
    <div>
      <div className={style.page}>
        <div className={style.page__container}>
          <div className={style.page__title}>
            새 비밀번호 입력하기
          </div>
          <p className={style.page__quote}>
            새 비밀번호를 입력해주세요.
          </p>
          <div className={style.page__progress}>
            <SecondProgress />
          </div>
        </div>
        <form className={style.form}>
          <div className={style.form__box}>
            <div className={style.form__label}>
              새 비밀번호
            </div>
            <input
              placeholder="비밀번호를 입력해주세요."
              className={style.form__input}
            />
            <Error className={style.form__error} />
          </div>
          <div className={style.form__box}>
            <div className={style.form__label}>
              새 비밀번호 확인
              <Error />
            </div>
            <input
              placeholder="비밀번호를 입력해주세요."
              className={style.form__input}
            />
            <Error className={style.form__error} />
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className={cn({
              [style.form__submit]: true,
              [style['form__submit--active']]: isValid,
            })}
          >
            완료
          </button>
        </form>
        <div className={style.copyright}>
          <Copyright />
        </div>
      </div>
    </div>
  );
}
