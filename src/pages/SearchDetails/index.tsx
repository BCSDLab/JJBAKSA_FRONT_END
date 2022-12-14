import { useFetchShops } from 'api/search';
import { useParams } from 'react-router-dom';
import styles from 'pages/SearchDetails/SearchDetails.module.scss';
import NavigationBar from 'pages/Search/components/NavigationBar';
import LoadingView from './components/LoadingView';
import SearchItem from './components/SearchItems';

interface Props {
  address: string,
  placeName: string,
  shopId: number,
}

export default function SearchDetails() {
  const { searchQuery } = useParams();
  const { isFetching, data: shops } = useFetchShops(searchQuery as string);

  return (
    <div>
      <div className={styles.search}>
        <NavigationBar searchQuery={searchQuery} />
        <div className={styles['search-details']}>
          {isFetching
            ? <LoadingView />
            : shops.map((shop: Props) => (
              <SearchItem key={shop.shopId} shop={shop} />
            ))}
        </div>
      </div>
    </div>
  );
}
