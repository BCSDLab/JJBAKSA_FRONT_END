import styles from 'pages/Search/components/SearchBar/SearchBar.module.scss';
// import ResentSearchItem from './RecentSearchItem';

// interface StorageProps {
//   name: string;
//   category: string;
//   defaultImage: string;
// }
export default function ResentSearches() {
  // const recentSearches:StorageProps[] = JSON.parse(localStorage.getItem('shop')) || [];
//  console.log(recentSearches);
  return (
    <div>
      <div className={styles['search-recent']}>
        <div className={styles['search-recent__title-list']}>
          <div className={styles['search-recent__title']}>최근 검색어</div>
          <button type="button" className={styles['search-recent__detele-all']} onClick={() => console.log('전체삭제')}>
            <span>전체 삭제</span>
          </button>
        </div>
        <div className={styles['search-recent__content-list']}>

          {/* {recentSearches?.map((recentSearch) => (
            <ResentSearchItem shop={recentSearch} />
          ))} */}
        </div>
      </div>
    </div>
  );
}
