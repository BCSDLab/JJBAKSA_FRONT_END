import { Link } from 'react-router-dom';
import { ReactComponent as PreviousIcon } from 'assets/svg/previous.svg';
import styles from '../Search.module.scss';

interface Navigate {
  to? : string;
}

export default function PreviousButton({ to } : Navigate) {
  return (
    <Link to={`${to}`} className={styles['search-nav__button--previous']}>
      <PreviousIcon title="이전 페이지로 이동" />
    </Link>
  );
}

PreviousButton.defaultProps = {
  to: '/',
};
