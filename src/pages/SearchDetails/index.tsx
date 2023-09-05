import { useParams } from 'react-router-dom';
import styles from 'pages/SearchDetails/SearchDetails.module.scss';
import NavigationBar from 'pages/Search/components/NavigationBar';
import LoadingView from './components/LoadingView';
import useFetchShops from './hooks/useFetchShops';
import ControllBar from './components/ControllBar';
import SearchItem from './components/SearchItem';

export default function SearchDetails() {
  const { keyword } = useParams();
  const { isFetching, data: shops } = useFetchShops(keyword ?? '');

  return (
    <div>
      <div className={styles.details}>
        <NavigationBar keyword={keyword} />
        <ControllBar />
        <div className={styles.details__list}>
          {isFetching
            ? <LoadingView />
            : shops && shops.map((shop) => (
              <SearchItem key={shop.placeId} shop={shop} />
            ))}
        </div>
      </div>
    </div>
  );
}
