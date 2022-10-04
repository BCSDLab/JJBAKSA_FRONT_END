import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Arrow } from 'assets/svg/arrow.svg';
import AuthTitle from 'components/Auth/AuthTitle';
import Copyright from 'components/Auth/Copyright';
import styles from './TermsOfService.module.scss';
import PRIVACY from '../static/privacy';

const useCheckbox = () => {
  const [checkedList, setCheckedList] = useState<boolean[]>(() => PRIVACY.map(() => false));
  const allCheck = !checkedList.some((checked) => !checked);

  const changeCheck = (idx: number) => {
    const changeList = checkedList.slice();
    changeList[idx] = !changeList[idx];
    setCheckedList(changeList);
  };

  const changeAllCheck = () => {
    if (allCheck) {
      setCheckedList(PRIVACY.map(() => false));
    } else {
      setCheckedList(PRIVACY.map(() => true));
    }
  };

  return {
    checkedList, changeCheck, allCheck, changeAllCheck,
  };
};

export default function TermsOfService() {
  const navigate = useNavigate();
  const {
    checkedList, changeCheck, allCheck, changeAllCheck,
  } = useCheckbox();
  return (
    <div className={styles.template}>
      <div className={styles.container}>
        <AuthTitle />
        <div className={styles['terms-of-service']}>
          <div className={styles['terms-of-service__title']}>약관동의</div>
          <div>
            <div className={styles.checkbox}>
              <label htmlFor="allCheck" className={styles.checkbox__entire}>
                <input
                  id="allCheck"
                  className={styles.checkbox__input}
                  type="checkbox"
                  onChange={changeAllCheck}
                  checked={allCheck}
                />
                전체동의
              </label>
            </div>
            {PRIVACY.map((res, index) => (
              <div key={res.key} className={styles.checkbox}>
                <details className={styles.checkbox__details}>
                  <summary className={styles.checkbox__summary}>
                    <input className={styles.checkbox__input} type="checkbox" onChange={() => changeCheck(index)} checked={checkedList[index]} />
                    <div className={styles['checkbox__summary-text']}>{res.summary}</div>
                    <Arrow className={styles.checkbox__icon} />
                  </summary>
                  <p className={styles.checkbox__info}>{res.content}</p>
                </details>
              </div>
            ))}
          </div>
          <button
            type="button"
            className={
              styles['terms-of-service__submit']
            }
            disabled={!allCheck}
            onClick={() => navigate('/signup', { state: { termsCheck: true }, replace: true })}
          >
            다음
          </button>
        </div>
        <Copyright />
      </div>
    </div>
  );
}
