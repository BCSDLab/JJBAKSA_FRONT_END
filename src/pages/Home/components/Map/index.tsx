import useGeolocation from 'utils/hooks/useGeolocation';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import styles from './Map.module.scss';
import MobileOptions from './components/MobileOptions';
import useNaverMap from './hooks/useNaverMap';
import useMarker from './hooks/useMarker';
import useFilterShops from './hooks/useFilterShops';

const OPTIONS = {
  maximumAge: 1000,
};
export default function Map(): JSX.Element {
  const { isMobile } = useMediaQuery();
  const { location } = useGeolocation(OPTIONS);
  const map = useNaverMap(location?.latitude, location?.longitude);
  const { data: filterShops } = useFilterShops({
    options_friend: 1,
    options_scrap: 1,
    options_nearby: 1,
  });
  useMarker({ map, filterShops });

  return (
    <div>
      {isMobile && <MobileOptions />}
      <div id="map" className={styles.map} />
    </div>
  );
}
