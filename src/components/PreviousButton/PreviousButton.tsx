import { useNavigate } from 'react-router-dom';

import { ReactComponent as ChevronRight } from 'assets/svg/common/previous.svg';
import cn from 'utils/ts/classNames';

import styles from './PreviousButton.module.scss';

interface Props {
  fallback?: string,
  position?: string,
}

export default function PreviousButton({ fallback, position } : Props) {
  const navigate = useNavigate();
  const isPreviousPath = window.history.state?.idx > 0;

  const handleClick = () => {
    if (fallback) navigate(fallback);
    else if (isPreviousPath) navigate(-1);
  };

  return (
    <button
      type="button"
      className={
        cn({
          [styles['previous-button']]: true,
          [styles['previous-button--fixed-left']]: position === 'left',
        })
      }
      onClick={() => handleClick()}
      aria-label="이전 페이지로 이동"
    >
      <ChevronRight title="이전 페이지로 이동" />
    </button>
  );
}
