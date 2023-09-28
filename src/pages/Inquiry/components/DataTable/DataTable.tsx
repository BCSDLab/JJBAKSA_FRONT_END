import React from 'react';
import styles from './DataTable.module.scss';

interface Props {
  data: {
    title: string;
    content: string;
    boardType: string;
    createdAt: string;
  }[];
}

export default function DataTable({ data }: Props): JSX.Element {
  console.log(data);
  return (
    <div>
      <div className={styles.body}>
        s
      </div>
      {/* <div>
        {data.map((res) => (
          <div key={res.title} className={styles.body__list}>
            <div className={styles.body__element}>
              {res.content}
            </div>
            <div className={styles.body__element}>
              {res.title}
            </div>
            <div className={styles.body__element}>
              {res.boardType}
            </div>
            <div className={styles.body__element}>
              {res.createdAt}
            </div>
            <div className={styles.body__element}>
              {res.content}
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}
