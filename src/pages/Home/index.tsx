import LocationSelectModal from 'pages/Home/components/Map/components/LocationSelectModal/index';
import Map from 'pages/Home/components/Map/index';
import useMediaQuery from 'utils/hooks/useMediaQuery';

import styles from './Home.module.scss';

export default function Home(): JSX.Element {
  const { isMobile } = useMediaQuery();

  return (
    <div className={styles.container}>
      <Map className={styles['map-component']} />
      {!isMobile && <LocationSelectModal />}
    </div>
  );
}
