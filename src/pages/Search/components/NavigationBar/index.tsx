import PreviousButton from 'components/PreviousButton/PreviousButton';
import styles from 'pages/Search/components/NavigationBar/NavigationBar.module.scss';
import useMediaQuery from 'utils/hooks/useMediaQuery';

interface Props {
  keyword?: string;
}

export default function NavigationBar({ keyword = '검색' }: Props) {
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
