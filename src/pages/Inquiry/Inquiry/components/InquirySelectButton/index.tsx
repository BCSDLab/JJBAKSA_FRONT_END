import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'utils/ts/classNames';
import { ReactComponent as Dot } from 'assets/svg/inquiry/dot.svg';
import styles from './InquirySelectButton.module.scss';

interface InquirySelectButtonProps {
  path: string;
  text: string;
  isSelected: boolean;
}

export default function InquirySelectButton(data: InquirySelectButtonProps): JSX.Element {
  const {
    path, text, isSelected,
  } = data;

  return (
    <Link
      to={path}
      className={cn({
        [styles.link]: true,
        [styles['link--selected']]: isSelected,
      })}
      tabIndex={0}
    >
      {isSelected ? <Dot className={styles.link__dot} /> : null}
      {text}
    </Link>
  );
}
