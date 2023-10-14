import { ReactComponent as ShowIcon } from 'assets/svg/auth/pw-show.svg';
import { ReactComponent as BlindIcon } from 'assets/svg/auth/pw-blind.svg';
import { useAuth } from 'store/auth';
import { ReactComponent as ErrorIcon } from 'assets/svg/auth/error.svg';
import cn from 'utils/ts/classNames';
import useBooleanState from 'utils/hooks/useBooleanState';
import style from './index.module.scss';
import useModifyPassword from '../hook/useModifyPassword';
import PasswordSuccessModal from './PasswordSuccessModal';
import { ERROR_MESSAGE } from '../static/setting';

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
  const auth = useAuth();
  return (
    <form className={style.formContainer}>
      <div className={style.title}>계정</div>
      <div className={style.account}>
        <span>이메일</span>
        <input className={style.account__input} value={auth ? auth.email : ''} disabled />
      </div>
      <div>
        <span>아이디</span>
        <input className={style.account__input} value={auth && 'account' in auth ? auth.account : 'SNSLogin'} disabled />
      </div>
      <div className={style.title}>비밀번호 변경</div>
      <div>
        <span>현재 비밀번호</span>
        <span className={style.blindBox}>
          <input
            className={cn({
              [style.password]: true,
              [style.password__error]:
                message === ERROR_MESSAGE.Current_Error || message === ERROR_MESSAGE.Type_Error,
            })}
            type={isCurrentBlind ? 'text' : 'password'}
            disabled={!(auth && 'account' in auth)}
            value={current}
            onChange={handleCurrentInput}
          />
          <button
            type="button"
            onClick={() => (auth && 'account' in auth) && changeCurrentBlind()}
            className={style.blindBox__button}
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
        <span className={style.blindBox}>
          <input
            className={cn({
              [style.password]: true,
              [style.password__error]:
                message === ERROR_MESSAGE.Correct_Error,
            })}
            type={isNewBlind ? 'text' : 'password'}
            disabled={!(auth && 'account' in auth)}
            value={newPassword}
            onChange={handleNewPasswordInput}
          />
          <button
            type="button"
            onClick={() => (auth && 'account' in auth) && changeNewBlind()}
            className={style.blindBox__button}
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
        <span className={style.blindBox}>
          <input
            className={cn({
              [style.password]: true,
              [style.password__error]:
                message === ERROR_MESSAGE.Correct_Error,
            })}
            type={isNewCheckBlind ? 'text' : 'password'}
            disabled={!(auth && 'account' in auth)}
            value={check}
            onChange={handleCheckInput}
          />
          <button
            type="button"
            onClick={() => (auth && 'account' in auth) && changeNewCheckBlind()}
            className={style.blindBox__button}
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
        <div>
          <ErrorIcon />
          <span className={style.errorMessage}>
            {message}
          </span>
        </div>
      )}
      <button className={style.button} type="button" onClick={modifyPassword}>비밀번호 변경</button>
      {isShowModal && <PasswordSuccessModal>변경된 비밀번호로 로그인 해주세요.</PasswordSuccessModal>}
    </form>
  );
}
