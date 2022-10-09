import { ReactComponent as PreviousIcon } from 'assets/svg/previous.svg';
import { useNavigate } from 'react-router-dom';
import styles from '../Search.module.scss';

interface Navigate {
  to? : string | Number;
}

export default function PreviousButton({ to = -1 } : Navigate) {
  const navigate = useNavigate();

  function routingHandler() {
    // if (to === undefined) {
    //   navigate(-1);
    // } else navigate(to);
    navigate(to as string);
  }
  return (
    <button type="button" onClick={routingHandler} className={styles['search-nav__button--previous']}>
      <PreviousIcon title="이전 페이지로 이동" />
    </button>
  );
}
