import React, { useState } from 'react';
import { ReactComponent as Arrow } from 'assets/svg/common/arrow.svg';
import styles from './DataTable.module.scss';

interface Props {
  data: {
    answer: string;
    content: string;
    createdAt: string;
    createdBy: string;
    id: number;
    isSecreted: number;
    title: string;
  }[];
}

export default function DataTable({ data }: Props): JSX.Element {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const noDataTitle = '문의 내역이 없습니다.';
  const noAnswerTitle = '아직 답변이 없네요. 조금만 기다려주세요!';

  const handleKeyPress = (e: React.KeyboardEvent, id: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setExpandedId(expandedId === id ? null : id);
    }
  };

  return (
    <div className={styles.table}>
      {data.length === 0 ? (
        <div className={styles.noData}>
          {noDataTitle}
        </div>
      ) : (
        data.map((item) => (
          <div
            key={item.id}
            className={styles.block}
            onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
            onKeyPress={(e) => handleKeyPress(e, item.id)}
            role="button"
            tabIndex={0}
          >
            <div className={styles.block__body}>
              <p className={styles.block__title}>
                {item.title}
              </p>
              <span className={styles.block__info}>
                {new Date(item.createdAt).toLocaleDateString()}
                |
                {item.createdBy}
              </span>
              <span className={styles['block__body-extender']}>
                <Arrow style={{ transform: expandedId === item.id ? 'rotate(-180deg)' : 'rotate(0deg)' }} />
              </span>

              {expandedId === item.id && (
                <div className={styles.block__answerBox}>
                  {item.answer ? (
                    <p className={styles['block__answerBox-answer']}>
                      {item.answer}
                    </p>
                  ) : (
                    <p className={styles['block__answerBox-noAnswer']}>
                      {noAnswerTitle}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
