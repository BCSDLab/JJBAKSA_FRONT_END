import LocationInfo from 'pages/Home/components/LocationInfo/index';
import Location from 'pages/Home/components/Map/components/Location/index';
import useHome from 'pages/Home/components/Map/hooks/useHome';
import Map from 'pages/Home/components/Map/index';

import styles from './Home.module.scss';

export default function Home(): JSX.Element {
  const {
    isClickLocation, setActive, userLocation, locationRef,
  } = useHome();
  return (
    <>
      <LocationInfo address={userLocation.address} onClick={setActive} />
      <Map />
      {isClickLocation && (
        <div
          className={styles.locationBox}
          ref={locationRef}
        >
          <Location />
        </div>
      )}
    </>
  );
}
