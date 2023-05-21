import { Link } from 'react-router-dom';
import { ReactComponent as Move } from 'assets/svg/inquiry/myinquiry.svg';
import styles from './MyInquiry.module.scss';

export default function MyInquiry(): JSX.Element {
  return (
    <div>
      <Link to="/myinquiry" className={styles.link}>
        <div className={styles['my-inquiry']}>
          나의 문의 바로가기
          <div className={styles.move}>
            <Move />
          </div>
        </div>
      </Link>
    </div>
  );
}
