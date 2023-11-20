import { useForm } from 'react-hook-form';
import { modify } from 'api/user';
import useBooleanState from 'utils/hooks/useBooleanState';
import cn from 'utils/ts/classNames';
import PreviousButton from 'components/PreviousButton/PreviousButton';
import error from 'assets/svg/auth/error.svg';
import styles from 'pages/Auth/FindIdPassword/mobile/index.module.scss';
import Modal from 'pages/Auth/FindIdPassword/mobile/Modal';
import { PasswordInfo } from 'pages/Auth/FindIdPassword/entity';

const PATTERN = /^.*(?=^.{2,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/; // 비밀번호 형식 패턴

export default function ChangePassword(): JSX.Element {
  const [value, toggle] = useBooleanState(false);
  const {
    register, handleSubmit, formState: { errors, isValid }, getValues, setError,
  } = useForm<PasswordInfo>({
    mode: 'onChange',
  });

  const changeUserPassword = async (param: PasswordInfo) => {
    try {
      const result = await modify({ password: param.password });
      if (result.status === 200) {
        sessionStorage.removeItem('accessToken');
        toggle();
      }
    } catch (e) {
      setError('password', { type: 'value' });
    }
  };

  return (
    <div className={styles.layout}>
      <div className={styles.back}>
        <PreviousButton />
      </div>
      <div className={styles.page}>
        <div>
          <p className={styles.page__quote}>
            새 비밀번호를 설정해 주세요.
          </p>
        </div>
        <div className={styles.page__error}>
          {(errors.password || errors.passwordCheck) && (
            <span className={styles.page__caution}>
              <img src={error} alt="warning" className={styles.page__image} />
              {errors.password?.message || errors.passwordCheck?.message}
            </span>
          )}
        </div>
        <form
          className={cn({
            [styles.form]: true,
            [styles.form__space]: true,
          })}
          onSubmit={handleSubmit(changeUserPassword)}
        >
          <div className={styles.form__center}>
            <div className={styles.form__label}>새 비밀번호</div>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              className={styles.form__input}
              {...register('password', {
                required: '비밀번호를 입력하세요',
                pattern: {
                  value: PATTERN,
                  message: '비밀번호는 문자, 숫자, 특수문자를 포함한\n2~16자리로 이루어져야 합니다.',
                },
              })}
            />
            <div className={cn({ [styles['form__label--paddingTop']]: true })}>비밀번호 확인</div>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              className={styles.form__input}
              {...register('passwordCheck', {
                required: '비밀번호 확인을 입력하세요',
                validate: (values) => values === getValues('password') || '비밀번호가 일치하지 않습니다.',
              })}
            />
          </div>
          <button
            type="submit"
            className={cn({
              [styles.form__submit]: true,
              [styles['form__submit--active']]: isValid,
            })}
          >
            완료
          </button>
        </form>
      </div>
      {value
        && <Modal type="비밀번호">재설정된 비밀번호로 다시 로그인해 주세요</Modal>}
    </div>
  );
}
