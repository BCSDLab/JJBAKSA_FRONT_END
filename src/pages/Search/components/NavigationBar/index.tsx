import PreviousButton from 'components/PreviousButton/PreviousButton';
import styles from 'pages/Search/components/NavigationBar/NavigationBar.module.scss';

interface Props {
  keyword?: string;
}

export default function NavigationBar({ keyword = '검색' }: Props) {
  return (
    <nav className={styles['search-nav']}>
      <div className={styles['search-nav__button']}>
        <PreviousButton />
      </div>
      <h1 className={styles['search-nav__text']}>{keyword}</h1>
    </nav>
  );
}
