import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'utils/ts/classNames';
import styles from './TermsOfService.module.scss';
import privacy from './static/privacy';
import { ReactComponent as CloseArrow } from '../../../assets/svg/arrow-close.svg';

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

export default function TermsOfService(): JSX.Element {
  const navigate = useNavigate();
  const {
    checkedList, changeCheck, allCheck, changeAllCheck,
  } = useCheckbox();
  return (
    <div className={styles.templete}>
      <div className={styles['terms-of-service']}>
        {/* 헤더 */}
        <div>쩝쩝박사</div>
        <div className={styles.contents}>
          <div className={styles.contents__title}>약관동의</div>
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
                    <CloseArrow className={styles.checkbox__icon} />
                  </summary>
                  <p className={styles.checkbox__info}>{res.content}</p>
                </details>
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          className={cn({
            [styles['terms-of-service__button']]: true,
            [styles['terms-of-service__button--active']]: allCheck,
          })}
          disabled={!allCheck}
          onClick={() => navigate('/SignUp')}
        >
          다음
        </button>
      </div>
    </div>
  );
}
