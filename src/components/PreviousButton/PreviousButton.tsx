import { ReactComponent as ChevronRight } from 'assets/svg/previous.svg';
import { useNavigate } from 'react-router-dom';
import styles from './PreviousButton.module.scss';

export default function PreviousButton() {
  const navigate = useNavigate();

  function routingHandler() {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  }
  return (
    <button type="button" onClick={routingHandler} className={styles['previous-button']}>
      <ChevronRight title="이전 페이지로 이동" />
    </button>
  );
}
