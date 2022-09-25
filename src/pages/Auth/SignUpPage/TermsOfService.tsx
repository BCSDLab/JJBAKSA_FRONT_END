import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Arrow } from 'assets/svg/arrow.svg';
import styles from './TermsOfService.module.scss';
import privacy from './static/privacy';

const useCheckbox = () => {
  const [checkedList, setCheckedList] = useState<boolean[]>(() => privacy.map(() => false));
  const allCheck = useMemo(() => !checkedList.some((checked) => !checked), [checkedList]);

  const changeCheck = (idx: number) => {
    const changeList = checkedList.slice();
    changeList[idx] = !changeList[idx];
    setCheckedList(changeList);
  };

  const changeAllCheck = () => {
    if (allCheck) {
      setCheckedList(privacy.map(() => false));
    } else {
      setCheckedList(privacy.map(() => true));
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
        {/* 헤더 */}
        <div>쩝쩝박사</div>
        <div className={styles['terms-of-service']}>
          <div className={styles['terms-of-service__title']}>약관동의</div>
          <div>
            <div className={styles.checkbox}>
              <div className={styles.checkbox_entire}>
                <input
                  className={styles.checkbox__input}
                  type="checkbox"
                  onChange={changeAllCheck}
                  checked={allCheck}
                />
                전체동의
              </div>
            </div>
            {privacy.map((res, index) => (
              <div key={res.key} className={styles.checkbox}>
                <details className={styles.checkbox__details}>
                  <summary className={styles.checkbox__summary}>
                    <input className={styles.checkbox__input} type="checkbox" onChange={() => changeCheck(index)} checked={checkedList[index]} />
                    <div>{res.summary}</div>
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
            onClick={() => navigate('/SignUp')}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
