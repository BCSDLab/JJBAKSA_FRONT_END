import { useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { ShopQueryResponse } from 'api/shop/entity';
import Previous from 'pages/Search/components/Previous';
import SearchInput from 'pages/Search/components/SearchInput';
import Suggestions from 'pages/Search/components/Suggestions';
import useRecentSearches from 'pages/Search/hooks/useRecentSearches';
import useSearchingMode from 'pages/Search/hooks/useSearchingMode';
import CategorySelect from 'pages/SearchDetails/components/CategorySelect';
import LoadingView from 'pages/SearchDetails/components/LoadingView';
import SearchItem from 'pages/SearchDetails/components/SearchItem';
import useFetchShops from 'pages/SearchDetails/hooks/useFetchShops';
import useSearchForm from 'store/text';
import useBooleanState from 'utils/hooks/useBooleanState';
import useMediaQuery from 'utils/hooks/useMediaQuery';

import styles from './SearchDetails.module.scss';

export default function SearchDetails() {
  const inputRef = useRef(null);
  const location = useLocation();
  const params = useParams();
  const keyword = params.keyword as string;

  const { isMobile } = useMediaQuery();
  const { isSearching } = useSearchingMode({ inputRef });
  const { text } = useSearchForm(location.pathname);
  const { addCard } = useRecentSearches();

  const [isCafe, , , changeCategory] = useBooleanState(false);
  const category = isCafe ? 'cafe' : 'restaurant';

  const {
    isFetching, data: shops, shopCount,
  } = useFetchShops({ keyword, category });

  const prevText = location.pathname.startsWith('/shop') ? '검색' : '리뷰하기';

  return (
    <div className={styles.container}>
      <div className={styles.details}>
        {isMobile && <Previous className={styles.details__navigation} prevText={prevText} />}
        <div className={styles.details__search}>
          <div className={styles.details__shade} />
          <SearchInput
            className={styles.details__input}
            ref={inputRef}
          />
          {!isMobile && isSearching
            && <Suggestions className={styles.details__suggestions} text={text} />}
        </div>

        <div className={styles.details__result}>
          <div className={styles.result__count}>
            {`${shopCount}개의 검색결과`}
          </div>
          <CategorySelect
            className={styles.result__category}
            isCafe={isCafe}
            onClick={changeCategory}
          />
        </div>
        <div className={styles.details__list}>
          {isFetching
            ? <LoadingView />
            : shops?.map((shop: ShopQueryResponse) => (
              <SearchItem key={shop.placeId} shop={shop} addCard={addCard} />
            ))}
        </div>
      </div>
    </div>
  );
}
