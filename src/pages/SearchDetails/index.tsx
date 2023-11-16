import styles from 'pages/SearchDetails/SearchDetails.module.scss';
import SearchInput from 'pages/Search/components/SearchBar/SearchInput';
import RelatedSearches from 'pages/Search/components/RelatedSearches';
import { useEffect } from 'react';
import useSearchingMode from 'pages/Search/hooks/useSearchingMode';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import { Shop } from 'api/shop/entity';
import { useNavigate } from 'react-router-dom';
import useSearchForm from 'store/text';
import LoadingView from './components/LoadingView';
import useFetchShops from './hooks/useFetchShops';
import SearchItem from './components/SearchItem';

export default function SearchDetails() {
  const isSearching = useSearchingMode();
  const { isMobile } = useMediaQuery();
  const {
    text, handleChange, handleSubmit, isEnter, submittedText,
  } = useSearchForm();
  const {
    isFetching, data: shops, count,
  } = useFetchShops(submittedText);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isFetching && count === 0 && submittedText.length !== 0) {
      navigate('/search/not-found');
    }
  }, [isFetching, count, submittedText, navigate]);

  const componentsController = () => {
    if (isFetching) {
      return <LoadingView />;
    }

    return shops?.map((shop: Shop) => (
      <div className={styles.details__line} key={shop.placeId}>
        <SearchItem shop={shop} />
      </div>
    ));
  };

  return (
    <div className={styles.details}>
      <div className={styles.details__search}>
        <SearchInput
          onChange={handleChange}
          onSubmit={handleSubmit}
          text={text}
        />
      </div>
      {!isMobile && isSearching && !isEnter && <RelatedSearches text={text} />}
      <div className={styles.details__result}>
        {`${count}개의 검색결과`}
      </div>
      <div className={styles.details__list}>
        {componentsController()}
      </div>
    </div>
  );
}
