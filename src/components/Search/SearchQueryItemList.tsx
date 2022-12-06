import { useFetchShops } from 'api/search';
import PreviousButton from 'components/PreviousButton/PreviousButton';
import { useParams } from 'react-router-dom';
import styles from 'pages/Search/Search.module.scss';
import SearchNavigationBar from './SearchNavigationBar';
import SearchQueryItem from './SearchQueryItem';
import LoadingView from './LoadingView';

interface Props {
  address: string,
  placeName: string,
  shopId: number,
}

function SearchQueryItemList() {
  const { searchQuery } = useParams();
  const { isFetching, data } = useFetchShops(searchQuery as string);

  return (
    <div>
      <div className={styles.search}>
        <SearchNavigationBar>
          <PreviousButton />
          <h1 className={styles['search-nav__text']}>{searchQuery}</h1>
        </SearchNavigationBar>
        <div className={styles['search-detail']}>
          {isFetching
            ? <LoadingView />
            : data?.data.content.map((shop: Props) => (
              <SearchQueryItem key={shop.shopId} shop={shop} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default SearchQueryItemList;
