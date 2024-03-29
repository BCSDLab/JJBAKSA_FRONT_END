import { useState } from 'react';
import { createPortal } from 'react-dom';

import { withdrawUser } from 'api/user';
import WithdrawalModal from 'pages/Setting/Withdrawal/components/WithdrawalModal';
import useWithDrawal from 'pages/Setting/Withdrawal/useWithdrawal';
import { useAuth } from 'store/auth';
import useBooleanState from 'utils/hooks/useBooleanState';

import styles from './Withdrawal.module.scss';

export default function Withdrawal() {
  const auth = useAuth();
  const [isCheck, setIsCheck] = useState(0);
  const [modal, open] = useBooleanState(false);
  const deleteAccount = useWithDrawal();
  const checked = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setIsCheck(isCheck + 1);
    } else { setIsCheck(isCheck - 1); }
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    withdrawUser();
    event.preventDefault();
  };

  return (
    <div className={styles.template}>
      {modal && createPortal(<WithdrawalModal />, document.body)}

      <div className={styles.content}>
        <div className={styles.detail}>
          <div className={styles.detail__title}>회원 탈퇴</div>
          <span className={styles.detail__nickname}>{auth!.nickname}</span>
          님,
          <div className={styles.detail__text}>쩝쩝박사 학위를 포기하시겠어요..?</div>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.checkbox}>
            <div className={styles.checkbox__title}>계정을 삭제하시려는 이유가 궁금해요.</div>
            <label htmlFor="information" className={styles.checkbox__label}>
              <input className={styles.form__checkbox} type="checkbox" id="information" name="reason" onChange={checked} />
              가게 정보가 부족해요
            </label>
            <label htmlFor="discomport" className={styles.checkbox__label}>
              <input className={styles.form__checkbox} type="checkbox" id="discomport" name="reason" onChange={checked} />
              사용이 불편해요
            </label>
            <label htmlFor="usage" className={styles.checkbox__label}>
              <input className={styles.form__checkbox} type="checkbox" id="usage" name="reason" onChange={checked} />
              다른 앱을 더 많이 사용해요
            </label>
            <label htmlFor="account" className={styles.checkbox__label}>
              <input className={styles.form__checkbox} type="checkbox" id="account" name="reason" onChange={checked} />
              새 계정을 만들고 싶어요
            </label>
            <label htmlFor="other" className={styles.checkbox__label}>
              <input className={styles.form__checkbox} type="checkbox" id="other" name="reason" onChange={checked} />
              기타
            </label>
          </div>
          <div className={styles.feedback}>
            <div className={styles.feedback__title}>개선되면 좋을 점이나 불편하셨던 점을 말씀해주세요!</div>
            <div className={styles.feedback__detail}>
              {'적극 반영하여 개선하도록 하겠습니다.\n쩝쩝박사의 문은 언제든 열려있으니 다시 찾아와 주세요!'}
            </div>
            <textarea className={styles.feedback__input} placeholder="자유롭게 작성해주세요 :)" />
          </div>
          <div className={styles.caution}>
            <div className={styles.caution__title}>유의사항</div>
            <ul className={styles.caution__list}>
              <li>탈퇴하시면 이용 중인 계정이 폐쇄되며, 계정 삭제 후 7일간 다시 가입할 수 없어요.</li>
              <li>작성한 리뷰, 북마크, 프로필 등 모든 정보가 삭제 됩니다.</li>
              <li>추후 같은 계정으로 재가입해도 작성한 내역은 복구되지 않아요.</li>
            </ul>
          </div>
          <button type="submit" className={styles.form__button} onClick={() => { open(); deleteAccount(); }} disabled={isCheck === 0}>
            회원탈퇴
          </button>
        </form>
      </div>
    </div>
  );
}
