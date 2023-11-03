import React from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'utils/ts/classNames';
import { ReactComponent as Dot } from 'assets/svg/inquiry/dot.svg';
import styles from './InquirySelectButton.module.scss';

interface Props {
  name: string;
  path: string;
  text: string;
  isSelected: boolean;
}

export default function InquirySelectButton(data: Props): JSX.Element {
  const {
    name, path, text, isSelected,
  } = data;
  const navigate = useNavigate();

  return (
    <button
      className={cn({
        [styles.btn]: true,
        [styles['btn--selected']]: isSelected,
      })}
      name={name}
      onClick={() => navigate(path)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          navigate(path);
        }
      }}
      type="button"
      tabIndex={0}
    >
      {isSelected ? <Dot className={styles.btn__dot} /> : null}
      {text}
    </button>
  );
}
