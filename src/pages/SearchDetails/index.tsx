// import { useParams } from 'react-router-dom';
import styles from 'pages/SearchDetails/SearchDetails.module.scss';
// import NavigationBar from 'pages/Search/components/NavigationBar';
import SearchInput from 'pages/Search/components/SearchBar/SearchInput';
import RelatedSearches from 'pages/Search/components/RelatedSearches';
import { useState, useEffect } from 'react';
import useSearchingMode from 'pages/Search/hooks/useSearchingMode';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import { Shop } from 'api/shop/entity';
import { useNavigate } from 'react-router-dom';
import LoadingView from './components/LoadingView';
import useFetchShops from './hooks/useFetchShops';
// import ControllBar from './components/ControllBar';
import SearchItem from './components/SearchItem';

const useSearchForm = () => {
  const [text, setText] = useState('');
  const [entered, setEntered] = useState(false);
  const [submittedText, setSubmittedText] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && text) {
      setSubmittedText(text);
      setEntered(true);
    }
  };

  useEffect(() => {
    setEntered(false);
  }, [text]);

  return {
    text,
    handleChange,
    handleEnter,
    submittedText,
    entered,
  };
};

export default function SearchDetails() {
  const {
    text, handleChange, handleEnter, entered,
  } = useSearchForm();
  const isSearching = useSearchingMode();
  const { isMobile } = useMediaQuery();
  const { isFetching, data: shops, count } = useFetchShops(text ?? '');
  const navigate = useNavigate();

  const componentsController = () => {
    if (isFetching) {
      return <LoadingView />;
    }

    if (count === 0 && shops === undefined) {
      navigate('/search/not-found');
      return null;
    }

    return (shops || []).map((shop: Shop) => (
      <div className={styles.details__line}>
        <SearchItem key={shop.placeId} shop={shop} />
      </div>
    ));
  };

  return (
    <div>
      <div className={styles.details}>
        <div className={styles.details__search}>
          <SearchInput onChange={handleChange} text={text} onKeyDown={handleEnter} />
        </div>
        {!isMobile && isSearching && !entered && <RelatedSearches text={text} />}
        <div className={styles.details__result}>
          {`${count}개의 검색결과`}
        </div>
        <div className={styles.details__list}>
          {componentsController()}
        </div>
      </div>
    </div>
  );
}
