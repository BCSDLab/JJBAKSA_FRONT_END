import React from 'react';
import styles from './Answer.module.scss';

export default function Answer({ text }: { text: string }): JSX.Element {
  return (
    <div className={styles.answer}>
      {text ? (
        <p className={styles['answer--answered']}>
          {text}
        </p>
      ) : (
        <p className={styles['answer--no-answered']}>
          아직 답변이 없네요. 조금만 기다려주세요!
        </p>
      )}
    </div>
  );
}
