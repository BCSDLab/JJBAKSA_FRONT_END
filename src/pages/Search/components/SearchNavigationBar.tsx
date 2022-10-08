import React from 'react';
import styles from '../Search.module.scss';

// eslint-disable-next-line max-len
export default function SearchNavigationBar({ children }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return (
    <nav className={styles['search-nav']}>
      {children}
    </nav>
  );
}
