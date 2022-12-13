import React from 'react';
import styles from '../Search.module.scss';

export default function SearchNavigationBar(props : React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={styles['search-nav']} {...props} />
  );
}
