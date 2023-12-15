import styles from 'pages/Search/components/SearchBar/SearchBar.module.scss';
import { ReactComponent as NearbyIcon } from 'assets/svg/home/nearby.svg';

interface Props {
  shop: string;
  category: string;
  defaultImage: string;
}
export default function ResentSearchItem({ shop }: Props) {
  console.log(shop);
  return (
    <button
      type="button"
      className={styles['search-recent__content']}
      onClick={() => {
        console.log('요소클릭');
      }}
    >
      {/* <img className={styles['search-recent__content-img']} src="" alt="error" /> */}
      <div className={styles['search-recent__content-img']} />
      <div className={styles['search-recent__content-text-list']}>
        <div className={styles['search-recent__content-text']}>test</div>
        <div className={styles['search-recent__content-text2']}>test</div>
      </div>
      <div className={styles['search-recent__content-dim']}>
        <NearbyIcon
          className={styles['search-recent__content-dim-icon']}
          onClick={(e) => {
            e.stopPropagation();
            console.log('삭제');
          }}
        />
      </div>
    </button>

  );
}
