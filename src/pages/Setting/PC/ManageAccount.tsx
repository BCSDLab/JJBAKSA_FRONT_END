import { User } from 'api/user/entity';
import { ReactComponent as ErrorIcon } from 'assets/svg/auth/error.svg';
import { ReactComponent as BlindIcon } from 'assets/svg/auth/pw-blind.svg';
import { ReactComponent as ShowIcon } from 'assets/svg/auth/pw-show.svg';
import useModifyPassword from 'pages/Setting/hooks/useModifyPassword';
import PasswordSuccessModal from 'pages/Setting/PC/PasswordSuccessModal';
import { correctError, currentError, typeError } from 'pages/Setting/static/setting';
import { useAuth } from 'store/auth';
import useBooleanState from 'utils/hooks/useBooleanState';
import cn from 'utils/ts/classNames';

import styles from './PcSetting.module.scss';

export default function ManageAccount() {
  const [isCurrentBlind, , , changeCurrentBlind] = useBooleanState(false);
  const [isNewBlind, changeNewBlind] = useBooleanState(false);
  const [isNewCheckBlind, changeNewCheckBlind] = useBooleanState(false);
  const {
    current,
    newPassword,
    check,
    handleCheckInput,
    handleCurrentInput,
    handleNewPasswordInput,
    modifyPassword,
    isShowError,
    message,
    isShowModal,
  } = useModifyPassword();

  const isEmailLogin = (auth: User | null) => {
    if (auth && 'account' in auth) {
      return auth.account;
    }

    return 'SNSLogin';
  };
  const auth = useAuth();

  return (
    <form className={styles.formContainer}>
      <div className={styles.title}>계정</div>
      <div className={styles.account}>
        <span>이메일</span>
        <input className={styles.account__input} value={auth ? auth.email : ''} disabled />
      </div>
      <div>
        <span>아이디</span>
        <input className={styles.account__input} value={isEmailLogin(auth)} disabled />
      </div>
      <div className={styles.title}>비밀번호 변경</div>
      <div>
        <span>현재 비밀번호</span>
        <span className={styles.blindBox}>
          <input
            className={cn({
              [styles.password]: true,
              [styles.password__error]:
                message === currentError || message === typeError,
            })}
            type={isCurrentBlind ? 'text' : 'password'}
            disabled={!(auth && 'account' in auth)}
            value={current}
            onChange={handleCurrentInput}
          />
          <button
            type="button"
            onClick={() => (auth && 'account' in auth) && changeCurrentBlind()}
            className={styles.blindBox__button}
          >
            {isCurrentBlind ? (
              <ShowIcon aria-hidden />
            ) : (
              <BlindIcon aria-hidden />
            )}
          </button>
        </span>
      </div>
      <div>
        <span>새 비밀번호</span>
        <span className={styles.blindBox}>
          <input
            className={cn({
              [styles.password]: true,
              [styles.password__error]:
                message === correctError,
            })}
            type={isNewBlind ? 'text' : 'password'}
            disabled={!(auth && 'account' in auth)}
            value={newPassword}
            onChange={handleNewPasswordInput}
          />
          <button
            type="button"
            onClick={() => (auth && 'account' in auth) && changeNewBlind()}
            className={styles.blindBox__button}
          >
            {isNewBlind ? (
              <ShowIcon aria-hidden />
            ) : (
              <BlindIcon aria-hidden />
            )}
          </button>
        </span>
      </div>
      <div>
        <span>새 비밀번호 확인</span>
        <span className={styles.blindBox}>
          <input
            className={cn({
              [styles.password]: true,
              [styles.password__error]:
                message === correctError,
            })}
            type={isNewCheckBlind ? 'text' : 'password'}
            disabled={!(auth && 'account' in auth)}
            value={check}
            onChange={handleCheckInput}
          />
          <button
            type="button"
            onClick={() => (auth && 'account' in auth) && changeNewCheckBlind()}
            className={styles.blindBox__button}
          >
            {isNewCheckBlind ? (
              <ShowIcon aria-hidden />
            ) : (
              <BlindIcon aria-hidden />
            )}
          </button>
        </span>
      </div>
      {isShowError && (
        <div className={styles.errorMessageBox}>
          <ErrorIcon />
          <span className={styles.errorMessage}>
            {message}
          </span>
        </div>
      )}
      <button className={styles.button} type="button" onClick={modifyPassword} disabled={!(auth && 'account' in auth)}>비밀번호 변경</button>
      {isShowModal && <PasswordSuccessModal>변경된 비밀번호로 로그인 해주세요.</PasswordSuccessModal>}
    </form>
  );
}
