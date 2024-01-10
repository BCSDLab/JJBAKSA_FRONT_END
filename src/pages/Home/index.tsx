import LocationSelectButton from 'pages/Home/components/LocationSelectButton/index';
import LocationSelectModal from 'pages/Home/components/Map/components/LocationSelectModal/index';
import useHome from 'pages/Home/components/Map/hooks/useHome';
import Map from 'pages/Home/components/Map/index';

import styles from './Home.module.scss';

export default function Home(): JSX.Element {
  const {
    isClickLocation, setActive, userLocation, locationRef,
  } = useHome();

  return (
    <>
      <Map />
      <LocationSelectButton address={userLocation.address} onClick={setActive} />
      {isClickLocation && (
        <div
          className={styles['location-box']}
          ref={locationRef}
        >
          <LocationSelectModal />
        </div>
      )}
    </>
  );
}
