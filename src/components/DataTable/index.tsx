import React from 'react';
import styles from './DataTable.module.scss';

interface Props {
  data: {
    title: string;
    content: string;
    boardType: string;
    createdAt: string;
  }[];
  title: string;
  subTitle: string;
  TableTopButton?: React.ElementType;
}

export default function DataTable({
  data, title, subTitle, TableTopButton,
}: Props): JSX.Element {
  return (
    <div>
      <header className={styles.header}>
        <div>
          <h1 className={styles.header__title}>{title}</h1>
          <h3 className={styles['header__sub-title']}>{subTitle}</h3>
        </div>
        {TableTopButton && <TableTopButton />}
      </header>
      <div className={styles.body}>
        <div className={styles['body__list-title']}>
          <div>NO</div>
          <div>TITLE</div>
          <div>NAME</div>
          <div>DATE</div>
          <div>HIT</div>
        </div>
      </div>
      <div>
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
      </div>
    </div>
  );
}
