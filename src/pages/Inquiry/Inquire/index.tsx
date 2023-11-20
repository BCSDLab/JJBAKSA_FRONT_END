import { Link } from 'react-router-dom';
import Explain from './components/Explain';
import styles from './Inquire.module.scss';

export default function Inquiry(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.menu}>
          <Link to="/inquiry/all" className={styles.menu__link}>
            <div className={styles['menu__title-text']}>
              문의하기
            </div>
          </Link>

          <Explain className={styles.menu__explain} />
        </div>

        <div className={styles.form}>
          a
        </div>
      </div>
    </div>
  );
}
