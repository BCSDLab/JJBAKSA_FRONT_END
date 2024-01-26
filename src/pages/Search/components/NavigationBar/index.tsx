import PreviousButton from 'components/PreviousButton/PreviousButton';
import useMediaQuery from 'utils/hooks/useMediaQuery';

import styles from './NavigationBar.module.scss';

interface Props {
  keyword: string;
}

export default function NavigationBar({ keyword }: Props) {
  const { isMobile } = useMediaQuery();

  return (
    <nav className={styles['search-nav']}>
      {isMobile
        && (
        <div className={styles['search-nav__button']}>
          <PreviousButton />
        </div>
        )}
      <h1 className={styles['search-nav__text']}>{keyword}</h1>
    </nav>
  );
}
