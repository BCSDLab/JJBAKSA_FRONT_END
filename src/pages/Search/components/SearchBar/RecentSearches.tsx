import styles from 'pages/Search/components/SearchBar/SearchBar.module.scss';

export default function ResentSearches() {
  return (
    <div>
      <div className={styles['search-recent']}>
        <div className={styles['search-recent__title-list']}>
          <div className={styles['search-recent__title']}>최근 검색어</div>
          <div className={styles['search-recent__detele-all']}>전체 삭제</div>
        </div>
        <div className={styles['search-recent__content-list']}>
          <button type="button" className={styles['search-recent__content']} onClick={() => { console.log('test'); }}>
            {/* <img className={styles['search-recent__content-img']} src="" alt="error" /> */}
            <div className={styles['search-recent__content-img']} />
            <div className={styles['search-recent__content-text-list']}>
              <div className={styles['search-recent__content-text']}>test</div>
              <div className={styles['search-recent__content-text2']}>test</div>
            </div>
          </button>
          {/* <div className={styles['search-rescent__content']}>test</div>
          <div className={styles['search-recent__content']}>test</div>
          <div className={styles['search-recent__content']}>test</div>
          <div className={styles['search-recent__content']}>test</div> */}
        </div>
        {/* <div className={styles['search-recent__content']} /> */}
      </div>
    </div>
  );
}
