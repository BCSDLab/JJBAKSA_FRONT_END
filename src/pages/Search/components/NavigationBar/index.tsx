import PreviousButton from 'components/PreviousButton/PreviousButton';
import styles from 'pages/Search/components/NavigationBar/NavigationBar.module.scss';

interface Props {
  searchQuery?: String
}

export default function NavigationBar({ searchQuery = '검색' }: Props) {
  return (
    <nav className={styles['search-nav']}>
      <div className={styles['search-nav__button']}>
        <PreviousButton />
      </div>
      <h1 className={styles['search-nav__text']}>{searchQuery}</h1>
    </nav>
  );
}
