import PreviousButton from 'components/PreviousButton/PreviousButton';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useGeolocation from 'utils/hooks/useGeolocation';
import { useFetchShops } from '../api';
import styles from '../Search.module.scss';
import SearchNavigationBar from './SearchNavigationBar';
import SearchQueryItem from './SearchQueryItem';

interface Props {
  placeName: string,
  address: string,
  shopId: number,
}

// interface Coords {
//   latitude: number,
//   longitude: number
// }

// interface Position {
//   coords: Coords
// }

function SearchQueryItemList() {
  const { searchQuery } = useParams();
  const { location } = useGeolocation();
  // const location = { coords: { latitude: 36.766537, longitude: 127.281372 } };
  const { isLoading, data, refetch } = useFetchShops(searchQuery as string, location?.coords);

  useEffect(() => {
    if (location) {
      refetch();
    }
  }, [location, refetch]);
  return (
    <div>
      <div className={styles.search}>
        <SearchNavigationBar>
          <PreviousButton />
          <h1 className={styles['search-nav__text']}>{searchQuery}</h1>
        </SearchNavigationBar>
        {isLoading ? <div>Loading...</div>
          : (
            <div className={styles['search-detail']}>
              {isLoading ? <div>Loading...</div>
                // eslint-disable-next-line max-len
                : data?.data.content.map((shop: Props) => <SearchQueryItem key={shop.shopId} data={shop} />)}
            </div>
          )}
      </div>

    </div>
  );
}

export default SearchQueryItemList;
