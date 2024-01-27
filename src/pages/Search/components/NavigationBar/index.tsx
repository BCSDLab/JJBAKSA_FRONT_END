import PreviousButton from 'components/PreviousButton/PreviousButton';

import styles from './NavigationBar.module.scss';

interface Props {
  className: string;
  previous: string;
}

export default function NavigationBar({ className, previous }: Props) {
  return (
    <div className={className}>
      <div className={styles['search-nav']}>
        <div className={styles['search-nav__button']}>
          <PreviousButton />
        </div>
        <h1 className={styles['search-nav__text']}>{previous}</h1>
      </div>
    </div>
  );
}
