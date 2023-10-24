import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as WriteInquiryIcon } from 'assets/svg/inquiry/write-inquiry.svg';
import styles from './Inquire.module.scss';

export default function Inquiry(): JSX.Element {
  const navigate = useNavigate();

  const title = '문의하기';
  const explainTitle = '쩝쩝박사 이용 중에 생긴 불편한 점이나 문의사항을 등록해주세요.';
  const explainSmallTitle = '확인 후 순차적으로 답변 드리겠습니다.';

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.menu}>
          <div
            className={styles.menu__title}
            onClick={() => {
              navigate('/inquiry/all');
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigate('/inquiry/all');
              }
            }}
            role="button"
            tabIndex={0}
          >
            {title}
          </div>

          <div className={styles.menu__explain}>
            <div className={styles['menu__explain--svg']}>
              <WriteInquiryIcon />
            </div>

            <div className={styles['menu__explain--title']}>
              {explainTitle}
            </div>

            <div className={styles['menu__explain--small-title']}>
              {explainSmallTitle}
            </div>
          </div>
        </div>

        <div className={styles['search-data']}>
          a
        </div>
      </div>
    </div>
  );
}
