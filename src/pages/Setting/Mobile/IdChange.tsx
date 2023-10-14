import cn from 'utils/ts/classNames';
import PreviousButton from 'components/PreviousButton/PreviousButton';
import { ReactComponent as ShowIcon } from 'assets/svg/auth/pw-show.svg';
import { ReactComponent as BlindIcon } from 'assets/svg/auth/pw-blind.svg';
import { useAuth } from 'store/auth';
import useModifyPassword from 'pages/Setting/hook/useModifyPassword';
import useBooleanState from 'utils/hooks/useBooleanState';
import styles from './IdChage.module.scss';
import MobileCommonModal from './MobileCommonModal';
import PasswordSuccessModal from '../PC/PasswordSuccessModal';
import { ERROR_MESSAGE } from '../static/setting';

// const PATTERN = /^.*(?=^.{2,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/; // 비밀번호 형식 패턴

export default function IdChange(): JSX.Element {
  const auth = useAuth();
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
    setIsShowError,
  } = useModifyPassword();
  return (
    <div className={styles.layout}>
      <div className={styles.back}>
        <PreviousButton fallback="/setting" />
        비밀번호 변경
      </div>
      <div className={styles.page}>
        <div className={styles.page__error} />
        <form
          className={cn({
            [styles.form]: true,
            [styles.form__space]: true,
          })}
        >
          <div className={styles.form__center}>
            <div className={styles.form__label}>현재 비밀번호</div>
            <span className={styles.blindBox}>
              <input
                value={current}
                onChange={handleCurrentInput}
                type={isCurrentBlind ? 'text' : 'password'}
                placeholder="비밀번호를 입력하세요"
                className={cn({
                  [styles.form__input]: true,
                  [styles['form__input--error']]:
                    message === ERROR_MESSAGE.currentError || message === ERROR_MESSAGE.typeError,
                })}
                disabled={!(auth && 'account' in auth)}
              />
              <button
                type="button"
                className={styles.blindBox__button}
                onClick={changeCurrentBlind}
              >
                {isCurrentBlind ? (
                  <ShowIcon aria-hidden />
                ) : (
                  <BlindIcon aria-hidden />
                )}
              </button>
            </span>

            <div className={styles.form__label}>새 비밀번호</div>
            <span className={styles.blindBox}>
              <input
                value={newPassword}
                onChange={handleNewPasswordInput}
                type={isNewBlind ? 'text' : 'password'}
                placeholder="비밀번호를 입력하세요"
                className={cn({
                  [styles.form__input]: true,
                  [styles['form__input--error']]: message === ERROR_MESSAGE.correctError,
                })}
                disabled={!(auth && 'account' in auth)}
              />
              <button
                type="button"
                className={styles.blindBox__button}
                onClick={changeNewBlind}
              >
                {isNewBlind ? (
                  <ShowIcon aria-hidden />
                ) : (
                  <BlindIcon aria-hidden />
                )}
              </button>
            </span>

            <div className={cn({ [styles['form__label--paddingTop']]: true })}>비밀번호 확인</div>
            <span className={styles.blindBox}>
              <input
                value={check}
                onChange={handleCheckInput}
                type={isNewCheckBlind ? 'text' : 'password'}
                placeholder="비밀번호를 입력하세요"
                className={cn({
                  [styles.form__input]: true,
                  [styles['form__input--error']]:
                    message === ERROR_MESSAGE.correctError,
                })}
                disabled={!(auth && 'account' in auth)}
              />
              <button
                type="button"
                className={styles.blindBox__button}
                onClick={changeNewCheckBlind}
              >
                {isNewCheckBlind ? (
                  <ShowIcon aria-hidden />
                ) : (
                  <BlindIcon aria-hidden />
                )}
              </button>
            </span>
          </div>
          <button
            type="button"
            className={cn({
              [styles.form__submit]: true,
              [styles['form__submit--active']]: !!current && !!newPassword && !!check,
            })}
            onClick={modifyPassword}
          >
            비밀번호 변경하기
          </button>
        </form>
      </div>
      {isShowError && (
        <MobileCommonModal setIsShowError={setIsShowError}>{message}</MobileCommonModal>
      )}
      {isShowModal && <PasswordSuccessModal>재설정된 비밀번호로 다시 로그인해주세요. </PasswordSuccessModal>}
    </div>
  );
}
