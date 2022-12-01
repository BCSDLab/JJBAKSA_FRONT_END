import PreviousButton from 'components/PreviousButton/PreviousButton';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchShops } from '../api';
import styles from '../Search.module.scss';
import SearchNavigationBar from './SearchNavigationBar';
import SearchQueryItem from './SearchQueryItem';

interface Props {
  placeName: string,
  address: string,
  shopId: number,
}

function SearchQueryItemList() {
  const { searchQuery } = useParams();
  const { isLoading, data, refetch } = useFetchShops(searchQuery as string);

  useEffect(() => {
    refetch();
  }, [isLoading, refetch]);
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
