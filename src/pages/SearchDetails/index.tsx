// import { useParams } from 'react-router-dom';
import styles from 'pages/SearchDetails/SearchDetails.module.scss';
// import NavigationBar from 'pages/Search/components/NavigationBar';
import SearchInput from 'pages/Search/components/SearchBar/SearchInput';
import RelatedSearches from 'pages/Search/components/RelatedSearches';
import { useEffect, useState } from 'react';
import useSearchingMode from 'pages/Search/hooks/useSearchingMode';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import { Shop } from 'api/shop/entity';
import { useNavigate } from 'react-router-dom';
import useBooleanState from 'utils/hooks/useBooleanState';
import LoadingView from './components/LoadingView';
import useFetchShops from './hooks/useFetchShops';
// import ControllBar from './components/ControllBar';
import SearchItem from './components/SearchItem';

const useSearchForm = () => {
  const [text, setText] = useState('');
  const [isEnter,,,toggle] = useBooleanState(false);
  const [submittedText, setSubmittedText] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text) {
      setSubmittedText(text);
      toggle();
    }
  };

  return {
    text,
    handleChange,
    handleSubmit,
    submittedText,
    isEnter,
    toggle,
  };
};

export default function SearchDetails() {
  const {
    text, handleChange, handleSubmit, isEnter,
  } = useSearchForm();
  const isSearching = useSearchingMode();
  const { isMobile } = useMediaQuery();
  const { isFetching, data: shops, count } = useFetchShops(text ?? '');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isFetching && count === 0 && shops === undefined) {
      navigate('/search/not-found');
    }
  }, [isFetching, count, shops, navigate]);

  const componentsController = () => {
    if (isFetching) {
      return <LoadingView />;
    }

    return (shops || []).map((shop: Shop) => (
      <div className={styles.details__line}>
        <SearchItem key={shop.placeId} shop={shop} />
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
