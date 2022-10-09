import React from 'react';
import styles from '../Search.module.scss';

// eslint-disable-next-line max-len
export default function SearchNavigationBar(props : React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={styles['search-nav']} {...props} />
  );
}
