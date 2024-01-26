import PreviousButton from 'components/PreviousButton/PreviousButton';

import styles from './NavigationBar.module.scss';

interface Props {
  prevWord: string;
}

export default function NavigationBar({ prevWord }: Props) {
  return (
    <nav className={styles['search-nav']}>
      <div className={styles['search-nav__button']}>
        <PreviousButton />
      </div>
      <h1 className={styles['search-nav__text']}>{prevWord}</h1>
    </nav>
  );
}
