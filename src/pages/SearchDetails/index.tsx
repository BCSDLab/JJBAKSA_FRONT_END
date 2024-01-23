import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Shop } from 'api/shop/entity';
import SearchInput from 'pages/Search/components/SearchInput';
import Suggestions from 'pages/Search/components/Suggestions';
import useSearchingMode from 'pages/Search/hooks/useSearchingMode';
import LoadingView from 'pages/SearchDetails/components/LoadingView';
import SearchItem from 'pages/SearchDetails/components/SearchItem';
import useFetchShops from 'pages/SearchDetails/hooks/useFetchShops';
import useSearchForm from 'store/text';
import useMediaQuery from 'utils/hooks/useMediaQuery';

import styles from './SearchDetails.module.scss';

export default function SearchDetails() {
  const inputRef = useRef(null);
  const isSearching = useSearchingMode({ inputRef });
  const { isMobile } = useMediaQuery();
  const location = useLocation();
  const {
    text, handleChange, handleSubmit, isEnter, submittedText, resetText,
  } = useSearchForm(location.pathname);
  const {
    isFetching, data: shops, count, isError,
  } = useFetchShops(submittedText);
  const navigate = useNavigate();

  useEffect(() => {
    if ((!isFetching && count === 0 && submittedText.length !== 0) || isError) {
      navigate('/search/not-found');
      resetText();
    }
  }, [isFetching, count, submittedText, navigate, resetText, isError]);

  const componentsController = () => {
    if (isFetching) {
      return <LoadingView />;
    }

    return shops?.map((shop: Shop) => (
      <div className={styles.details__line} key={shop.placeId}>
        <SearchItem shop={shop} pathname={location.pathname} />
      </div>
    ));
  };

  return (
    <div className={styles.details}>
      <div className={styles.details__search}>
        <SearchInput
          className={styles.details__search}
          value={text}
          inputRef={inputRef}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
      {!isMobile && isSearching && !isEnter && <Suggestions className={styles['related-searches']} text={text} />}
      <div className={styles.details__result}>
        {`${count}개의 검색결과`}
      </div>
      <div className={styles.details__list}>
        {componentsController()}
      </div>
    </div>
  );
}
