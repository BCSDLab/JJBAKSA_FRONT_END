import { Container as MapDiv } from 'react-naver-maps';
import useHome from './components/Map/hooks/useHome';
import Location from './components/Map/components/Location/index';
import NaverMap from './components/Map';
import styles from './Home.module.scss';
import LocationInfo from './components/LocationInfo';

export default function Home(): JSX.Element {
  const {
    isClickLocation, active, userLocation, locationRef,
  } = useHome();
  return (
    <div className={styles.home}>
      <LocationInfo address={userLocation.address} onClick={active} />
      <div className={styles.map}>
        <MapDiv>
          <NaverMap />
        </MapDiv>
      </div>
      {isClickLocation && (
        <div
          className={styles.locationBox}
          ref={locationRef}
        >
          <Location />
        </div>
      )}
    </div>
  );
}
