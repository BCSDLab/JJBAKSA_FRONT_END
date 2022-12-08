import { useFetchShops } from 'api/search';
import { useParams } from 'react-router-dom';
import styles from 'pages/Search/Search.module.scss';
import NavigationBar from 'pages/Search/components/NavBar/NavigationBar';
import LoadingView from './LoadingView/LoadingView';
import SearchItem from './SearchItems';

interface Props {
  address: string,
  placeName: string,
  shopId: number,
}

function SearchDetails() {
  const { searchQuery } = useParams();
  const { isFetching, data } = useFetchShops(searchQuery as string);

  return (
    <div>
      <div className={styles.search}>
        <NavigationBar searchQuery={searchQuery} />
        <div className={styles['search-detail']}>
          {isFetching
            ? <LoadingView />
            : data?.data.content.map((shop: Props) => (
              <SearchItem key={shop.shopId} shop={shop} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default SearchDetails;
