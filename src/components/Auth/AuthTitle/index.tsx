import { Link } from 'react-router-dom';

import { ReactComponent as LogoIcon } from 'assets/svg/common/favicon.svg';

import styles from './AuthTitle.module.scss';

export default function AuthTitle() {
  return (
    <div className={styles.title}>
      <Link to="/"><LogoIcon /></Link>
    </div>
  );
}
