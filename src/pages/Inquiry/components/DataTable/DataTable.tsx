import React, { useState } from 'react';
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

  return (
    <div>
      {data.map((item) => (
        <div
          key={item.id}
          className={styles.body__list}
          onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
          style={{ maxHeight: expandedId === item.id ? 'none' : '97px' }}
        >
          <div className={styles.body__element}>
            <p>{item.title}</p>
            <span>{new Date(item.createdAt).toLocaleDateString()} | {item.createdBy}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
