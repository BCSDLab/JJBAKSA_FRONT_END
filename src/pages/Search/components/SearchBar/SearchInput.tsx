import { ReactComponent as LensIcon } from 'assets/svg/search/lens.svg';
import styles from 'pages/Search/components/SearchBar/SearchBar.module.scss';
import useFetchShops from 'pages/SearchDetails/hooks/useFetchShops';
import { useNavigate } from 'react-router-dom';

interface Props {
  text: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export default function SearchInput({
  text, onChange,
}: Props) {
  const { isFetching, data: shops, refetch } = useFetchShops(text ?? '');
  const navigate = useNavigate();

  const handleSearchClick = async () => {
    if (!text) {
      console.log('Please enter a keyword to search.');
      return;
    }

    await refetch();

    if (isFetching) {
      console.log('Fetching shops...');
    } else {
      console.log('Shops fetched.');
      console.log(shops);
      if (shops === undefined) {
        console.log('No shops found.');
        navigate('/search/not-found');
      }
    }
  };

  return (
    <label title="검색어 입력" className={styles['search-bar']} htmlFor="searchBarInput">
      <input
        className={styles['search-bar__input']}
        id="searchBarInput"
        placeholder="검색어를 입력해주세요."
        value={text}
        onChange={onChange}
        autoComplete="off"
      />
      <LensIcon title="검색" className={styles['search-bar__icon']} onClick={handleSearchClick} />
    </label>
  );
}
