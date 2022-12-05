import { useFetchShops } from 'api/search';
import PreviousButton from 'components/PreviousButton/PreviousButton';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from 'pages/Search/Search.module.scss';
import SearchNavigationBar from './SearchNavigationBar';
import SearchQueryItem from './SearchQueryItem';
import LoadingView from './LoadingView';

interface Props {
  address: string,
  dist: number,
  placeId: string,
  placeName: string,
  score: number,
  shopId: number,
  x: string,
  y: string,
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
        {
          <div className={styles['search-detail']}>
            {isLoading ? <LoadingView />
              // eslint-disable-next-line max-len
              : data?.data.content.map((shop: Props) => <SearchQueryItem key={shop.shopId} data={shop} />)}
          </div>
        }
      </div>

    </div>
  );
}

export default SearchQueryItemList;
