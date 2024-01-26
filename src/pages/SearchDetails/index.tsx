import { useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { Shop } from 'api/shop/entity';
import SearchInput from 'pages/Search/components/SearchInput';
import Suggestions from 'pages/Search/components/Suggestions';
import useRecentSearches from 'pages/Search/hooks/useRecentSearches';
import useSearchingMode from 'pages/Search/hooks/useSearchingMode';
import LoadingView from 'pages/SearchDetails/components/LoadingView';
import SearchItem from 'pages/SearchDetails/components/SearchItem';
import useFetchShops from 'pages/SearchDetails/hooks/useFetchShops';
import useSearchForm from 'store/text';
import useMediaQuery from 'utils/hooks/useMediaQuery';

import styles from './SearchDetails.module.scss';

export default function SearchDetails() {
  const inputRef = useRef(null);
  const location = useLocation();
  const params = useParams();
  const keyword = params.keyword as string;

  const { isMobile } = useMediaQuery();
  const isSearching = useSearchingMode({ inputRef });
  const { text, setText } = useSearchForm(location.pathname);
  const { addCard } = useRecentSearches();

  const {
    isFetching, data: shops, shopCount,
  } = useFetchShops(keyword);

  useEffect(() => {
    setText(keyword);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.details}>
        <div className={styles.details__search}>
          <SearchInput
            className={styles.details__input}
            ref={inputRef}
          />
          {!isMobile && isSearching
            && <Suggestions className={styles.details__suggestions} text={text} />}
        </div>

        <div className={styles.details__result}>
          {`${shopCount}개의 검색결과`}
        </div>
        <div className={styles.details__list}>
          {isFetching
            ? <LoadingView />
            : shops?.map((shop: Shop) => (
              <div className={styles.details__line} key={shop.placeId}>
                <SearchItem shop={shop} addCard={addCard} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
