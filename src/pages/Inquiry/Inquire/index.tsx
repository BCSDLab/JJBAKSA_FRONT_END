import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as WriteInquiryIcon } from 'assets/svg/inquiry/write-inquiry.svg';
import styles from './Inquire.module.scss';

function Explain(): JSX.Element {
  return (
    <div className={styles.explain}>
      <div className={styles.explain__svg}>
        <WriteInquiryIcon />
      </div>

      <div className={styles.explain__title}>
        쩝쩝박사 이용 중에 생긴 불편한 점이나 문의사항을 등록해주세요.
      </div>

      <div className={styles['explain__small-title']}>
        확인 후 순차적으로 답변 드리겠습니다.
      </div>
    </div>
  );
}

export default function Inquiry(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.menu}>
          <button
            className={styles.menu__title}
            onClick={() => {
              navigate('/inquiry/all');
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigate('/inquiry/all');
              }
            }}
            type="button"
            tabIndex={0}
          >
            문의하기
          </button>

          <Explain />
        </div>

        <div className={styles.form}>
          a
        </div>
      </div>
    </div>
  );
}
