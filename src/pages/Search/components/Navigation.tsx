import PreviousButton from 'components/PreviousButton/PreviousButton';
import styles from '../Search.module.scss';

function Navigation() {
  return (
    <nav className={styles['search-nav']}>
      <div className={styles['search-nav__button']}>
        <PreviousButton />
      </div>
      <h1 className={styles['search-nav__text']}>검색</h1>
    </nav>
  );
}

export default Navigation;
