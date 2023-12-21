import { ReactComponent as WriteInquiryIcon } from 'assets/svg/inquiry/write-inquiry.svg';
import styles from './Explain.module.scss';

export default function Explain({ className }: { className: string }): JSX.Element {
  return (
    <div className={className}>
      <div className={styles.explain}>
        <div className={styles.explain__icon}>
          <WriteInquiryIcon />
        </div>
        <div className={styles.explain__title}>
          쩝쩝박사 이용 중에 생긴 불편한 점이나 문의사항을 등록해주세요.
        </div>
        <div className={styles['explain__small-title']}>
          확인 후 순차적으로 답변 드리겠습니다.
        </div>
      </div>
    </div>
  );
}
