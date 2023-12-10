import { Link } from 'react-router-dom';
import Explain from './components/Explain';
import InquireForm from './components/InquireForm';
import styles from './Inquire.module.scss';

export default function Inquire(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles['inner-container']}>
        <div className={styles.menu}>
          <Link to="/inquiry/all" className={styles.menu__link}>
            <div className={styles['menu__title-text']}>
              문의하기
            </div>
          </Link>

          <Explain className={styles.menu__explain} />
        </div>

        <InquireForm />
      </div>
    </div>
  );
}
