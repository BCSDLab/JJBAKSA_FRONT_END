import { ReactComponent as LogoIcon } from 'assets/svg/logo.svg';
import { Link } from 'react-router-dom';
import styles from './AuthTitle.module.scss';

function AuthTitle(): JSX.Element {
  return (
    <div className={styles.title}>
      <Link className={styles.title__logo} to="/"><LogoIcon /></Link>
      <div className={styles.title__text}>쩝쩝박사</div>
    </div>
  );
}
export default AuthTitle;
