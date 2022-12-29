import { useParams } from 'react-router-dom';
import styles from 'pages/SearchDetails/SearchDetails.module.scss';
import NavigationBar from 'pages/Search/components/NavigationBar';
import useSlider from 'pages/Search/hooks/useSlider';
import LoadingView from './components/LoadingView';
import SearchItem from './components/SearchItem';
import useFetchShops from './hooks/useFetchShops';
import Slider from './components/Slider';

export default function SearchDetails() {
  const { keyword } = useParams();
  const { isFetching, data: shops } = useFetchShops(keyword ?? '');
  const { isOpend, openSlider } = useSlider();

  return (
    <div className={styles.details}>
      <NavigationBar keyword={keyword} />
      {isOpend && <Slider />}
      <div className={styles.details__list}>
        {isFetching
          ? <LoadingView />
          : shops && shops.map((shop) => (
            <SearchItem key={shop.shopId} shop={shop} onClick={openSlider} />
          ))}
      </div>
    </div>
  );
}
