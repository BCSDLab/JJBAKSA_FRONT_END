import React from 'react';
import { ReactComponent as ErrorIcon } from 'assets/svg/error.svg';
import useFirstErrorMessage from '../../hooks/useFirstErrorMessage';
import styles from '../SignUp.module.scss';

export default function TopErrorMessage() {
  const FirstErrorMessage = useFirstErrorMessage();

  return (
    <div className={styles['top-error']}>

      {FirstErrorMessage
        && (
          <>
            <ErrorIcon
              className={styles['form__error-icon--mobile']}
              aria-hidden
            />
            <div className={styles['form__error--top']}>{FirstErrorMessage}</div>
          </>
        )}
    </div>
  );
}
