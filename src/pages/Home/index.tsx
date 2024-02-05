import LocationSelectModal from 'pages/Home/Map/components/LocationSelectModal/index';
import Map from 'pages/Home/Map/index';
import useMediaQuery from 'utils/hooks/useMediaQuery';

import styles from './Home.module.scss';

export default function Home(): JSX.Element {
  const { isMobile } = useMediaQuery();

  return (
    <div className={styles.container}>
      {!isMobile && <LocationSelectModal />}
      <Map />
    </div>
  );
}
