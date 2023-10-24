import useHome from './components/Map/hooks/useHome';
import Location from './components/Map/components/Location/index';
import Map from './components/Map';
import styles from './Home.module.scss';
import LocationInfo from './components/LocationInfo';

export default function Home(): JSX.Element {
  const {
    isClickLocation, active, userLocation, locationRef,
  } = useHome();
  return (
    <>
      <LocationInfo address={userLocation.address} onClick={active} />
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
