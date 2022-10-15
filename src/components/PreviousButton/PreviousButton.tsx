import { ReactComponent as ChevronRight } from 'assets/svg/previous.svg';
import { useNavigate } from 'react-router-dom';
import classNames from 'utils/ts/classNames';
import styles from './PreviousButton.module.scss';

interface ButtonPostion {
  position?: string
}

export default function PreviousButton(position : ButtonPostion) {
  const navigate = useNavigate();

  function routingHandler() {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  }
  return (
    <button
      type="button"
      onClick={routingHandler}
      className={
      classNames({
        [styles['previous-button']]: true,
        [styles['previous-button--fixed-left']]: position === 'left',
      })
    }
    >
      <ChevronRight title="이전 페이지로 이동" />
    </button>
  );
}
