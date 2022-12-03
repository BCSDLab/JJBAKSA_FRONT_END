import { ReactComponent as LogoIcon } from 'assets/svg/common/logo.svg';
import { Link } from 'react-router-dom';
import styles from './AuthTitle.module.scss';

function AuthTitle() {
  return (
    <div className={styles.title}>
      <Link className={styles.title__logo} to="/"><LogoIcon /></Link>
      <h1 className={styles.title__text}>쩝쩝박사</h1>
    </div>
  );
}
export default AuthTitle;
