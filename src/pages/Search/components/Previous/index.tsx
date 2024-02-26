import PreviousButton from 'components/PreviousButton/PreviousButton';

import styles from './Previous.module.scss';

interface Props {
  className: string;
  prevText: string;
}

export default function Previous({ className, prevText }: Props) {
  return (
    <div className={className}>
      <div className={styles['search-nav']}>
        <div className={styles['search-nav__button']}>
          <PreviousButton />
        </div>
        <h1 className={styles['search-nav__text']}>{prevText}</h1>
      </div>
    </div>
  );
}
