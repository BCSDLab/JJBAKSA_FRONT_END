import { useParams } from 'react-router-dom';
import styles from 'pages/SearchDetails/SearchDetails.module.scss';
import NavigationBar from 'pages/Search/components/NavigationBar';
import LoadingView from './components/LoadingView';
import SearchItem from './components/SearchItem';
import useFetchShops from './hooks/useFetchShops';
import ControllBar from './components/ControllBar';

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
  const { keyword } = useParams();
  const { isFetching, data: shops }: Props = useFetchShops(keyword!);
  return (
    <div>
      <div className={styles.search}>
        <NavigationBar keyword={keyword} />
        <ControllBar />
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
