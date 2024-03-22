import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as Progress } from 'assets/svg/auth/first-progress.svg';
import { ReactComponent as Arrow } from 'assets/svg/common/arrow.svg';
import AuthDetail from 'components/Auth/AuthDetail';
import Copyright from 'components/Auth/Copyright';
import PRIVACY from 'pages/Auth/Signup/static/privacy';

import styles from './TermsOfService.module.scss';

export default function TermsOfService() {
  const navigate = useNavigate();

  return (
    <div className={styles.template}>
      <div className={styles.container}>
        <div className={styles['terms-of-service']}>
          <AuthDetail name="약관동의" first="쩝쩝박사의 서비스를 이용하려면" second="회원가입하세요." />
          <div className={styles['terms-of-service__progress']}>
            <Progress />
          </div>
          <div>
            {PRIVACY.map((res) => (
              <div key={res.key} className={styles.checkbox}>
                <details className={styles.checkbox__detail}>
                  <summary className={styles.checkbox__summary}>
                    <div className={styles.checkbox__necessary}>필수</div>
                    <div className={styles['checkbox__summary-text']}>
                      {res.summary}
                    </div>
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
