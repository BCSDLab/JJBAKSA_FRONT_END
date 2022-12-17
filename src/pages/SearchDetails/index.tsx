import { useParams } from 'react-router-dom';
import styles from 'pages/SearchDetails/SearchDetails.module.scss';
import NavigationBar from 'pages/Search/components/NavigationBar';
import LoadingView from './components/LoadingView';
import SearchItem from './components/SearchItems';
import useFetchShops from './hooks/useFetchShops';

interface Props {
  isFetching: boolean;
  data: Shops[];
}
interface Shops {
  address: string;
  placeName: string;
  shopId: number;
}

export default function SearchDetails() {
  const { searchQuery } = useParams();
  const { isFetching, data: shops }: Props = useFetchShops(searchQuery!);
  return (
    <div>
      <div className={styles.search}>
        <NavigationBar searchQuery={searchQuery} />
        <div className={styles['search-details']}>
          {isFetching
            ? <LoadingView />
            : shops.map((shop) => (
              <SearchItem key={shop.shopId} shop={shop} />
            ))}
        </div>
      </div>
    </div>
  );
}
