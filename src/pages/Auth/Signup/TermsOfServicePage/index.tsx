import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Arrow } from 'assets/svg/common/arrow.svg';
import Copyright from 'components/Auth/Copyright';
import AuthTopNavigation from 'components/Auth/AuthTopNavigation';
import AuthDetail from 'components/Auth/AuthDetail';
import styles from './TermsOfService.module.scss';
import PRIVACY from '../static/privacy';

export default function TermsOfService() {
  const navigate = useNavigate();

  return (
    <div className={styles.template}>
      <AuthTopNavigation />
      <div className={styles.container}>
        <div className={styles['terms-of-service']}>
          <AuthDetail name="약관동의" first="쩝쩝박사의 서비스를 이용하려면" second="회원가입하세요." />
          <div className={styles.progress}>
            <div className={styles.progress__active}>1</div>
            <div className={styles.progress__line} />
            <div className={styles.progress__disable}>2</div>
            <div className={styles.progress__line} />
            <div className={styles.progress__disable}>3</div>
          </div>
          <div>
            {PRIVACY.map((res) => (
              <div key={res.key} className={styles.checkbox}>
                <details className={styles.checkbox__detail}>
                  <summary className={styles.checkbox__summary}>
                    <div className={styles.checkbox__necessary}>필수</div>
                    <label className={styles['checkbox__summary-text']} htmlFor={res.summary}>
                      {res.summary}
                    </label>
                    <Arrow className={styles.checkbox__icon} />
                  </summary>
                  <p className={styles.checkbox__info}>{res.content}</p>
                </details>
              </div>
            ))}
          </div>
          <button
            type="button"
            className={styles['terms-of-service__submit']}
            onClick={() => navigate('/signup', { state: { termsCheck: true } })}
          >
            전체 동의하기
          </button>
        </div>
        <Copyright />
      </div>
    </div>
  );
}
